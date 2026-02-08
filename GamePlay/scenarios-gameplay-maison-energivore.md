# 🎮 Scénarios de Gameplay - Ma Maison Énergivore
## Version Finale avec Valeurs Réalistes + Système de Pénalités

---

## 📋 Vue d'Ensemble

**Durée de développement** : 3 mois  
**Nombre de scénarios** : 5 scénarios progressifs  
**Durée par scénario** : 5-10 minutes de jeu  
**Difficulté** : Progressive (du plus facile au plus difficile)

---

## 🎯 Structure Globale du Jeu

### Mode Principal : **"Semaine Découverte"**
- **7 jours** à jouer
- **1 scénario par jour** (sauf jour 1 = tutoriel)
- Chaque jour introduit un **nouveau défi**
- Objectifs clairs et simples
- **Système de pénalités** si échec

---

## ⚠️ SYSTÈME DE PÉNALITÉS

### **Types de Pénalités**

#### 🔴 **Pénalité Financière**
```
Si dépassement budget :
└─ Jour suivant : +20% sur tous les coûts
└─ "Vous devez payer une facture de rattrapage"
```

#### 😰 **Pénalité Confort**
```
Si confort trop bas (< 50%) :
└─ Jour suivant : Confort démarre à 60% (au lieu de 100%)
└─ "Vous êtes fatigué de la journée difficile d'hier"
```

#### ⚡ **Pénalité Consommation**
```
Si objectif dépassé 2 jours d'affilée :
└─ Jour suivant : Limite réduite de -1 kWh
└─ "Le gestionnaire de réseau vous impose des restrictions"
```

#### 🏠 **Pénalité Équipement**
```
Si gros dépassement (>30% objectif) :
└─ Un appareil tombe en panne et devient inutilisable pendant 1 jour
└─ "Surcharge électrique ! Le lave-vaisselle est en panne"
```

#### 🔒 **Pénalité Progression**
```
Si échec critique (3 objectifs ratés) :
└─ Le jour suivant est verrouillé
└─ "Recommencez ce jour pour débloquer la suite"
```

---

## 📅 JOUR 1 : Tutoriel - "Bienvenue chez vous"

### 🎯 Objectif Pédagogique
Apprendre les bases du jeu sans stress

### 📖 Scénario

**Contexte :**  
"Bienvenue dans votre nouvelle maison ! Aujourd'hui, apprenez à gérer vos appareils électriques. Pas de limite de consommation, profitez pour découvrir !"

**Déroulement :**

#### 🌅 Matin (8h00)
```
📢 MESSAGE : "C'est le matin ! Temps d'allumer quelques appareils."

TUTORIAL STEP 1:
→ [Flèche clignotante] Cliquez sur la cafetière dans la cuisine
→ ✅ Bravo ! La cafetière consomme 800W
→ 💡 Astuce : "Plus un appareil consomme, plus votre compteur monte vite"

TUTORIAL STEP 2:
→ [Flèche] Cliquez sur le réfrigérateur
→ ❌ "Le réfrigérateur ne peut pas être éteint ! Il doit rester allumé 24h/24"
→ 💡 "C'est pour ça qu'il est important de choisir un frigo économe (classe A+++)"
```

#### ☀️ Après-midi (14h00)
```
📢 MESSAGE : "Regardez votre compteur en haut à droite !"

TUTORIAL STEP 3:
→ Explication du panneau d'énergie
→ "Vous avez consommé 2,5 kWh jusqu'ici"
→ "Chaque kWh coûte environ 0,15€"
→ "Votre facture actuelle : 0,38€"
```

#### 🌆 Soir (20h00)
```
📢 MESSAGE : "C'est l'heure du pic de consommation !"

TUTORIAL STEP 4:
→ Allumez la TV dans le salon
→ Allumez les lumières dans 2 pièces
→ Observer le compteur monter rapidement
→ 💡 "Le soir, beaucoup d'appareils sont allumés en même temps = forte consommation"
```

#### 🌙 Nuit (22h00)
```
📢 MESSAGE : "🎉 Les heures creuses commencent !"

TUTORIAL STEP 5:
→ [Highlight] Le compteur d'argent devient VERT
→ "Entre 22h et 6h, l'électricité coûte 40% moins cher !"
→ "C'est le moment d'allumer lave-linge et lave-vaisselle"
→ [Flèche] Essayez d'allumer le lave-linge
```

### ✅ Fin du Jour 1
```
📊 BILAN DE LA JOURNÉE :
Consommation : 8,5 kWh
Budget : €1,18
Confort : 85%

🇧🇪 COMPARAISON BELGIQUE :
┌──────────────────────────────────────┐
│ Votre consommation : 8,5 kWh         │
│ Moyenne belge : 9,6 kWh/jour         │
│ ✅ Vous êtes 11% en dessous !        │
└──────────────────────────────────────┘

💡 LE SAVIEZ-VOUS ?
"Un ménage belge consomme en moyenne 3 500 kWh/an"
"Soit environ 9,6 kWh par jour"
"Votre objectif : faire mieux que cette moyenne !"

✨ Déblocage : Jour 2 disponible
💡 Nouvelle astuce débloquée : "Les heures creuses"
```

### 🛠️ Implémentation Simple
```csharp
// Pas de pénalités le jour 1 (tutoriel)
bool isTutorial = true;
```

---

## 📅 JOUR 2 : "Le Premier Défi"

### 🎯 Objectifs
- ⚡ Consommation : **< 8 kWh**
- 💰 Budget : **< €1,20**

### 📖 Scénario

**Contexte :**  
"Maintenant que vous savez gérer les appareils, essayons de limiter la consommation ! Objectif : ne pas dépasser 8 kWh aujourd'hui."

**Déroulement :**

#### 🌅 Matin (8h00)
```
📢 "Vous commencez la journée avec 0 kWh"
🎯 Objectifs affichés :
   ├─ ⚡ Consommation < 8 kWh
   └─ 💰 Budget < €1,20

SITUATION :
- Cafetière : 800W (0,13 kWh pour 10 min)
- Lumières : 10W x 3 (0,03 kWh/h)
- Ordinateur : 300W (0,3 kWh/h pour travailler)

CHOIX DU JOUEUR :
→ Allumer tous ces appareils = ~0,4 kWh/h
→ Ou faire des économies ?
```

