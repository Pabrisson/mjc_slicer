---
layout: section
module: 1 · Pourquoi un slicer ?
routeAlias: mod1
---

# Pourquoi un slicer ?

Le fossé entre un fichier et une machine

<!--
Minutage : 5-7 min. Module 1, 12 minutes au total.

Ne pas ouvrir PrusaSlicer tout de suite. Ces 12 minutes sont les seules de la
formation sans logiciel à l'écran, et ce sont les plus rentables : tout le reste
va s'appuyer dessus.

Question d'amorce à la salle : « Vous téléchargez un fichier sur Printables.
Pourquoi ne peut-on pas l'envoyer directement à l'imprimante ? »
Laisser répondre 30 secondes, les réponses sont souvent très bonnes.
-->

---
module: 1 · Pourquoi un slicer ?
---

# Un fichier 3D ne contient aucune instruction

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

Un **STL**, c'est une liste de triangles. Rien d'autre. Appeler "Maillage" ou "Mesh" en anglais.

<v-clicks>

- Une **coque fermée**, comme une peau de ballon
- Pas d'épaisseur, pas de matière, pas de vide
- Aucune notion de **temps**, de **trajet**, de **température**
- Aucune idée de ce qu'est le haut, le bas, de sa position

</v-clicks>

<div v-click class="regle mt-4 p-2">
  <span class="text-sm">
    C'est <strong>le plan d'une maison</strong>, pas la maison. Il décrit une forme, il ne dit pas comment la fabriquer.
  </span>
</div>

</div>

<div>

<Placeholder ref="1.2"
  brief="Capture de PrusaSlicer, vue Plateau, porte-téléphone affiché avec les arêtes visibles, pour qu'on voie nettement le maillage de triangles. Zoomer sur une zone courbe."
  ratio="4/3" maxH="180px" />

<div v-click class="mt-3 text-sm">

| Format          | Ce qu'il transporte                            |
|-----------------|------------------------------------------------|
| **STL/OBJ/FBX** | Seulement le mesh. Le standard, le plus simple |
| **3MF**         | Mesh + réglages d'impression                   |
| **STEP**        | B-Rep exact, assemblages, tolérances           |

</div>

</div>

</div>

<!--
Minutage : 7-9 min.

Le mot clé à faire passer : « approximation ». Un STL approxime une sphère par
des milliers de facettes. C'est pour ça qu'on voit parfois des facettes sur une
pièce imprimée : le défaut vient du fichier, pas de la machine.

Sur les formats : recommander le 3MF dès qu'il est proposé sur Printables. Il
évite l'erreur classique du modèle qui arrive à la mauvaise échelle. PrusaSlicer
enregistre son propre projet en 3MF - c'est le format à garder pour retrouver
ses réglages plus tard.

Ne pas s'étendre sur STEP : mentionner et passer.
-->

---
module: 1 · Pourquoi un slicer ?
layout: two-cols-header
---

# Ce que la machine sait faire

<div class="text-sm opacity-60 -mt-3 mb-4">Quatre verbes. La liste complète.</div>

::left::

<div class="pr-8">

<v-clicks depth="2">

1. **Déplacer** la buse par rapport au plateau - <span class="font-mono text-sm">X</span>, <span class="font-mono text-sm">Y</span>, <span class="font-mono text-sm">Z</span>
2. **Pousser (Extruder) ou tirer (Retracter)** le filament - <span class="font-mono text-sm">E</span>
3. **Chauffer** la buse et le plateau
4. **Ventiler** pour figer la matière déposée

</v-clicks>

<div v-click class="piege mt-8">

Elle ne sait pas ce qu'est **un cube** ou **un cercle**. Elle ne voit rien, ne mesure rien, ne vérifie rien. Elle exécute seulement.

</div>

</div>

::right::

<div class="pl-4">

<Placeholder ref="1.3"
  brief="Photo macro de la buse de la MK2.5S en train de déposer une ligne de PLA sur les premières couches. On doit voir la matière écrasée qui sort et le trait qui se forme derrière. Éclairage latéral pour faire ressortir le relief des couches."
  kind="photo" ratio="4/3" />

<div v-click class="temoin mt-4">

<carbon-idea class="opacity-60" /> **L'analogie** : c'est un stylo à colle chaude monté sur une table traçante. Toute l'intelligence est dans le fichier qu'on lui donne.

</div>

</div>

<!--
Minutage : 9-11 min.

C'est LA slide qui débloque la compréhension. Insister lourdement sur le fait
que la machine est aveugle. Beaucoup de débutants croient que l'imprimante
« corrige » ou « comprend » - d'où des phrases comme « elle a mal imprimé le
trou ». Non : on lui a donné un mauvais trajet.

Corollaire à annoncer maintenant, on y reviendra au module 8 :
si le problème vient du trajet, on le règle dans le slicer.
Si le problème vient de l'exécution, on le règle sur la machine.

Ne pas mentionner les capteurs (filament, première couche) : c'est vrai qu'ils
existent, mais ça brouille le message ici. Si quelqu'un pose la question,
répondre que ce sont des sécurités, pas de la vision.
-->

