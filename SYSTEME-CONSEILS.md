# 💡 Système de Conseils Intelligents en Temps Réel

## 🎯 Vue d'Ensemble

Le système de conseils intelligents analyse en temps réel le gameplay et propose des recommandations contextuelles au joueur pour optimiser :
- ⚡ **Consommation d'énergie**
- 💰 **Coût de l'électricité** (heures creuses vs pleines)
- 🏠 **Confort du foyer**

## 📦 Nouveaux Composants

### 1. `TipNotification.jsx`
Composant de notification pour afficher les conseils.

**Caractéristiques** :
- Design moderne avec gradient bleu/violet
- Effet néon cyan
- Deux actions : "Plus tard" ou "Activer ✓"
- Animation de fermeture fluide
- Responsive (mobile → desktop)

### 2. `useSmartTips.js` (Hook React)
Hook personnalisé qui gère la logique des conseils intelligents.

**Fonctionnalités** :
- Détection automatique des opportunités d'optimisation
- Évite de répéter les mêmes conseils
- Priorisation des conseils (high > medium > low)
- Détection horaire (chaque changement d'heure)

## 🤖 Types de Conseils

### 1. **Heures Creuses (Priority: HIGH)**
**Déclenchement** : À 22h si appareils gourmands éteints

```javascript
{
  message: "Les heures creuses commencent ! C'est le moment idéal pour utiliser : lave-linge, lave-vaisselle..."
  reason: "Tarif réduit : 0,09€/kWh (au lieu de 0,15€). Économisez 40% !"
  appliances: ['washingMachine', 'dishwasher', 'waterHeater']
}
```

### 2. **Fin des Heures Creuses (Priority: MEDIUM)**
**Déclenchement** : À 5h si encore des appareils pas utilisés

```javascript
{
  message: "Dernière heure d'heures creuses ! Profitez-en pour : lave-linge..."
  reason: "Les tarifs normaux reprennent à 6h (+60% sur le prix)"
}
```

### 3. **Chauffage en Hiver (Priority: HIGH)**
**Déclenchement** : Météo froide + chauffage éteint + entre 7h-22h

```javascript
{
  message: "Il fait très froid ! Le chauffage est éteint."
  reason: "Sans chauffage, votre confort baisse de -5% par heure en hiver"
  appliances: ['heatingLow', 'heating']
}
```

### 4. **Climatisation en Été (Priority: MEDIUM)**
**Déclenchement** : Canicule + clim éteinte + entre 12h-20h

```javascript
{
  message: "Canicule ! La climatisation est éteinte."
  reason: "Sans climatisation, votre confort baisse de -4% par heure en été"
  appliances: ['airConditioning']
}
```

### 5. **Lumières la Nuit (Priority: LOW)**
**Déclenchement** : Entre 19h-7h + toutes lumières éteintes

```javascript
{
  message: "Il fait nuit et toutes les lumières sont éteintes."
  reason: "Pas de lumières le soir = confort réduit (-1%/h)"
  appliances: ['lightsLiving', 'lightsKitchen']
}
```

### 6. **Appareils Gourmands en Heures Pleines (Priority: MEDIUM)**
**Déclenchement** : Lave-linge/lave-vaisselle allumés entre 6h-22h

```javascript
{
  message: "Attention ! lave-linge actif en heures pleines."
  reason: "Vous payez 60% plus cher. Attendez 22h pour économiser"
  action: "Éteindre"
}
```

### 7. **Puissance Élevée (Priority: MEDIUM)**
**Déclenchement** : Consommation instantanée > 3000W

```javascript
{
  message: "Puissance élevée : 3500W actifs !"
  reason: "Trop d'appareils allumés simultanément = consommation excessive"
}
```

## 🎮 Intégration dans le Jeu

### Position
```
┌─────────────────────────────────┐
│  HUD (Navbar fixe)              │
├─────────────────────────────────┤
│  💡 [Conseil Intelligent]       │ ← Notification de conseil
├─────────────────────────────────┤
│  Zone de jeu (Maison)           │
└─────────────────────────────────┘
```

### Comportement
1. **Détection automatique** à chaque heure de jeu
2. **Affichage unique** : un conseil à la fois
3. **Pas de répétition** : chaque conseil s'affiche une seule fois par jour
4. **Pas pendant le tutoriel** : les conseils sont désactivés pendant le tutorial
5. **Actions au choix** :
   - "Plus tard" : ferme la notification
   - "Activer ✓" : allume automatiquement le premier appareil suggéré

## 📊 Système de Priorité

```javascript
const priorityOrder = {
  high: 3,    // Conseils critiques (confort, économies importantes)
  medium: 2,  // Conseils importants (optimisations)
  low: 1      // Conseils mineurs (confort faible impact)
};
```

Quand plusieurs conseils sont disponibles, seul celui avec la **priorité la plus élevée** s'affiche.

## 🔧 Utilisation Technique

### Dans `GameScreen.jsx`
```javascript
const { currentTip, dismissTip, acceptTip } = useSmartTips(
  gameTime,
  gameState,
  appliancesState,
  currentScenario
);

const handleAcceptTip = (tip) => {
  const acceptedTip = acceptTip(tip);

  // Activer automatiquement le premier appareil
  if (acceptedTip?.appliances && acceptedTip.appliances.length > 0) {
    toggleAppliance(acceptedTip.appliances[0]);
  }
};
```

### Affichage
```javascript
{currentTip && !displayTutorial && (
  <TipNotification
    tip={currentTip}
    onAccept={() => handleAcceptTip(currentTip)}
    onDismiss={dismissTip}
  />
)}
```

## 🎨 Design

### Couleurs
- **Background** : Gradient bleu-violet (`from-blue-900 to-purple-900`)
- **Border** : Cyan néon (`border-cyan-400`)
- **Effet** : Shadow néon bleu
- **Icône** : 💡 Ampoule

### Responsive
- **Mobile** : Width 90%, textes 10-12px
- **Desktop** : Max-width 28rem, textes 12-14px

### Animation
- **Apparition** : Fade in + slide down
- **Fermeture** : Fade out + slide up (300ms)

## 🧪 Exemples de Scénarios

### Scénario 1 : Jour d'Hiver
```
8h  → "Il fait très froid ! Chauffage éteint"
12h → (rien si chauffage allumé)
22h → "Heures creuses ! Lancez lave-linge, lave-vaisselle"
```

### Scénario 2 : Jour d'Été
```
12h → "Canicule ! Climatisation éteinte"
22h → "Heures creuses commencent !"
```

### Scénario 3 : Mauvaise Gestion
```
10h → "Lave-linge actif en heures pleines"
14h → "Puissance élevée : 3500W !"
19h → "Aucune lumière allumée la nuit"
```

## ✨ Avantages

### Pour le Joueur
- 📚 **Éducatif** : Apprend les bonnes pratiques en temps réel
- 💡 **Contextuel** : Conseils adaptés à la situation
- 🎯 **Actionnable** : Peut appliquer directement le conseil
- 🔄 **Non intrusif** : Peut ignorer si souhaité

### Pour le Gameplay
- 🎮 **Engagement** : Interaction continue
- 📈 **Courbe d'apprentissage** : Guidage progressif
- 🏆 **Réussite** : Aide à atteindre les objectifs
- ⚡ **Dynamique** : Adapté en temps réel

## 🚀 Améliorations Futures Possibles

1. **Historique des conseils** : Liste des conseils reçus
2. **Statistiques** : Taux d'application des conseils
3. **Conseils personnalisés** : Basés sur l'historique du joueur
4. **Niveaux de difficulté** : Plus ou moins de conseils
5. **Achievements** : "Expert en heures creuses", etc.
6. **Prédictions** : Anticiper les pics de consommation

## 📝 Notes de Débogage

Pour débugger le système, ouvrez la console :
- `🎬 endDay appelé` : Fin de journée détectée
- `📦 Résultats du jour` : Données du récap
- `✅ État mis à jour` : Modal doit s'afficher

Si le modal ne s'affiche pas :
1. Vérifier que `gameTime === 24`
2. Vérifier que `gameState === 'playing'`
3. Vérifier que `endDayCalledRef.current === false`
4. Ouvrir la console et chercher les logs 🎯

---

**Créé le** : 7 février 2026
**Dernière mise à jour** : 7 février 2026
