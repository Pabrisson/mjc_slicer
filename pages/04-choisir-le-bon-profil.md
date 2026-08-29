---
layout: section
module: 4 · Choisir le bon profil
routeAlias: mod4
---

# Choisir le bon profil

Finesse, matière, et le paquet de réglages qu'on ne voit pas

<!--
Minutage : 42-43 min. Module 4, 12 minutes.
-->

---
module: 4 · Choisir le bon profil
---

# La hauteur de couche

<div class="text-sm opacity-60 -mt-3 mb-3">Deuxième objet témoin : la figurine. Un détail de 6 mm, vu de profil et fortement agrandi.</div>

<LayerHeightCompare :heights="[0.35, 0.2, 0.1]" :part="40" :detail="6" />

<div class="grid grid-cols-2 gap-8 mt-3">

<div v-click>

<div class="regle text-sm">

**La règle de la buse** : on ne dépasse pas **75 à 80 % du diamètre**. Avec une buse 0,4 mm, le profil FAST à 0,35 mm est déjà la limite haute. Au-delà, la matière ne s'écrase plus sur la couche précédente.

</div>

</div>

<div v-click>

<div class="piege text-sm">

**Le piège de l'intuition** : « plus fin = mieux » est faux la moitié du temps. Sur un **mur vertical**, 0,35 et 0,10 mm donnent le même résultat, pour trois fois le temps. La finesse ne se voit que sur les **surfaces inclinées et courbes**.

</div>

</div>

</div>

<div v-click class="mt-2 text-center text-sm">

<span class="opacity-60">Le choix par défaut raisonnable&nbsp;:</span>
<span class="font-mono text-lg mx-2" style="color: var(--prusa-orange)">0,20 mm</span>
<span class="opacity-60">on descend à 0,10 pour une figurine, on monte à 0,35 pour un brouillon.</span>

</div>

<!--
Minutage : 43-47 min.

Le schéma est un quart de cercle vu de profil : c'est la joue d'une figurine.
Faire remarquer que le trait pointillé (la forme voulue) et les marches (ce
qu'on fabrique) s'écartent d'autant plus que la couche est épaisse.

Faire circuler deux impressions réelles de la même figurine, une en 0,30 et une
en 0,15. C'est immédiat au toucher, encore plus qu'à l'œil.

Le rapport de temps : passer de 0,20 à 0,10 ne double pas tout à fait le temps
(les déplacements et le remplissage ne doublent pas), mais ×1,8 est une bonne
approximation à annoncer.

Question fréquente : « et 0,05 mm ? » - possible avec la buse 0,4, mais le
temps explose et la moindre poussière se voit. Réservé aux très petites pièces.
-->

---
module: 4 · Choisir le bon profil
layout: two-cols-header
---

# Les profils de la MK2.5S

<div class="text-sm opacity-60 -mt-3 mb-2">Le nom dit la hauteur de couche, puis l'intention.</div>

::left::

<div class="pr-6">

<v-clicks>

<div class="text-xs">

| Profil | Pour quoi |
|---|---|
| `0.05mm ULTRADETAIL` | Miniatures. Très long |
| `0.10mm DETAIL` | Figurines, courbes visibles |
| `0.15mm OPTIMAL` | Le bon compromis |
| `0.20mm NORMAL` | Le défaut. La plupart des pièces |
| `0.35mm FAST` | Brouillon, pièce cachée |

</div>

</v-clicks>

<div v-click class="mt-2 text-sm opacity-60">

Cinq profils, une seule différence de fond : la finesse.

</div>

</div>

::right::

<div class="pl-4">

<Placeholder ref="4.3"
  brief="Copie d'écran de la liste déroulante « Réglages d'impression » de PrusaSlicer, ouverte, montrant les cinq profils de la MK2.5S avec buse 0,4 : 0.05mm ULTRADETAIL, 0.10mm DETAIL, 0.15mm OPTIMAL, 0.20mm NORMAL, 0.35mm FAST."
  ratio="4/3" maxH="165px" />

</div>

::bottom::

<div v-click class="regle mt-2 mx-2 text-sm">

Un profil, c'est **plus de 300 réglages cohérents entre eux**, testés par Prusa sur cette machine. Le choisir, c'est hériter de milliers d'heures d'essais. En modifier un au hasard, c'est casser cet équilibre.

</div>

<!--
Minutage : 47-50 min.

Le message central du module est dans l'encadré du bas. Le dire lentement.

Beaucoup de débutants bricolent des réglages alors que le bon geste est presque
toujours : changer de profil. Formuler le réflexe : « Avant de toucher un
réglage, existe-t-il déjà un profil pour ce que je veux ? »

Ouvrir la liste en direct et faire défiler. Faire remarquer que les profils
d'autres buses n'apparaissent pas : c'est le filtrage vu au module 2.

Note technique si la question vient : 0.35 mm avec une buse 0,4 représente
87 % du diamètre. C'est au-delà de la règle des 75-80 %, et c'est pour ça que
FAST est un profil de brouillon, pas un profil rapide « gratuit ».
-->

---
module: 4 · Choisir le bon profil
layout: two-cols-header
---

# PLA ou PETG ?

<div class="text-sm opacity-60 -mt-3 mb-3">Les deux matières de la MJC. Tout le reste attendra.</div>

::left::

<div class="pr-6">

<div class="temoin" style="border-color: var(--prusa-orange)">

## PLA
<span class="text-xs opacity-50 font-mono">215 °C · plateau 60 °C</span>

<v-clicks>

- Le plus **facile** : ça colle, ça ne gondole pas
- **Rigide** et précis - les cotes sortent justes
- **Cassant** : il rompt net, sans prévenir
- <span class="text-red-500">Ramollit dès 55 °C</span> - jamais dans une voiture au soleil

</v-clicks>

</div>

</div>

::right::

<div class="pl-4">

<div class="temoin">

## PETG
<span class="text-xs opacity-50 font-mono">240 °C · plateau 85 °C</span>

<v-clicks>

- **Tenace** : il plie avant de casser
- Résiste à la **chaleur** (~80 °C) et à l'humidité
- **File** beaucoup - des fils entre les pièces
- <span class="text-red-500">Colle trop au plateau lisse</span> - il arrache le PEI

</v-clicks>

</div>

</div>

::bottom::

<div v-click class="regle mt-5 mx-2">

**Changer de filament = changer le profil de filament.** Pas ajuster la température à la main. Le profil PETG modifie la ventilation, la rétraction, le débit et la première couche en même temps - une dizaine de réglages liés que personne ne retrouvera un par un.

</div>

<!--
Minutage : 50-54 min. Fin du module 4.

Faire circuler une pièce PLA et une pièce PETG. La différence au pliage est
spectaculaire : le PLA casse, le PETG blanchit et plie.

L'anecdote de la voiture au soleil marche à tous les coups : un support de
téléphone en PLA laissé sur un tableau de bord se retrouve en flaque. C'est
LE cas où il faut du PETG.

Sur le PETG et le plateau lisse : c'est un vrai risque matériel à la MJC.
Insister. Sur plateau texturé, aucun souci. Sur plateau lisse, il faut de la
colle en bâton comme agent de démoulage - contre-intuitif mais c'est ça.

Si on demande l'ASA, le TPU, le nylon : dire qu'ils existent, qu'ils demandent
un caisson ou une machine dédiée, et que les principes du jour s'appliquent
pareil. Ne pas ouvrir le sujet.
-->
