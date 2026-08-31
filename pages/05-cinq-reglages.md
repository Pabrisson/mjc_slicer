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

Avec une buse de 0.4 mm, un trait fait **0.45 mm de large**. Deux périmètres, c'est **0.9 mm de mur**. Un mur ne peut pas être plus fin qu'un trait.

</div>

<div class="regle mt-3">

**La solidité vient des périmètres, pas du remplissage.** Passer de 2 à 3 périmètres coûte quelques minutes et rigidifie énormément. Passer le remplissage de 15 à 40 % coûte le double du temps et consomme plus de plastique.

</div>

<div class="mt-3 flex gap-2 text-xs">
  <span class="temoin flex-1 text-center">Déco, boîtier<br><strong class="text-lg" style="color: var(--prusa-orange)">2</strong></span>
  <span class="temoin flex-1 text-center">Pièce manipulée<br><strong class="text-lg" style="color: var(--prusa-orange)">3</strong></span>
  <span class="temoin flex-1 text-center">Pièce qui force<br><strong class="text-lg" style="color: var(--prusa-orange)">4 à 5</strong></span>
</div>

</v-clicks>

</div>

<!--
Minutage : 55-59 min.

Manipuler le curseur « Périmètres » : montrer que le mur grossit par bonds de
0.45 mm. Ce n'est pas continu, et c'est ce qui explique les emboîtements ratés.

L'affirmation « la solidité vient des périmètres » est contre-intuitive et
mérite d'être martelée. C'est probablement la meilleure économie de temps
d'impression que la salle emportera aujourd'hui.

Le deuxième curseur, « jeu », vaut trente secondes : deux pièces qui se touchent
exactement à la modélisation sortent soudées. Prévoir 0.2 mm pour un ajustement
juste, 0.3 mm pour une pièce qui doit coulisser. C'est une règle de conception,
pas un réglage de slicer.
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

**L'erreur la plus fréquente** : mettre 50 % « pour que ce soit solide ». On double le temps et la matière pour un gain de résistance quasi nul.

</div>

<div class="mt-3 flex gap-2 text-xs">
  <span class="temoin flex-1 text-center">Déco, figurine<br><strong class="text-base" style="color: var(--prusa-orange)">10 - 15 %</strong></span>
  <span class="temoin flex-1 text-center">Usage courant<br><strong class="text-base" style="color: var(--prusa-orange)">15 - 20 %</strong></span>
  <span class="temoin flex-1 text-center">Pièce qui force<br><strong class="text-base" style="color: var(--prusa-orange)">25 %</strong></span>
</div>

<div class="regle mt-3">

Besoin de solidité ?<br>**Ajouter un périmètre avant d'ajouter du remplissage.**

</div>

<div class="mt-3 opacity-60 text-xs">

**0 %** donne une coque creuse - parfait pour un objet décoratif, à condition d'augmenter les coques horizontales du dessus qui n'ont plus rien pour reposer.

</div>

</v-clicks>

</div>

<!--
Minutage : 59-63 min.

Manipuler les trois motifs et le curseur. Faire remarquer la barre verte
(solidité) qui plafonne alors que la barre orange (temps) continue à monter :
c'est tout le message en une image.

Sur les motifs : Gyroïde est le motif par défaut depuis des années et il n'y a
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

# 3 · Les coques horizontales

<div class="text-sm opacity-60 -mt-3 mb-2">Le dessus et le dessous : les seules surfaces qu'on regarde vraiment.</div>

::left::

<div class="pr-6 text-sm">

<v-clicks>

<div>

Sous le remplissage et au-dessus de lui, le slicer pose des **coques horizontales** pour fermer l'objet.

</div>

<div class="regle mt-3">

**La règle du millimètre** : il faut environ **1 mm de matière pleine** au-dessus. En 0.20 mm, ça fait **5 couches**. En 0.15 mm, il en faut **7**. Le nombre change avec la hauteur de couche.

</div>

<div class="mt-3">

Les valeurs par défaut, en 0.20 mm sont généralement :

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

<Pillowing />

<div v-click class="piege mt-3 text-sm">

**Des trous et des bosses sur le dessus** - ce qu'on appelle le *pillowing*. La coque horizontale n'a pas assez d'appuis pour se tendre. Deux corrections : **+ de coques horizontales**, ou **remplissage à 20 %** pour rapprocher les points d'appui.

</div>

</div>

<!--
Minutage : 63-67 min.

C'est un réglage qu'on touche rarement, mais qui explique un défaut très
fréquent et très visible. Le présenter comme un outil de diagnostic plutôt
que comme un réglage à ajuster.

La règle du millimètre est facile à retenir et se recalcule de tête :
1 mm divisé par la hauteur de couche. Le faire calculer à la salle pour
0.30 mm (réponse : 3 à 4 couches).

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

| Réglage                            | Quand ?                                    |
|------------------------------------|--------------------------------------------|
| **Aucun**                          | Par défaut. À essayer d'abord              |
| **Depuis le plateau**              | Le plus sûr : rien ne s'appuie sur l'objet |
| **Partout**                        | Nécessaire, mais laisse des marques        |
| **Seulement pour les générateurs** | Il y a besoin de cibler un endroit précis  |

</div>

<div class="regle text-xs">

**Les supports organiques** : des troncs fins et ramifiés. Deux à trois fois moins de matière, plus faciles à arracher, moins de marques.