#### ☀️ Midi (12h00)
```
📊 CHECK-POINT :
"Vous avez consommé 3,0 kWh (38% de l'objectif)"
💭 "Pas mal ! Continuez comme ça"

ÉVÉNEMENT :
→ "Il fait chaud, voulez-vous allumer la climatisation ?"
→ ⚠️ "Attention : 2000W = 2 kWh/h de consommation !"

CHOIX :
A) Allumer la clim (confort +10%, conso +++)
B) Ouvrir les fenêtres (confort +5%, conso 0)
```

#### 🌆 Soir (19h00)
```
📊 CHECK-POINT :
"Vous êtes à 6,2 kWh (78% de l'objectif)"
🟡 "Attention, il reste 5h et vous pouvez dépenser encore 1,8 kWh"

SITUATION DIFFICILE :
- TV : 200W (0,2 kWh/h de divertissement)
- Console : 150W (0,15 kWh/h)
- Chauffage : 2000W (2 kWh/h - il commence à faire froid)
- Lumières : 30W (0,03 kWh/h)

DÉFI :
→ Le joueur doit choisir ses priorités
→ Impossible d'allumer tout en même temps !
```

#### 🌙 Nuit (22h00)
```
💡 ASTUCE AUTOMATIQUE :
"C'est les heures creuses ! Lancez lave-linge et lave-vaisselle maintenant !"

MINI-DÉFI BONUS :
→ Si le joueur lance ces appareils maintenant : +50 points bonus
→ Sinon : il passe à côté d'une économie
```

### ✅ Fin du Jour 2

**Scénario A : Réussite Complète (2/2 objectifs)**
```
🎉 "PARFAIT ! Tous les objectifs atteints !"

📊 RÉSULTATS :
✅ Consommation : 7,4 kWh / 8 kWh
✅ Budget : €1,08 / €1,20
😊 Confort : 72%

🇧🇪 COMPARAISON BELGIQUE :
┌──────────────────────────────────────┐
│ Votre consommation : 7,4 kWh         │
│ Moyenne belge : 9,6 kWh/jour         │
│ 🌟 -23% par rapport à la moyenne !   │
│                                      │
│ 💰 Si vous faites ça toute l'année : │
│ └─ Économie : ~€120/an               │
└──────────────────────────────────────┘

🏆 Récompense : Badge "Économe Niveau 1"
✨ Bonus Jour 3 : Démarrage avec +5% confort
```

**Scénario B : Réussite Partielle (1/2 objectifs)**
```
👍 "Bien joué... mais peut mieux faire !"

📊 RÉSULTATS :
✅ Consommation : 7,8 kWh / 8 kWh
❌ Budget : €1,35 / €1,20 (dépassement de €0,15)
😊 Confort : 85%

⚠️ PÉNALITÉ APPLIQUÉE :
┌──────────────────────────────────────┐
│ 💸 FACTURE DE RATTRAPAGE             │
│                                      │
│ Demain (Jour 3) :                    │
│ └─ Tous les coûts +20%               │
│ └─ Heures pleines : 0,18€/kWh        │
│ └─ Heures creuses : 0,11€/kWh        │
│                                      │
│ Raison : Dépassement budget          │
└──────────────────────────────────────┘

💡 CONSEIL :
"Vous avez privilégié le confort au détriment du budget"
"Astuce : Utilisez plus les heures creuses pour économiser"

🔄 "Voulez-vous réessayer ce jour ?" [Oui / Continuer avec pénalité]
```

**Scénario C : Échec Complet (0/2 objectifs)**
```
😰 "Journée difficile..."

📊 RÉSULTATS :
❌ Consommation : 9,5 kWh / 8 kWh (+19%)
❌ Budget : €1,58 / €1,20 (+32%)
😊 Confort : 85%

⚠️⚠️ PÉNALITÉS MULTIPLES :
┌──────────────────────────────────────┐
│ 💸 FACTURE DE RATTRAPAGE             │
│ └─ Demain : Coûts +20%               │
│                                      │
│ ⚡ RESTRICTION RÉSEAU                │
│ └─ Demain : Limite 7 kWh (au lieu 8) │
│                                      │
│ 🔧 SURCHARGE ÉLECTRIQUE              │
│ └─ Demain : Lave-vaisselle en panne  │
│    (Indisponible pendant 24h)        │
└──────────────────────────────────────┘

💡 ANALYSE :
"Vous avez consommé comme un ménage peu conscient"
"En Belgique, cela représenterait +€80/an de facture"

📝 CONSEILS :
1. Évitez d'allumer la clim et le chauffage en même temps
2. Éteignez les lumières dans les pièces vides
3. Utilisez les heures creuses pour les gros appareils

🔄 "Vous DEVEZ réessayer ce jour avant de continuer" [Recommencer]
```

### 🛠️ Implémentation
```csharp
// Système de pénalités
public class PenaltySystem {
    public bool budgetPenalty = false;    // +20% coûts
    public bool consumptionPenalty = false; // -1 kWh limite
    public bool equipmentPenalty = false; // Appareil en panne
    
    public void ApplyPenalties(int objectivesFailed) {
        if (objectivesFailed == 1) {
            budgetPenalty = true;
        } else if (objectivesFailed == 2) {
            budgetPenalty = true;
            consumptionPenalty = true;
            equipmentPenalty = true;
        }
    }
}
```

---

## 📅 JOUR 3 : "Le Confort d'Abord"

### 🎯 Objectifs
- ⚡ Consommation : **< 9 kWh** (hiver)
- 😊 Confort : **> 75%**
- 💰 Budget : **< €1,35**

### 📖 Scénario

**Contexte :**  
"Aujourd'hui, triple défi ! Il faut économiser MAIS aussi rester confortable. C'est l'hiver, il fait froid..."

**Si pénalités du Jour 2 :**
```
⚠️ PÉNALITÉS ACTIVES :
├─ 💸 Tarifs +20% → Heures pleines : 0,18€/kWh
├─ ⚡ Limite réduite → Objectif : 7 kWh au lieu de 9 kWh
└─ 🔧 Lave-vaisselle hors service
```

**Déroulement :**

#### 🌅 Matin (7h00)
```
🥶 ÉVÉNEMENT MÉTÉO :
"Il fait très froid ce matin : 2°C extérieur"

⚠️ ALERTE CONFORT :
Confort actuel : 100%
→ Sans chauffage, le confort baisse de -5% par heure

CHOIX STRATÉGIQUE :
A) Allumer le chauffage maintenant (2000W = 2 kWh/h mais confort stable)
B) Attendre un peu (économie mais confort baisse)
C) S'habiller chaudement (confort baisse lentement -2%/h)
```

