---
layout: section
module: 6 · Lire l'aperçu
routeAlias: mod6
---

# Trancher et lire l'aperçu

Voir le problème avant de perdre 4 heures d'impressions

<!--
Minutage : 80-81 min. Module 6, 15 minutes.

Annoncer franchement : « C'est le module que tout le monde saute, et c'est
celui qui vous fera gagner le plus de temps. »
-->

---
module: 6 · Lire l'aperçu
layout: two-cols-header
---

# Le code couleur

<div class="text-sm opacity-60 -mt-3 mb-2">Onglet <strong>Aperçu</strong>, liste déroulante <strong>Type d'élément</strong>. La grille de lecture.</div>

::left::

<div class="pr-4">

<PreviewLegend />

</div>

::right::

<div class="pl-1 leading-snug">

<v-clicks>

<div class="temoin mb-2">
<span class="pastille" style="background: #ff7d38"></span><strong>L'orange, c'est la peau</strong><br>
<span class="text-xs opacity-70">Le <strong>périmètre externe</strong> : le seul trait qu'on verra et qu'on mesurera. Le jaune, c'est le même mur, caché derrière.</span>
</div>

<div class="temoin mb-2">
<span class="pastille" style="background: #b03029"></span><strong>Le rouge, c'est du vide organisé</strong><br>
<span class="text-xs opacity-70">Le <strong>remplissage interne</strong> : ici un tiers du temps, pour ce que personne ne verra jamais.</span>
</div>

<div class="temoin mb-2">
<span class="pastille" style="background: #00ff00"></span><span class="pastille" style="background: #00876e"></span><strong>Les verts partent à la poubelle</strong><br>
<span class="text-xs opacity-70">Supports, interface, jupe et bordure. Du temps et de la matière qu'on arrachera à la fin.</span>
</div>

<div class="text-xs opacity-65 px-1">
La colonne <strong>Pourcentage</strong> compte du <strong>temps</strong>, pas de la matière.<br>
Chaque ligne est cliquable : masquer une catégorie nettoie l'aperçu.
</div>

</v-clicks>

</div>

::bottom::

<div v-click class="regle mt-2 mx-2 text-sm">

Deux réflexes suffisent pour commencer : **l'orange est ce qui se verra**, **le vert finira à la poubelle**.<br>Beaucoup de vert ? Il y a peut-être une meilleure orientation.

</div>

<style>
/* La légende est dense : elle mérite un peu plus que la moitié de la slide. */
.two-cols-header {
  grid-template-columns: 1.35fr 1fr;
  column-gap: 0.5rem;
}
/* Cartouches resserrés : la colonne de droite doit laisser la place à la règle. */
.two-cols-header .temoin {
  padding: 0.35em 0.75em;
}
/* Pastille de rappel, exactement la couleur du logiciel */
.pastille {
  display: inline-block;
  width: 0.62em;
  height: 0.62em;
  border-radius: 2px;
  margin-right: 0.4em;
  vertical-align: middle;
}
</style>

<!--
Minutage : 81-84 min.

Le panneau projeté est la copie exacte de celui du logiciel, chiffres compris :
ouvrir PrusaSlicer à côté, la salle doit retrouver la même chose à l'écran.

Ne pas faire apprendre les onze lignes. Deux suffisent pour commencer :
orange = la peau visible, vert = ce qu'on jette. Le reste vient à l'usage.

Le piège classique à désamorcer tout de suite : « périmètre » (jaune) et
« périmètre externe » (orange) ne sont pas la même chose. Seul l'orange se voit.
Et le violet n'est pas du support : c'est du remplissage solide, les couches
pleines qui ferment le dessus et le dessous.

Basculer en direct entre l'onglet Plateau et l'onglet Aperçu plusieurs fois,
pour que le geste devienne évident. Beaucoup de débutants ne savent tout
simplement pas que cet onglet existe.

