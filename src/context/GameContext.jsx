import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { APPLIANCES, ELECTRICITY_RATES, isOffPeakHour } from '../data/appliances';
import { SCENARIOS, BELGIUM_AVERAGE } from '../data/scenarios';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  // État principal du jeu
  const [currentDay, setCurrentDay] = useState(1);
  const [gameTime, setGameTime] = useState(8); // Heure du jeu (8h = matin)
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1); // Vitesse du jeu (1 = normal, 2 = rapide)
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'recap'

  // État des appareils (on/off)
  const [appliancesState, setAppliancesState] = useState(() => {
    const initialState = {};
    Object.keys(APPLIANCES).forEach(id => {
      initialState[id] = APPLIANCES[id].alwaysOn || false;
    });
    return initialState;
  });

  // Métriques du jour
  const [todayConsumption, setTodayConsumption] = useState(0); // kWh
  const [todayBudget, setTodayBudget] = useState(0); // €
  const [todayComfort, setTodayComfort] = useState(100); // %
  const [peakConsumption, setPeakConsumption] = useState(0); // kWh heures pleines
  const [offPeakConsumption, setOffPeakConsumption] = useState(0); // kWh heures creuses

  // Pénalités actives
  const [activePenalties, setActivePenalties] = useState([]);

  // Historique des jours
  const [daysHistory, setDaysHistory] = useState([]);

  // Messages et tutoriels
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(() => {
    const saved = localStorage.getItem('maisonEnergivore_tutorialCompleted');
    return saved === 'true';
  });

  // Progression et déblocage des niveaux
  const [unlockedDays, setUnlockedDays] = useState(() => {
    const saved = localStorage.getItem('maisonEnergivore_unlockedDays');
    return saved ? JSON.parse(saved) : [1]; // Par défaut, seul le tutoriel (jour 1) est débloqué
  });

  // Meilleurs scores (étoiles) pour chaque jour
  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem('maisonEnergivore_bestScores');
    return saved ? JSON.parse(saved) : {}; // Format: { day1: 3, day2: 2, ... }
  });

  // Résultats du jour pour le modal de récap
  const [dayRecapData, setDayRecapData] = useState(null);
  const [showRecap, setShowRecap] = useState(false);

  // Modal de confirmation pour quitter
  const [showConfirmQuit, setShowConfirmQuit] = useState(false);

  // Modal des objectifs au début de la partie
  const [showObjectives, setShowObjectives] = useState(false);

  // Ref pour éviter d'appeler endDay plusieurs fois
  const endDayCalledRef = useRef(false);

  // Scénario du jour actuel
  const currentScenario = SCENARIOS[`day${currentDay}`];

  // Toggle appareil
  const toggleAppliance = useCallback((applianceId) => {
    const appliance = APPLIANCES[applianceId];

    // Vérifier si l'appareil peut être éteint/allumé
    if (!appliance.canToggle) {
      setCurrentMessage({
        type: 'error',
        text: `Le ${appliance.name} ne peut pas être éteint !`,
        tip: appliance.description
      });
      return;
    }

    // Vérifier les restrictions de pénalités
    const hasRestriction = activePenalties.find(
      p => p.type === 'restriction' && p.appliances?.includes(applianceId)
    );

    if (hasRestriction && !isOffPeakHour(gameTime)) {
      setCurrentMessage({
        type: 'error',
        text: `${appliance.name} disponible uniquement en heures creuses !`,
        tip: 'Attendez 22h pour utiliser cet appareil'
      });
      return;
    }

    setAppliancesState(prev => ({
      ...prev,
      [applianceId]: !prev[applianceId]
    }));

    setCurrentMessage({
      type: 'success',
      text: `${appliance.name} ${!appliancesState[applianceId] ? 'allumé' : 'éteint'}`,
      tip: `Consommation : ${appliance.powerW}W`
    });
  }, [appliancesState, activePenalties, gameTime]);

  // Calculer la consommation actuelle (instantanée en W)
  const getCurrentPowerConsumption = useCallback(() => {
    let totalPower = 0;
    Object.entries(appliancesState).forEach(([id, isOn]) => {
      if (isOn) {
        totalPower += APPLIANCES[id].powerW;
      }
    });
    return totalPower;
  }, [appliancesState]);

  // Obtenir le modificateur de prix des pénalités
  const getPriceModifier = useCallback(() => {
    let modifier = 1;
    activePenalties.forEach(penalty => {
      if (penalty.type === 'priceIncrease') {
        modifier *= (1 + penalty.value / 100);
      }
    });
    return modifier;
  }, [activePenalties]);

  // Obtenir la limite de consommation ajustée
  const getConsumptionLimit = useCallback(() => {
    if (!currentScenario?.objectives?.consumption) return null;

    let limit = currentScenario.objectives.consumption;
    activePenalties.forEach(penalty => {
      if (penalty.type === 'consumptionLimit') {
        limit += penalty.value; // value est négatif
      }
    });
    return limit;
  }, [currentScenario, activePenalties]);

  // Fonction pour avancer le temps d'une heure
  const advanceTime = useCallback(() => {
    setGameTime(prevTime => {
      const newTime = prevTime + 1;

      // Si on atteint 24h, on s'arrête (endDay sera géré par useEffect)
      if (newTime >= 24) {
        setIsPlaying(false);
        return 24;
      }

      // Calculer la consommation pour cette heure
      const currentPowerW = getCurrentPowerConsumption();
      const consumptionThisHour = currentPowerW / 1000; // Convertir W en kWh

      // Ajouter à la consommation totale
      setTodayConsumption(prev => prev + consumptionThisHour);

      // Calculer le coût
      const isOffPeak = isOffPeakHour(newTime);
      const rate = isOffPeak ? ELECTRICITY_RATES.offPeakHours : ELECTRICITY_RATES.peakHours;

      // Appliquer modificateur de prix des pénalités
      const priceModifier = getPriceModifier();
      const cost = consumptionThisHour * rate * priceModifier;

      setTodayBudget(prev => prev + cost);

      // Séparer heures pleines/creuses
      if (isOffPeak) {
        setOffPeakConsumption(prev => prev + consumptionThisHour);
      } else {
        setPeakConsumption(prev => prev + consumptionThisHour);
      }

      // Calculer le confort dynamique
      setTodayComfort(prev => {
        let newComfort = prev;

        // Déclin naturel du confort (légèrement chaque heure)
        newComfort -= 0.5;

        // CHAUFFAGE (Hiver / Temps froid)
        const heatingOn = appliancesState.heating || appliancesState.heatingLow;
        if (currentScenario?.weatherCondition === 'cold') {
          if (heatingOn) {
            // Chauffage augmente le confort en hiver
            newComfort += appliancesState.heating ? 3 : 1.5; // Mode normal ou éco
          } else {
            // Sans chauffage en hiver, le confort baisse plus vite
            const decayRate = currentScenario.comfortDecayRate || 5;
            newComfort -= decayRate;
          }
        } else if (heatingOn && newTime >= 6 && newTime <= 20) {
          // Chauffage allumé quand il ne fait pas froid = inconfort
          newComfort -= 2;
        }

        // CLIMATISATION (Été / Canicule)
        const acOn = appliancesState.airConditioning;
        if (currentScenario?.weatherCondition === 'hot') {
          if (acOn) {
            // Clim augmente le confort en été
            newComfort += 3;
          } else {
            // Sans clim en canicule, le confort baisse
            newComfort -= 4;
          }
        } else if (acOn) {
          // Clim allumée quand il ne fait pas chaud = inconfort
          newComfort -= 1;
        }

        // LUMIÈRES (confort visuel)
        const lightsOn = [
          appliancesState.lightsKitchen,
          appliancesState.lightsLiving,
          appliancesState.lightsOffice,
          appliancesState.lightsBedroom,
          appliancesState.lightsBathroom
        ].filter(Boolean).length;

        if (newTime >= 19 || newTime <= 7) {
          // La nuit, avoir des lumières augmente le confort
          if (lightsOn > 0) {
            newComfort += lightsOn * 0.3;
          } else if (newTime >= 19 && newTime <= 22) {
            // Pas de lumières le soir = inconfortable
            newComfort -= 1;
          }
        }

        // DIVERTISSEMENT (TV, Console)
        const tvOn = appliancesState.tv;
        const consoleOn = appliancesState.console;
        if ((tvOn || consoleOn) && (newTime >= 18 && newTime <= 23)) {
          // Divertissement le soir augmente le confort
          newComfort += 1;
        }

        // ORDINATEUR (travail/loisir)
        if (appliancesState.computer && newTime >= 8 && newTime <= 18) {
          // Ordinateur en journée (travail) = neutre mais nécessaire
          newComfort += 0.5;
        }

        // Limiter entre 0 et 100
        return Math.max(0, Math.min(100, newComfort));
      });

      // Vérifier les événements du scénario
      const events = currentScenario?.events || [];
      const event = events.find(e => e.time === newTime);
      if (event) {
        setCurrentMessage({
          type: event.type,
          text: event.message,
          tip: event.tip,
          highlight: event.highlight
        });
      }

      return newTime;
    });
  }, [getCurrentPowerConsumption, getPriceModifier, currentScenario, appliancesState]);

  // Système de temps automatique
  useEffect(() => {
    if (!isPlaying) return;

    const baseInterval = 10000; // 10 secondes par heure de jeu
    const interval = setInterval(() => {
      advanceTime();
    }, baseInterval / gameSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, gameSpeed, advanceTime]);

  // Commencer un nouveau jour
  const startNewDay = useCallback((dayNumber) => {
    // Initialiser le jour
    setCurrentDay(dayNumber);
    setGameTime(8);
    setTodayConsumption(0);
    setTodayBudget(0);
    setPeakConsumption(0);
    setOffPeakConsumption(0);
    endDayCalledRef.current = false;

    // Réinitialiser les appareils
    const initialState = {};
    Object.keys(APPLIANCES).forEach(id => {
      initialState[id] = APPLIANCES[id].alwaysOn || false;
    });
    setAppliancesState(initialState);

    setCurrentMessage(null);

    // Passer à l'écran de jeu
    setGameState('playing');

    // Afficher le modal des objectifs (le jeu reste en pause)
    setShowObjectives(true);
    setIsPlaying(false); // Pause tant que le modal est ouvert
  }, []);

  // Démarrer réellement la partie après que l'utilisateur ait vu les objectifs
  const startGameAfterObjectives = useCallback(() => {
    setShowObjectives(false);

    // Appliquer le confort de départ (pénalités possibles)
    let startingComfort = 100;
    activePenalties.forEach(penalty => {
      if (penalty.type === 'comfortPenalty') {
        startingComfort += penalty.value; // value est négatif
      }
    });
    setTodayComfort(Math.max(startingComfort, 40));

    // Déclencher le tutoriel pour le Jour 1 (tutoriel)
    if (currentDay === 1 && !tutorialCompleted) {
      setShowTutorial(true);
      setIsPlaying(false); // Pause pendant le tutoriel
    } else {
      setIsPlaying(true); // Démarrer le jeu
    }
  }, [activePenalties, tutorialCompleted, currentDay]);

  // Pause/Play
  const togglePause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Gestion du tutoriel
  const completeTutorial = useCallback(() => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    localStorage.setItem('maisonEnergivore_tutorialCompleted', 'true');
    setIsPlaying(true); // Reprendre le jeu
  }, []);

  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    localStorage.setItem('maisonEnergivore_tutorialCompleted', 'true');
    setIsPlaying(true); // Reprendre le jeu
  }, []);

  // Terminer le jour et afficher le récap
  const endDay = useCallback(() => {
    console.log('🎬 endDay appelé - currentDay:', currentDay, 'gameTime:', gameTime);
    setIsPlaying(false);

    // Sauvegarder les résultats du jour
    const dayResults = {
      day: currentDay,
      consumption: todayConsumption,
      budget: todayBudget,
      comfort: todayComfort,
      peak: peakConsumption,
      offPeak: offPeakConsumption,
      hasNextDay: currentDay < 7 // Il y a 7 jours au total
    };

    console.log('📦 Résultats du jour:', dayResults);

    setDayRecapData(dayResults);
    setShowRecap(true);
    setGameState('recap');

    console.log('✅ État mis à jour: showRecap=true, gameState=recap');

    // Ajouter au daysHistory
    setDaysHistory(prev => [...prev, dayResults]);

    // Débloquer le prochain jour si on a réussi au moins partiellement
    const consumptionObjective = currentScenario?.objectives?.consumption || BELGIUM_AVERAGE;
    const budgetObjective = currentScenario?.objectives?.budget || 5;
    const comfortObjective = currentScenario?.objectives?.comfort || 60;

    const consumptionSuccess = todayConsumption <= consumptionObjective;
    const budgetSuccess = todayBudget <= budgetObjective;
    const comfortSuccess = todayComfort >= comfortObjective;

    const successCount = [consumptionSuccess, budgetSuccess, comfortSuccess].filter(Boolean).length;

    // Calculer les étoiles obtenues (0-3 selon le nombre d'objectifs atteints)
    const allSuccess = successCount === 3;
    const partialSuccess = successCount >= 2;
    const currentStars = successCount; // 0, 1, 2, ou 3 étoiles

    // Sauvegarder le meilleur score (garder le maximum)
    setBestScores(prev => {
      const previousBest = prev[`day${currentDay}`] || 0;
      const newBest = Math.max(previousBest, currentStars);

      // Ne mettre à jour que si c'est mieux ou égal
      if (newBest > previousBest) {
        const updated = { ...prev, [`day${currentDay}`]: newBest };
        localStorage.setItem('maisonEnergivore_bestScores', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });

    // Débloquer le prochain jour si au moins 2/3 objectifs réussis
    // Exception : le jour 1 (tutoriel) débloque toujours le jour 2
    if ((currentDay === 1 || successCount >= 2) && currentDay < 7) {
      const nextDay = currentDay + 1;
      setUnlockedDays(prev => {
        const newUnlocked = [...new Set([...prev, nextDay])];
        localStorage.setItem('maisonEnergivore_unlockedDays', JSON.stringify(newUnlocked));
        return newUnlocked;
      });
    }
  }, [currentDay, todayConsumption, todayBudget, todayComfort, peakConsumption, offPeakConsumption, currentScenario, BELGIUM_AVERAGE]);

  // Détecter la fin de journée (24h)
  useEffect(() => {
    if (gameTime >= 24 && gameState === 'playing' && !endDayCalledRef.current) {
      console.log('🎯 Fin de journée détectée - Affichage du récap');
      endDayCalledRef.current = true; // Marquer comme appelé

      // Petit délai pour que l'UI se mette à jour
      const timer = setTimeout(() => {
        endDay();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [gameTime, gameState, endDay]);

  // Fonction pour aller au prochain jour depuis le récap
  const goToNextDay = useCallback(() => {
    setShowRecap(false);
    setDayRecapData(null);
    startNewDay(currentDay + 1);
  }, [currentDay, startNewDay]);

  // Fonction pour retourner au menu
  const goToMenu = useCallback(() => {
    // Si une partie est en cours (pas encore terminée), demander confirmation
    if (gameState === 'playing' && gameTime > 0 && gameTime < 24) {
      setShowConfirmQuit(true);
      return; // Attendre la confirmation
    }

    // Retour au menu immédiat si pas en partie
    setShowRecap(false);
    setDayRecapData(null);
    setGameState('menu');
    setIsPlaying(false);
  }, [gameState, gameTime]);

  // Confirmer le retour au menu
  const confirmGoToMenu = useCallback(() => {
    setShowConfirmQuit(false);
    setShowRecap(false);
    setDayRecapData(null);
    setGameState('menu');
    setIsPlaying(false);
  }, []);

  // Annuler le retour au menu
  const cancelGoToMenu = useCallback(() => {
    setShowConfirmQuit(false);
  }, []);

  const value = {
    // État
    currentDay,
    gameTime,
    isPlaying,
    gameSpeed,
    gameState,
    appliancesState,
    todayConsumption,
    todayBudget,
    todayComfort,
    peakConsumption,
    offPeakConsumption,
    activePenalties,
    daysHistory,
    currentMessage,
    currentScenario,
    showTutorial,
    tutorialCompleted,
    unlockedDays,
    bestScores,
    showRecap,
    dayRecapData,
    showConfirmQuit,
    showObjectives,

    // Fonctions
    toggleAppliance,
    getCurrentPowerConsumption,
    startNewDay,
    startGameAfterObjectives,
    togglePause,
    setGameSpeed,
    advanceTime,
    getConsumptionLimit,
    getPriceModifier,
    completeTutorial,
    skipTutorial,
    endDay,
    goToNextDay,
    goToMenu,
    confirmGoToMenu,
    cancelGoToMenu,

    // Constantes
    APPLIANCES,
    BELGIUM_AVERAGE,
    ELECTRICITY_RATES
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
