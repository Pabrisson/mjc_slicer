---
layout: section
module: 5 · Les 5 réglages
routeAlias: mod5
---

# Les 5 réglages qui comptent

Et les trois cents autres qu'on laisse tranquilles

<!--
Minutage : 54-55 min. Module 5, 25 minutes - le plus long.

C'est le moment de la pause si la salle fatigue : 5 minutes avant d'attaquer,
ou juste après les supports. Le module se coupe bien en deux.
-->

---
module: 5 · Les 5 réglages
---

# La carte du module

<div class="grid grid-cols-5 gap-3 mt-8 text-center text-sm">

<div v-click class="temoin">
<div class="text-2xl mb-1"><carbon-square-outline style="color: var(--prusa-orange)" /></div>
<strong>Périmètres</strong>
<div class="text-xs opacity-55 mt-1">l'épaisseur des murs</div>
</div>

<div v-click class="temoin">
<div class="text-2xl mb-1"><carbon-grid style="color: var(--prusa-orange)" /></div>
<strong>Remplissage</strong>
<div class="text-xs opacity-55 mt-1">ce qu'il y a dedans</div>
</div>

<div v-click class="temoin">
<div class="text-2xl mb-1"><carbon-layers style="color: var(--prusa-orange)" /></div>
<strong>Couches pleines</strong>
<div class="text-xs opacity-55 mt-1">le dessus et le dessous</div>
</div>

<div v-click class="temoin">
<div class="text-2xl mb-1"><carbon-tree-view-alt style="color: var(--prusa-orange)" /></div>
<strong>Supports</strong>
<div class="text-xs opacity-55 mt-1">l'échafaudage jetable</div>
</div>

<div v-click class="temoin">
<div class="text-2xl mb-1"><carbon-align-box-bottom-center style="color: var(--prusa-orange)" /></div>
<strong>Adhérence</strong>
<div class="text-xs opacity-55 mt-1">tenir au plateau</div>
</div>

</div>

<div v-click class="mt-10">

Ces cinq-là sont dans le panneau de droite, **sans même ouvrir les onglets de réglages**. Ils couvrent l'écrasante majorité des ajustements qu'un débutant a besoin de faire.

</div>

<div v-click class="regle mt-4">

Les autres - températures, vitesses, rétraction, ventilation, accélérations - sont réglés par les profils. On verra à la fin du module **pourquoi il faut leur ficher la paix**.

</div>

<!--
Minutage : 55-57 min.

Poser le contrat du module : cinq réglages, un par un, avec à chaque fois
« ce que ça fait », « la bonne valeur », « l'erreur classique ».

Insister sur le fait qu'ils sont tous accessibles depuis le panneau de droite
en mode Avancé. Beaucoup croient qu'il faut plonger dans les onglets.
-->

---
module: 5 · Les 5 réglages
layout: two-cols-header
---

# 1 · Les périmètres

<div class="text-sm opacity-60 -mt-3 mb-2">Le nombre de murs que la buse trace sur le contour, à chaque couche.</div>

::left::

<div class="pr-6">

<PerimeterGap />

</div>

::right::

<div class="pl-4 text-sm">

<v-clicks>

<div>

Avec une buse de 0,4 mm, un trait fait **0,45 mm de large**. Deux périmètres, c'est **0,9 mm de mur**. Un mur ne peut pas être plus fin qu'un trait.

</div>

<div class="regle mt-3">

**La solidité vient des périmètres, pas du remplissage.** Passer de 2 à 3 périmètres coûte quelques minutes et raidit énormément. Passer le remplissage de 15 à 40 % coûte le double du temps pour beaucoup moins.

</div>