#### ☀️ Midi (12h00)
```
📊 SITUATION :
Consommation : 5,5 kWh / 9 kWh (61%)
Confort : 68% ⚠️ (sous objectif 75%)
Budget : €0,83

⚠️ ALERTE :
"Votre confort est sous les 75% ! Il faut agir !"

SOLUTIONS PROPOSÉES :
→ Allumer le chauffage (immédiat mais coûteux : 2 kWh/h)
→ Prendre une douche chaude (temporaire, chauffe-eau 3000W : 0,5 kWh)
→ Allumer des lumières (effet psychologique mineur)
```

#### 🌆 Soir (18h00)
```
🌡️ ÉVÉNEMENT :
"La température extérieure chute encore : -1°C"
"Confort : 62% 🔴 CRITIQUE !"

DÉCISION IMPORTANTE :
"Le chauffage est indispensable maintenant"
→ Si pas allumé : Confort continue de chuter
→ Game Over si confort < 50%

💡 ASTUCE :
"Chauffer seulement les pièces utilisées !"
→ Possibilité de chauffer uniquement salon + chambre
→ Économie de 30% vs toute la maison (600W au lieu de 2000W)
```

#### 🌙 Nuit (23h00)
```
😴 "Il est tard, éteignez les appareils inutiles"

MINI-PUZZLE :
→ Quels appareils peuvent être éteints la nuit ?
→ Réfrigérateur : ❌ Non
→ TV : ✅ Oui
→ Chauffage : ⚠️ Partiellement (mode éco 800W)
→ Lumières : ✅ Oui (sauf veuilleuse)
```

### ✅ Fin du Jour 3

**Scénario A : Triple Réussite**
```
🏆 "EXCELLENT !"

📊 RÉSULTATS :
✅ Consommation : 8,7 kWh / 9 kWh
✅ Confort : 76% / 75%
✅ Budget : €1,31 / €1,35

🇧🇪 COMPARAISON BELGIQUE :
┌──────────────────────────────────────┐
│ Consommation hivernale typique :     │
│ └─ 12-16 kWh/jour (avec chauffage)   │
│                                      │
│ Vous : 8,7 kWh                       │
│ 🌟 Très économe pour l'hiver !       │
│                                      │
│ 💡 En hiver, le chauffage = 70-80%   │
│    de la consommation électrique     │
└──────────────────────────────────────┘

🏆 Badge "Expert de l'Équilibre"
✨ Bonus : Toutes les pénalités annulées !
```

**Scénario B : Réussite Partielle (2/3 objectifs)**
```
🤔 "Presque parfait..."

📊 RÉSULTATS :
✅ Consommation : 8,5 kWh / 9 kWh
❌ Confort : 68% / 75%
✅ Budget : €1,28 / €1,35

⚠️ PÉNALITÉ APPLIQUÉE :
┌──────────────────────────────────────┐
│ 😰 FATIGUE ACCUMULÉE                 │
│                                      │
│ Demain (Jour 4) :                    │
│ └─ Confort démarre à 60%             │
│    (au lieu de 100%)                 │
│                                      │
│ Raison : Confort trop bas aujourd'hui│
│ "Vous êtes fatigué d'avoir eu froid" │
└──────────────────────────────────────┘

💡 "Vous avez bien géré l'énergie mais négligé le confort"
```

**Scénario C : Échec (0-1/3 objectifs)**
```
😰 "C'était difficile aujourd'hui..."

📊 RÉSULTATS :
❌ Consommation : 11,2 kWh / 9 kWh (+24%)
❌ Confort : 55% / 75%
❌ Budget : €1,68 / €1,35 (+24%)

⚠️⚠️⚠️ PÉNALITÉS SÉVÈRES :
┌──────────────────────────────────────┐
│ 💸 FACTURE IMPORTANTE                │
│ └─ Demain : Coûts +30%               │
│                                      │
│ 😰 ÉPUISEMENT                        │
│ └─ Demain : Confort démarre à 50%    │
│                                      │
│ 🔥 SYSTÈME DE CHAUFFAGE SURCHARGÉ   │
│ └─ Demain : Chauffage limité à 1000W │
│    (au lieu de 2000W)                │
│                                      │
│ 🚫 PROGRESSION BLOQUÉE               │
│ └─ Recommencez ce jour pour débloquer│
│    le Jour 4                         │
└──────────────────────────────────────┘

💡 ANALYSE :
"Vous avez trop chauffé TOUTE la maison"
"Conseil : Chauffer seulement les pièces occupées"

🔄 [OBLIGATOIRE : Recommencer le Jour 3]
```

### 🛠️ Implémentation
```csharp
// Pénalité confort
if (comfort < minComfort) {
    nextDayStartingComfort = 60f; // Au lieu de 100
}

// Pénalité équipement
if (heatingOveruse) {
    maxHeatingPower = 1000f; // Limité
}
```

---

## 📅 JOUR 4 : "Les Heures Creuses"

### 🎯 Objectifs
- ⚡ **50% de la consommation en heures creuses**
- 💰 Budget : **< €1,10**
- 📊 Consommation totale : **< 10 kWh**

### 📖 Scénario

**Contexte :**  
"Aujourd'hui, mission spéciale : optimiser l'utilisation des heures creuses pour économiser de l'argent !"

**Si pénalités actives :**
```
⚠️ PÉNALITÉS DU JOUR 3 :
├─ 💸 Tarifs +30% (heures pleines : 0,195€/kWh)
├─ 😰 Confort démarre à 60%
└─ 🔥 Chauffage limité à 1000W
```

**Déroulement :**

#### 🌅 Matin (8h00)
```
📢 BRIEFING :
"Aujourd'hui, concentrez-vous sur les HEURES CREUSES (22h-6h)"
"Objectif : 50% de votre consommation doit être dans ces heures"

📊 TRACKER SPÉCIAL :
┌──────────────────────────────────────┐
│ Heures pleines : 0 kWh (0%)          │
│ Heures creuses : 0 kWh (0%)          │
│                                      │
│ 🎯 Objectif : 50% heures creuses     │
└──────────────────────────────────────┘
```

#### ☀️ Journée (8h-22h)
```
💭 STRATÉGIE :
"Pensez à ce que vous pouvez reporter au soir..."

APPAREILS "REPORTABLES" :
✅ Lave-linge : Peut attendre le soir (1,5 kWh)
✅ Lave-vaisselle : Peut attendre le soir (1,2 kWh)
✅ Chauffe-eau : Peut chauffer la nuit (2-3 kWh)
❌ Cafetière : Besoin le matin (0,13 kWh)
❌ Ordinateur : Besoin maintenant (2,4 kWh/8h travail)

MINI-DÉFI :
→ Tenir la journée SANS lancer lave-linge ni lave-vaisselle
→ Patience récompensée le soir !
```