Montrer que la légende est cliquable : masquer une catégorie la retire de
l'aperçu. Décocher les déplacements rend la vue beaucoup plus lisible.
-->

---
module: 6 · Lire l'aperçu
layout: two-cols-header
---

# Les deux curseurs

::left::

<div class="pr-6 text-sm">

<v-clicks>

<div class="temoin mb-3">
<strong style="color: var(--prusa-orange)">Le curseur vertical</strong> - à droite<br>
<span class="text-xs opacity-70">Monte et descend dans les couches. La poignée du haut coupe l'objet, celle du bas masque ce qui est en dessous.</span>
</div>

<div class="temoin mb-3">
<strong style="color: var(--prusa-orange)">Le curseur horizontal</strong> - en bas<br>
<span class="text-xs opacity-70">Rejoue le trajet de la buse <strong>à l'intérieur d'une couche</strong>, dans l'ordre réel. On voit l'ordre des gestes.</span>
</div>

<div class="regle">

Le geste qui compte : **poser le curseur vertical sur la première couche**, et regarder ce qui touche le plateau. Trois secondes, et la moitié des ratés se voit là.

</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<PreviewSliders />

<div v-click class="mt-4 text-sm opacity-60">

<KeyCap k="↑" /> <KeyCap k="↓" /> déplacent le curseur couche par couche. Avec <KeyCap k="Maj" />, par pas de dix.

</div>

</div>

<!--
Minutage : 84-87 min.

Faire la démonstration lentement : descendre à la couche 1, puis remonter
couche par couche sur les dix premières. On voit la pièce naître.

Le curseur horizontal est méconnu et très parlant : le faire glisser sur une
couche montre que la buse trace d'abord le périmètre externe, puis les internes,
puis le remplissage - ou l'inverse selon le profil. C'est le G-code du module 1
qui devient visible.

Astuce à donner : la petite icône « + » sur le curseur vertical sert à insérer
un changement de couleur à une hauteur donnée. On y revient au module 9.
-->

---
module: 6 · Lire l'aperçu
layout: two-cols-header
---

# Les autres vues, et le verdict

::left::

<div class="pr-6 text-sm">

La liste déroulante en haut de la légende change ce que les couleurs représentent :

<v-clicks>

- **Hauteur** - repérer les couches adaptatives
- **Largeur** - voir où le slicer a dû bricoler des traits fins
- **Vitesse** - les zones rouges ralentissent, souvent à raison
- **Débit** - les pics de matière, sources de bourrelets
- **Ventilateur** - vérifier qu'il souffle sur les ponts
- **Outil** et **Température** - utiles en multi-matériaux

</v-clicks>

<div v-click class="mt-4 opacity-60 text-xs">

Aucune n'est indispensable au quotidien. La vue **Vitesse** est la plus instructive : elle montre où la machine passe son temps.

</div>

</div>

::right::

<div class="pl-4">

### Le verdict, en bas à droite {v-click}

<div v-click class="temoin mt-3">

<div class="flex justify-between text-sm py-1">
  <span class="opacity-60">Temps estimé</span>
  <span class="font-mono" style="color: var(--prusa-orange)">3 h 47 min</span>
</div>
<div class="flex justify-between text-sm py-1">
  <span class="opacity-60">Matière</span>
  <span class="font-mono" style="color: var(--prusa-orange)">42.3 g · 14.2 m</span>
</div>
<div class="flex justify-between text-sm py-1">
  <span class="opacity-60">Coût</span>
  <span class="font-mono" style="color: var(--prusa-orange)">1.05 €</span>
</div>

</div>

<v-clicks>

<div class="regle mt-4 text-sm">

**C'est ici qu'on arbitre.** Trois heures de plus pour passer de 0.20 à 0.15 mm : est-ce que ça vaut le coup pour cette pièce-là ?<br>La question n'a de réponse qu'en voyant les chiffres.

</div>

</v-clicks>

</div>

