import { useState, useEffect, useRef } from 'react';
import { isOffPeakHour, APPLIANCES } from '../data/appliances';

export const useSmartTips = (gameTime, gameState, appliancesState, currentScenario) => {
  const [currentTip, setCurrentTip] = useState(null);
  const shownTipsRef = useRef(new Set()); // Éviter de répéter les mêmes conseils
  const lastCheckTimeRef = useRef(null);

  // Réinitialiser les conseils montrés au début de chaque jour
  useEffect(() => {
    if (gameTime === 8) {
      shownTipsRef.current.clear();
    }
  }, [gameTime]);

  // Vérifier les conseils chaque heure ET quand les appareils changent
  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    // Marquer qu'on a vérifié cette heure
    if (lastCheckTimeRef.current !== gameTime) {
      lastCheckTimeRef.current = gameTime;
    }

    checkForTips();
  }, [gameTime, gameState, appliancesState, currentScenario]);

  const checkForTips = () => {
    const tips = [];

    // CONSEIL 1: Heures creuses commencent (22h)
    if (gameTime === 22 && !shownTipsRef.current.has('offpeak-start')) {
      const offPeakAppliances = [];

      if (!appliancesState.washingMachine) offPeakAppliances.push('lave-linge');
      if (!appliancesState.dishwasher) offPeakAppliances.push('lave-vaisselle');
      if (!appliancesState.waterHeater) offPeakAppliances.push('chauffe-eau');

      if (offPeakAppliances.length > 0) {
        tips.push({
          id: 'offpeak-start',
          type: 'timing',
          message: `Les heures creuses commencent ! C'est le moment idéal pour utiliser : ${offPeakAppliances.join(', ')}`,
          reason: 'Tarif réduit : 0,09€/kWh (au lieu de 0,15€). Économisez 40% !',
          action: 'Voir appareils',
          appliances: ['washingMachine', 'dishwasher', 'waterHeater'],
          priority: 'high'
        });
      }
    }

    // CONSEIL 2: Avant la fin des heures creuses (5h)
    if (gameTime === 5 && !shownTipsRef.current.has('offpeak-ending')) {
      const stillOffPeakAvailable = [];

      if (!appliancesState.washingMachine) stillOffPeakAvailable.push('lave-linge');
      if (!appliancesState.dishwasher) stillOffPeakAvailable.push('lave-vaisselle');

      if (stillOffPeakAvailable.length > 0) {
        tips.push({
          id: 'offpeak-ending',
          type: 'timing',
          message: `Dernière heure d'heures creuses ! Profitez-en pour : ${stillOffPeakAvailable.join(', ')}`,
          reason: 'Les tarifs normaux reprennent à 6h (+60% sur le prix)',
          action: 'Activer maintenant',
          appliances: ['washingMachine', 'dishwasher'],
          priority: 'medium'
        });
      }
    }

    // CONSEIL 3: Temps froid et pas de chauffage (hiver)
    if (
      currentScenario?.weatherCondition === 'cold' &&
      !appliancesState.heating &&
      !appliancesState.heatingLow &&
      (gameTime >= 7 && gameTime <= 22) &&
      !shownTipsRef.current.has('heating-cold')
    ) {
      tips.push({
        id: 'heating-cold',
        type: 'comfort',
        message: 'Il fait très froid ! Le chauffage est éteint.',
        reason: 'Sans chauffage, votre confort baisse de -5% par heure en hiver',
        action: 'Allumer chauffage',
        appliances: ['heatingLow', 'heating'],
        priority: 'high'
      });
    }

    // CONSEIL 4: Temps chaud et pas de climatisation (été)
    if (
      currentScenario?.weatherCondition === 'hot' &&
      !appliancesState.airConditioning &&
      (gameTime >= 12 && gameTime <= 20) &&
      !shownTipsRef.current.has('ac-hot')
    ) {
      tips.push({
        id: 'ac-hot',
        type: 'comfort',
        message: 'Canicule ! La climatisation est éteinte.',
        reason: 'Sans climatisation, votre confort baisse de -4% par heure en été',
        action: 'Allumer clim',
        appliances: ['airConditioning'],
        priority: 'medium'
      });
    }

    // CONSEIL 5: Lumières éteintes la nuit
    if (
      (gameTime >= 19 || gameTime <= 7) &&
      !appliancesState.lightsLiving &&
      !appliancesState.lightsKitchen &&
      !shownTipsRef.current.has('lights-night')
    ) {
      tips.push({
        id: 'lights-night',
        type: 'comfort',
        message: 'Il fait nuit et toutes les lumières sont éteintes.',
        reason: 'Pas de lumières le soir = confort réduit (-1%/h)',
        action: 'Allumer lumières',
        appliances: ['lightsLiving', 'lightsKitchen'],
        priority: 'low'
      });
    }

    // CONSEIL 6: Appareils gourmands en heures pleines
    if (
      !isOffPeakHour(gameTime) &&
      (gameTime >= 8 && gameTime <= 21) &&
      (appliancesState.washingMachine || appliancesState.dishwasher)
    ) {
      const activeExpensive = [];
      if (appliancesState.washingMachine) activeExpensive.push('lave-linge');
      if (appliancesState.dishwasher) activeExpensive.push('lave-vaisselle');

      // Générer un ID unique basé sur les appareils actifs pour permettre plusieurs alertes
      const tipId = `peak-warning-${activeExpensive.join('-')}`;

      if (activeExpensive.length > 0 && !shownTipsRef.current.has(tipId)) {
        tips.push({
          id: tipId,
          type: 'economy',
          message: `Attention ! ${activeExpensive.join(', ')} actif en heures pleines.`,
          reason: 'Vous payez 60% plus cher. Attendez 22h pour économiser',
          action: 'Éteindre',
          appliances: ['washingMachine', 'dishwasher'],
          priority: 'medium'
        });
      }
    }

    // CONSEIL 7: Trop d'appareils allumés en même temps
    const totalPower = Object.entries(appliancesState)
      .filter(([id, isOn]) => isOn)
      .reduce((sum, [id]) => {
        const appliance = APPLIANCES[id];
        return sum + (appliance?.powerW || 0);
      }, 0);

    if (
      totalPower > 3000 &&
      !shownTipsRef.current.has('power-high')
    ) {
      tips.push({
        id: 'power-high',
        type: 'economy',
        message: `Puissance élevée : ${totalPower}W actifs !`,
        reason: 'Trop d\'appareils allumés simultanément = consommation excessive',
        action: 'Voir détails',
        priority: 'medium'
      });
    }

    // Afficher le conseil le plus prioritaire
    if (tips.length > 0) {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      tips.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

      const tip = tips[0];
      shownTipsRef.current.add(tip.id);
      setCurrentTip(tip);
    }
  };

  const dismissTip = () => {
    setCurrentTip(null);
  };

  const acceptTip = (tip) => {
    // Cette fonction sera gérée par le parent pour activer les appareils
    setCurrentTip(null);
    return tip;
  };

  return {
    currentTip,
    dismissTip,
    acceptTip
  };
};