#### 🌆 Pré-Soirée (20h00)
```
⏰ RAPPEL :
"Plus que 2h avant les heures creuses !"
"Préparez vos appareils..."

CHECKLIST INTERACTIVE :
□ Remplir le lave-linge (prêt à lancer)
□ Remplir le lave-vaisselle (prêt à lancer)
□ Programmer le chauffe-eau

💡 "À 22h, lancez tout d'un coup !"
```

#### 🌙 Heures Creuses (22h00)
```
🎉 "C'EST L'HEURE !"
💚 "Tarif réduit : 0,09€/kWh (au lieu de 0,15€)"

⚡ POWER HOUR :
→ Lancez TOUS les appareils économisés
→ Lave-linge : 2000W x 2h = 4 kWh
→ Lave-vaisselle : 1200W x 1,5h = 1,8 kWh
→ Chauffe-eau : 3000W x 1h = 3 kWh
→ TOTAL : 8,8 kWh en heures creuses !

💰 ÉCONOMIE EN TEMPS RÉEL :
"Si vous aviez fait ça en heures pleines : €1,32"
"En heures creuses : €0,79"
"✨ Économie : €0,53 (40%)"
```

#### 🌙 Nuit (2h00)
```
📊 CHECK :
"Vos appareils ont fini de tourner"
"Pensez à éteindre ce qui reste allumé"

SCORE INTERMÉDIAIRE :
┌──────────────────────────────────────┐
│ Heures pleines : 5,2 kWh (37%)       │
│ Heures creuses : 8,8 kWh (63%) 🎉    │
│                                      │
│ ✅ Objectif 50% DÉPASSÉ !            │
└──────────────────────────────────────┘
```

### ✅ Fin du Jour 4

**Scénario A : Maître des Heures Creuses (3/3 objectifs)**
```
🏆🏆 "CHAMPION DES HEURES CREUSES !"

📊 RÉSULTATS :
✅ Répartition : 63% heures creuses / 50%
✅ Budget : €0,99 / €1,10
✅ Consommation : 14 kWh total
   ├─ Heures pleines : 5,2 kWh
   └─ Heures creuses : 8,8 kWh

💰 ÉCONOMIES JOURNALIÈRES :
├─ Coût réel : €0,99
├─ Si tout en heures pleines : €2,10
└─ ✨ Économisé : €1,11 (53%)

🇧🇪 PROJECTION ANNUELLE :
┌──────────────────────────────────────┐
│ Si vous faites ça toute l'année :    │
│                                      │
│ └─ €0,53 x 365 jours = €193/an       │
│                                      │
│ En Belgique, optimiser les heures    │
│ creuses = ~€150-200 d'économies/an ! │
└──────────────────────────────────────┘

🎁 DÉBLOCAGE : Mode Expert
✨ Bonus : +100 points, toutes pénalités annulées
🏆 Badge : "Maître des Heures Creuses"
```

**Scénario B : Bien Joué (2/3 objectifs)**
```
👍 "Bon travail !"

📊 RÉSULTATS :
✅ Répartition : 52% heures creuses / 50%
❌ Budget : €1,25 / €1,10 (dépassement €0,15)
✅ Consommation : 9,8 kWh / 10 kWh

⚠️ PÉNALITÉ LÉGÈRE :
┌──────────────────────────────────────┐
│ 💸 AJUSTEMENT TARIFAIRE              │
│                                      │
│ Demain (Jour 5) :                    │
│ └─ Heures pleines : +10% (0,165€/kWh)│
│                                      │
│ Raison : Petit dépassement budget    │
└──────────────────────────────────────┘

💡 "C'est déjà très bien ! Continuez !"
```

**Scénario C : À Améliorer (0-1/3 objectifs)**
```
😅 "Vous n'avez pas optimisé les heures creuses"

📊 RÉSULTATS :
❌ Répartition : 28% heures creuses / 50%
❌ Budget : €1,65 / €1,10 (+50%)
❌ Consommation : 12 kWh / 10 kWh (+20%)

⚠️⚠️ PÉNALITÉS IMPORTANTES :
┌──────────────────────────────────────┐
│ 💸 FACTURE ÉLEVÉE                    │
│ └─ Demain : Tous coûts +40%          │
│                                      │
│ ⚡ ALERTE RÉSEAU                     │
│ └─ Demain : Limite 1500W simultanés  │
│    (risque disjoncteur)              │
│                                      │
│ 📵 RESTRICTION ÉQUIPEMENT            │
│ └─ Demain : Lave-linge ET lave-      │
│    vaisselle utilisables uniquement  │
│    en heures creuses                 │
└──────────────────────────────────────┘

💡 CONSEIL :
"Reporter lave-linge et lave-vaisselle après 22h"
"Programmer le chauffe-eau pour la nuit"

🔄 Réessayer ? [Oui / Continuer avec pénalités]
```

### 🛠️ Implémentation
```csharp
float offPeakConsumption = 0f;
float peakConsumption = 0f;

float GetOffPeakPercentage() {
    float total = offPeakConsumption + peakConsumption;
    return (offPeakConsumption / total) * 100f;
}

// Pénalité limitation puissance
if (GetOffPeakPercentage() < 30f) {
    maxSimultaneousPower = 1500f; // Limite le jour suivant
}
```

---

## 📅 JOUR 5 : "L'Événement Imprévu"

### 🎯 Objectifs
- 🎲 S'adapter à un **événement aléatoire**
- ⚡ Objectif varie selon l'événement

### 📖 Scénario

**Contexte :**  
"La vie réserve des surprises ! Comment allez-vous gérer un imprévu ?"

**Si pénalités du Jour 4 :**
```
⚠️ PÉNALITÉS ACTIVES :
├─ 💸 Tarifs +40%
├─ ⚡ Puissance max : 1500W simultanés
└─ 📵 Gros appareils : heures creuses uniquement
```

**3 Événements Possibles (tirage aléatoire) :**

### Événement A : 🌡️ "Canicule"