<div class="mt-3 flex gap-2 text-xs">
  <span class="temoin flex-1 text-center">Déco, boîtier<br><strong class="text-lg" style="color: var(--prusa-orange)">2</strong></span>
  <span class="temoin flex-1 text-center">Pièce manipulée<br><strong class="text-lg" style="color: var(--prusa-orange)">3</strong></span>
  <span class="temoin flex-1 text-center">Pièce qui force<br><strong class="text-lg" style="color: var(--prusa-orange)">4 à 5</strong></span>
</div>

</v-clicks>

</div>

<!--
Minutage : 57-60 min.

Manipuler le curseur « Périmètres » : montrer que le mur grossit par bonds de
0,45 mm. Ce n'est pas continu, et c'est la clé de la slide suivante.

L'affirmation « la solidité vient des périmètres » est contre-intuitive et
mérite d'être martelée. C'est probablement la meilleure économie de temps
d'impression que la salle emportera aujourd'hui.

Ne pas encore parler du jeu - le deuxième curseur sert à la slide suivante.
Si quelqu'un l'a repéré, dire « on y arrive tout de suite ».
-->

---
module: 5 · Les 5 réglages
layout: two-cols-header
---

# Le couvercle qui ne rentre pas

<div class="text-sm opacity-60 -mt-3 mb-2">Troisième objet témoin : la boîte. Le classique absolu du débutant.</div>

::left::

<div class="pr-6">

<Placeholder ref="5.4"
  brief="Photo d'une boîte imprimée avec son couvercle : deux exemplaires côte à côte. À gauche un couvercle bloqué à mi-course, forcé, avec une trace blanche de contrainte. À droite le même qui se ferme proprement, tenu entre deux doigts. Fond neutre."
  kind="photo" ratio="4/3" />

</div>

::right::

<div class="pl-4 text-sm">

Sur l'écran de dessin, les deux pièces se touchent **exactement**. À l'impression, elles sont soudées.

<v-clicks>

<div class="mt-3">

Trois causes qui s'additionnent :

</div>

- La matière **s'écrase et déborde** légèrement de son trait
- La pièce **se rétracte** en refroidissant, mais pas partout pareil
- Les coins intérieurs sont **arrondis** par le diamètre de la buse

<div class="regle mt-3">

**Prévoir le jeu au dessin : 0,2 mm** pour un ajustement juste, **0,3 mm** pour une pièce qui doit coulisser. C'est une règle de conception, pas un réglage de slicer.

</div>

<div class="mt-3 opacity-60 text-xs">

En mode Expert, <span class="font-mono">Compensation de la taille XY</span> permet de rattraper globalement une pièce déjà dessinée. À utiliser en dernier recours : ça déforme tout l'objet.

</div>

</v-clicks>

</div>

<!--
Minutage : 60-63 min.

Faire circuler les deux boîtes. Le « clac » du bon couvercle est très
satisfaisant, et la boîte forcée avec sa marque blanche parle d'elle-même.

Le point à faire passer : ce n'est PAS un défaut de l'imprimante, et ce n'est
pas non plus un réglage à trouver. C'est une donnée physique du procédé qu'on
anticipe au moment du dessin. Un objet téléchargé bien conçu a déjà ce jeu.

Si quelqu'un demande pourquoi les modèles de Printables s'emboîtent bien :
justement, l'auteur a prévu le jeu. Et quand ça ne marche pas, c'est souvent
que le modèle a été dessiné pour une autre machine.

Le curseur « jeu » du schéma précédent illustre bien : le passer de 0 à 0,2
en direct.
-->

---
module: 5 · Les 5 réglages
layout: two-cols-header
---

# 2 · Le remplissage

<div class="text-sm opacity-60 -mt-3 mb-2">La structure interne. Jamais visible, souvent surestimée.</div>

::left::

<div class="pr-6">

<InfillDemo />

</div>

::right::

<div class="pl-4 text-sm">

<v-clicks>

<div class="piege">

**L'erreur la plus fréquente de la formation** : mettre 50 % « pour que ce soit solide ». On double le temps et la matière pour un gain de résistance quasi nul.

</div>

