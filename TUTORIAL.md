# 📖 Système de Tutoriel Interactif

## 🎯 Fonctionnement

Le tutoriel se déclenche **automatiquement** quand le joueur lance le **Jour 1 - Tutoriel** pour la première fois.

### Déclenchement automatique
- ✅ Au lancement du Jour 1
- ✅ Uniquement si le tutoriel n'a pas déjà été complété
- ✅ Le jeu se met en pause pendant le tutoriel
- ✅ Reprend automatiquement après

## 📚 Contenu du Tutoriel

### 10 Étapes interactives

1. **🏠 Bienvenue** - Introduction au jeu
2. **🎯 Les Objectifs** - Explication des 3 métriques principales
3. **⏰ Le Temps** - Système de temps et contrôles
4. **🌙 Heures Creuses** - Économies de 40% la nuit
5. **💡 Les Appareils** - Comment interagir avec les appareils
6. **⚡ Niveaux de Puissance** - LOW/MEDIUM/HIGH
7. **😊 Le Confort** - Comment maintenir le confort
8. **📊 Les Compteurs** - Lecture des métriques
9. **🧠 Stratégie** - Conseils pour réussir
10. **🚀 Prêt !** - Lancement du jeu

## 🎨 Design

### Style Gaming Immersif
- **Overlay sombre** avec opacité 80%
- **Modal centrale** avec bordures néon cyan
- **Animations** : fade-in, slide-up
- **Effets lumineux** : neon-blue glow
- **Glass morphism** pour le fond

### Navigation
- ✅ **Boutons Précédent/Suivant**
- ✅ **Indicateurs de progression** (dots colorés)
- ✅ **Compteur d'étapes** (1/10, 2/10, etc.)
- ✅ **Bouton "Passer le tutoriel"** (en haut à droite)

### Structure visuelle
```
┌─────────────────────────────────────────┐
│ [Icône 4xl]  TITRE ÉTAPE      [Passer] │
│              Étape 3/10                 │
├─────────────────────────────────────────┤
│                                         │
│  Contenu principal de l'étape          │
│  Explications détaillées...            │
│                                         │
│  [Encadré cyan avec détails]           │
│                                         │
├─────────────────────────────────────────┤
│ [← Précédent]  ●●●○○○○○  [Suivant →]  │
└─────────────────────────────────────────┘
```

## 🔧 Composants créés

### 1. TutorialOverlay.jsx
Composant principal du tutoriel avec :
- Gestion des étapes
- Navigation
- Animations
- Overlay sombre

### 2. tutorialSteps.js
Configuration des 10 étapes avec :
- Titre, icône, contenu
- Détails additionnels
- Position (toutes centrées)

### 3. GameContext
Ajout de :
- `showTutorial` : état d'affichage
- `tutorialCompleted` : tutoriel terminé
- `completeTutorial()` : finaliser le tutoriel
- `skipTutorial()` : passer le tutoriel

## 🎮 Expérience Utilisateur

### Scénario 1 : Première visite
```
1. Joueur clique sur "Jour 1 - Tutoriel"
2. Le tutoriel se lance automatiquement
3. Jeu en pause pendant le tutoriel
4. Joueur parcourt les 10 étapes
5. Clique sur "Commencer ! 🚀"
6. Tutoriel marqué comme complété
7. Jeu reprend automatiquement
```

### Scénario 2 : Passer le tutoriel
```
1. Joueur clique sur "Jour 1"
2. Tutoriel se lance
3. Joueur clique sur "Passer le tutoriel"
4. Tutoriel se ferme immédiatement
5. Marqué comme complété
6. Ne se relancera plus
```

### Scénario 3 : Rejeu du Jour 1
```
1. Joueur a déjà fait le Jour 1
2. Retour au menu, relance Jour 1
3. Tutoriel ne se relance PAS
4. Car tutorialCompleted = true
```

## 📊 État du Tutoriel

### Variables dans GameContext
```javascript
const [showTutorial, setShowTutorial] = useState(false);
const [tutorialCompleted, setTutorialCompleted] = useState(false);
```

### Déclenchement
```javascript
// Dans startNewDay()
if (dayNumber === 1 && !tutorialCompleted) {
  setShowTutorial(true);
  setIsPlaying(false); // Pause
}
```

### Finalisation
```javascript
const completeTutorial = () => {
  setShowTutorial(false);
  setTutorialCompleted(true);
  setIsPlaying(true); // Reprendre
};
```

## 🎯 Amélioration futures possibles

- [ ] **Highlights ciblés** : Mettre en surbrillance les zones spécifiques
- [ ] **Tooltips positionnés** : Bulles à côté des éléments
- [ ] **Actions guidées** : "Cliquez sur cet appareil"
- [ ] **Validation étapes** : Attendre une action du joueur
- [ ] **Sons** : Effets sonores pour navigation
- [ ] **Animations** : Transitions plus élaborées
- [ ] **Persistance** : Sauvegarder dans localStorage
- [ ] **Replay** : Bouton pour revoir le tutoriel
- [ ] **Tooltips contextuels** : Aide pendant le jeu
- [ ] **Mini-tutoriels** : Pour chaque nouveau jour

## ✅ Checklist de test

### Test 1 : Premier lancement
- [ ] Lancer l'application
- [ ] Cliquer sur "Jour 1 - Tutoriel"
- [ ] Le tutoriel s'affiche automatiquement
- [ ] Parcourir les 10 étapes
- [ ] Cliquer sur "Commencer ! 🚀"
- [ ] Le jeu démarre normalement

### Test 2 : Navigation
- [ ] Bouton "Précédent" désactivé à l'étape 1
- [ ] Boutons "Suivant" fonctionnels
- [ ] Progression visible (dots)
- [ ] Dernière étape affiche "Commencer ! 🚀"

### Test 3 : Passer le tutoriel
- [ ] Cliquer sur "Passer le tutoriel"
- [ ] Le tutoriel se ferme immédiatement
- [ ] Le jeu démarre
- [ ] Relancer le Jour 1 : pas de tutoriel

### Test 4 : Responsive
- [ ] Tutoriel lisible sur mobile
- [ ] Texte adapté à la taille d'écran
- [ ] Boutons accessibles

## 🚀 Installation

Le tutoriel est **déjà intégré** ! Il suffit de :

1. Rafraîchir la page : http://localhost:3000
2. Cliquer sur "Jour 1 - Tutoriel"
3. Profiter du tour guidé ! 🎮