```
☀️ "ALERTE MÉTÉO : Canicule exceptionnelle !"
🌡️ "Température : 38°C"

🎯 OBJECTIFS MODIFIÉS :
├─ Consommation < 15 kWh (climatisation incluse)
├─ Confort > 70%
└─ Budget < €2,00

IMPACT :
- Confort baisse de -10%/heure sans climatisation
- Réfrigérateur consomme +30% (lutte contre chaleur : 195W)
- Impossible de cuisiner (four trop chaud)

CHOIX DU JOUEUR :
1) Allumer la climatisation
   → +2000W constant = 48 kWh potentiels !
   → Confort stable à 80%
   → Consommation TRÈS élevée

2) Stratégie "naturelle"
   → Fermer volets le jour
   → Ouvrir fenêtres la nuit
   → Confort à 60% (acceptable)
   → Économies importantes

3) Compromis intelligent
   → Clim seulement 14h-18h (heures les plus chaudes)
   → 4h x 2000W = 8 kWh pour la clim
   → Équilibre confort/consommation
```

**Fin Événement A :**

```
✅ SUCCÈS (< 15 kWh + Confort > 70%) :
📊 Consommation : 13,5 kWh
💰 Budget : €1,89
😊 Confort : 73%

🏆 Badge : "Survivant de la Canicule"
✨ Bonus : +150 points
```

```
❌ ÉCHEC :
📊 Consommation : 21 kWh (clim 12h)
💰 Budget : €3,15
😊 Confort : 85%

⚠️⚠️ PÉNALITÉS SÉVÈRES :
┌──────────────────────────────────────┐
│ 💸 FACTURE EXCEPTIONNELLE            │
│ └─ Demain : +50% tous tarifs         │
│                                      │
│ ⚡ SURCHARGE RÉSEAU                  │
│ └─ Demain : Coupure 2h en journée    │
│    (appareils éteints 13h-15h)       │
│                                      │
│ 🌡️ CLIMATISATION DÉFECTUEUSE        │
│ └─ Indisponible pendant 2 jours      │
└──────────────────────────────────────┘

💡 "La clim consomme énormément !"
"En Belgique : 1h de clim = 1€ en moyenne"
```

### Événement B : 👨‍👩‍👧‍👦 "Visite de la Famille"

```
🏠 "SURPRISE ! Votre famille débarque pour la journée !"
👨‍👩‍👧‍👦 "4 personnes supplémentaires = besoins en hausse"

🎯 OBJECTIFS MODIFIÉS :
├─ Consommation < 18 kWh (usage élevé accepté)
├─ Confort > 85% (invités !)
└─ Budget < €2,50

IMPACT :
- Besoin de cuisiner (four + plaques : 4000W)
- Douches multiples (chauffe-eau sollicité : +5 kWh)
- TV + console allumées toute la journée : +1,2 kWh
- Lumières dans toutes les pièces : +0,5 kWh
- Confort doit rester > 85% (invités !)

STRATÉGIE :
→ Anticiper les pics de consommation
→ Éteindre ce qui n'est pas indispensable
→ Utiliser heures creuses pour la vaisselle après leur départ
```

**Fin Événement B :**

```
✅ SUCCÈS :
📊 Consommation : 16,8 kWh / 18 kWh
💰 Budget : €2,38 / €2,50
😊 Confort : 88% / 85%

🇧🇪 CONTEXTE BELGIQUE :
┌──────────────────────────────────────┐
│ Recevoir des invités = consommation  │
│ x2 par rapport à une journée normale │
│                                      │
│ Vous avez bien géré la situation !   │
└──────────────────────────────────────┘

🏆 Badge : "Hôte Économe"
```

```
❌ ÉCHEC :
📊 Consommation : 24 kWh
💰 Budget : €3,60
😊 Confort : 90%

⚠️⚠️ PÉNALITÉS :
┌──────────────────────────────────────┐
│ 💸 BUDGET EXPLOSÉ                    │
│ └─ Demain : Budget réduit à €0,80    │
│    (mode économie forcé)             │
│                                      │
│ 🔌 MULTIPRISE ENDOMMAGÉE             │
│ └─ Salon : 1 seul appareil à la fois │
│    possible pendant 2 jours          │
└──────────────────────────────────────┘
```

### Événement C : ⚠️ "Panne Partielle"

```
⚡ "INCIDENT ! Problème sur le réseau électrique"
⚠️ "Vous ne pouvez utiliser que 1500W maximum simultanément"

🎯 OBJECTIFS MODIFIÉS :
├─ Survivre sans faire sauter le disjoncteur
├─ Consommation < 9 kWh
└─ Confort > 60%

CONTRAINTE :
- Si dépassement 1500W : disjoncteur saute
- Tout s'éteint pendant 1h (y compris réfrigérateur !)
- Confort chute brutalement (-20%)
- Vous perdez le contenu du congélateur (pénalité -€50)

PUZZLE LOGIQUE :
"Quels appareils allumer en même temps ?"

Exemples de combinaisons valides :
✅ Réfrigérateur (150W) + TV (200W) + Ordinateur (300W) + Lumières (180W) = 830W
✅ Réfrigérateur (150W) + Cafetière (800W) + Lumières (180W) = 1130W
❌ Réfrigérateur (150W) + Chauffage (2000W) = 2150W → DISJONCTEUR !
❌ Lave-linge (2000W) seul = 2000W → DISJONCTEUR !

💡 ASTUCE :
"Utilisez les heures creuses pour lancer les gros appareils UN PAR UN"
```

**Fin Événement C :**

```
✅ SUCCÈS (0 disjonction) :
📊 Consommation : 8,5 kWh
💰 Budget : €1,28
😊 Confort : 65%
⚡ Disjonctions : 0

🏆 Badge : "Électricien en Herbe"
💡 "Vous avez géré la crise avec intelligence !"
```

```
❌ ÉCHEC (1+ disjonction) :
📊 Consommation : 7,2 kWh (mais 2 disjonctions)
💰 Budget : €1,08
😊 Confort : 45%
⚡ Disjonctions : 2 ❌

⚠️⚠️⚠️ PÉNALITÉS CATASTROPHIQUES :
┌──────────────────────────────────────┐
│ ❄️ CONGÉLATEUR DÉCONGELÉ             │
│ └─ Perte nourriture : -€50           │
│                                      │
│ 🔧 INSTALLATION ÉLECTRIQUE FRAGILISÉE│
│ └─ Demain : Limite 1000W permanente  │
│                                      │
│ 😰 STRESS ACCUMULÉ                   │
│ └─ Demain : Confort démarre à 40%    │
│                                      │
│ 🚫 JOUR 6 VERROUILLÉ                 │
│ └─ Recommencez le Jour 5             │
└──────────────────────────────────────┘
```

