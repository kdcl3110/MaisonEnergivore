// Solutions pour chaque jour du jeu
export const SOLUTIONS = {
  day1: {
    strategy: "C'est le tutoriel ! Testez tous les appareils pour comprendre leur fonctionnement.",
    steps: [
      { time: "8h-12h", action: "Allumez la cafetière le matin, puis le frigo et les lumières" },
      { time: "12h-18h", action: "Testez le four, la télévision et l'ordinateur" },
      { time: "18h-22h", action: "Utilisez le chauffage si besoin, allumez plus de lumières" },
      { time: "22h-24h", action: "Lancez le lave-linge et lave-vaisselle en heures creuses pour voir la différence de prix" }
    ],
    tips: [
      "Les heures creuses (22h-6h) coûtent 40% moins cher",
      "Le chauffage consomme beaucoup mais augmente le confort",
      "Les appareils toujours allumés (frigo, box internet) consomment en continu"
    ]
  },

  day2: {
    strategy: "Limitez l'utilisation des gros consommateurs et profitez des heures creuses",
    steps: [
      { time: "8h-10h", action: "Cafetière uniquement, éteignez-la après usage" },
      { time: "10h-18h", action: "Ordinateur + 1-2 lumières maximum. Pas de chauffage, pas de four" },
      { time: "18h-22h", action: "TV + lumières nécessaires. Cuisinez rapidement au four" },
      { time: "22h-24h", action: "HEURES CREUSES : Lancez lave-linge ET lave-vaisselle maintenant" }
    ],
    appliances: {
      essential: ["Frigo (toujours)", "Internet Box (toujours)", "Cafetière (matin)", "1-2 Lumières"],
      moderate: ["Ordinateur (journée)", "TV (soir)", "Four (30 min max)"],
      avoid: ["Chauffage", "Chauffe-eau", "Multiples lumières simultanées"],
      offPeak: ["Lave-linge", "Lave-vaisselle"]
    },
    tips: [
      "Total visé : ~7.5 kWh pour rester sous 8 kWh",
      "Éteignez les appareils dès que vous ne les utilisez plus",
      "Les heures creuses vous font économiser 40% sur le prix"
    ]
  },

  day3: {
    strategy: "Gérez intelligemment le chauffage pour maintenir 75% de confort sans dépasser 9 kWh",
    steps: [
      { time: "8h-12h", action: "Chauffage chambre + salon ON. Le confort baisse vite sans chauffage (-5%/h)" },
      { time: "12h-16h", action: "Gardez au moins 1 chauffage allumé en permanence" },
      { time: "16h-22h", action: "Rallumez les 2 chauffages pour compenser la baisse. TV + lumières OK" },
      { time: "22h-24h", action: "Lave-linge/vaisselle en heures creuses. Chauffage selon besoin" }
    ],
    appliances: {
      essential: ["Frigo", "Internet Box", "Chauffage Chambre OU Salon (minimum 1 toujours)"],
      moderate: ["2e Chauffage (selon confort)", "TV", "Ordinateur", "Lumières"],
      avoid: ["Four longue durée", "Chauffe-eau"],
      offPeak: ["Lave-linge", "Lave-vaisselle"]
    },
    tips: [
      "Le confort baisse de 5% par heure sans aucun chauffage",
      "1 chauffage = +10%/h de confort, 2 chauffages = +20%/h",
      "Surveillez votre jauge de confort en temps réel",
      "Visez 75-85% de confort pour avoir de la marge"
    ]
  },

  day4: {
    strategy: "Reportez un maximum de consommation en heures creuses (22h-6h) pour atteindre 50%",
    steps: [
      { time: "8h-12h", action: "MINIMUM : Cafetière rapide, 1 lumière. Économisez pour le soir" },
      { time: "12h-18h", action: "Ordinateur + 1 lumière uniquement. Pas de four, pas de gros appareils" },
      { time: "18h-22h", action: "TV + lumières. Préparez lave-linge et lave-vaisselle SANS les lancer" },
      { time: "22h-24h", action: "🔥 HEURES CREUSES : Lave-linge + Lave-vaisselle + Chauffe-eau + Chauffage si besoin" }
    ],
    appliances: {
      dayTime: ["Frigo (auto)", "Internet (auto)", "Cafetière (rapide)", "Ordinateur (modéré)", "1-2 Lumières"],
      evening: ["TV", "Lumières nécessaires", "Four (si vraiment besoin)"],
      offPeakOnly: ["Lave-linge", "Lave-vaisselle", "Chauffe-eau"],
      offPeakBonus: ["Chauffages (si besoin)", "Plus de lumières", "Ordinateur"]
    },
    tips: [
      "Objectif : 5 kWh en heures creuses sur 10 kWh total",
      "Heures creuses = 22h-6h (2h dans cette journée de jeu)",
      "Le lave-linge (2 kWh) + lave-vaisselle (1.5 kWh) = déjà 3.5 kWh",
      "Budget : 1.10€ = profitez du tarif réduit (0.09€/kWh vs 0.15€/kWh)"
    ]
  },

  day5: {
    strategy: "Adaptez-vous aux événements aléatoires tout en respectant les 4 objectifs",
    steps: [
      { time: "8h-12h", action: "Démarrage normal : Cafetière, lumières, appareils essentiels" },
      { time: "12h-18h", action: "Surveillez les événements et adaptez votre stratégie" },
      { time: "18h-22h", action: "Gérez chauffage + TV selon votre avancement" },
      { time: "22h-24h", action: "Heures creuses : Gros appareils pour atteindre 40% off-peak" }
    ],
    tips: [
      "Combinez les stratégies des jours 2, 3 et 4",
      "Restez flexible face aux événements imprévus",
      "Visez 3.6 kWh en heures creuses (40% de 9 kWh)",
      "Maintenez confort ≥ 70% avec chauffage modéré"
    ]
  },

  day6: {
    strategy: "TRÈS DIFFICILE : 4 objectifs simultanés. Maîtrise parfaite requise.",
    steps: [
      { time: "8h-12h", action: "STRICT MINIMUM : Cafetière 10 min + 1 lumière. Chauffage chambre uniquement" },
      { time: "12h-18h", action: "1 chauffage permanent pour confort. Ordinateur max 2h. Zéro superflu" },
      { time: "18h-22h", action: "Maintenez chauffage. TV 1h max. Pas de four. Surveillez consommation" },
      { time: "22h-24h", action: "MASSIF HC : Lave-linge + Lave-vaisselle + Chauffe-eau + 2 chauffages = 4.2 kWh HC" }
    ],
    appliances: {
      critical: ["1 Chauffage toute la journée (confort 80%)", "Frigo/Internet (auto)"],
      minimal: ["Cafetière 10 min", "Ordinateur max 2h", "TV max 1h", "1-2 Lumières"],
      offPeakMassive: ["Lave-linge (2 kWh)", "Lave-vaisselle (1.5 kWh)", "Chauffe-eau (0.7 kWh)"],
      forbidden: ["Four", "Multiples appareils jour", "Gaspillage"]
    },
    tips: [
      "Total 7 kWh = 2.8 kWh jour + 4.2 kWh nuit (60%)",
      "Confort 80% = 1 chauffage minimum permanent",
      "Budget 1€ = Profitez HC (4.2×0.09 = 0.38€) + jour (2.8×0.15 = 0.42€) = 0.80€",
      "Chaque kWh compte. Éteignez TOUT ce qui n'est pas essentiel"
    ]
  },

  day7: {
    strategy: "TEST FINAL : Équilibre parfait entre tous les paramètres. Aucun gaspillage toléré.",
    steps: [
      { time: "8h-12h", action: "Cafetière rapide + 1 chauffage + 1 lumière. Rien d'autre" },
      { time: "12h-18h", action: "Gardez 1 chauffage. Ordinateur OU TV (pas les deux). 1-2 lumières" },
      { time: "18h-22h", action: "Chauffage + TV ou Ordinateur. Pas de four sauf cuisson rapide" },
      { time: "22h-24h", action: "HC : Lave-linge + Lave-vaisselle = exactement 4 kWh (50%)" }
    ],
    appliances: {
      always: ["Frigo", "Internet Box"],
      day: ["1 Chauffage (confort)", "Cafetière (10 min)", "Ordinateur OU TV", "1-2 Lumières"],
      offPeak: ["Lave-linge (2 kWh)", "Lave-vaisselle (1.5 kWh)", "+ ajustement si besoin"],
      never: ["Appareils inutiles allumés", "Gaspillage", "Multiples gros appareils simultanés"]
    },
    tips: [
      "8 kWh = 4 kWh jour + 4 kWh nuit (50/50)",
      "Confort 75% = 1 chauffage suffit si géré correctement",
      "Zero Waste = Éteignez immédiatement après usage",
      "C'est l'examen final : appliquez tout ce que vous avez appris !",
      "Budget OK si vous respectez le 50/50 jour/nuit"
    ]
  }
};