<div class="mt-3 flex gap-2 text-xs">
  <span class="temoin flex-1 text-center">Déco, figurine<br><strong class="text-base" style="color: var(--prusa-orange)">10 - 15 %</strong></span>
  <span class="temoin flex-1 text-center">Usage courant<br><strong class="text-base" style="color: var(--prusa-orange)">15 - 20 %</strong></span>
  <span class="temoin flex-1 text-center">Pièce qui force<br><strong class="text-base" style="color: var(--prusa-orange)">25 %</strong></span>
</div>

<div class="regle mt-3">

Besoin de solidité ? **Ajouter un périmètre avant d'ajouter du remplissage.** Toujours.

</div>

<div class="mt-3 opacity-60 text-xs">

**0 %** donne une coque creuse - parfait pour un objet décoratif, à condition d'augmenter les couches pleines du dessus qui n'ont plus rien pour reposer.

</div>

</v-clicks>

</div>

<!--
Minutage : 63-66 min.

Manipuler les trois motifs et le curseur. Faire remarquer la barre verte
(solidité) qui plafonne alors que la barre orange (temps) continue à monter :
c'est tout le message en une image.

Sur les motifs : Gyroïde est le défaut de Prusa depuis des années et il n'y a
presque jamais de raison d'en changer. Le mentionner et passer - c'est le genre
de sujet où une salle peut s'enliser une demi-heure.

Rappel utile ici, en écho au module 3 : le remplissage ne recolle pas les
couches entre elles. Une pièce mal orientée avec 100 % de remplissage casse
quand même. L'orientation d'abord, toujours.
-->

---
module: 5 · Les 5 réglages
layout: two-cols-header
---

# 3 · Les couches pleines

<div class="text-sm opacity-60 -mt-3 mb-2">Le dessus et le dessous : les seules surfaces qu'on regarde vraiment.</div>

::left::

<div class="pr-6 text-sm">

<v-clicks>

<div>

Sous le remplissage et au-dessus de lui, le slicer pose des **couches pleines** pour fermer l'objet.

</div>

<div class="regle mt-3">

**La règle du millimètre** : il faut environ **1 mm de matière pleine** au-dessus. En 0,20 mm, ça fait **5 couches**. En 0,15 mm, il en faut **7**. Le nombre change avec la hauteur de couche.

</div>

<div class="mt-3">

Les valeurs Prusa par défaut, en 0,20 mm :

</div>

<div class="font-mono text-center text-lg my-2" style="color: var(--prusa-orange)">
5 dessus · 4 dessous
</div>

<div class="opacity-60 text-xs">

Moins dessous, parce que la première couche est déjà pleine et écrasée sur le plateau.

</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<Placeholder ref="5.6"
  brief="Photo en lumière rasante du dessus d'une pièce ratée par « pillowing » : trous et bosses, on devine le remplissage dessous. À côté, la même réussie, surface lisse."
  kind="photo" ratio="4/3" maxH="185px" />

<div v-click class="piege mt-3 text-sm">

**Des trous et des bosses sur le dessus** - ce qu'on appelle le *pillowing*. La couche pleine n'a pas assez d'appuis pour se tendre. Deux corrections : **+2 couches pleines**, ou **remplissage à 20 %** pour rapprocher les points d'appui.

</div>

</div>

<!--
Minutage : 66-69 min.

C'est un réglage qu'on touche rarement, mais qui explique un défaut très
fréquent et très visible. Le présenter comme un outil de diagnostic plutôt
que comme un réglage à ajuster.

La règle du millimètre est facile à retenir et se recalcule de tête :
1 mm divisé par la hauteur de couche. Le faire calculer à la salle pour
0,30 mm (réponse : 3 à 4 couches).

Si on demande pourquoi ne pas mettre 10 couches partout : le temps, et surtout
l'accumulation de matière qui fait bomber les surfaces.
-->

---
module: 5 · Les 5 réglages
layout: two-cols-header
---