### 🛠️ Implémentation
```csharp
public enum EventType {
    None,
    Heatwave,
    FamilyVisit,
    PowerLimit
}

EventType todayEvent;

void Start() {
    todayEvent = (EventType)Random.Range(1, 4);
    TriggerEvent(todayEvent);
}

// Détection surcharge
float currentPower = GetTotalActivePower();
if (currentPower > maxPower) {
    TriggerCircuitBreaker(); // Tout s'éteint 1h
    comfortLoss = -20f;
}
```

---

## 📅 JOUR 6 : "Le Défi Final - Préparation"

### 🎯 Objectifs
- ⚡ Consommation : **< 7 kWh** (très difficile)
- 💰 Budget : **< €1,00**
- 😊 Confort : **> 80%**
- 📊 **60% heures creuses**

### 📖 Scénario

**Contexte :**  
"Demain, c'est le jour J ! Aujourd'hui, préparez-vous en optimisant au maximum."

**Si pénalités du Jour 5 :**
```
⚠️ PÉNALITÉS ACTIVES (selon événement) :
├─ Climatisation HS pendant 2 jours
├─ Budget réduit à €0,80
├─ Limite 1000W permanente
└─ Ou autres selon l'événement
```

#### Toute la Journée
```
📢 "ENTRAÎNEMENT LIBRE - MODE EXPERT"

MISSION :
"Battez votre meilleur score tout en respectant 4 objectifs simultanés"

OBJECTIFS (TOUS obligatoires) :
□ Consommation < 7 kWh ⭐⭐⭐⭐⭐
□ Budget < €1,00 ⭐⭐⭐⭐
□ Confort > 80% ⭐⭐⭐⭐
□ 60% heures creuses ⭐⭐⭐⭐⭐

💡 "C'est le jour le plus difficile !"
"Seuls les meilleurs y arrivent"

RÉCOMPENSE SI 4/4 :
→ +5 bonus pour le Jour 7
→ Badge "Légende"
→ Déblocage mode infini
```

### ✅ Fin du Jour 6

**Succès Parfait (4/4) :**
```
🏆🏆🏆 "LÉGENDAIRE !"

📊 RÉSULTATS :
✅ Consommation : 6,8 kWh / 7 kWh
✅ Budget : €0,97 / €1,00
✅ Confort : 82% / 80%
✅ Heures creuses : 64% / 60%

🇧🇪 PERFORMANCE EXCEPTIONNELLE :
┌──────────────────────────────────────┐
│ Votre consommation : 6,8 kWh         │
│ Moyenne belge : 9,6 kWh              │
│                                      │
│ 🌟 -29% vs moyenne nationale !       │
│                                      │
│ Si appliqué toute l'année :          │
│ └─ Économie : ~€150/an               │
│ └─ CO2 évité : 700 kg/an             │
└──────────────────────────────────────┘

🎁 BONUS JOUR 7 : ⭐⭐⭐⭐⭐
├─ Toutes limites +20%
├─ Confort démarre à 100%
└─ Pas de pénalité possible
```

**Échec (≤2/4) :**
```
😅 "Trop difficile..."

⚠️⚠️⚠️ PÉNALITÉS CUMULATIVES :
┌──────────────────────────────────────┐
│ 🚫 JOUR 7 VERROUILLÉ                 │
│                                      │
│ Vous devez réussir le Jour 6 avec    │
│ au moins 3/4 objectifs pour accéder  │
│ au test final                        │
│                                      │
│ 💡 Recommencez avec l'expérience     │
│    accumulée                         │
└──────────────────────────────────────┘

🔄 [OBLIGATOIRE : Recommencer]
```

---

## 📅 JOUR 7 : "LE GRAND TEST FINAL"

### 🎯 Objectifs Ultimes
- ⚡ Consommation : **< 8 kWh**
- 💰 Budget : **< €1,15**
- 😊 Confort : **> 75%**
- 📊 **50% heures creuses**
- 🎯 **Zéro gaspillage** (aucun appareil inutile ON)

### 📖 Scénario

**Contexte :**  
"C'est le moment de vérité ! Prouvez que vous avez tout compris en gérant une journée parfaite."

**Avec Bonus Jour 6 (si 4/4) :**
```
✨ BONUS ACTIFS :
├─ Limites +20% (9,6 kWh, €1,38)
├─ Confort démarre à 100%
└─ Pas de pénalités (jour final)
```

**Sans Bonus (si 3/4) :**
```
⚠️ MODE NORMAL :
├─ Objectifs standards
├─ Confort démarre à 100%
└─ Pénalités possibles
```

#### 🌅 Matin (7h00)
```
🎯 "LE GRAND TEST COMMENCE !"

📊 Tableau de bord complet :
┌─────────────────────────────────────┐
│ 📋 OBJECTIFS À VALIDER              │
├─────────────────────────────────────┤
│ ⚡ Conso < 8 kWh      🔴 0/8         │
│ 💰 Budget < €1,15    🟢 €0,00       │
│ 😊 Confort > 75%     🟢 100%        │
│ 📊 50% H.Creuses     🔴 0%          │
│ 🎯 Zéro gaspillage   🟢 ✓           │
└─────────────────────────────────────┘

💡 "Tous vos apprentissages de la semaine vont servir !"
```

#### ☀️ Journée Complète
```
Le joueur doit appliquer TOUT ce qu'il a appris :

✅ Jour 1 : Bases de la gestion
✅ Jour 2 : Limitation de consommation
✅ Jour 3 : Équilibre confort/économie
✅ Jour 4 : Optimisation heures creuses
✅ Jour 5 : Gestion de crise
✅ Jour 6 : Performance maximale

AUCUNE AIDE :
→ Pas de tutoriel
→ Pas de rappels
→ Le joueur est autonome

ÉVÉNEMENT SURPRISE (18h00) :
Un mini-événement aléatoire léger pour tester l'adaptation
Ex: Orage → Besoin lumières plus tôt
```

### ✅ Fin du Jour 7 - RÉSULTATS FINAUX

