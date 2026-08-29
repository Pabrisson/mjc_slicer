---
layout: section
module: 3 · Poser l'objet
routeAlias: mod3
---

# Poser l'objet

Le geste qui décide de tout

<!--
Minutage : 27-28 min. Module 3, 15 minutes.

Annoncer le poids du module : « Si vous ne devez retenir qu'une chose de ces
2 heures, c'est ce qui suit. L'orientation coûte zéro seconde et zéro gramme,
et c'est ce qui a le plus d'effet sur le résultat. »
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# Déplacer, mettre à l'échelle, tourner

::left::

<div class="pr-6">

<v-clicks>

- <KeyCap k="M" /> **Déplacer** - ou glisser à la souris
- <KeyCap k="S" /> **Échelle** - en % ou en millimètres
- <KeyCap k="R" /> **Rotation** - par axe, ou à l'angle exact
- <KeyCap k="A" /> **Ranger** tous les objets automatiquement

</v-clicks>

<div v-click class="regle mt-6 text-sm">

Toutes ces valeurs sont saisissables **au clavier** dans le panneau de droite. Pour un angle ou une cote précise, ne jamais tirer à la souris.

</div>

</div>

::right::

<div class="pl-4">

## Trois pièges classiques

<v-clicks>

<div class="piege mb-2 text-sm">
<strong>Le modèle est 25 fois trop petit</strong><br>
<span class="text-xs">Un STL dessiné en pouces. Mettre l'échelle à <span class="font-mono">2540 %</span>. PrusaSlicer propose souvent la correction : accepter.</span>
</div>

<div class="piege mb-2 text-sm">
<strong>La pièce dépasse du plateau</strong><br>
<span class="text-xs">Elle passe en gris et le bouton Découper se bloque. Réduire, tourner de 45° sur le plateau, ou couper en deux.</span>
</div>

<div class="piege text-sm">
<strong>Dix objets d'un coup</strong><br>
<span class="text-xs">Plus de déplacements, plus de fils entre les pièces, et si une se décolle elle promène les autres. Commencer par une.</span>
</div>

</v-clicks>

</div>

<!--
Minutage : 28-31 min.

Le coup des pouces arrive vraiment souvent avec les modèles américains de
Thingiverse. Le montrer : ouvrir un modèle, le voir minuscule, appliquer 2540 %.

Sur l'échelle : rappeler que le PLA se rétracte d'environ 0,3 % en refroidissant.
Sur 100 mm, ça fait 0,3 mm. Ne pas compenser à l'échelle - ce n'est pas le bon
levier, et on verra le vrai au module 5 avec la boîte.

Sur les objets multiples : si quelqu'un demande, dire qu'on peut imprimer
« un objet à la fois » (l'imprimante finit une pièce avant de commencer la
suivante), mais que c'est risqué en hauteur avec le portique. Ne pas s'étendre.
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# « Placer sur la face » - le bouton oublié

::left::

<div class="pr-6">

<div class="text-6xl font-mono my-4" style="color: var(--prusa-orange)">
  <KeyCap k="F" />
</div>

On clique sur **une face de l'objet**, elle se retrouve à plat sur le plateau.

<v-clicks>

- Pas de rotation à 89,97° saisie à la main
- Pas de pièce « posée » 0,05 mm au-dessus du vide
- Fonctionne sur n'importe quelle face, même inclinée

</v-clicks>

<div v-click class="regle mt-6 text-sm">

Le réflexe : **on ouvre un fichier, on appuie sur <KeyCap k="F" />, on choisit la face qui doit toucher le plateau.** Ensuite seulement on réfléchit au reste.

</div>

</div>

::right::

<div class="pl-4">

<Placeholder ref="3.3"
  brief="Copie d'écran de PrusaSlicer avec l'outil « Placer sur la face » actif sur le porte-téléphone : les faces sélectionnables apparaissent surlignées en orange sur le modèle. Prendre le moment où le curseur survole une face."
  ratio="4/3" />

<div v-click class="mt-4 text-sm opacity-60">

Vérifier ensuite dans le panneau de droite que la position <span class="font-mono">Z</span> vaut bien <span class="font-mono">0</span>. Un objet enfoncé de 0,2 mm dans le plateau perd sa première couche.

</div>

</div>

<!--
Minutage : 31-33 min.

Petit sondage à main levée : « Qui connaissait cette touche ? »
En général deux ou trois mains sur vingt. C'est un bon moment de la formation.

Démonstration : prendre le porte-téléphone, le faire tourner n'importe comment
avec R, puis appuyer sur F et cliquer sur le dos. Il se repose proprement.

Le point sur Z = 0 est important : quand on tourne un objet, PrusaSlicer le
repose normalement tout seul, mais après un « couper » ou un import multiple
ce n'est pas toujours le cas.
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# Le crochet : pourquoi il casse

<div class="text-sm opacity-60 -mt-3 mb-3">Premier objet témoin - l'anisotropie</div>

::left::

<div class="pr-6">

<Placeholder ref="3.4"
  brief="Deux crochets identiques côte à côte sur fond neutre : à gauche celui imprimé à plat, cassé net à la base, cassure bien visible entre deux couches. À droite celui imprimé debout, intact, avec un poids accroché. Lumière rasante."
  kind="photo" ratio="4/3" maxH="165px" />

</div>

::right::

<div class="pl-4">

<div class="text-sm">

Les couches sont **collées** par refusion partielle, pas fondues.

</div>

<v-clicks>

<div class="mt-2 text-sm">

Une pièce résiste **environ deux fois moins** dans l'axe vertical que dans le plan des couches.