---
module: 1 · Pourquoi un slicer ?
---

# Le G-code, en vrai

Le langage que la machine comprend : une ligne, une execution.

```asm {all|1|2|3|4-5|all}
G1 Z0.20 F720                    ; monter à la hauteur de la 1re couche (0.20mm)
G1 X85.5 Y92.3 F7200             ; se positionne à ces coordonnées, sans rien extruder
G1 X114.5 Y92.3 E0.9612 F1800    ; tracer 29 mm en poussant 0,96 mm de filament
M104 S215                        ; chauffe la buse : 215 °C
M106 S255                        ; ventilateur à fond
```

<div class="grid grid-cols-3 gap-6 mt-4 text-center">

<div v-click>
  <carbon-layers class="text-4xl mb-0" style="color: var(--prusa-orange)" />
  <div class="text-2xl font-mono mb-2" style="color: var(--prusa-orange)">500</div>
  <div class="text-sm opacity-60">couches pour un cube<br>de 10 cm en 0,2 mm</div>
</div>

<div v-click>
  <carbon-code class="text-4xl mb-0" style="color: var(--prusa-orange)" />
  <div class="text-2xl font-mono mb-2" style="color: var(--prusa-orange)">~1 M</div>
  <div class="text-sm opacity-60">lignes de G-code<br>pour cet objet</div>
</div>

<div v-click>
  <carbon-edit-off class="text-4xl mb-0" style="color: var(--prusa-orange)" />
  <div class="text-2xl font-mono mb-2" style="color: var(--prusa-orange)">0 lignes</div>
  <div class="text-sm opacity-60">que vous écrirez<br>à la main</div>
</div>

</div>

<div v-click class="regle mt-4 p-2">
  <span class="text-sm">
    <strong>Le slicer écrit ce fichier pour vous.</strong> Tout ce qu'on va voir aujourd'hui, ce sont les réglages qui changent ce qu'il écrit.
  </span>
</div>

<!--
Minutage : 11-13 min.

Dérouler les lignes une par une avec les clics - la coloration suit.
Sur la ligne 3, prendre le temps : c'est là que se trouve toute la magie.
« 29 mm de trajet, 0,96 mm de filament » : le slicer a calculé le volume de
matière nécessaire pour remplir ce trait, à cette hauteur de couche, avec
cette largeur d'extrusion. C'est un calcul de volume, fait un million de fois.

Démonstration à faire en direct si le temps le permet (très efficace) :
ouvrir un vrai .gcode dans un éditeur de texte et faire défiler très vite avec
la molette. L'effet « mur de chiffres » marque durablement.
Prévoir le fichier ouvert dans un onglet AVANT la formation.

Attention : ne pas laisser partir la discussion sur la syntaxe G-code.
Le but n'est pas qu'ils sachent lire du G-code, mais qu'ils sachent
qu'il existe et à quoi il ressemble.
-->

---
module: 1 · Pourquoi un slicer ?
layout: two-cols-header
---

# La couche : la contrainte qui explique tout

::left::

<div class="pr-6">

<LayerStack :height="12" :initial="0.2" :reference="60" />

</div>

::right::

<div class="pl-4">

La machine ne fabrique **jamais un volume**. Elle empile des tranches plates.

<v-clicks>

<div class="mt-3">

**On ne peut rien poser sur du vide**<br>
<span class="text-sm opacity-55">→ d'où les supports</span>

</div>

<div>

**Les couches sont collées, pas fondues**<br>
<span class="text-sm opacity-55">→ d'où l'orientation</span>

</div>

<div>

**Une pente devient un escalier**<br>
<span class="text-sm opacity-55">→ d'où la hauteur de couche</span>

</div>

<div>

**La première couche porte tout le reste**<br>
<span class="text-sm opacity-55">→ d'où l'adhérence</span>

</div>

</v-clicks>

<div v-click class="regle mt-4 p-2">
  <span class="text-sm">
    Ces quatre conséquences sont <strong>les quatre chapitres suivants</strong>. Tout découle de cette seule contrainte.
  </span>
</div>

</div>

<!--
Minutage : 13-17 min. On déborde un peu sur le module 2, c'est prévu.

Manipuler le curseur de hauteur de couche en direct : montrer 0,05 puis 0,30
et laisser voir le nombre de couches changer. Cliquer « Empiler » pour
l'animation de construction - ça vaut mille explications.

Faire remarquer le sommet arrondi de la forme : à mesure qu'on monte, chaque
couche déborde un peu de la précédente. C'est exactement le porte-à-faux
qu'on va étudier au module 3. Planter la graine ici.

Les quatre conséquences sont le plan de la suite. Le dire explicitement :
« Vous venez de comprendre le programme des 90 prochaines minutes. »

Si la salle est réactive, poser la question : « À votre avis, dans quel sens
une pièce imprimée est-elle la plus fragile ? » - la réponse (entre les couches)
prépare le crochet du module 3.
-->
