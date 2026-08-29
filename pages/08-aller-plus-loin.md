---
layout: section
module: 8 · Aller plus loin
routeAlias: mod8
---

# Aller plus loin

Astuces, Annexes, etc...

<!--
Minutage : 105-106 min. Module 8, 5 minutes.

Ne rien enseigner ici. C'est une bande-annonce : on montre que la porte
continue, on ne franchit pas le seuil.
-->

---
module: 8 · Aller plus loin
---

# Quatre outils qui valent le détour

<div class="grid grid-cols-2 gap-4 mt-6">

<div v-click class="temoin">
<strong style="color: var(--prusa-orange)"><carbon-cube class="inline" /> Les modifieurs</strong>
<div class="text-sm opacity-70 mt-1">Poser une boîte invisible sur une zone de la pièce et lui donner ses propres réglages. Renforcer un seul trou de vis à 80 % de remplissage, sans alourdir le reste.</div>
</div>

<div v-click class="temoin">
<strong style="color: var(--prusa-orange)"><carbon-color-palette class="inline" /> Le changement de couleur</strong>
<div class="text-sm opacity-70 mt-1">Le petit <span class="font-mono">+</span> sur le curseur de couche. La machine met en pause à cette hauteur et attend que vous changiez la bobine. Deux couleurs sans MMU.</div>
</div>

<div v-click class="temoin">
<strong style="color: var(--prusa-orange)"><carbon-paint-brush class="inline" /> Peindre supports et coutures</strong>
<div class="text-sm opacity-70 mt-1">Badigeonner au pinceau les zones qui doivent être soutenues, et déplacer la ligne de couture sur une arête où elle ne se verra pas.</div>
</div>

<div v-click class="temoin">
<strong style="color: var(--prusa-orange)"><carbon-cut class="inline" /> Couper l'objet</strong> - <KeyCap k="C" />
<div class="text-sm opacity-70 mt-1">Trancher la pièce en deux, imprimer chaque moitié à plat sans un seul support, et recoller. Souvent la meilleure réponse à un objet compliqué.</div>
</div>

</div>

<div v-click class="mt-6 text-center text-sm opacity-60">

Aucun de ces outils n'est nécessaire aujourd'hui. Tous deviendront évidents vers la dixième impression.

</div>

<!--
Minutage : 106-109 min.

Si le temps le permet, faire une seule démonstration - le changement de couleur
est le plus spectaculaire et le plus simple à comprendre. Trente secondes.

Le message de la dernière ligne compte : ne pas donner l'impression qu'il reste
une montagne à gravir. Ces outils s'attrapent au fil des impressions, pas dans
une formation.

Si quelqu'un demande la MMU ou l'impression multicolore : dire que l'atelier en a
une / n'en a pas (à adapter), et que c'est un sujet à part entière.
-->

---
layout: default
module: Annexe
hideInToc: true
bare: true
---

# Annexe - les images à produire

<div class="text-sm opacity-60 -mt-3 mb-2">Chaque emplacement porte sa consigne sur la slide. Récapitulatif pour la séance photo.</div>

<div class="tight-table grid grid-cols-3 gap-x-6 gap-y-0.5 text-[0.7rem]">

<div>

**Captures PrusaSlicer**

| Réf | Sujet |
|---|---|
| cover | photo d'accroche → `public/cover.jpg` |
| 1.2 | maillage de triangles, porte-téléphone |
| 2.2 | écran complet, onglet Plateau |
| 2.3 | sélecteur Simple / Avancé / Expert |
| 3.3 | outil « Placer sur la face » actif |
| 3.6a-c | trois orientations du porte-téléphone |
| 4.3 | liste déroulante des profils |
| 5.7 | supports organiques sur la figurine |
| 5.8 | jupe et bordure, vue de dessus |
| 6.2 | aperçu, vue Type de fonctionnalité |
| 6.3 | aperçu, curseur sur la 1<sup>re</sup> couche |

</div>

<div>

**Photos d'objets réels**

