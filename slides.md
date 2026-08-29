---
theme: default
title: Les bases d'un slicer
info: |
  ## Les bases d'un slicer - PrusaSlicer
  Formation MJC · 2 h · débutants
  Du fichier 3D au G-code : comprendre ce que fait vraiment un slicer.
author: MJC
class: text-center
transition: slide-left
mdc: true
duration: 120min
drawings:
  persist: false
fonts:
  sans: Inter
  mono: Fira Code
layout: cover
module: Accueil
bare: true
---

<!-- IMAGE : photo d'accroche en fond, prise à la MJC.
     Une MK2.5S en cours d'impression, vue rapprochée sur la buse et les premières
     couches, lumière chaude, arrière-plan flou. Cadrage 16/9 paysage.
     Une fois la photo prise : la déposer dans public/ et ajouter au frontmatter
     ci-dessus :  background: /cover.jpg  -->

# Les bases d'un slicer

Comprendre **PrusaSlicer** pour ne plus imprimer au hasard

<div class="mt-10 text-sm opacity-60">
  2 heures · Prusa i3 MK2.5S · buse 0,4 mm · PLA
</div>

<div class="abs-br m-6 text-xs opacity-40">
  Espace ou <KeyCap k="→" /> pour avancer
</div>

<!--
Minutage : 0-2 min.

Accueil. Une question pour prendre la température de la salle :
« Qui a déjà lancé une impression tout seul ? Qui a déjà raté une impression ? »

Le message d'ouverture : vous avez tous vu la machine tourner. Aujourd'hui on
regarde ce qui se passe AVANT, dans le logiciel - parce que 90 % des impressions
ratées se décident là, pas dans la machine.
-->

---
layout: default
module: Accueil
routeAlias: sommaire
---

# Le programme

<div class="grid grid-cols-2 gap-x-10 gap-y-1 mt-6 text-sm">

<v-clicks>

<Link to="mod1"><span class="font-mono opacity-40 mr-2">12'</span> <strong>Pourquoi un slicer ?</strong><br><span class="text-xs opacity-50">Le fossé entre un fichier et une machine</span></Link>

<Link to="mod2"><span class="font-mono opacity-40 mr-2">10'</span> <strong>Le tour du propriétaire</strong><br><span class="text-xs opacity-50">Les 3 vues, les 3 modes, le trio de profils</span></Link>

<Link to="mod3"><span class="font-mono opacity-40 mr-2">15'</span> <strong>Poser l'objet</strong><br><span class="text-xs opacity-50">Le geste qui décide de tout : l'orientation</span></Link>

<Link to="mod4"><span class="font-mono opacity-40 mr-2">12'</span> <strong>Choisir un profil</strong><br><span class="text-xs opacity-50">Hauteur de couche, qualité, matière</span></Link>

<Link to="mod5"><span class="font-mono opacity-40 mr-2">25'</span> <strong>Les 5 réglages qui comptent</strong><br><span class="text-xs opacity-50">Et les vingt autres qu'on laisse tranquilles</span></Link>

<Link to="mod6"><span class="font-mono opacity-40 mr-2">15'</span> <strong>Trancher et lire l'aperçu</strong><br><span class="text-xs opacity-50">Voir le problème avant de perdre 4 heures</span></Link>

<Link to="mod7"><span class="font-mono opacity-40 mr-2">10'</span> <strong>Galerie de défauts</strong><br><span class="text-xs opacity-50">Slicer ou machine : de quel côté chercher ?</span></Link>

</v-clicks>

</div>

<div v-click class="mt-8 text-center text-sm opacity-60">
  Les titres sont cliquables - on peut sauter, revenir, s'arrêter sur une question.
</div>

<!--
Minutage : 2-4 min.

Annoncer le rythme : je montre, vous regardez, vous coupez quand vous voulez.
Insister sur le module 6 : c'est celui qui change le plus la vie, et c'est
toujours celui qu'on saute.

Ne pas lire les huit lignes une par une - cliquer vite, le but est de montrer
la forme générale des 2 h.
-->

---
layout: two-cols-header
module: Accueil
---

# Ce qu'on va faire, ce qu'on ne fera pas

::left::

<div class="pr-6">

## <carbon-checkmark-filled class="text-green-600" /> Au programme

<v-clicks>

- **Comprendre** ce qu'un slicer fabrique réellement
- Le **mode Avancé** de PrusaSlicer, en entier
- **Orienter** une pièce et savoir pourquoi
- **Lire un aperçu** et repérer un raté à l'avance
- Une **poignée de réglages**, mais compris à fond

</v-clicks>

</div>

::right::

<div class="pl-6">

## <carbon-close-filled class="text-red-500 opacity-70" /> Hors sujet aujourd'hui

<v-clicks>

- **Dessiner** un objet en 3D - c'est une autre formation
- Le **mode Expert** et ses 350 réglages
- La **calibration** et l'entretien de la machine
- Le **multi-matériaux** (MMU), la résine, le métal
- Les **autres slicers** - les principes sont les mêmes

</v-clicks>

</div>

::bottom::

<div v-click class="regle mt-6 mx-8">

**Le but de la sortie** : que vous puissiez ouvrir un fichier trouvé sur Printables, l'orienter correctement, choisir votre profil, vérifier l'aperçu et lancer - sans copier les réglages du voisin.

</div>

<!--
Minutage : 4-5 min.

Le « hors sujet » est important : il rassure ceux qui ont peur d'être perdus et
il évite les questions hors cadre pendant 2 h. Dire explicitement :
« Si vous avez une question sur la modélisation ou l'entretien, notez-la,
on en parle à la fin ou entre nous. »

Sur le mode Expert : préciser qu'on va le montrer, mais qu'y aller sans
comprendre est la meilleure façon de casser un profil qui marchait.
-->

---
src: ./pages/01-pourquoi-un-slicer.md
---

---
src: ./pages/02-tour-du-proprietaire.md
---

---
src: ./pages/03-poser-lobjet.md
---

---
src: ./pages/04-choisir-un-profil.md
---

---
src: ./pages/05-cinq-reglages.md
---

---
src: ./pages/06-lire-lapercu.md
---

---
src: ./pages/07-galerie-defauts.md
---

---
src: ./pages/08-aller-plus-loin.md
---