**Scénario A : PARFAIT (5/5 objectifs)**
```
🏆🏆🏆🏆🏆 "MASTER DE L'ÉNERGIE !" 🏆🏆🏆🏆🏆

📊 RÉSULTATS DU JOUR 7 :
✅ Consommation : 7,4 kWh / 8 kWh
✅ Budget : €1,08 / €1,15
✅ Confort : 78% / 75%
✅ Heures creuses : 52% / 50%
✅ Zéro gaspillage : ✓

🎯 SCORE FINAL : 100/100 ⭐⭐⭐⭐⭐

╔════════════════════════════════════════════════╗
║     BILAN COMPLET DE LA SEMAINE                ║
╚════════════════════════════════════════════════╝

📈 ÉVOLUTION JOUR PAR JOUR :
Jour 1 (Tutorial)    : 8,5 kWh - €1,18
Jour 2 (Défi)        : 7,4 kWh - €1,08 ✅
Jour 3 (Confort)     : 8,7 kWh - €1,31 ✅
Jour 4 (H.Creuses)   : 14,0 kWh - €0,99 ✅ (optimisé)
Jour 5 (Événement)   : 13,5 kWh - €1,89 ✅ (canicule)
Jour 6 (Expert)      : 6,8 kWh - €0,97 ✅✅
Jour 7 (Final)       : 7,4 kWh - €1,08 ✅

📊 TOTAUX DE LA SEMAINE :
├─ Consommation totale : 66,3 kWh
├─ Moyenne quotidienne : 9,5 kWh/jour
├─ Facture totale : €8,50
└─ Confort moyen : 77%

🇧🇪 COMPARAISON BELGIQUE :
┌──────────────────────────────────────────┐
│ 📊 VOS PERFORMANCES vs MOYENNE BELGE     │
├──────────────────────────────────────────┤
│ Votre moyenne : 9,5 kWh/jour             │
│ Moyenne belge : 9,6 kWh/jour             │
│                                          │
│ 🌟 Vous êtes 1% en dessous !             │
│    (Malgré événements difficiles)        │
│                                          │
│ 💰 PROJECTION ANNUELLE :                 │
│ └─ Votre conso : 3 468 kWh/an            │
│ └─ Moyenne BE : 3 500 kWh/an             │
│ └─ Économie : 32 kWh/an                  │
│ └─ Soit : ~€5/an                         │
│                                          │
│ 💡 Si vous appliquez les meilleures      │
│    pratiques (Jours 2, 4, 6) :           │
│ └─ Économie potentielle : ~€120/an       │
└──────────────────────────────────────────┘

🌍 IMPACT ENVIRONNEMENTAL RÉEL :
├─ CO2 évité : 8 kg cette semaine
├─ Sur 1 an : 417 kg CO2 évités
└─ Équivalent : 2 085 km en voiture ! 🚗

🏆 BADGES DÉBLOQUÉS :
✅ "Économe Niveau 1"
✅ "Expert de l'Équilibre"
✅ "Maître des Heures Creuses"
✅ "Survivant de la Canicule"
✅ "Légende"
✅ "MASTER DE L'ÉNERGIE" 👑

💡 LEÇONS APPRISES :
1. Les heures creuses économisent vraiment 40%
2. Le chauffage = 70% de la conso hivernale
3. Petits gestes = grandes économies annuelles
4. En Belgique : 3 500 kWh/an est tout à fait gérable

📈 DÉBLOCAGES :
✅ Mode Challenge (objectifs encore plus difficiles)
✅ Mode Infini (survivre le plus de jours possible)
✅ Statistiques détaillées
✅ Certificat PDF téléchargeable
```

**Scénario B : EXCELLENT (4/5 objectifs)**
```
🏆🏆 "EXPERT ÉNERGÉTIQUE !"

📊 RÉSULTATS :
✅ Consommation : 7,8 kWh ✅
✅ Confort : 77% ✅
✅ Heures creuses : 48% ❌ (très proche !)
✅ Budget : €1,12 ✅
✅ Zéro gaspillage ✅

🎯 SCORE FINAL : 90/100 ⭐⭐⭐⭐

🇧🇪 BILAN BELGIQUE :
"Vous avez une consommation proche de la moyenne belge"
"Avec quelques optimisations, vous pourriez économiser ~€80/an"

🏆 Badges obtenus : 5/6

💡 CONSEIL :
"Continuez à optimiser l'utilisation des heures creuses"
"Vous êtes à 2% de la perfection !"
```

**Scénario C : BIEN (3/5 objectifs)**
```
👍 "BIEN JOUÉ !"

📊 RÉSULTATS :
✅ Consommation : 8,2 kWh ❌ (proche)
✅ Confort : 76% ✅
❌ Heures creuses : 38% ❌
✅ Budget : €1,18 ❌ (légèrement au-dessus)
✅ Zéro gaspillage ✅

🎯 SCORE FINAL : 70/100 ⭐⭐⭐

🇧🇪 BILAN BELGIQUE :
"Vous consommez légèrement moins que la moyenne belge"
"Potentiel d'économie : ~€50/an avec optimisations"

💡 POINTS À AMÉLIORER :
1. Planifier mieux les heures creuses
2. Surveiller les petits dépassements
```

**Scénario D : À AMÉLIORER (≤2 objectifs)**
```
😅 "CONTINUEZ VOS EFFORTS"

📊 RÉSULTATS :
❌ Consommation : 10,5 kWh ❌
❌ Confort : 68% ❌
❌ Heures creuses : 25% ❌
✅ Budget : €1,58 ❌
❌ Gaspillage détecté ❌

🎯 SCORE FINAL : 45/100 ⭐⭐

💡 ANALYSE :
"Vous n'avez pas appliqué les leçons de la semaine"

RECOMMANDATION :
"Revisitez les jours 2, 3, 4 pour améliorer votre stratégie"

🔄 PROPOSITION :
"Recommencer la semaine avec ce que vous avez appris ?"
[Oui, recommencer] [Non, voir les stats détaillées]
```

---

## 🎮 MODES BONUS (Si Temps Restant)

### Mode 1 : "Challenge Speedrun"
```
⏱️ "Finir une journée parfaite en moins de 5 minutes"
🎯 Tous les objectifs à 100%
🏆 Classement en ligne (optionnel)
```

### Mode 2 : "Mode Infini"
```
♾️ "Survivre le plus de jours possible"
📈 Difficulté augmente chaque jour (-0,5 kWh de limite)
💀 3 échecs = Game Over
🏆 Score basé sur nombre de jours tenus
```

### Mode 3 : "Mode Réaliste"
```
📅 "Basé sur vos vraies données"
🏠 Entrez les appareils de VOTRE maison
💡 Simulez VOTRE consommation
📊 Comparez avec la réalité
```

---

## 🛠️ Priorités d'Implémentation (3 Mois)

### MOIS 1 : Core Gameplay
- ✅ Jours 1-3 (Tutorial + 2 défis simples)
- ✅ Système de temps
- ✅ Appareils cliquables
- ✅ Compteurs de base
- ✅ UI fonctionnelle
- ✅ Système de pénalités basique

