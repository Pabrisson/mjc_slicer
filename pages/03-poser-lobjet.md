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
- <KeyCap k="A" /> **Aligner** tous les objets automatiquement

</v-clicks>

<div v-click class="regle mt-6 text-sm">

Toutes ces valeurs sont saisissables **au clavier** dans le panneau de droite. Pour un angle ou une cote précise, priviligier le clavier.

</div>

</div>

::right::

<div class="pl-4">

## Trois pièges classiques {v-click}

<v-clicks>

<div class="piege mb-3 mt-4 text-sm">
<strong>Le modèle est 25 fois trop petit</strong><br>
<span class="text-xs">Un STL modélisé en pouces. Solution: Mettre l'échelle à <span class="font-mono">2540 %</span>. PrusaSlicer propose souvent la correction : accepter.</span>
</div>

<div class="piege mb-3 text-sm">
<strong>La pièce dépasse du plateau</strong><br>
<span class="text-xs">Elle passe en gris et le bouton Découper se bloque. Solution: Réduire, tourner de 45° sur le plateau, ou couper en deux.</span>
</div>

<div class="piege text-sm">
<strong>Dix objets d'un coup</strong><br>
<span class="text-xs">Plus de déplacements, plus de fils entre les pièces, et si une se décolle elle promène les autres. Solution: Commencer par une.</span>
</div>

</v-clicks>

</div>

<!--
Minutage : 28-31 min.

Le coup des pouces arrive vraiment souvent avec les modèles américains de
Thingiverse. Le montrer : ouvrir un modèle, le voir minuscule, appliquer 2540 %.

Sur l'échelle : rappeler que le PLA se rétracte d'environ 0.3 % en refroidissant.
Sur 100 mm, ça fait 0.3 mm. Ne pas compenser à l'échelle - ça déforme tout
l'objet. Un ajustement se prévoit à la modélisation, pas au moment de poser.

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

<div class="text-2xl font-mono my-4" style="color: var(--prusa-orange)">
  <KeyCap k="F" />
</div>

On clique sur **une face de l'objet**, elle se retrouve à plat sur le plateau.

<v-clicks>

- Pas de rotation à 89.97° saisie à la main
- Pas de pièce « posée » 0.05 mm au-dessus du vide
- Fonctionne sur n'importe quelle face, même inclinée

</v-clicks>

</div>

::right::

<div class="pl-4">

<Figure refId="3.3"
  src="/img/3.3-placer-sur-face.png"
  credit="Prusa Research - Knowledge Base"
  alt="Le modèle affiche ses faces sélectionnables en vert ; la face survolée par le curseur est en orange."
  brief="Copie d'écran de PrusaSlicer avec l'outil « Placer sur la face » actif : les faces sélectionnables apparaissent surlignées sur le modèle. Prendre le moment où le curseur survole une face."
  ratio="1/1" maxH="230px" />

<div v-click class="regle mt-2 text-sm">

Le réflexe : **on ouvre un fichier, on appuie sur <KeyCap k="F" />, on choisit la face qui doit toucher le plateau.** Ensuite seulement on réfléchit au reste.

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

<AnisotropyBreak />

</div>

::right::

<div class="pl-4">

<div class="text-sm">

Les couches sont **collées** par refusion partielle, pas fondues.
Une pièce résiste **environ deux fois moins** dans l'axe vertical que dans le plan des couches.

</div>

<v-clicks>

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

<div class="text-sm opacity-60 -mt-3 mb-6">Chaque couche doit reposer sur celle d'en dessous.</div>

::left::

<div class="pr-6">

<OverhangDial />

</div>

::right::

<div class="pl-4 text-sm">

<v-clicks>

<div>

À **45°**, la moitié de chaque trait repose encore sur le précédent. C'est la limite pratique, pas une loi de la physique.

</div>

<div class="mt-3">

Chaque couche est décalée de **hauteur × tan(angle)**. Comparé à la largeur d'extrusion (0.45 mm), ça donne la part qui part dans le vide.

</div>

<div class="regle mt-3">

**Les ponts sont une exception.** Entre deux appuis, la buse tend un fil et le ventilateur le fige. PrusaSlicer le détecte tout seul et bascule en mode pont.

</div>

</v-clicks>

</div>

<!--
Minutage : 36-39 min.

Manipuler le curseur en direct de 0 à 75° et laisser la salle voir le verdict
changer de couleur. S'arrêter sur 45 : « voilà d'où vient le chiffre ».