<!--
Minutage : 87-90 min.

Le tableau de droite est reconstitué dans la slide : penser à donner les
chiffres réels du porte-téléphone une fois la démo faite, ils seront plus
parlants.

L'arbitrage temps/qualité est un vrai geste de métier. Le faire en direct :
découper en 0.20mm NORMAL, noter le temps, basculer en 0.10mm DETAIL, redécouper,
comparer. Deux clics, et la salle voit le coût réel de la finesse.

Sur le coût : à l'atelier c'est un sujet concret. Une bobine de 1 kg à 25 € fait
2.5 centimes le gramme. Le porte-téléphone revient à environ 1 €.
-->

---
module: 6 · Lire l'aperçu
---

# Cinq ratés visibles avant d'imprimer

<div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-5 text-sm">

<v-clicks>

<div class="temoin">
<strong style="color: var(--prusa-orange)">1 · Une première couche minuscule</strong><br>
<span class="text-xs opacity-70">La pièce ne touche le plateau que par quelques centimètres carrés. Elle se décollera. → mettre une bordure, ou la réorienter.</span>
</div>

<div class="temoin">
<strong style="color: var(--prusa-orange)">2 · Un îlot qui flotte</strong><br>
<span class="text-xs opacity-70">En montant couche par couche, une forme apparaît sans rien en dessous. La buse va extruder dans le vide. → mettre des supports.</span>
</div>

<div class="temoin">
<strong style="color: var(--prusa-orange)">3 · Des murs qui se troublent</strong><br>
<span class="text-xs opacity-70">En vue Largeur, des traits très fins ou des trous entre périmètres. Le mur du modèle n'est pas un multiple de 0.45 mm (Buse Ø 0.4 mm).<br>→ épaissir à la modélisation.</span>
</div>

<div class="temoin">
<strong style="color: var(--prusa-orange)">4 · Une cicatrice sur la face avant</strong><br>
<span class="text-xs opacity-70">Chaque boucle se referme quelque part. En montant couche par couche, ces points de fermeture s'alignent.<br>→ Position de la couture : Arrière, ou peindre au pinceau.</span>
</div>

<div class="temoin">
<strong style="color: var(--prusa-orange)">5 · Du vert sur la belle face</strong><br>
<span class="text-xs opacity-70">Un support (vert vif) touche la surface qui doit être vue. Elle sortira marquée. → réorienter, ou accepter de poncer.</span>
</div>

<div class="regle">
<strong>Le rituel, avant chaque export</strong><br>
<span class="text-xs">Aperçu → première couche → monter jusqu'en haut → regarder le temps.</span>
</div>

</v-clicks>

</div>

<!--
Minutage : 90-95 min. Fin du module 6.

C'est la slide la plus utile de la formation. Si le temps manque ailleurs,
c'est ici qu'il faut le prendre, pas le rendre.

Faire les cinq vérifications en direct sur le porte-téléphone, dans l'ordre.
Chronométrer ostensiblement : le rituel prend vraiment trente secondes, et
le montrer enlève l'excuse du « je n'ai pas le temps ».

Le point 3 mérite une démonstration si le temps le permet : un mur de 1.0 mm
avec des traits de 0.45 mm, ça fait deux traits et 0.1 mm de trou au milieu.
PrusaSlicer le comble comme il peut. C'est pour ça qu'on modélise les murs en
multiples de la largeur d'extrusion - 0.9 ou 1.35 mm plutôt que 1.0.

Le point 4 se démontre en dix secondes : monter d'une dizaine de couches au
curseur vertical, et montrer que les points de fermeture des boucles s'empilent
toujours au même endroit. Faire circuler une pièce imprimée : la couture se
trouve au doigt avant de se voir à l'œil. On y reviendra au module 8 avec
l'outil de peinture (touche P).

Inviter la salle à photographier cette slide. C'est celle qu'ils voudront
revoir.
-->
