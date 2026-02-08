import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [tutorialStep, setTutorialStep] = useState(0);

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

  // Calculer le confort actuel
  const calculateComfort = useCallback(() => {
    let comfort = todayComfort;

    // Vérifier le chauffage si conditions froides
    if (currentScenario?.weatherCondition === 'cold') {
      const heatingOn = appliancesState.heating || appliancesState.heatingLow;
      if (!heatingOn && gameTime < 22) {
        // Le confort baisse si pas de chauffage
        const decayRate = currentScenario.comfortDecayRate || 5;
        comfort = Math.max(0, comfort - decayRate);
      } else if (heatingOn) {
        const heatingImpact = appliancesState.heating
          ? APPLIANCES.heating.comfortImpact
          : APPLIANCES.heatingLow.comfortImpact;
        comfort = Math.min(100, comfort + heatingImpact / 2);
      }
    }

    // Vérifier la climatisation si canicule
    if (currentScenario?.weatherCondition === 'hot') {
      const acOn = appliancesState.airConditioning;
      if (!acOn) {
        comfort = Math.max(0, comfort - 10);
      } else {
        comfort = Math.min(100, comfort + APPLIANCES.airConditioning.comfortImpact / 2);
      }
    }

    return comfort;
  }, [todayComfort, currentScenario, appliancesState, gameTime]);

  // Fonction pour avancer le temps d'une heure
  const advanceTime = useCallback(() => {
    setGameTime(prevTime => {
      const newTime = prevTime + 1;

      // Si on atteint 24h (fin de journée)
      if (newTime >= 24) {
        setIsPlaying(false);
        // endDay sera appelé dans le useEffect
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
      let priceModifier = 1;
      activePenalties.forEach(penalty => {
        if (penalty.type === 'priceIncrease') {
          priceModifier *= (1 + penalty.value / 100);
        }
      });
      const cost = consumptionThisHour * rate * priceModifier;

      setTodayBudget(prev => prev + cost);

      // Séparer heures pleines/creuses
      if (isOffPeak) {
        setOffPeakConsumption(prev => prev + consumptionThisHour);
      } else {
        setPeakConsumption(prev => prev + consumptionThisHour);
      }

      // Calculer le confort
      const newComfort = calculateComfort();
      setTodayComfort(newComfort);

      // Vérifier les événements du scénario
      checkScenarioEvents(newTime);

      return newTime;
    });
  }, [getCurrentPowerConsumption, calculateComfort, checkScenarioEvents, activePenalties]);

  // Système de temps automatique - avance le temps toutes les 10 secondes (= 1 heure dans le jeu)
  useEffect(() => {
    if (!isPlaying) return;

    const baseInterval = 10000; // 10 secondes par heure de jeu (au lieu de 1 seconde)
    const interval = setInterval(() => {
      advanceTime();
    }, baseInterval / gameSpeed); // Vitesse ajustable

    return () => clearInterval(interval);
  }, [isPlaying, gameSpeed, advanceTime]);

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

  // Vérifier les événements du scénario
  const checkScenarioEvents = useCallback((time) => {
    const events = currentScenario?.events || [];
    const event = events.find(e => e.time === time);

    if (event) {
      setCurrentMessage({
        type: event.type,
        text: event.message,
        tip: event.tip,
        highlight: event.highlight
      });
    }
  }, [currentScenario]);

  // Fin de journée
  const endDay = useCallback(() => {
    const objectives = currentScenario?.objectives || {};
    const consumptionLimit = getConsumptionLimit();

    // Calculer les objectifs réussis
    const results = {
      day: currentDay,
      consumption: todayConsumption,
      budget: todayBudget,
      comfort: todayComfort,
      offPeakPercentage: ((offPeakConsumption / (todayConsumption || 1)) * 100).toFixed(0),
      objectives: {
        consumption: consumptionLimit ? todayConsumption <= consumptionLimit : true,
        budget: objectives.budget ? todayBudget <= objectives.budget : true,
        comfort: objectives.comfort ? todayComfort >= objectives.comfort : true,
        offPeakPercentage: objectives.offPeakPercentage
          ? (offPeakConsumption / (todayConsumption || 1)) * 100 >= objectives.offPeakPercentage
          : true
      }
    };

    // Compter les échecs
    const objectivesFailed = Object.values(results.objectives).filter(v => !v).length;
    results.objectivesFailed = objectivesFailed;
    results.objectivesCompleted = Object.values(results.objectives).filter(v => v).length;

    // Ajouter à l'historique
    setDaysHistory(prev => [...prev, results]);

    // Appliquer les pénalités
    if (!currentScenario?.isTutorial) {
      applyPenalties(objectivesFailed);
    }

    return results;
  }, [currentDay, currentScenario, todayConsumption, todayBudget, todayComfort,
      offPeakConsumption, getConsumptionLimit]);

  // Appliquer les pénalités
  const applyPenalties = useCallback((objectivesFailed) => {
    if (objectivesFailed === 0) {
      // Succès complet - annuler toutes les pénalités
      setActivePenalties([]);
      return;
    }

    const penalties = currentScenario?.penalties || {};
    let newPenalties = [];

    if (objectivesFailed === 1 && penalties.oneFailed) {
      newPenalties = penalties.oneFailed;
    } else if (objectivesFailed === 2 && penalties.twoFailed) {
      newPenalties = penalties.twoFailed;
    } else if (objectivesFailed >= 3 && penalties.threeFailed) {
      newPenalties = penalties.threeFailed;
    }

    setActivePenalties(newPenalties);
  }, [currentScenario]);

  // Commencer un nouveau jour
  const startNewDay = useCallback((dayNumber) => {
    setCurrentDay(dayNumber);
    setGameTime(8); // Commence à 8h
    setTodayConsumption(0);
    setTodayBudget(0);
    setPeakConsumption(0);
    setOffPeakConsumption(0);

    // Appliquer le confort de départ (pénalités possibles)
    const startingComfort = getStartingComfort();
    setTodayComfort(startingComfort);

    // Réinitialiser les appareils
    const initialState = {};
    Object.keys(APPLIANCES).forEach(id => {
      initialState[id] = APPLIANCES[id].alwaysOn || false;
    });
    setAppliancesState(initialState);

    setCurrentMessage(null);
    setIsPlaying(true);
  }, []);

  // Obtenir le confort de départ
  const getStartingComfort = useCallback(() => {
    let comfort = 100;
    activePenalties.forEach(penalty => {
      if (penalty.type === 'comfortPenalty') {
        comfort += penalty.value; // value est négatif
      }
    });
    return Math.max(comfort, 40);
  }, [activePenalties]);

  // Pause/Play
  const togglePause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const value = {
    // État
    currentDay,
    gameTime,
    isPlaying,
    gameSpeed,
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

    // Fonctions
    toggleAppliance,
    getCurrentPowerConsumption,
    startNewDay,
    togglePause,
    setGameSpeed,
    advanceTime,
    getConsumptionLimit,
    getPriceModifier,

    // Constantes
    APPLIANCES,
    BELGIUM_AVERAGE,
    ELECTRICITY_RATES
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