Nuance à donner si la salle est attentive : la limite dépend de la hauteur de
couche. En 0.1 mm le décalage est deux fois plus petit, donc on tient des angles
plus agressifs. C'est pour ça qu'imprimer plus fin fait parfois disparaître un
besoin de supports.

Ne pas rentrer dans le calcul. Le montrer, pas le démontrer.
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# Le porte-téléphone : quelle orientation ?

<div class="text-sm opacity-60 -mt-3 mb-3">Option 1 sur 3 - à plat sur le dos</div>

::left::

<div class="pr-6">

<OrientationPose pose="plat" />

</div>

::right::

<div class="pl-4 text-sm">

<div v-click class="pb-4">

| | |
|---|:--|
| **Supports** | beaucoup |
| **Solidité** | faible |
| **Temps** | court |

</div>

<div v-click class="mt-4">
<Verdict
  :pour="['L\'impression **la plus courte** des trois : 47 mm de haut', 'Peu de couches, donc peu de risques de décollement']"
  :contre="['La semelle part **en porte-à-faux** : des supports à retirer', 'Le poids tire dans le sens qui **décolle les couches**']" />
</div>

</div>

<!--
Minutage : 39-40 min.

Annoncer les trois orientations avant de les dérouler : « le même fichier, trois
façons de le poser, et on va regarder les quatre mêmes critères à chaque fois. »

Avant d'afficher le tableau, faire voter à main levée : « celle-là, elle demande
des supports ou pas ? » Le vote sur les trois orientations n'a jamais de
consensus - c'est exactement le message qu'on veut installer.

La texture est un critère d'orientation à part entière : une pièce posée sur un
plateau lisse ressort brillante, sur un plateau texturé elle ressort granuleuse.
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# Le porte-téléphone : quelle orientation ?

<div class="text-sm opacity-60 -mt-3 mb-3">Option 2 sur 3 - debout sur sa base</div>

::left::

<div class="pr-6">

<OrientationPose pose="debout" />

</div>

::right::

<div class="pl-4 text-sm">

<div v-click class="pb-4">

| | |
|---|:--|
| **Supports** | beaucoup |
| **Solidité** | bonne |
| **Temps** | long |

</div>

<div v-click class="mt-4">
<Verdict
  :pour="['La belle face ne touche **jamais le plateau**', 'L\'effort travaille dans le plan des couches']"
  :contre="['Des supports partout : **temps et matière**', 'Des marques là où ils se détachent']" />
</div>

</div>

<!--
Minutage : 40-41 min.

Le point à faire passer : les supports ne sont pas gratuits. Ils rallongent
l'impression, consomment du filament qui part à la poubelle, et la surface qu'ils
touchent ressort toujours plus rugueuse. On les détaillera au module 5.

Si la salle a voté « debout » en majorité, c'est le moment de le souligner :
l'orientation la plus jolie n'est pas forcément celle qu'on garde.
-->

---
module: 3 · Poser l'objet
layout: two-cols-header
---

# Le porte-téléphone : quelle orientation ?

<div class="text-sm opacity-60 -mt-3 mb-3">Option 3 sur 3 - couché sur le flanc</div>

::left::

<div class="pr-6">

<OrientationPose pose="flanc" />

</div>

::right::

<div class="pl-4 text-sm">

<div v-click="1" class="pb-4">

| | |
|---|:--|
| **Supports** | aucun |
| **Solidité** | bonne |
| **Temps** | long |

</div>

<div v-click="2" class="mt-4">
<Verdict
  :pour="['**Aucun support** : rien à retirer, rien à poncer', 'L\'orientation que **l\'auteur du modèle** recommande']"
  :contre="['La pièce est la plus haute des trois : **104 mm de couches à empiler**']" />
</div>

</div>

<!--
Minutage : 41-42 min. Fin du module 3.

Revenir en arrière sur les trois slides pour comparer les tableaux, maintenant
que la salle les a tous vus. C'est le moment de la synthèse.

Pour ce porte-téléphone précis, trancher devant eux et assumer : « moi je le
mets sur le flanc, parce que c'est la seule des trois où rien ne surplombe -
je préfère une impression plus longue à une soirée passée à retirer des
supports ». Une décision argumentée enseigne mieux qu'une règle.

Si quelqu'un objecte que « à plat » a l'air plus économique : c'est vrai en
hauteur, faux en matière. La pièce est basse mais toute sa semelle est en
l'air. C'est exactement le piège que le module veut désamorcer - on juge une
orientation à sa hauteur, jamais à ce qu'elle laisse dans le vide.

Transition vers le module 4 : « L'objet est posé. Maintenant, avec quelle
finesse le fabrique-t-on ? »
-->