| Réf | Sujet |
|---|---|
| 1.3 | macro de la buse en train d'extruder |
| 3.4 | deux crochets : cassé à plat / intact debout |
| 5.6 | dessus grumeleux / dessus lisse |

</div>

<div class="opacity-70">

**À prévoir aussi, hors slides**


un G-code ouvert dans un éditeur de texte, une caisse de pièces ratées,
deux figurines en 0,35 et 0,10 mm, une pièce PLA et une pièce PETG à plier,
une pièce avec ses supports encore attachés et une pince coupante.

</div>

</div>

<!--
Cette slide est un aide-mémoire de production, pas une slide de formation.
Elle précède désormais la slide de fin : passer vite en séance, ou lui ajouter
« hide: true » le jour J.
-->

---
layout: default
module: Annexe
hideInToc: true
bare: true
---

# Annexe - les raccourcis PrusaSlicer

<div class="tight-table grid grid-cols-3 gap-x-8 gap-y-0.5 mt-2 text-xs">

<div>

**Manipuler l'objet**

| | |
|---|---|
| <KeyCap k="M" /> | Déplacer |
| <KeyCap k="S" /> | Mettre à l'échelle |
| <KeyCap k="R" /> | Tourner |
| <KeyCap k="F" /> | Placer sur la face |
| <KeyCap k="C" /> | Couper |
| <KeyCap k="L" /> | Peindre les supports |
| <KeyCap k="P" /> | Peindre les coutures |

</div>

<div>

**Le plateau**

| | |
|---|---|
| <KeyCap k="A" /> | Ranger automatiquement |
| <KeyCap k="+" /> <KeyCap k="-" /> | Ajouter / retirer une copie |
| <KeyCap k="Ctrl" /><KeyCap k="A" /> | Tout sélectionner |
| <KeyCap k="Suppr" /> | Supprimer |
| <KeyCap k="Z" /> | Cadrer sur la sélection |
| <KeyCap k="0" />…<KeyCap k="6" /> | Vues iso, dessus, devant… |

</div>

<div>

**Trancher et sortir**

| | |
|---|---|
| <KeyCap k="Tab" /> | Basculer Plateau / Aperçu |
| <KeyCap k="↑" /> <KeyCap k="↓" /> | Curseur de couche |
| <KeyCap k="Ctrl" /><KeyCap k="R" /> | Découper maintenant |
| <KeyCap k="Ctrl" /><KeyCap k="G" /> | Exporter le G-code |
| <KeyCap k="Ctrl" /><KeyCap k="S" /> | Enregistrer le projet |
| <KeyCap k="Ctrl" /><KeyCap k="F" /> | Chercher un réglage |
| <KeyCap k="Ctrl" /><KeyCap k="Z" /> | Annuler |

</div>

</div>

<div class="mt-2 text-center regle text-xs mx-16">

La touche <KeyCap k="?" /> affiche la liste officielle complète, à jour pour votre version de PrusaSlicer.

</div>

<!--
Slide de référence, à consulter ou à imprimer. Elle n'est pas commentée en
séance : la touche « ? » de PrusaSlicer fait le même travail et reste juste.

Les trois raccourcis qui changent vraiment la vie sont F (placer sur la face),
Tab (basculer vers l'aperçu) et Ctrl+F (chercher un réglage sans savoir dans
quel onglet il se cache).
-->

---
layout: end
module: 8 · Aller plus loin
bare: true
---

# Des questions ?

<div class="mt-6 text-base opacity-60">
Et si vous repartez avec une seule chose&nbsp;:<br>
<span style="color: var(--prusa-orange)">ouvrez l'aperçu avant de lancer.</span>
</div>

<!--
Minutage : 109-120 min. Questions.

Garder les quatre dernières minutes pour les questions restées en suspens
depuis la slide « hors sujet » du début. Y revenir explicitement :
« Qui avait noté une question au début ? »

Si une impression a été lancée pendant la séance, elle devrait être bien
avancée. Le montrer, et laisser la salle s'approcher de la machine. C'est la
meilleure fin possible.
-->
