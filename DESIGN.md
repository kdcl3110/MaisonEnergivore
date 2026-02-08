# 🎮 Design Gaming - Ma Maison Énergivore

## 🎨 Palette de couleurs Gaming

### Couleurs principales
- **Fond**: Dégradés sombres (gray-900, purple-900)
- **Accents**: Cyan (#00f2fe), Blue (#4facfe), Purple (#764ba2)
- **Néons**: Effets lumineux cyan, vert, jaune, rouge

### États
- **Actif/ON**: Cyan, effet néon bleu
- **Désactivé/OFF**: Gris, opacité réduite
- **Danger**: Rouge avec néon rouge
- **Succès**: Vert avec néon vert
- **Avertissement**: Orange/Jaune avec néon

## ✨ Effets visuels

### Animations
- `animate-pulse-glow`: Pulsation lumineuse (2s)
- `animate-bounce-slow`: Rebond lent (3s)
- `animate-slide-up`: Apparition par le bas (0.6s)
- `animate-fade-in`: Fondu d'apparition (0.5s)
- `animate-shake`: Tremblement d'alerte (0.5s)

### Effets spéciaux
- **Néons**: Box-shadow lumineux sur éléments importants
- **Glass morphism**: Fond flou translucide pour HUD
- **Scanlines**: Effet rétro-futuriste sur tout l'écran
- **Gradients gaming**: Dégradés vifs et énergiques

## 🎯 Composants principaux

### Menu principal (DaySelector)
- Fond sombre avec effets de lumière animés
- Cartes de jour avec hover scale + glow
- Badges colorés pour objectifs
- Titre avec gradient animé
- HUD info en bas

### Écran de jeu (GameScreen)
- Layout type HUD gaming 3 colonnes
- Top bar avec titre et statut mission
- Sidebar gauche: horloge + objectifs
- Centre: maison et appareils
- Bottom bar: 3 compteurs (énergie, budget, confort)
- Bouton aide flottant

### Appareils (Appliance)
- Cartes avec bordures néon quand allumés
- LED de statut animée
- Badge niveau de puissance (HIGH/MEDIUM/LOW)
- Icônes grandes et animées
- Indicateurs 24h et heures creuses
- Hover effect lumineux

### Compteurs (Meters)
- Style HUD gaming avec bordures cyan
- Barres de progression avec gradients
- Effets néon selon l'état
- Stats additionnelles en grille
- Warning indicators animés

## 📐 Mise en page

### Desktop (>1024px)
```
┌─────────────────────────────────────────┐
│  TOP BAR (Titre + Mission)              │
├──────────┬──────────────────────────────┤
│ Controls │                              │
│ Clock    │      House Layout            │
│ Objective│                              │
│          │                              │
├──────────┴──────────────────────────────┤
│ Energy | Budget | Comfort              │
└─────────────────────────────────────────┘
```

### Mobile (<1024px)
```
┌──────────────┐
│  TOP BAR     │
├──────────────┤
│  Clock       │
│  Objectives  │
├──────────────┤
│              │
│  House       │
│              │
├──────────────┤
│  Energy      │
├──────────────┤
│  Budget      │
├──────────────┤
│  Comfort     │
└──────────────┘
```

## 🎨 Classes utilitaires custom

### Néons
- `.neon-blue`: Glow bleu cyan
- `.neon-green`: Glow vert
- `.neon-yellow`: Glow jaune
- `.neon-red`: Glow rouge
- `.neon-purple`: Glow violet

### Glass morphism
- `.glass`: Fond translucide clair
- `.glass-dark`: Fond translucide sombre

### Gradients
- `.gradient-gaming`: Violet/purple
- `.gradient-energy`: Pink/red
- `.gradient-success`: Blue/cyan

### Texte
- `.text-gaming`: Texte avec glow bleu
- `.text-glow-green`: Texte avec glow vert
- `.text-glow-red`: Texte avec glow rouge

## 🎯 Hiérarchie visuelle

### Priorité 1 - Attention immédiate
- Compteurs en rouge (> 90%)
- Badges de danger
- Messages d'erreur
- Boutons d'action principaux

### Priorité 2 - Informations importantes
- Compteurs en orange (> 80%)
- Horloge et temps
- Objectifs du jour
- Appareils allumés

### Priorité 3 - Contexte
- Stats additionnelles
- Badges informatifs
- Appareils éteints
- Éléments de fond

## 💡 Principes de design

1. **Clarté**: Malgré le style gaming, l'information reste lisible
2. **Feedback**: Chaque action a un retour visuel immédiat
3. **Progression**: Animations pour guider l'œil
4. **Immersion**: Effets visuels cohérents type jeu vidéo
5. **Performance**: Animations optimisées GPU

## 🚀 Améliorations futures possibles

- [ ] Particules animées en fond
- [ ] Sons pour actions (clic, allumage, etc.)
- [ ] Vibration haptique (mobile)
- [ ] Mode sombre/clair toggle
- [ ] Thèmes de couleurs alternatifs
- [ ] Confettis pour succès
- [ ] Shake screen pour échecs
- [ ] Progress bars avec textures
- [ ] Modèles 3D pour appareils (Three.js)
