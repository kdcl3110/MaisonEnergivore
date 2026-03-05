// Données des appareils électriques avec consommations réalistes

export const APPLIANCES = {
  // Cuisine
  refrigerator: {
    id: 'refrigerator',
    name: 'Réfrigérateur',
    room: 'kitchen',
    powerW: 150,
    alwaysOn: true,
    canToggle: false,
    description: 'Doit rester allumé 24h/24'
  },
  coffeeMaker: {
    id: 'coffeeMaker',
    name: 'Cafetière',
    room: 'kitchen',
    powerW: 800,
    typicalUsageHours: 0.17, // 10 minutes
    canToggle: true,
    description: 'Consomme 800W pendant 10 minutes'
  },
  dishwasher: {
    id: 'dishwasher',
    name: 'Lave-vaisselle',
    room: 'kitchen',
    powerW: 1200,
    typicalUsageHours: 1.5,
    canToggle: true,
    offPeakRecommended: true,
    description: 'Programme de 1h30, à lancer en heures creuses'
  },
  oven: {
    id: 'oven',
    name: 'Four électrique',
    room: 'kitchen',
    powerW: 2500,
    typicalUsageHours: 1,
    canToggle: true,
    description: 'Consommation très élevée'
  },
  microwave: {
    id: 'microwave',
    name: 'Micro-ondes',
    room: 'kitchen',
    powerW: 1000,
    typicalUsageHours: 0.17, // 10 minutes
    canToggle: true,
    description: 'Alternative économe au four'
  },

  // Salon
  tv: {
    id: 'tv',
    name: 'Télévision',
    room: 'living',
    powerW: 200,
    canToggle: true,
    description: 'TV LED moderne'
  },
  console: {
    id: 'console',
    name: 'Console de jeux',
    room: 'living',
    powerW: 150,
    canToggle: true,
    description: 'PlayStation/Xbox'
  },

  // Bureau
  computer: {
    id: 'computer',
    name: 'Ordinateur',
    room: 'office',
    powerW: 300,
    canToggle: true,
    description: 'PC de bureau'
  },

  // Buanderie
  washingMachine: {
    id: 'washingMachine',
    name: 'Lave-linge',
    room: 'laundry',
    powerW: 2000,
    typicalUsageHours: 2,
    canToggle: true,
    offPeakRecommended: true,
    description: 'Programme 2h, à lancer en heures creuses'
  },
  dryer: {
    id: 'dryer',
    name: 'Sèche-linge',
    room: 'laundry',
    powerW: 2500,
    typicalUsageHours: 1.5,
    canToggle: true,
    offPeakRecommended: true,
    description: 'Très énergivore'
  },

  // Chauffage et climatisation
  heating: {
    id: 'heating',
    name: 'Chauffage',
    room: 'all',
    powerW: 2000,
    canToggle: true,
    comfortImpact: 20,
    description: 'Chauffage électrique - 2000W'
  },
  heatingLow: {
    id: 'heatingLow',
    name: 'Chauffage (Mode Éco)',
    room: 'all',
    powerW: 800,
    canToggle: true,
    comfortImpact: 10,
    description: 'Mode économique - 800W'
  },
  airConditioning: {
    id: 'airConditioning',
    name: 'Climatisation',
    room: 'all',
    powerW: 2000,
    canToggle: true,
    comfortImpact: 15,
    description: 'Très énergivore'
  },

  // Salle de bain
  waterHeater: {
    id: 'waterHeater',
    name: 'Chauffe-eau',
    room: 'bathroom',
    powerW: 3000,
    typicalUsageHours: 1,
    canToggle: true,
    offPeakRecommended: true,
    description: 'Très énergivore, programmer la nuit'
  },

  // Lumières
  lightsKitchen: {
    id: 'lightsKitchen',
    name: 'Lumières Cuisine',
    room: 'kitchen',
    powerW: 30,
    canToggle: true,
    description: 'LED économes'
  },
  lightsLiving: {
    id: 'lightsLiving',
    name: 'Lumières Salon',
    room: 'living',
    powerW: 40,
    canToggle: true,
    description: 'LED économes'
  },
  lightsOffice: {
    id: 'lightsOffice',
    name: 'Lumières Bureau',
    room: 'office',
    powerW: 20,
    canToggle: true,
    description: 'LED économes'
  },
  lightsBedroom: {
    id: 'lightsBedroom',
    name: 'Lumières Chambre',
    room: 'bedroom',
    powerW: 25,
    canToggle: true,
    description: 'LED économes'
  },
  lightsBathroom: {
    id: 'lightsBathroom',
    name: 'Lumières Salle de bain',
    room: 'bathroom',
    powerW: 20,
    canToggle: true,
    description: 'LED économes'
  }
};

export const ROOMS = {
  kitchen: { name: 'Cuisine', icon: '🍽️' },
  living: { name: 'Salon', icon: '🛋️' },
  office: { name: 'Bureau', icon: '💻' },
  bedroom: { name: 'Chambre', icon: '🛏️' },
  bathroom: { name: 'Salle de bain', icon: '🚿' },
  laundry: { name: 'Buanderie', icon: '🧺' },
  all: { name: 'Toute la maison', icon: '🏠' }
};

// Tarifs électricité (Belgique)
export const ELECTRICITY_RATES = {
  peakHours: 0.15,    // €/kWh en heures pleines (6h-22h)
  offPeakHours: 0.09  // €/kWh en heures creuses (22h-6h)
};

// Heures creuses : 22h-6h
export const isOffPeakHour = (hour) => hour >= 22 || hour < 6;

// Production solaire selon l'heure et la météo
export const getSolarProductionW = (hour, weather, peakProductionW = 3000) => {
  if (hour < 8 || hour >= 18) return 0;
  const normalized = (hour - 13) / 5;
  const curve = Math.max(0, 1 - normalized * normalized);
  const weatherMultipliers = { sunny: 1.0, cloudy: 0.5, overcast: 0.3, rainy: 0.2 };
  return Math.round(peakProductionW * (weatherMultipliers[weather] || 0) * curve);
};