# 4 · Les supports

<div class="text-sm opacity-60 -mt-3 mb-2">L'échafaudage qu'on imprime pour le jeter.</div>

::left::

<div class="pr-6 text-sm">

<v-clicks>

<div class="mb-2 text-xs">

| Réglage PrusaSlicer | Quand |
|---|---|
| **Aucun** | Le défaut. Essayer d'abord |
| **Depuis le plateau** | Le plus sûr : rien ne s'appuie sur l'objet |
| **Partout** | Nécessaire, mais laisse des marques |
| **Pour les renforts** | Uniquement là où on a peint |

</div>

<div class="regle text-xs">

**Les supports organiques** : des troncs fins et ramifiés. Deux à trois fois moins de matière, plus faciles à arracher, moins de marques. Les activer par défaut.

</div>

<div class="piege mt-2 text-xs">

Le seuil d'angle est à **55°** par défaut, pas 45. Prusa est optimiste, et il a souvent raison.

</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<Placeholder ref="5.7"
  brief="Copie d'écran de PrusaSlicer, vue Aperçu, figurine avec supports organiques : troncs fins et ramifiés en violet sous les bras ou le menton."
  ratio="4/3" maxH="180px" />

<div v-click class="mt-3 font-semibold text-center" style="color: var(--prusa-orange)">

Le meilleur support est celui qu'on n'imprime pas.

</div>

<div v-click class="text-xs opacity-60 mt-2">

Avant d'en activer : réorienter la pièce, la couper en deux (<KeyCap k="C" />) et recoller, ou peindre les supports uniquement là où c'est indispensable.

</div>

</div>

<!--
Minutage : 69-73 min.

Montrer l'outil « peinture des supports » en direct sur la figurine : on
badigeonne le menton, et seul le menton reçoit un support. C'est spectaculaire
et ça évite des heures de matière perdue.

Faire circuler une pièce avec ses supports encore attachés et une pince
coupante. Laisser quelqu'un les retirer. Ils comprennent d'un coup pourquoi
on cherche à les éviter - et pourquoi les marques restent.

Le point sur la marque : là où un support touche la pièce, la surface est
toujours dégradée. C'est irréversible, il faut poncer. D'où le lien avec
l'orientation du module 3 : on choisit QUELLE face sera abîmée.

Sur le contact Z : en mode Expert on peut régler l'écart entre support et
pièce. À 0 c'est soudé, à 0,2 ça s'enlève à la main. Mentionner sans détailler.
-->

---
module: 5 · Les 5 réglages
layout: two-cols-header
---

# 5 · L'adhérence au plateau

<div class="text-sm opacity-60 -mt-3 mb-2">Rien ne sert d'imprimer si la première couche lâche.</div>

::left::

<div class="pr-6 text-sm">

<v-clicks>

<div class="temoin mb-2">
<strong style="color: var(--prusa-orange)">Jupe</strong> - <em>skirt</em><br>
<span class="text-xs opacity-70">Un ou deux tours <strong>sans toucher la pièce</strong>. Ça amorce la buse et ça permet de vérifier le débit avant que ça compte. Toujours l'activer.</span>
</div>

<div class="temoin mb-2">
<strong style="color: var(--prusa-orange)">Bordure</strong> - <em>brim</em><br>
<span class="text-xs opacity-70">Une collerette <strong>collée à la pièce</strong>, qui élargit la surface d'accroche. Pour les objets hauts, fins, ou à toute petite base. 5 mm suffisent.</span>
</div>

<div class="temoin">
<strong style="color: var(--prusa-orange)">Radeau</strong> - <em>raft</em><br>
<span class="text-xs opacity-70">Un tapis complet sous la pièce. Gaspille de la matière et abîme le dessous. Sur une Prusa, on n'en a quasiment jamais besoin.</span>
</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<Placeholder ref="5.8"
  brief="Copie d'écran de l'aperçu PrusaSlicer, vue de dessus de la première couche, montrant côte à côte une pièce avec jupe (anneau détaché) et une pièce avec bordure (collerette collée au contour). Bien montrer la différence entre les deux."
  ratio="4/3" />

