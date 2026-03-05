// Missions obligatoires par jour
// Le joueur DOIT accomplir ces tâches pour obtenir plus d'1 étoile
// Aucune restriction horaire — le joueur est libre de les faire quand il veut

export const MISSIONS = {
  day1: [], // Tutoriel - aucune mission

  day2: [
    {
      id: 'day2_coffee',
      label: 'Préparer le café',
      description: 'Démarre la cafetière — tu as besoin de carburant pour ta journée.',
      appliances: ['coffeeMaker'],
      requiredHours: 1,
      icon: '☕'
    },
    {
      id: 'day2_work',
      label: 'Travailler sur le PC',
      description: 'Tu as des emails et des dossiers à traiter. L\'ordinateur doit tourner au moins 3h.',
      appliances: ['computer'],
      requiredHours: 3,
      icon: '💻'
    }
  ],

  day3: [
    {
      id: 'day3_coffee',
      label: 'Préparer le café',
      description: 'Démarre la cafetière pour commencer la journée.',
      appliances: ['coffeeMaker'],
      requiredHours: 1,
      icon: '☕'
    },
    {
      id: 'day3_cook',
      label: 'Cuisiner un repas chaud',
      description: 'Tu dois manger un vrai repas aujourd\'hui. Utilise le four ou le micro-ondes pendant 1h.',
      appliances: ['oven', 'microwave'],
      requiredHours: 1,
      icon: '🍳'
    },
    {
      id: 'day3_shower',
      label: 'Prendre une douche',
      description: 'Chauffe l\'eau avec le chauffe-eau pour ta douche quotidienne.',
      appliances: ['waterHeater'],
      requiredHours: 1,
      icon: '🚿'
    }
  ],

  day4: [
    {
      id: 'day4_laundry',
      label: 'Lancer le lave-linge',
      description: 'Le linge s\'est accumulé, il faut le laver. Lance un programme complet de 2h.',
      appliances: ['washingMachine'],
      requiredHours: 2,
      icon: '🧺'
    },
    {
      id: 'day4_dishes',
      label: 'Lancer le lave-vaisselle',
      description: 'La vaisselle déborde. Lance un cycle complet de 2h.',
      appliances: ['dishwasher'],
      requiredHours: 2,
      icon: '🍽️'
    },
    {
      id: 'day4_work',
      label: 'Travailler sur le PC',
      description: 'Malgré le grand ménage, tu as du travail : 3h minimum sur l\'ordinateur.',
      appliances: ['computer'],
      requiredHours: 3,
      icon: '💻'
    }
  ],

  day5: [
    {
      id: 'day5_coffee',
      label: 'Préparer le café',
      description: 'Commence la journée avec un bon café.',
      appliances: ['coffeeMaker'],
      requiredHours: 1,
      icon: '☕'
    },
    {
      id: 'day5_tv',
      label: 'Regarder la TV',
      description: 'Tu mérites de te détendre. Allume la télévision pendant au moins 2h.',
      appliances: ['tv'],
      requiredHours: 2,
      icon: '📺'
    },
    {
      id: 'day5_laundry',
      label: 'Lancer le lave-linge',
      description: 'Le linge ne peut plus attendre. Lance la machine pour 2h.',
      appliances: ['washingMachine'],
      requiredHours: 2,
      icon: '🧺'
    },
    {
      id: 'day5_cook',
      label: 'Cuisiner un repas',
      description: 'Prépare quelque chose de bon. Four ou micro-ondes, au choix, pendant 1h.',
      appliances: ['oven', 'microwave'],
      requiredHours: 1,
      icon: '🍳'
    }
  ],

  day6: [
    {
      id: 'day6_work',
      label: 'Longue session de travail',
      description: 'Tu as un projet urgent à finir. L\'ordinateur doit tourner au moins 4h.',
      appliances: ['computer'],
      requiredHours: 4,
      icon: '💻'
    },
    {
      id: 'day6_laundry',
      label: 'Lancer le lave-linge',
      description: 'Lance la machine à laver pour un programme de 2h.',
      appliances: ['washingMachine'],
      requiredHours: 2,
      icon: '🧺'
    },
    {
      id: 'day6_dishes',
      label: 'Lancer le lave-vaisselle',
      description: 'Nettoie toute la vaisselle avec un cycle de 2h.',
      appliances: ['dishwasher'],
      requiredHours: 2,
      icon: '🍽️'
    },
    {
      id: 'day6_shower',
      label: 'Prendre une douche',
      description: 'Allume le chauffe-eau pour ta douche.',
      appliances: ['waterHeater'],
      requiredHours: 1,
      icon: '🚿'
    },
    {
      id: 'day6_tv',
      label: 'Soirée TV',
      description: 'Après cette journée chargée, détends-toi devant la TV pendant 2h.',
      appliances: ['tv'],
      requiredHours: 2,
      icon: '📺'
    }
  ],

  day7: [
    {
      id: 'day7_coffee',
      label: 'Préparer le café',
      description: 'Commence ce dernier défi avec un café bien mérité.',
      appliances: ['coffeeMaker'],
      requiredHours: 1,
      icon: '☕'
    },
    {
      id: 'day7_work',
      label: 'Travailler sur le PC',
      description: 'Dernière journée de travail — reste concentré 3h sur l\'ordinateur.',
      appliances: ['computer'],
      requiredHours: 3,
      icon: '💻'
    },
    {
      id: 'day7_laundry',
      label: 'Lancer le lave-linge',
      description: 'Lance la machine à laver pour 2h.',
      appliances: ['washingMachine'],
      requiredHours: 2,
      icon: '🧺'
    },
    {
      id: 'day7_cook',
      label: 'Cuisiner le dîner',
      description: 'Prépare un bon repas pour terminer la semaine en beauté.',
      appliances: ['oven', 'microwave'],
      requiredHours: 1,
      icon: '🍳'
    },
    {
      id: 'day7_tv',
      label: 'Regarder la TV',
      description: 'Mérite-toi une bonne soirée TV après cette semaine intense.',
      appliances: ['tv'],
      requiredHours: 2,
      icon: '📺'
    }
  ]
};
