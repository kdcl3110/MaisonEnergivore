# Changelog - Ma Maison Énergivore

## Version 1.1.0 - Amélioration du système de temps

### 🎮 Changements majeurs

#### ⏰ Ralentissement du temps
- **Avant** : 1 seconde réelle = 1 heure de jeu → Journée de 16 secondes ⚡
- **Maintenant** : 10 secondes réelles = 1 heure de jeu → Journée de ~2min40 🐌
- Vitesse x2 disponible : 5 secondes = 1 heure → Journée de ~1min20

#### 🎛️ Contrôle manuel du temps
- Nouveau bouton **"⏭️ Avancer +1h"** dans le TimeClock
- Permet d'avancer heure par heure pour tester précisément
- Désactivé à 24h (fin de journée)

#### 🔄 Modes de jeu
1. **Mode Auto** (▶️ Play) : Le temps avance automatiquement toutes les 10 secondes
2. **Mode Manuel** (⏸️ Pause) : Cliquez sur "Avancer +1h" quand vous êtes prêt

### 📊 Durées approximatives

| Vitesse | Temps par heure | Journée complète (16h) |
|---------|----------------|------------------------|
| 1x (Auto) | 10 secondes | ~2 min 40 sec |
| 2x (Auto) | 5 secondes | ~1 min 20 sec |
| Manuel | À votre rythme | ∞ |

### 💡 Conseils d'utilisation

**Pour tester et débugger :**
- Mettez en pause (⏸️)
- Allumez/éteignez vos appareils
- Avancez manuellement heure par heure
- Observez l'impact sur les compteurs

**Pour jouer normalement :**
- Lancez en mode Auto (▶️)
- Vitesse 1x pour une expérience détendue
- Vitesse 2x pour un challenge plus rapide

### 🛠️ Fichiers modifiés

- `src/context/GameContext.jsx` : Système de temps refactorisé
- `src/components/UI/TimeClock.jsx` : Ajout du bouton d'avancement manuel

### 🐛 Corrections

- Correction des dépendances du callback `advanceTime`
- Amélioration de la stabilité du système de temps