<div v-click class="regle mt-4 text-sm">

**Mais le vrai facteur d'adhérence n'est pas dans le slicer.**

Un plateau **propre** - dégraissé à l'alcool isopropylique, jamais touché avec les doigts - règle neuf décollements sur dix. Aucune bordure ne rattrape un plateau gras.

</div>

</div>

<!--
Minutage : 73-77 min. Fin de la première partie du module 5.

La distinction jupe / bordure est mal connue et souvent inversée. Un moyen
mnémotechnique : la jupe ne touche pas, la bordure borde.

Sur le plateau propre : c'est le conseil le plus rentable de la journée et il
ne coûte rien. À la MJC, montrer où est le flacon d'alcool et le chiffon.
Rappeler qu'on ne touche jamais la surface d'impression avec les doigts -
le gras de la peau suffit à faire lâcher une pièce.

Bon moment pour la pause de 5 minutes si nécessaire.
-->

---
module: 5 · Les 5 réglages
---

# Ce qu'on ne touche pas

<div class="grid grid-cols-4 gap-3 mt-6 text-center text-sm">

<div v-click class="temoin opacity-70">
<strong>Températures</strong>
<div class="text-xs opacity-60 mt-1">buse et plateau</div>
</div>

<div v-click class="temoin opacity-70">
<strong>Vitesses</strong>
<div class="text-xs opacity-60 mt-1">et accélérations</div>
</div>

<div v-click class="temoin opacity-70">
<strong>Rétraction</strong>
<div class="text-xs opacity-60 mt-1">longueur et vitesse</div>
</div>

<div v-click class="temoin opacity-70">
<strong>Ventilation</strong>
<div class="text-xs opacity-60 mt-1">et débit de matière</div>
</div>

</div>

<div v-click class="mt-8">

Ces réglages ne sont pas indépendants. **Ils forment un équilibre.**

</div>

<v-clicks>

<div class="mt-4 text-sm">

Monter la température améliore l'adhésion entre couches - et fait filer le filament. Alors on augmente la rétraction - et on ronge le filament dans l'extrudeur. Alors on ralentit - et la couche a le temps de trop refroidir. Chaque correction crée le problème suivant.

</div>

<div class="regle mt-6">

Prusa a passé des centaines d'heures à trouver cet équilibre pour **cette machine, cette matière, cette hauteur de couche**. Un débutant qui change une valeur ne l'améliore pas : il le casse.

</div>

<div class="piege mt-4">

**Le bon réflexe** : un problème de température, de fil ou de collage se corrige en **changeant de profil de filament**, pas en tapant une valeur. Si le profil de votre bobine n'existe pas, prendre le profil générique de la matière - jamais bricoler celui d'une autre.

</div>

</v-clicks>

<!--
Minutage : 77-80 min. Fin du module 5.

C'est une slide « d'interdiction », et les interdictions ne tiennent que si on
donne la raison. La chaîne de conséquences (température → fils → rétraction →
grignotage → lenteur → refroidissement) doit être racontée, pas lue.

Anticiper l'objection : « mais sur YouTube ils changent tout le temps la
température ». Réponse honnête : oui, et ce sont des gens qui ont une machine
qu'ils connaissent, une bobine qu'ils ont calibrée, et qui savent revenir en
arrière. Ce n'est pas le point de départ, c'est l'étape d'après.

Ne pas fermer complètement la porte : dire qu'après quelques dizaines
d'impressions, la calibration devient un sujet intéressant - et que c'est
le bon moment pour une deuxième formation.

Transition vers le module 6 : « Tout est réglé. On peut découper. Et surtout,
on peut enfin vérifier. »
-->