</div>

<div class="piege mt-2 text-sm">

**Couché à plat**, la charge tire perpendiculairement aux couches et les décolle une par une. Il casse net, toujours au même endroit.

</div>

<div class="regle mt-2 text-sm">

**Debout**, le même effort travaille dans le plan des couches. Le crochet tient plusieurs kilos.

</div>

</v-clicks>

<div v-click class="mt-2 text-sm font-semibold" style="color: var(--prusa-orange)">

Orienter pour que l'effort ne cherche jamais à séparer deux couches.

</div>

</div>

<!--
Minutage : 33-36 min.

Faire circuler les deux crochets réels dans la salle. C'est le moment le plus
concret de la formation - ne pas le sacrifier au minutage.

Le vocabulaire « anisotrope » peut être dit une fois, puis abandonné. Ce qui
compte est l'image : un paquet de feuilles collées, pas un bloc de plastique.

Question fréquente : « on peut renforcer avec plus de remplissage ? »
Réponse : non, pas dans ce sens-là. Le remplissage ne recolle pas les couches
entre elles. On y revient au module 5, c'est un bon rappel à préparer.

Deuxième question fréquente : « et les pièces vendues imprimées en 3D ? »
Elles sont orientées exprès, souvent avec des supports coûteux, justement
pour cette raison.
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# La règle des 45°

<div class="text-sm opacity-60 -mt-3 mb-2">Chaque couche doit reposer sur celle d'en dessous. Faites glisser.</div>

::left::

<div class="pr-6">

<OverhangDial />

</div>

::right::

<div class="pl-4 text-sm">

<v-clicks>

<div>

Chaque couche est décalée de **hauteur × tan(angle)**. Comparé à la largeur d'extrusion (0,45 mm), ça donne la part qui part dans le vide.

</div>

<div class="mt-3">

À **45°**, la moitié de chaque trait repose encore sur le précédent. C'est la limite pratique, pas une loi de la physique.

</div>

<div class="regle mt-3">

**Les ponts sont une exception.** Entre deux appuis, la buse tend un fil et le ventilateur le fige. PrusaSlicer le détecte tout seul et bascule en mode pont. Ça marche jusqu'à 5 cm environ.

</div>

<div class="piege mt-3">

**Les trous horizontaux** sont des porte-à-faux à 90°. Le sommet d'un trou de vis s'affaisse toujours un peu - un trou de 5 mm sort à 4,7 mm en haut. Percer après coup, ou dessiner le trou en forme de goutte.

</div>

</v-clicks>

</div>

<!--
Minutage : 36-39 min.

Manipuler le curseur en direct de 0 à 75° et laisser la salle voir le verdict
changer de couleur. S'arrêter sur 45 : « voilà d'où vient le chiffre ».

Nuance à donner si la salle est attentive : la limite dépend de la hauteur de
couche. En 0,1 mm le décalage est deux fois plus petit, donc on tient des angles
plus agressifs. C'est pour ça qu'imprimer plus fin fait parfois disparaître un
besoin de supports.

Ne pas rentrer dans le calcul. Le montrer, pas le démontrer.
-->

---
module: 3 · Poser l'objet
---

# Le porte-téléphone : quelle orientation ?

<div class="text-sm opacity-60 -mt-3 mb-2">Quatre critères, et ils se contredisent tous.</div>

<div class="grid grid-cols-3 gap-4">

<div v-click>
<Placeholder ref="3.6a" brief="Le porte-téléphone à plat sur le plateau, dos contre la surface. Vue 3/4 dans PrusaSlicer." ratio="4/3" maxH="112px" />
<div class="text-center text-sm font-semibold mt-1">À plat sur le dos</div>
</div>

<div v-click>
<Placeholder ref="3.6b" brief="Le même, dressé debout sur sa base, avec les supports visibles sous la partie inclinée." ratio="4/3" maxH="112px" />
<div class="text-center text-sm font-semibold mt-1">Debout</div>
</div>

<div v-click>
<Placeholder ref="3.6c" brief="Le même, couché sur le flanc. Orientation intermédiaire." ratio="4/3" maxH="112px" />
<div class="text-center text-sm font-semibold mt-1">Sur le flanc</div>
</div>

</div>

<div v-click class="mt-3 text-sm">

| | À plat | Debout | Sur le flanc |
|---|:---:|:---:|:---:|
| **Supports** | aucun | beaucoup | un peu |
| **Face visible** | contre le plateau | parfaite | correcte |
| **Solidité** | faible | bonne | bonne |
| **Temps** | court | long | moyen |

</div>

<div v-click class="regle mt-1.5 text-xs">

Pas de bonne orientation dans l'absolu, mais une orientation qui **privilégie le critère qui compte pour cet objet-là**.

</div>

<!--
Minutage : 39-42 min. Fin du module 3.

Faire voter la salle à main levée sur les trois orientations avant de montrer
le tableau. Il y a rarement consensus - c'est exactement le message.

Pour ce porte-téléphone précis, trancher devant eux et assumer : « moi je le
mets à plat, parce que la face qui touche le plateau ne se voit pas une fois
posé sur le bureau, et je préfère zéro support ». Une décision argumentée
enseigne mieux qu'une règle.

Rappeler au passage la texture : une pièce posée sur un plateau lisse ressort
brillante, sur un plateau texturé elle ressort granuleuse. C'est un critère
d'orientation à part entière.

Transition vers le module 4 : « L'objet est posé. Maintenant, avec quelle
finesse le fabrique-t-on ? »
-->
