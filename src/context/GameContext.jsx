import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { APPLIANCES, ELECTRICITY_RATES, isOffPeakHour, getSolarProductionW } from '../data/appliances';
import { SCENARIOS, BELGIUM_AVERAGE } from '../data/scenarios';
import { MISSIONS } from '../data/missions';

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

  // Missions
  const [missionProgress, setMissionProgress] = useState({});

  // Solaire
  const [solarProductionTotal, setSolarProductionTotal] = useState(0); // kWh produits
  const [solarConsumptionTotal, setSolarConsumptionTotal] = useState(0); // kWh autoconsommés
  const [currentSolarProductionW, setCurrentSolarProductionW] = useState(0); // W actuels

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
    return saved ? JSON.parse(saved) : [1];
  });

  // Meilleurs scores (étoiles) pour chaque jour
  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem('maisonEnergivore_bestScores');
    return saved ? JSON.parse(saved) : {};
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

  // Missions du jour
  const currentMissions = MISSIONS[`day${currentDay}`] || [];
  const allMissionsCompleted = currentMissions.length === 0 ||
    currentMissions.every(m => missionProgress[m.id]?.completed);

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

      // Calculer la consommation brute pour cette heure
      const currentPowerW = getCurrentPowerConsumption();
      const grossConsumptionThisHour = currentPowerW / 1000; // W -> kWh

      // Calculer la production solaire
      const solar = currentScenario?.solar;
      let solarProductionW = 0;
      if (solar?.enabled) {
        solarProductionW = getSolarProductionW(newTime, solar.weather, solar.peakProductionW);
      }
      setCurrentSolarProductionW(solarProductionW);

      const solarProductionKwh = solarProductionW / 1000;
      // L'offset solaire ne peut pas dépasser la consommation brute
      const solarOffsetKwh = Math.min(solarProductionKwh, grossConsumptionThisHour);
      // Consommation nette = ce qui est tiré du réseau
      const netConsumptionThisHour = grossConsumptionThisHour - solarOffsetKwh;

      // Tracker la production et autoconsommation solaire
      if (solar?.enabled) {
        setSolarProductionTotal(prev => prev + solarProductionKwh);
        setSolarConsumptionTotal(prev => prev + solarOffsetKwh);
      }

      // Ajouter la consommation NETTE au total (c'est ce qui est facturé)
      setTodayConsumption(prev => prev + netConsumptionThisHour);

      // Calculer le coût (seule la consommation réseau est payante)
      const isOffPeak = isOffPeakHour(newTime);
      const rate = isOffPeak ? ELECTRICITY_RATES.offPeakHours : ELECTRICITY_RATES.peakHours;

      // Appliquer modificateur de prix des pénalités
      const priceModifier = getPriceModifier();
      const cost = netConsumptionThisHour * rate * priceModifier;

      setTodayBudget(prev => prev + cost);

      // Séparer heures pleines/creuses (consommation nette)
      if (isOffPeak) {
        setOffPeakConsumption(prev => prev + netConsumptionThisHour);
      } else {
        setPeakConsumption(prev => prev + netConsumptionThisHour);
      }

      // Tracker les missions
      const dayMissions = MISSIONS[`day${currentDay}`] || [];
      if (dayMissions.length > 0) {
        setMissionProgress(prev => {
          const updated = { ...prev };
          dayMissions.forEach(mission => {
            if (updated[mission.id]?.completed) return; // Déjà complétée

            // Vérifier si un des appareils requis est allumé
            const applianceOn = mission.appliances.some(aId => appliancesState[aId]);
            if (!applianceOn) return;

            // Incrémenter la progression
            const current = updated[mission.id] || { hoursCompleted: 0, completed: false };
            const newHours = current.hoursCompleted + 1;
            updated[mission.id] = {
              hoursCompleted: newHours,
              completed: newHours >= mission.requiredHours
            };
          });
          return updated;
        });
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
            newComfort += appliancesState.heating ? 3 : 1.5;
          } else {
            const decayRate = currentScenario.comfortDecayRate || 5;
            newComfort -= decayRate;
          }
        } else if (heatingOn && newTime >= 6 && newTime <= 20) {
          newComfort -= 2;
        }

        // CLIMATISATION (Été / Canicule)
        const acOn = appliancesState.airConditioning;
        if (currentScenario?.weatherCondition === 'hot') {
          if (acOn) {
            newComfort += 3;
          } else {
            newComfort -= 4;
          }
        } else if (acOn) {
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
          if (lightsOn > 0) {
            newComfort += lightsOn * 0.3;
          } else if (newTime >= 19 && newTime <= 22) {
            newComfort -= 1;
          }
        }

        // DIVERTISSEMENT (TV, Console)
        const tvOn = appliancesState.tv;
        const consoleOn = appliancesState.console;
        if ((tvOn || consoleOn) && (newTime >= 18 && newTime <= 23)) {
          newComfort += 1;
        }

        // ORDINATEUR (travail/loisir)
        if (appliancesState.computer && newTime >= 8 && newTime <= 18) {
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
  }, [getCurrentPowerConsumption, getPriceModifier, currentScenario, appliancesState, currentDay]);

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

    // Initialiser les missions du jour
    const dayMissions = MISSIONS[`day${dayNumber}`] || [];
    const initialMissions = {};
    dayMissions.forEach(m => {
      initialMissions[m.id] = { hoursCompleted: 0, completed: false };
    });
    setMissionProgress(initialMissions);

    // Réinitialiser le solaire
    setSolarProductionTotal(0);
    setSolarConsumptionTotal(0);
    setCurrentSolarProductionW(0);

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
    setIsPlaying(true);
  }, []);

  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    localStorage.setItem('maisonEnergivore_tutorialCompleted', 'true');
    setIsPlaying(true);
  }, []);

  // Terminer le jour et afficher le récap
  const endDay = useCallback(() => {
    console.log('endDay appele - currentDay:', currentDay, 'gameTime:', gameTime);
    setIsPlaying(false);

    // Calculer le pourcentage d'énergie verte
    const totalConsumptionWithSolar = todayConsumption + solarConsumptionTotal;
    const greenEnergyPercent = totalConsumptionWithSolar > 0
      ? (solarConsumptionTotal / totalConsumptionWithSolar) * 100
      : 0;

    // Sauvegarder les résultats du jour
    const dayMissions = MISSIONS[`day${currentDay}`] || [];
    const missionsData = dayMissions.map(m => ({
      ...m,
      progress: missionProgress[m.id] || { hoursCompleted: 0, completed: false }
    }));
    const missionsCompleted = dayMissions.length === 0 ||
      dayMissions.every(m => missionProgress[m.id]?.completed);

    // Calculer les objectifs et étoiles UNE SEULE FOIS (source de vérité)
    const consumptionObjective = currentScenario?.objectives?.consumption || BELGIUM_AVERAGE.dailyConsumption;
    const budgetObjective = currentScenario?.objectives?.budget || 5;
    const comfortObjective = currentScenario?.objectives?.comfort || 60;

    const consumptionSuccess = todayConsumption <= consumptionObjective;
    const budgetSuccess = todayBudget <= budgetObjective;
    const comfortSuccess = todayComfort >= comfortObjective;

    const successCount = [consumptionSuccess, budgetSuccess, comfortSuccess].filter(Boolean).length;

    // Calculer les étoiles
    let currentStars = successCount;

    // Si des missions existent et ne sont pas toutes complétées, max 1 étoile
    if (dayMissions.length > 0 && !missionsCompleted) {
      currentStars = Math.min(currentStars, 1);
    }

    // Vérifier l'objectif d'énergie verte
    const greenObjective = currentScenario?.objectives?.greenEnergyPercentage;
    if (greenObjective && greenEnergyPercent < greenObjective) {
      currentStars = Math.max(0, currentStars - 1);
    }

    const dayResults = {
      day: currentDay,
      consumption: todayConsumption,
      budget: todayBudget,
      comfort: todayComfort,
      peak: peakConsumption,
      offPeak: offPeakConsumption,
      hasNextDay: currentDay < 7,
      // Objectifs (pour affichage dans le recap)
      consumptionObjective,
      budgetObjective,
      comfortObjective,
      consumptionSuccess,
      budgetSuccess,
      comfortSuccess,
      // Étoiles (source unique de vérité)
      stars: currentStars,
      // Missions
      missions: missionsData,
      allMissionsCompleted: missionsCompleted,
      // Solaire
      solarProduction: solarProductionTotal,
      solarConsumption: solarConsumptionTotal,
      greenEnergyPercentage: greenEnergyPercent
    };

    console.log('Resultats du jour:', dayResults);

    setDayRecapData(dayResults);
    setShowRecap(true);
    setGameState('recap');

    // Ajouter au daysHistory
    setDaysHistory(prev => [...prev, dayResults]);

    // Sauvegarder le meilleur score (garder le maximum)
    setBestScores(prev => {
      const previousBest = prev[`day${currentDay}`] || 0;
      const newBest = Math.max(previousBest, currentStars);

      if (newBest > previousBest) {
        const updated = { ...prev, [`day${currentDay}`]: newBest };
        localStorage.setItem('maisonEnergivore_bestScores', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });

    // Débloquer le prochain jour : 2/3 objectifs ET missions complétées (si existantes)
    const canUnlock = currentDay === 1 || (successCount >= 2 && missionsCompleted);
    if (canUnlock && currentDay < 7) {
      const nextDay = currentDay + 1;
      setUnlockedDays(prev => {
        const newUnlocked = [...new Set([...prev, nextDay])];
        localStorage.setItem('maisonEnergivore_unlockedDays', JSON.stringify(newUnlocked));
        return newUnlocked;
      });
    }
  }, [currentDay, todayConsumption, todayBudget, todayComfort, peakConsumption, offPeakConsumption, currentScenario, missionProgress, solarProductionTotal, solarConsumptionTotal, gameTime]);

  // Détecter la fin de journée (24h)
  useEffect(() => {
    if (gameTime >= 24 && gameState === 'playing' && !endDayCalledRef.current) {
      console.log('Fin de journee detectee - Affichage du recap');
      endDayCalledRef.current = true;

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
    if (gameState === 'playing' && gameTime > 0 && gameTime < 24) {
      setShowConfirmQuit(true);
      return;
    }

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

    // Missions
    missionProgress,
    currentMissions,
    allMissionsCompleted,

    // Solaire
    solarProductionTotal,
    solarConsumptionTotal,
    currentSolarProductionW,

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
