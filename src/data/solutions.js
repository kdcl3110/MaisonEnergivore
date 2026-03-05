// Solutions pour chaque jour du jeu
// Basées sur les mécaniques réelles : 15h de jeu (8h-23h), heures creuses 22h-24h,
// tarif plein 0.15€/kWh, tarif creux 0.09€/kWh, frigo toujours allumé (150W = 2.25 kWh/jour)
export const SOLUTIONS = {
  day1: {
    strategy: "C'est le tutoriel ! Aucun objectif à atteindre. Testez tous les appareils pour comprendre leur consommation et leur effet sur le confort.",
    steps: [
      { time: "8h-10h", action: "Allumez la cafetière (800W) et observez le compteur monter. Éteignez-la après." },
      { time: "10h-18h", action: "Testez l'ordinateur (300W), le four (2500W !) et le micro-ondes (1000W). Comparez leurs consommations." },
      { time: "18h-22h", action: "Allumez la TV, des lumières. Observez que les lumières LED consomment très peu (20-40W)." },
      { time: "22h-24h", action: "C'est les heures creuses ! Lancez le lave-linge (2000W) et le lave-vaisselle (1200W). Regardez le tarif passer de 0.15€ à 0.09€/kWh." }
    ],
    tips: [
      "Le frigo (150W) est toujours allumé et consomme ~2.25 kWh sur la journée",
      "Les heures creuses (22h-6h) coûtent 40% moins cher : 0.09€ vs 0.15€ par kWh",
      "Le four (2500W) et le chauffe-eau (3000W) sont les plus gros consommateurs",
      "Les lumières LED (20-40W) consomment très peu, ne vous privez pas"
    ]
  },

  day2: {
    strategy: "Objectifs accessibles : restez sous 10 kWh et 1.50€. Complétez vos 2 missions (café + ordinateur) puis gérez les extras avec parcimonie.",
    steps: [
      { time: "8h-9h", action: "MISSION : Allumez la cafetière (800W). Laissez-la 1h puis éteignez-la. +0.80 kWh." },
      { time: "9h-12h", action: "MISSION : Allumez l'ordinateur (300W). Il doit rester 3h au total. +0.90 kWh." },
      { time: "12h-18h", action: "Éteignez l'ordinateur après 3h. Allumez 1-2 lumières si besoin. Les lumières coûtent presque rien." },
      { time: "18h-22h", action: "TV (200W) + 1-2 lumières pour la soirée. Évitez le four (2500W), préférez le micro-ondes (1000W) si besoin." },
      { time: "22h-24h", action: "HEURES CREUSES : Si vous voulez lancer le lave-linge ou lave-vaisselle, c'est maintenant ! Tarif réduit." }
    ],
    appliances: {
      essential: ["Cafetière 1h (mission, 0.80 kWh)", "Ordinateur 3h (mission, 0.90 kWh)", "Frigo (auto, 2.25 kWh)"],
      moderate: ["TV le soir (200W)", "Micro-ondes (1000W, mieux que le four)", "1-2 lumières"],
      avoid: ["Four (2500W = 2.5 kWh/h !)", "Chauffe-eau (3000W)", "Sèche-linge (2500W)", "Chauffage (pas froid)"],
      offPeak: ["Lave-linge (2000W)", "Lave-vaisselle (1200W)"]
    },
    tips: [
      "Consommation minimum (missions + frigo) : ~4 kWh. Il vous reste ~6 kWh de marge",
      "IMPORTANT : Complétez les 2 missions sinon maximum 1 étoile !",
      "Budget : tout en heures pleines = 10 × 0.15€ = 1.50€ pile. Utilisez les heures creuses pour plus de marge",
      "Le micro-ondes consomme 2.5× moins que le four pour cuisiner"
    ]
  },

  day3: {
    strategy: "Temps froid = le confort chute de -5%/h sans chauffage ! Utilisez le Chauffage Éco (800W) en continu : il maintient le confort à 100% tout en consommant peu grâce au solaire.",
    steps: [
      { time: "8h", action: "Allumez le Chauffage Éco (800W) immédiatement et ne l'éteignez plus ! Sans chauffage le confort chute de -5.5% par heure." },
      { time: "9h-12h", action: "MISSION : Cafetière 1h pendant les heures solaires (10h-12h). Le solaire couvre presque tout." },
      { time: "12h-17h", action: "Laissez juste le Chauffage Éco + frigo. Le solaire couvre ces 950W → consommation réseau = 0 !" },
      { time: "18h-22h", action: "MISSION : Micro-ondes 1h pour le dîner (pas le four !). Le four à 2500W ferait exploser le budget." },
      { time: "22h-24h", action: "MISSION : Chauffe-eau 1h en heures creuses pour la douche. 3000W mais à 0.09€/kWh = seulement 0.27€." }
    ],
    appliances: {
      essential: ["Chauffage Éco TOUTE LA JOURNÉE (800W, confort +1%/h)", "Frigo (auto)"],
      moderate: ["Cafetière 1h pendant solaire (mission)", "Micro-ondes 1h le soir (mission)", "TV + lumières le soir"],
      avoid: ["Four (2500W, utilisez le micro-ondes !)", "Chauffage normal (2000W, trop gourmand)", "Sèche-linge"],
      offPeak: ["Chauffe-eau 1h (mission douche, 3000W → 0.27€ en HC)"]
    },
    tips: [
      "Chauffage Éco 15h = 12 kWh brut, mais le solaire (nuageux) couvre ~5h gratuitement → ~7 kWh net",
      "Le solaire nuageux (1250W max) couvre le Chauffage Éco + frigo (950W) de 11h à 15h",
      "MICRO-ONDES (1000W) et non le four (2500W) pour la mission cuisine !",
      "Chauffe-eau en heures creuses : 3.0 kWh × 0.09€ = 0.27€ au lieu de 0.45€",
      "Total estimé : ~11.5 kWh et ~1.45€ avec toutes les missions. Sous les limites !"
    ]
  },

  day4: {
    strategy: "Double objectif : 40% heures creuses ET 20% énergie verte. Lancez l'ordinateur et le lave-linge pendant le pic solaire, le lave-vaisselle en heures creuses.",
    steps: [
      { time: "9h", action: "MISSION : Allumez l'ordinateur (300W). Le solaire couvre tout. Laissez-le 3h (jusqu'à 12h)." },
      { time: "11h-13h", action: "MISSION : Allumez le lave-linge (2000W) pendant le pic solaire. Le soleil (2500W+) couvre presque tout → gros boost énergie verte !" },
      { time: "13h", action: "Éteignez le lave-linge. L'ordinateur aussi si 3h atteintes." },
      { time: "18h-22h", action: "TV + 1-2 lumières pour la soirée. Gardez la consommation légère." },
      { time: "22h-24h", action: "MISSION : Lave-vaisselle (1200W) en heures creuses. 2h × 1200W = 2.4 kWh à tarif réduit." }
    ],
    appliances: {
      dayTime: ["Ordinateur 3h pendant solaire (mission, 300W)", "1-2 lumières si besoin"],
      moderate: ["Lave-linge pendant pic solaire 11h-13h (mission)", "TV le soir (200W)"],
      avoid: ["Four", "Chauffe-eau", "Chauffage (pas froid)", "Sèche-linge"],
      offPeak: ["Lave-vaisselle 2h en heures creuses (mission)"]
    },
    tips: [
      "Le lave-linge pendant le pic solaire (11h-13h) : 2000W couvert par 2500W+ de solaire = énergie verte gratuite !",
      "Le lave-vaisselle en heures creuses = 2.4 kWh × 0.09€ = seulement 0.22€",
      "Total estimé : ~3.7 kWh net, ~0.40€. Les limites sont larges si vous suivez ce plan",
      "Énergie verte estimée : ~60% grâce au lave-linge pendant le solaire",
      "IMPORTANT : Complétez les 3 missions sinon maximum 1 étoile !"
    ]
  },

  day5: {
    strategy: "Pas de froid = pas besoin de chauffage. Concentrez-vous sur les 4 missions et profitez du solaire (nuageux) pour réduire la consommation réseau.",
    steps: [
      { time: "8h-9h", action: "MISSION : Cafetière 1h (800W). Le solaire commence à peine, ce sera facturé. +0.80 kWh." },
      { time: "10h-12h", action: "Profitez du solaire. Allumez le lave-linge (2000W) quand le solaire est au max (11h-13h) pour du vert." },
      { time: "12h", action: "Éteignez le lave-linge après 2h (mission complète)." },
      { time: "19h-21h", action: "MISSIONS : TV (200W) + micro-ondes 1h (1000W) pour le dîner. 2 missions d'un coup !" },
      { time: "21h", action: "Éteignez TV après 2h de visionnage." }
    ],
    appliances: {
      essential: ["Cafetière 1h matin (mission)", "Lave-linge 2h pendant solaire (mission)", "TV 2h le soir (mission)", "Micro-ondes 1h (mission cuisine)"],
      moderate: ["1-2 lumières le soir", "Ordinateur si besoin"],
      avoid: ["Four (micro-ondes suffit !)", "Chauffage (pas froid)", "Chauffe-eau", "Sèche-linge"]
    },
    tips: [
      "4 missions obligatoires ! Planifiez-les toutes sinon max 1 étoile",
      "Pas de météo froide = le confort reste naturellement haut (~95%+ avec TV et lumières)",
      "Le lave-linge pendant le pic solaire réduit l'impact sur votre compteur",
      "Un événement aléatoire peut survenir : gardez de la marge sur vos objectifs",
      "Total estimé sans surprise : ~5 kWh, ~0.65€. Largement sous les limites"
    ]
  },

  day6: {
    strategy: "Le plus dur ! 5 objectifs + 5 missions. Clé : ordinateur et chauffe-eau pendant le pic solaire (3000W gratuit), lave-linge et lave-vaisselle en heures creuses.",
    steps: [
      { time: "9h-13h", action: "MISSION : Ordinateur 4h (300W). Le solaire couvre tout. Consommation réseau = 0 pour ces heures." },
      { time: "13h-14h", action: "MISSION : Chauffe-eau 1h (3000W) au pic solaire. 3000W solaire couvre presque tout → seulement ~0.15 kWh net !" },
      { time: "14h", action: "Éteignez le chauffe-eau. Laissez juste le frigo, le solaire le couvre." },
      { time: "19h-21h", action: "MISSION : TV 2h (200W) + 2 lumières. Confort assuré." },
      { time: "22h-24h", action: "MISSIONS : Lave-linge (2000W) + Lave-vaisselle (1200W) ensemble en heures creuses. 6.7 kWh mais à 0.09€ !" }
    ],
    appliances: {
      critical: ["Ordinateur 4h pendant solaire (mission)", "Chauffe-eau 1h au pic solaire 13h (mission)"],
      moderate: ["TV 2h le soir (mission)", "2 lumières le soir"],
      offPeakMassive: ["Lave-linge 2h en HC (mission, 4.0 kWh)", "Lave-vaisselle 2h en HC (mission, 2.4 kWh)"],
      avoid: ["Four", "Chauffage", "Sèche-linge", "Appareils inutiles en journée"]
    },
    tips: [
      "5 missions obligatoires ! Manquer une seule = maximum 1 étoile",
      "Chauffe-eau à 13h : le solaire (3000W) absorbe quasi tout. Net = ~0.15 kWh au lieu de 3.0 kWh !",
      "Lave-linge + lave-vaisselle ensemble en HC : 6.7 kWh × 0.09€ = 0.60€",
      "Total estimé : ~8 kWh, ~0.80€, 83% heures creuses, 40% vert. Tous objectifs validés !",
      "Le confort reste naturellement à ~97% avec TV et lumières le soir"
    ]
  },

  day7: {
    strategy: "Test final ! 5 missions avec objectifs serrés. Lavez le linge en heures creuses pour les 40% HC. Profitez du solaire au max pour les 25% vert.",
    steps: [
      { time: "8h-9h", action: "MISSION : Cafetière 1h (800W). Le solaire (1080W) la couvre quasi entièrement. Éteignez après." },
      { time: "9h-12h", action: "MISSION : Ordinateur 3h (300W). Solaire couvre tout → 0 kWh net." },
      { time: "12h-13h", action: "Profitez du pic solaire. Si besoin, lancez un appareil gourmand maintenant." },
      { time: "19h-21h", action: "MISSIONS : TV 2h (200W) + micro-ondes 1h pour le dîner (pas le four !)." },
      { time: "22h-24h", action: "MISSION : Lave-linge 2h (2000W) en heures creuses. 4.0 kWh au tarif réduit = 0.36€." }
    ],
    appliances: {
      essential: ["Cafetière 1h matin (mission)", "Ordinateur 3h pendant solaire (mission)", "Lave-linge 2h en HC (mission)"],
      moderate: ["TV 2h le soir (mission)", "Micro-ondes 1h (mission cuisine)", "1-2 lumières"],
      avoid: ["Four (utilisez le micro-ondes !)", "Chauffe-eau (pas de mission)", "Chauffage (pas froid)", "Sèche-linge"],
      never: ["Appareils inutiles allumés", "Plusieurs gros appareils en heures pleines"]
    },
    tips: [
      "5 missions : café, ordinateur, lave-linge, cuisine (micro-ondes !), TV. Toutes obligatoires",
      "Lave-linge en HC = 4 kWh × 0.09€ = 0.36€. En heures pleines ce serait 0.60€",
      "Micro-ondes pour cuisiner, PAS le four ! 1000W vs 2500W",
      "Total estimé : ~6.5 kWh, ~0.72€, 66% HC, 30% vert. Objectifs validés !",
      "Gardez un peu de marge car un mini-événement peut survenir à 18h"
    ]
  }
};