</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<Figure refId="5.7"
  src="/img/5.7-supports-organiques.jpg"
  credit="Prusa Research - Knowledge Base"
  kind="photo"
  alt="Deux figurines imprimées côte à côte : à gauche, prise dans un bloc dense de supports en grille ; à droite, tenue par quelques branches fines de supports organiques."
  brief="Deux figurines identiques : à gauche les supports en grille, un mur plein de matière ; à droite les supports organiques, quelques troncs ramifiés. La différence de matière dépensée doit sauter aux yeux."
  ratio="16/9" maxH="200px" />

<div v-click class="mt-3 font-semibold text-center text-sm" style="color: var(--prusa-orange)">

Le meilleur support est celui qu'on n'imprime pas.

</div>

<div v-click class="text-xs opacity-60 mt-2">

Avant d'en activer : réorienter la pièce, la couper en deux (<KeyCap k="C" />) et recoller, ou peindre les supports uniquement là où c'est indispensable.

</div>

</div>

<!--
Minutage : 67-72 min.

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
pièce. À 0 c'est soudé, à 0.2 ça s'enlève à la main. Mentionner sans détailler.
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
<span class="text-xs opacity-70">Un tapis complet sous la pièce. Gaspille de la matière et abîme le dessous. Sur une imprimante à plateau chauffant bien réglée, on n'en a quasiment jamais besoin.</span>
</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<SkirtBrim />

<div v-click class="regle mt-4 text-sm">

**Mais le vrai facteur d'adhérence n'est pas dans le slicer.**
Un plateau **propre** - dégraissé à l'alcool isopropylique, jamais touché avec les doigts - règle neuf décollements sur dix. Aucune bordure ne rattrape un plateau gras.

</div>

</div>

<!--
Minutage : 72-77 min. Fin de la première partie du module 5.

La distinction jupe / bordure est mal connue et souvent inversée. Un moyen
mnémotechnique : la jupe ne touche pas, la bordure borde.

Sur le plateau propre : c'est le conseil le plus rentable de la journée et il
ne coûte rien. À l'atelier, montrer où est le flacon d'alcool et le chiffon.
Rappeler qu'on ne touche jamais la surface d'impression avec les doigts -
le gras de la peau suffit à faire lâcher une pièce.

Bon moment pour la pause de 5 minutes si nécessaire.
-->

---
module: 5 · Les 5 réglages
---

# Ce qu'on garde pour plus tard

<div class="text-sm opacity-60 -mt-3 mb-3">Trois familles de réglages qui ne s'ouvrent pas le premier jour.</div>

<div class="grid grid-cols-3 gap-3 text-center text-sm">

<div v-click class="temoin">
<div class="text-xl leading-none mb-1" style="color: var(--prusa-orange)"><carbon-meter-alt /></div>
<strong>Vitesses</strong>
<div class="text-xs opacity-60">et accélérations</div>
</div>

<div v-click class="temoin">
<div class="text-xl leading-none mb-1" style="color: var(--prusa-orange)"><carbon-direction-u-turn /></div>
<strong>Rétraction</strong>
<div class="text-xs opacity-60">longueur et vitesse</div>
</div>

<div v-click class="temoin">
<div class="text-xl leading-none mb-1" style="color: var(--prusa-orange)"><carbon-snowflake /></div>
<strong>Ventilation</strong>
<div class="text-xs opacity-60">et débit de matière</div>
</div>

</div>

<v-clicks>

<div class="mt-4 text-sm">

Ils ne sont pas indépendants : **ils forment un équilibre**. Monter la température améliore l'adhésion entre couches et fait filer le filament. Alors on augmente la rétraction et on ronge le filament dans l'extrudeur. Alors on ralentit et la couche a le temps de trop refroidir. Chaque correction crée le problème suivant.

</div>

<div class="regle mt-3 text-sm">

Le fabricant a passé des centaines d'heures à trouver cet équilibre pour **cette machine, cette matière, cette hauteur de couche**. Y toucher sans savoir ce qu'on déplace, ce n'est pas l'améliorer : c'est le casser. **Mais ça s'apprend**, et ces réglages redeviennent alors ce qu'ils sont : de vrais outils à modifier.

</div>

</v-clicks>

<!--
Minutage : 77-80 min. Fin du module 5.

Ce n'est pas une slide d'interdiction, c'est une slide de calendrier : ces
réglages ne sont ni sacrés ni hors de portée, ils sont simplement prématurés.
Le dire explicitement, sinon la salle entend « c'est trop compliqué pour vous »
et se ferme la porte toute seule.

La chaîne de conséquences (température → fils → rétraction → grignotage →
lenteur → refroidissement) doit être racontée, pas lue. C'est elle qui justifie
l'attente : le problème n'est pas la difficulté d'un réglage pris isolément,
c'est qu'ils bougent tous ensemble.

Anticiper l'objection : « mais sur YouTube ils changent tout le temps la
température ». Réponse honnête : oui, et ce sont des gens qui ont une machine
qu'ils connaissent, une bobine qu'ils ont calibrée, et qui savent revenir en
arrière. Ce n'est pas le point de départ, c'est l'étape d'après.

Les trois conditions sont le vrai contenu de la slide : elles donnent un critère
vérifiable pour savoir si on est prêt, plutôt qu'une autorisation à demander.
Insister sur « Enregistrer sous » - c'est ce qui transforme un bricolage
irréversible en essai.

Terminer par une invitation, pas par une barrière : après quelques dizaines
d'impressions, la calibration devient un sujet passionnant, et c'est le bon
moment pour une deuxième formation.

Transition vers le module 6 : « Tout est réglé. On peut découper. Et surtout,
on peut enfin vérifier. »
-->
