# 🏠 Ma Maison Énergivore

Un jeu éducatif sur la gestion de l'énergie domestique en Belgique.

## 🎮 Description

Gérez votre consommation électrique pendant 7 jours et apprenez à réduire votre facture d'électricité ! Basé sur des valeurs réalistes du marché belge (moyenne : 9,6 kWh/jour).

### Fonctionnalités

- ⚡ **7 jours progressifs** : Du tutoriel au test final
- 🏠 **Maison interactive** : 6 pièces avec appareils cliquables
- 📊 **Métriques en temps réel** : Consommation, Budget, Confort
- 🌙 **Heures creuses** : Économisez 40% entre 22h et 6h
- ⚠️ **Système de pénalités** : Conséquences réalistes en cas d'échec
- 🇧🇪 **Comparaisons belges** : Valeurs basées sur la réalité

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

## 🎯 Objectifs du Jeu

### Jour 1 - Tutoriel
Apprenez les bases sans limite de consommation.

### Jour 2 - Premier Défi
Objectifs : < 8 kWh et < €1,20

### Jour 3 - Le Confort d'Abord
Triple défi : économie + confort > 75% (hiver)

### Jour 4 - Les Heures Creuses
50% de consommation en heures creuses

### Jour 5 - L'Événement Imprévu
Événement aléatoire (canicule/visite/panne)

### Jour 6 - Défi Expert
4 objectifs simultanés très difficiles

### Jour 7 - Test Final
Mise en pratique de tous les apprentissages

## 🛠️ Technologies

- **React 18** : Framework UI
- **Vite** : Build tool rapide
- **Tailwind CSS** : Styling
- **Context API** : State management
- **Framer Motion** : Animations (prévu)

## 📚 Structure du Projet

```
src/
├── components/
│   ├── House/           # Composants maison et appareils
│   ├── UI/              # Compteurs et interfaces
│   ├── DaySelector.jsx  # Menu de sélection
│   ├── GameScreen.jsx   # Écran de jeu principal
│   └── DayResults.jsx   # Écran de résultats
├── context/
│   └── GameContext.jsx  # État global du jeu
├── data/
│   ├── appliances.js    # Config des appareils
│   └── scenarios.js     # Config des 7 jours
├── App.jsx              # Composant principal
└── main.jsx             # Point d'entrée
```

## 🎮 Comment Jouer

1. Sélectionnez un jour (commencez par le Jour 1)
2. Cliquez sur les appareils pour les allumer/éteindre
3. Surveillez vos compteurs (énergie, budget, confort)
4. Utilisez les heures creuses (22h-6h) pour économiser 40%
5. Atteignez vos objectifs avant minuit !

## 💡 Conseils

- Les appareils avec 🌙 devraient être utilisés en heures creuses
- Le réfrigérateur (24h) ne peut pas être éteint
- Le chauffage impacte fortement le confort en hiver
- Économisez avec le mode éco du chauffage (800W au lieu de 2000W)

## 📊 Valeurs Réalistes (Belgique)

- Consommation moyenne : 9,6 kWh/jour (3500 kWh/an)
- Tarif heures pleines : 0,15€/kWh
- Tarif heures creuses : 0,09€/kWh (-40%)
- Heures creuses : 22h-6h

## 🏆 Système de Pénalités

En cas d'échec :
- 💸 **Financière** : +20-50% sur tarifs
- 😰 **Confort** : Démarrage réduit le lendemain
- ⚡ **Consommation** : Limite réduite
- 🔧 **Équipement** : Appareils en panne
- 🚫 **Progression** : Jour verrouillé (échec critique)

## 🎓 Objectif Pédagogique

Sensibiliser à la consommation électrique et aux éco-gestes au quotidien, avec des valeurs réalistes du marché belge.

## 📝 Licence

MIT

## 👨‍💻 Développeur

Développé avec React + Vite
