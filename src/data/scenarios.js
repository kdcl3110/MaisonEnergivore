// Configuration des 7 jours de jeu

export const SCENARIOS = {
  day1: {
    id: 1,
    name: "Jour 1 - Tutoriel",
    title: "Bienvenue chez vous",
    description: "Apprenez les bases du jeu sans stress. Aucune limite de consommation aujourd'hui !",
    isTutorial: true,
    objectives: {
      consumption: null, // Pas de limite
      budget: null,
      comfort: null,
      offPeakPercentage: null,
      greenEnergyPercentage: null
    },
    solar: { enabled: false },
    events: [
      {
        time: 8,
        type: 'tutorial',
        message: "C'est le matin ! Temps d'allumer quelques appareils.",
        highlight: ['coffeeMaker'],
        tip: "Cliquez sur la cafetière dans la cuisine"
      },
      {
        time: 14,
        type: 'tutorial',
        message: "Regardez votre compteur en haut à droite !",
        tip: "Vous avez consommé quelques kWh. Chaque kWh coûte environ 0,15€"
      },
      {
        time: 20,
        type: 'tutorial',
        message: "C'est l'heure du pic de consommation !",
        tip: "Le soir, beaucoup d'appareils sont allumés en même temps = forte consommation"
      },
      {
        time: 22,
        type: 'tutorial',
        message: "Les heures creuses commencent ! ⚡",
        tip: "Entre 22h et 6h, l'électricité coûte 40% moins cher ! C'est le moment d'allumer lave-linge et lave-vaisselle",
        highlight: ['washingMachine', 'dishwasher']
      }
    ],
    endMessage: {
      title: "Bravo ! Jour 1 terminé",
      tip: "Un ménage belge consomme en moyenne 9,6 kWh/jour. Votre objectif : faire mieux que cette moyenne !"
    }
  },

  day2: {
    id: 2,
    name: "Jour 2 - Premier Défi",
    title: "Le Premier Défi",
    description: "Maintenant que vous savez gérer les appareils, essayons de limiter la consommation ! Vous avez aussi des missions à accomplir.",
    objectives: {
      consumption: 10,  // kWh (augmenté pour les missions)
      budget: 1.50,     // € (augmenté)
      comfort: null,
      offPeakPercentage: null,
      greenEnergyPercentage: null
    },
    solar: { enabled: false },
    events: [
      {
        time: 8,
        type: 'info',
        message: "Vous commencez la journée avec 0 kWh",
        tip: "Objectifs : < 10 kWh et < 1,50€. N'oubliez pas vos missions !"
      },
      {
        time: 12,
        type: 'checkpoint',
        message: "Point à mi-journée !",
        checkProgress: true
      },
      {
        time: 19,
        type: 'warning',
        message: "Attention, il reste quelques heures !",
        checkProgress: true,
        tip: "Faites attention à ne pas dépasser vos objectifs"
      },
      {
        time: 22,
        type: 'info',
        message: "Heures creuses ! Lancez les gros appareils maintenant",
        tip: "Économisez 40% en utilisant les heures creuses"
      }
    ],
    penalties: {
      oneFailed: [
        {
          type: 'priceIncrease',
          value: 20,
          description: 'Facture de rattrapage : tarifs +20%',
          duration: 1
        }
      ],
      twoFailed: [
        {
          type: 'priceIncrease',
          value: 20,
          description: 'Facture de rattrapage : tarifs +20%',
          duration: 1
        },
        {
          type: 'consumptionLimit',
          value: -1,
          description: 'Restriction réseau : limite -1 kWh',
          duration: 1
        },
        {
          type: 'equipmentFailure',
          appliance: 'dishwasher',
          description: 'Surcharge : Lave-vaisselle en panne',
          duration: 1
        }
      ]
    }
  },

  day3: {
    id: 3,
    name: "Jour 3 - Le Confort d'Abord",
    title: "Le Confort d'Abord",
    description: "Triple défi ! Il faut économiser MAIS aussi rester confortable. C'est l'hiver, il fait froid... Les panneaux solaires sont installés !",
    objectives: {
      consumption: 12,  // kWh (augmenté pour missions + solaire)
      budget: 1.80,     // €
      comfort: 70,      // %
      offPeakPercentage: null,
      greenEnergyPercentage: null
    },
    solar: { enabled: true, weather: 'cloudy', peakProductionW: 2500 },
    weatherCondition: 'cold',
    comfortDecayRate: 5, // % par heure sans chauffage
    events: [
      {
        time: 7,
        type: 'weather',
        message: "Il fait très froid ce matin : 2°C extérieur 🥶",
        tip: "Sans chauffage, le confort baisse de -5% par heure"
      },
      {
        time: 9,
        type: 'info',
        message: "Vos panneaux solaires commencent à produire !",
        tip: "Le solaire réduit votre consommation réseau et votre facture"
      },
      {
        time: 12,
        type: 'checkpoint',
        message: "Point à mi-journée",
        checkProgress: true,
        checkComfort: true
      },
      {
        time: 18,
        type: 'weather',
        message: "La température extérieure chute encore : -1°C",
        tip: "Chauffer seulement les pièces utilisées peut économiser 30%"
      }
    ],
    penalties: {
      oneFailed: [
        {
          type: 'comfortPenalty',
          value: -40,
          description: 'Fatigue accumulée : confort démarre à 60%',
          duration: 1
        }
      ],
      twoFailed: [
        {
          type: 'priceIncrease',
          value: 30,
          description: 'Facture importante : tarifs +30%',
          duration: 1
        },
        {
          type: 'comfortPenalty',
          value: -50,
          description: 'Épuisement : confort démarre à 50%',
          duration: 1
        }
      ],
      threeFailed: [
        {
          type: 'priceIncrease',
          value: 30,
          description: 'Facture importante : tarifs +30%',
          duration: 1
        },
        {
          type: 'comfortPenalty',
          value: -50,
          description: 'Épuisement : confort démarre à 50%',
          duration: 1
        },
        {
          type: 'powerLimit',
          value: 1000,
          description: 'Chauffage limité à 1000W',
          duration: 1
        },
        {
          type: 'progressLocked',
          description: 'Recommencez ce jour pour débloquer le Jour 4'
        }
      ]
    }
  },

  day4: {
    id: 4,
    name: "Jour 4 - Les Heures Creuses",
    title: "Les Heures Creuses",
    description: "Mission spéciale : optimiser les heures creuses ET profiter du solaire pour économiser !",
    objectives: {
      consumption: 10, // kWh
      budget: 1.30,    // €
      comfort: null,
      offPeakPercentage: 40, // %
      greenEnergyPercentage: 20 // %
    },
    solar: { enabled: true, weather: 'sunny', peakProductionW: 3000 },
    events: [
      {
        time: 8,
        type: 'info',
        message: "Grand soleil aujourd'hui ! Vos panneaux solaires vont produire au maximum",
        tip: "Lancez les gros appareils pendant les pics solaires (11h-15h)"
      },
      {
        time: 14,
        type: 'info',
        message: "Pensez à ce que vous pouvez reporter au soir...",
        tip: "Lave-linge, lave-vaisselle et chauffe-eau peuvent attendre les heures creuses"
      },
      {
        time: 20,
        type: 'reminder',
        message: "Plus que 2h avant les heures creuses !",
        tip: "Préparez vos appareils..."
      },
      {
        time: 22,
        type: 'celebration',
        message: "C'EST L'HEURE ! ⚡",
        tip: "Tarif réduit : 0,09€/kWh (au lieu de 0,15€). Lancez tous les appareils économisés !",
        highlight: ['washingMachine', 'dishwasher', 'waterHeater']
      }
    ],
    penalties: {
      oneFailed: [
        {
          type: 'priceIncrease',
          value: 10,
          description: 'Ajustement tarifaire : heures pleines +10%',
          duration: 1
        }
      ],
      twoFailed: [
        {
          type: 'priceIncrease',
          value: 40,
          description: 'Facture élevée : tous coûts +40%',
          duration: 1
        },
        {
          type: 'powerLimit',
          value: 1500,
          description: 'Alerte réseau : limite 1500W simultanés',
          duration: 1
        },
        {
          type: 'restriction',
          appliances: ['washingMachine', 'dishwasher'],
          description: 'Lave-linge ET lave-vaisselle utilisables uniquement en heures creuses',
          duration: 1
        }
      ]
    }
  },

  day5: {
    id: 5,
    name: "Jour 5 - L'Événement Imprévu",
    title: "L'Événement Imprévu",
    description: "La vie réserve des surprises ! Comment allez-vous gérer un imprévu ? Le solaire aide, mais le temps est couvert...",
    randomEvent: true,
    objectives: {
      consumption: 12, // kWh
      budget: 1.60,    // €
      comfort: 70,     // %
      offPeakPercentage: null,
      greenEnergyPercentage: 15 // %
    },
    solar: { enabled: true, weather: 'cloudy', peakProductionW: 3000 },
    events: [
      {
        time: 8,
        type: 'info',
        message: "Un événement spécial va se produire aujourd'hui...",
        tip: "Soyez prêt à vous adapter !"
      }
    ]
  },

  day6: {
    id: 6,
    name: "Jour 6 - Le Défi Final",
    title: "Le Défi Final - Préparation",
    description: "Demain, c'est le jour J ! Aujourd'hui, préparez-vous en optimisant au maximum. Grand soleil pour le solaire !",
    objectives: {
      consumption: 10,  // kWh (ajusté pour missions)
      budget: 1.30,     // €
      comfort: 75,      // %
      offPeakPercentage: 50, // %
      greenEnergyPercentage: 30 // %
    },
    solar: { enabled: true, weather: 'sunny', peakProductionW: 3000 },
    events: [
      {
        time: 8,
        type: 'challenge',
        message: "ENTRAÎNEMENT LIBRE - MODE EXPERT",
        tip: "Battez votre meilleur score tout en respectant tous les objectifs !"
      }
    ],
    bonus: {
      fourObjectives: {
        description: 'Bonus Jour 7',
        effects: ['allLimits+20%', 'comfortStart100%', 'noPenalties']
      }
    },
    penalties: {
      twoOrLessFailed: [
        {
          type: 'progressLocked',
          description: 'Vous devez réussir le Jour 6 avec au moins 3/4 objectifs pour accéder au test final'
        }
      ]
    }
  },

  day7: {
    id: 7,
    name: "Jour 7 - LE GRAND TEST FINAL",
    title: "LE GRAND TEST FINAL",
    description: "C'est le moment de vérité ! Prouvez que vous avez tout compris en gérant une journée parfaite avec le solaire.",
    objectives: {
      consumption: 10,  // kWh (ajusté pour missions)
      budget: 1.40,     // €
      comfort: 70,      // %
      offPeakPercentage: 40, // %
      greenEnergyPercentage: 25, // %
      zeroWaste: true  // Aucun appareil inutile ON
    },
    solar: { enabled: true, weather: 'sunny', peakProductionW: 3000 },
    events: [
      {
        time: 7,
        type: 'final',
        message: "LE GRAND TEST COMMENCE !",
        tip: "Tous vos apprentissages de la semaine vont servir !"
      },
      {
        time: 18,
        type: 'surprise',
        message: "Un mini-événement pour tester votre adaptation !",
        randomMiniEvent: true
      }
    ],
    isFinalDay: true
  }
};

// Moyenne belge pour comparaison
export const BELGIUM_AVERAGE = {
  dailyConsumption: 9.6, // kWh/jour
  yearlyConsumption: 3500, // kWh/an
  dailyCost: 1.44 // €/jour (moyenne)
};
