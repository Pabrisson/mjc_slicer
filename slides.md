---
theme: default
title: Les bases d'un slicer
info: |
  ## Les bases d'un slicer - PrusaSlicer
  Formation · 2 h · débutants
  Du fichier 3D au G-code : comprendre ce que fait vraiment un slicer.
author: Atelier impression 3D
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

<!-- IMAGE : photo d'accroche en fond, prise à l'atelier.
     Une MK2.5S en cours d'impression, vue rapprochée sur la buse et les premières
     couches, lumière chaude, arrière-plan flou. Cadrage 16/9 paysage.
     Une fois la photo prise : la déposer dans public/ et ajouter au frontmatter
     ci-dessus :  background: /cover.jpg  -->

# Les bases d'un slicer

Comprendre **PrusaSlicer** pour ne plus imprimer au hasard

<div class="mt-6 font-mono text-sm">
  <a href="https://pabrisson.github.io/mjc_slicer" target="_blank" class="opacity-70 hover:opacity-100">https://pabrisson.github.io/mjc_slicer</a>
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

<Link class="py-2" to="mod1"><span class="font-mono opacity-40 mr-1">1.</span><strong>Pourquoi un slicer ?</strong><br><span class="text-xs opacity-50">Le fossé entre un fichier et une machine</span></Link>

<Link class="py-2" to="mod2"><span class="font-mono opacity-40 mr-1">2.</span><strong>Le tour du slicer</strong><br><span class="text-xs opacity-50">Les 3 vues, les 3 modes, le trio de profils</span></Link>

<Link class="py-2" to="mod3"><span class="font-mono opacity-40 mr-1">3.</span><strong>Poser l'objet</strong><br><span class="text-xs opacity-50">Le geste qui décide de tout : l'orientation</span></Link>

<Link class="py-2" to="mod4"><span class="font-mono opacity-40 mr-1">4.</span><strong>Choisir le bon profil</strong><br><span class="text-xs opacity-50">Hauteur de couche, qualité, matière</span></Link>

<Link class="py-2" to="mod5"><span class="font-mono opacity-40 mr-1">5.</span><strong>Les 5 réglages qui comptent</strong><br><span class="text-xs opacity-50">Et ceux qu'on laisse tranquilles</span></Link>

<Link class="py-2" to="mod6"><span class="font-mono opacity-40 mr-1">6.</span><strong>Trancher et lire l'aperçu</strong><br><span class="text-xs opacity-50">Voir le problème avant de perdre 4 heures d'impressions</span></Link>

<Link class="py-2" to="mod7"><span class="font-mono opacity-40 mr-1">7.</span><strong>Diagnostiquer un échec</strong><br><span class="text-xs opacity-50">Slicer ou machine : de quel côté chercher ?</span></Link>

<Link class="py-2" to="mod8"><span class="font-mono opacity-40 mr-1">8.</span><strong>Aller plus loin</strong><br><span class="text-xs opacity-50">Astuces, Lexique, Annexes, etc...</span></Link>

</v-clicks>

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

<h2 v-click><carbon-checkmark-filled class="text-green-600" /> Au programme</h2>

<br/>

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

<h2 v-click><carbon-close-filled class="text-red-500 opacity-70" /> Hors sujet aujourd'hui</h2>

<br/>

<v-clicks>

- **Modèliser** un objet en 3D (c'est une autre formation)
- Le **mode Expert** et ses 350 réglages
- Le **multi-matériaux** (MMU), la résine, le SLA-SLS
- Les **autres slicers que PrusaSlicer** - les principes sont les mêmes

</v-clicks>

</div>

::bottom::

<div v-click class="regle mx-2">

**Le but de la sortie** : que vous puissiez ouvrir un fichier trouvé sur internet, l'orienter correctement, choisir votre profil, vérifier l'aperçu et lancer.

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
src: ./pages/02-tour-du-slicer.md
---

---
src: ./pages/03-poser-lobjet.md
---

---
src: ./pages/04-choisir-le-bon-profil.md
---

---
src: ./pages/05-cinq-reglages.md
---

---
src: ./pages/06-lire-lapercu.md
---

---
src: ./pages/07-diagnostiquer-un-echec.md
---

---
src: ./pages/08-aller-plus-loin.md
---