### MOIS 2 : Gameplay Avancé
- ✅ Jours 4-5 (Heures creuses + Événements)
- ✅ Système d'objectifs multiples
- ✅ Écrans de résultats avec pénalités
- ✅ Système de score
- ✅ Feedback visuel/audio
- ✅ Pénalités avancées

### MOIS 3 : Polish & Final
- ✅ Jours 6-7 (Expert + Test final)
- ✅ Écran récapitulatif complet
- ✅ Comparaison Belgique
- ✅ Système de badges
- ✅ Menu principal
- ✅ Tests & debugging
- ⚠️ Modes bonus (SI TEMPS)

---

## 💻 CODE UNITY - SYSTÈME DE PÉNALITÉS

```csharp
using UnityEngine;
using System.Collections.Generic;

public class PenaltyManager : MonoBehaviour
{
    public static PenaltyManager Instance { get; private set; }
    
    // Types de pénalités
    [System.Serializable]
    public class Penalty {
        public enum Type {
            None,
            PriceIncrease,      // +% sur les tarifs
            ConsumptionLimit,   // Réduction limite kWh
            ComfortPenalty,     // Démarrage confort réduit
            EquipmentFailure,   // Appareil en panne
            PowerLimit,         // Limitation Watts simultanés
            ProgressLocked      // Jour suivant verrouillé
        }
        
        public Type type;
        public float value;
        public string description;
        public int duration; // En jours
    }
    
    private List<Penalty> activePenalties = new List<Penalty>();
    
    void Awake() {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }
    
    // Appliquer pénalités selon échecs
    public void ApplyPenaltiesForDay(int objectivesFailed, int dayNumber) {
        ClearExpiredPenalties();
        
        if (objectivesFailed == 0) {
            // Succès complet - annuler pénalités
            ClearAllPenalties();
            return;
        }
        
        if (objectivesFailed == 1) {
            // Pénalité légère
            AddPenalty(Penalty.Type.PriceIncrease, 20f, 
                "Facture de rattrapage : tarifs +20%", 1);
        } 
        else if (objectivesFailed == 2) {
            // Pénalités moyennes
            AddPenalty(Penalty.Type.PriceIncrease, 30f, 
                "Facture importante : tarifs +30%", 1);
            AddPenalty(Penalty.Type.ConsumptionLimit, -1f, 
                "Restriction réseau : limite -1 kWh", 1);
        } 
        else if (objectivesFailed >= 3) {
            // Pénalités sévères
            AddPenalty(Penalty.Type.PriceIncrease, 50f, 
                "Facture exceptionnelle : tarifs +50%", 2);
            AddPenalty(Penalty.Type.ComfortPenalty, -40f, 
                "Épuisement : confort démarre à 60%", 1);
            AddPenalty(Penalty.Type.EquipmentFailure, 0f, 
                "Surcharge : appareil en panne", 1);
            AddPenalty(Penalty.Type.ProgressLocked, 0f, 
                "Progression bloquée", 0);
        }
    }
    
    // Ajouter une pénalité
    private void AddPenalty(Penalty.Type type, float value, 
                            string desc, int duration) {
        Penalty penalty = new Penalty {
            type = type,
            value = value,
            description = desc,
            duration = duration
        };
        activePenalties.Add(penalty);
        
        Debug.Log($"⚠️ Pénalité appliquée : {desc}");
    }
    
    // Obtenir modificateur de prix
    public float GetPriceModifier() {
        float modifier = 1f;
        foreach (var penalty in activePenalties) {
            if (penalty.type == Penalty.Type.PriceIncrease) {
                modifier *= (1f + penalty.value / 100f);
            }
        }
        return modifier;
    }
    
    // Obtenir réduction limite consommation
    public float GetConsumptionLimitReduction() {
        float reduction = 0f;
        foreach (var penalty in activePenalties) {
            if (penalty.type == Penalty.Type.ConsumptionLimit) {
                reduction += penalty.value;
            }
        }
        return reduction;
    }
    
    // Obtenir confort de départ
    public float GetStartingComfort() {
        float comfort = 100f;
        foreach (var penalty in activePenalties) {
            if (penalty.type == Penalty.Type.ComfortPenalty) {
                comfort += penalty.value; // value est négatif
            }
        }
        return Mathf.Max(comfort, 40f);
    }
    
    // Vérifier si progression bloquée
    public bool IsProgressLocked() {
        foreach (var penalty in activePenalties) {
            if (penalty.type == Penalty.Type.ProgressLocked) {
                return true;
            }
        }
        return false;
    }
    
    // Nettoyer pénalités expirées
    private void ClearExpiredPenalties() {
        activePenalties.RemoveAll(p => {
            p.duration--;
            return p.duration < 0;
        });
    }
    
    // Annuler toutes pénalités
    public void ClearAllPenalties() {
        activePenalties.Clear();
        Debug.Log("✨ Toutes les pénalités annulées !");
    }
    
    // Obtenir liste pénalités pour UI
    public List<Penalty> GetActivePenalties() {
        return new List<Penalty>(activePenalties);
    }
}
```

---

## ✅ Checklist de Validation Finale

### Fonctionnel ✅
- [ ] Les 7 jours sont jouables
- [ ] Tous les objectifs fonctionnent
- [ ] Système de pénalités opérationnel
- [ ] Comparaison Belgique affichée
- [ ] Les calculs sont corrects (valeurs réalistes)
- [ ] Pas de bugs majeurs

### Pédagogique ✅
- [ ] Messages clairs et compréhensibles
- [ ] Valeurs réalistes (8-10 kWh/jour)
- [ ] Lien avec réalité belge
- [ ] Conseils pertinents
- [ ] Progression logique
- [ ] Feedback immédiat

### Système de Pénalités ✅
- [ ] Pénalités claires et logiques
- [ ] Gravité proportionnelle aux échecs
- [ ] Possibilité de récupération
- [ ] UI indiquant pénalités actives
- [ ] Annulation si succès parfait

### UX/UI ✅
- [ ] Interface intuitive
- [ ] Pas de confusion possible
- [ ] Visuels agréables
- [ ] Sons/animations fluides
- [ ] Écrans de résultats impactants

### Présentation ✅
- [ ] Tutoriel clair (Jour 1)
- [ ] Difficulté progressive
- [ ] Comparaison Belgique visible
- [ ] Écran final impactant avec vraies économies
- [ ] Message écologique positif

---

**🎯 Avec ce système, vous avez un jeu complet, réaliste, progressif, ET avec des vraies conséquences ! Les joueurs vont vraiment apprendre et prendre conscience de leur consommation électrique réelle en Belgique ! 🇧🇪⚡**