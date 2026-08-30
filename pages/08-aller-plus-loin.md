---
layout: section
module: 8 · Aller plus loin
routeAlias: mod8
---

# Aller plus loin

Astuces, Lexique, Annexes, etc...

<!--
Minutage : 105-106 min. Module 8, 5 minutes.

Ne rien enseigner ici. C'est une bande-annonce : on montre que la porte
continue, on ne franchit pas le seuil.
-->

---
module: 8 · Aller plus loin
---

# Les outils qui valent le détour

<div class="grid grid-cols-2 gap-3 mt-4">

<div v-click class="temoin">
<strong style="color: var(--prusa-orange)"><carbon-cube class="inline" /> Les modifieurs</strong>
<div class="text-sm opacity-70 mt-1">Poser une boîte invisible sur une zone de la pièce et lui donner ses propres réglages. Renforcer un seul trou de vis à 80 % de remplissage, sans alourdir le reste.</div>
</div>

<div v-click class="temoin">
<strong style="color: var(--prusa-orange)"><carbon-layers class="inline" /> La hauteur de couche variable</strong>
<div class="text-sm opacity-70 mt-1">Peindre des couches fines là où la forme est ronde ou en pente, et des couches épaisses sur les parties droites. Un bouton <em>Adaptatif</em> fait le premier jet tout seul : la finesse là où elle se voit, la vitesse partout ailleurs.</div>
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

<!--
Minutage : 106-109 min.

Si le temps le permet, faire une seule démonstration - le changement de couleur
est le plus spectaculaire et le plus simple à comprendre. Trente secondes.

La hauteur de couche variable est la suite directe du module 4 : on y a choisi
une hauteur pour toute la pièce, ici on cesse d'avoir à choisir. C'est l'outil
à citer pour quelqu'un qui a trouvé le compromis finesse / durée frustrant.

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

# Annexe - le lexique (1/2)

<div class="text-sm opacity-60 -mt-3 mb-2">Le mot de l'interface française, puis <span style="color: var(--prusa-orange)">celui des tutoriels et des forums</span> - presque toujours en anglais.</div>

<div class="lex grid grid-cols-3 gap-x-5 text-[0.7rem]">
<div>
<div class="lex-titre">Le fichier et le logiciel</div>
<div class="lex-mot"><span class="lex-fr">Trancheur</span><span class="lex-en">slicer</span><span class="lex-def">Le logiciel qui écrit les trajets de la buse.</span></div>
<div class="lex-mot"><span class="lex-fr">Maillage</span><span class="lex-en">mesh</span><span class="lex-def">La peau de triangles qui décrit la forme.</span></div>
<div class="lex-mot"><span class="lex-fr">G-code</span><span class="lex-en">G-code</span><span class="lex-def">Les instructions envoyées à la machine.</span></div>
<div class="lex-mot"><span class="lex-fr">Découper, trancher</span><span class="lex-en">to slice</span><span class="lex-def">Convertir la forme en couches et en trajets.</span></div>
<div class="lex-mot"><span class="lex-fr">Plateau</span><span class="lex-en">plater</span><span class="lex-def">L'onglet où l'on pose et oriente les objets.</span></div>
<div class="lex-mot"><span class="lex-fr">Aperçu</span><span class="lex-en">preview</span><span class="lex-def">L'onglet qui montre le G-code, couche à couche.</span></div>
<div class="lex-mot"><span class="lex-fr">Profil</span><span class="lex-en">preset</span><span class="lex-def">Un jeu de réglages cohérents, prêt à l'emploi.</span></div>
<div class="lex-mot"><span class="lex-fr">Modifieur</span><span class="lex-en">modifier</span><span class="lex-def">Un volume qui impose ses réglages à une zone.</span></div>
</div>
<div>
<div class="lex-titre">La machine</div>
<div class="lex-mot"><span class="lex-fr">Buse</span><span class="lex-en">nozzle</span><span class="lex-def">L'orifice calibré par lequel sort la matière.</span></div>
<div class="lex-mot"><span class="lex-fr">Plateau</span><span class="lex-en">print bed, heatbed</span><span class="lex-def">La surface chauffante qui porte la pièce.</span></div>
<div class="lex-mot"><span class="lex-fr">Feuille PEI</span><span class="lex-en">PEI sheet</span><span class="lex-def">La tôle amovible, lisse ou texturée.</span></div>
<div class="lex-mot"><span class="lex-fr">Extrudeur</span><span class="lex-en">extruder</span><span class="lex-def">Le moteur qui pousse et tire le filament.</span></div>
<div class="lex-mot"><span class="lex-fr">Bobine</span><span class="lex-en">spool</span><span class="lex-def">Le filament enroulé, 1 kg le plus souvent.</span></div>
<div class="lex-mot"><span class="lex-fr">Rétraction</span><span class="lex-en">retraction</span><span class="lex-def">Tirer le fil en arrière avant un déplacement.</span></div>
<div class="lex-mot"><span class="lex-fr">Ventilation</span><span class="lex-en">cooling</span><span class="lex-def">Le ventilateur qui fige la matière déposée.</span></div>
<div class="lex-mot"><span class="lex-fr">Débit</span><span class="lex-en">flow</span><span class="lex-def">La matière poussée par millimètre de trajet.</span></div>
<div class="lex-mot"><span class="lex-fr">Décalage Z</span><span class="lex-en">Z-offset</span><span class="lex-def">Le réglage fin de la hauteur de 1re couche.</span></div>
<div class="lex-mot"><span class="lex-fr">Courroie</span><span class="lex-en">belt</span><span class="lex-def">Ce qui déplace la buse. Elle peut sauter.</span></div>
<div class="lex-mot"><span class="lex-fr">Dépôt de fil fondu</span><span class="lex-en">FDM, FFF</span><span class="lex-def">Le procédé de nos machines : on empile du fil.</span></div>
</div>
<div>
<div class="lex-titre">La matière</div>
<div class="lex-mot"><span class="lex-fr">PLA</span><span class="lex-en">polylactic acid</span><span class="lex-def">Facile et rigide, mais cassant. Mou dès 55 °C.</span></div>
<div class="lex-mot"><span class="lex-fr">PETG</span><span class="lex-en">polyethylene terephthalate glycol</span><span class="lex-def">Tenace, tient 80 °C, mais il file beaucoup.</span></div>
<div class="lex-mot"><span class="lex-fr">ABS, ASA</span><span class="lex-en">ABS, ASA</span><span class="lex-def">Techniques et résistants. Demandent un caisson.</span></div>
<div class="lex-mot"><span class="lex-fr">TPU</span><span class="lex-en">thermoplastic polyurethane</span><span class="lex-def">Le filament souple, imprimé très lentement.</span></div>
<div class="lex-mot"><span class="lex-fr">Multi-matériaux</span><span class="lex-en">MMU, multi material unit</span><span class="lex-def">Le module qui change de filament tout seul.</span></div>
<div class="lex-mot"><span class="lex-fr">Résine</span><span class="lex-en">resin, SLA</span><span class="lex-def">L'autre technologie : de la résine durcie.</span></div>
<div class="lex-mot"><span class="lex-fr">Séchage, étuvage</span><span class="lex-en">drying</span><span class="lex-def">Chasser l'humidité d'une bobine qui file.</span></div>
<div class="lex-mot"><span class="lex-fr">Retrait</span><span class="lex-en">shrinkage</span><span class="lex-def">Le PLA perd 0,3 % en refroidissant.</span></div>
<div class="lex-mot"><span class="lex-fr">Alcool isopropylique</span><span class="lex-en">IPA</span><span class="lex-def">Ce qui dégraisse le plateau. Le vrai secret.</span></div>
</div>
</div>

<!--
Slide de référence, comme celle des raccourcis : on ne la commente pas en
séance, on signale seulement qu'elle existe.

Pourquoi l'anglais : toutes les ressources utiles - le guide Simplify3D du
module 7, Printables, les forums Prusa, YouTube - sont en anglais. Sans les
mots, on ne peut même pas chercher.

À dire si la question vient : PrusaSlicer bascule toute son interface en
anglais par Configuration > Préférences > Général > Langue. C'est un bon
exercice une fois qu'on est à l'aise, parce que les tutoriels redeviennent
lisibles ligne à ligne.
-->

---
layout: default
module: Annexe
hideInToc: true
bare: true
---

# Annexe - le lexique (2/2)

<div class="text-sm opacity-60 -mt-3 mb-2">Ce que la buse trace, ce qu'il y a autour de la pièce, et <span style="color: var(--prusa-orange)">les noms des ratés</span>.</div>

<div class="lex grid grid-cols-3 gap-x-5 text-[0.7rem]">
<div>
<div class="lex-titre">Ce que trace la buse</div>
<div class="lex-mot"><span class="lex-fr">Couche</span><span class="lex-en">layer</span><span class="lex-def">La tranche plate que la machine empile.</span></div>
<div class="lex-mot"><span class="lex-fr">Hauteur de couche</span><span class="lex-en">layer height</span><span class="lex-def">L'épaisseur d'une tranche : 0,05 à 0,35 mm.</span></div>
<div class="lex-mot"><span class="lex-fr">Première couche</span><span class="lex-en">first layer</span><span class="lex-def">Celle qui porte tout le reste.</span></div>
<div class="lex-mot"><span class="lex-fr">Périmètre</span><span class="lex-en">perimeter</span><span class="lex-def">Un mur du contour. Il y en a 2 à 5.</span></div>
<div class="lex-mot"><span class="lex-fr">Périmètre externe</span><span class="lex-en">external perimeter</span><span class="lex-def">Le seul trait qui se verra sur la pièce.</span></div>
<div class="lex-mot"><span class="lex-fr">Largeur d'extrusion</span><span class="lex-en">extrusion width</span><span class="lex-def">La largeur d'un trait : 0,45 mm en buse 0,4.</span></div>
<div class="lex-mot"><span class="lex-fr">Remplissage</span><span class="lex-en">infill</span><span class="lex-def">La structure interne, jamais visible.</span></div>
<div class="lex-mot"><span class="lex-fr">Motif de remplissage</span><span class="lex-en">fill pattern</span><span class="lex-def">Son dessin. Gyroïde par défaut, et ça suffit.</span></div>
<div class="lex-mot"><span class="lex-fr">Coques horizontales</span><span class="lex-en">horizontal shells</span><span class="lex-def">Les couches pleines du dessus et du dessous.</span></div>
<div class="lex-mot"><span class="lex-fr">Couture</span><span class="lex-en">seam</span><span class="lex-def">La cicatrice où chaque boucle se referme.</span></div>
<div class="lex-mot"><span class="lex-fr">Hauteur variable</span><span class="lex-en">variable layer height</span><span class="lex-def">Des couches fines là seulement où ça se voit.</span></div>
</div>
<div>
<div class="lex-titre">Autour de la pièce</div>
<div class="lex-mot"><span class="lex-fr">Porte-à-faux, surplomb</span><span class="lex-en">overhang</span><span class="lex-def">Une partie qui avance au-dessus du vide.</span></div>
<div class="lex-mot"><span class="lex-fr">Pont</span><span class="lex-en">bridge</span><span class="lex-def">Un fil tendu entre deux appuis.</span></div>
<div class="lex-mot"><span class="lex-fr">Îlot</span><span class="lex-en">island</span><span class="lex-def">Une forme qui apparaît sans rien en dessous.</span></div>
<div class="lex-mot"><span class="lex-fr">Support</span><span class="lex-en">support material</span><span class="lex-def">L'échafaudage qu'on imprime pour le jeter.</span></div>
<div class="lex-mot"><span class="lex-fr">Supports organiques</span><span class="lex-en">organic supports</span><span class="lex-def">Des troncs ramifiés, plus faciles à retirer.</span></div>
<div class="lex-mot"><span class="lex-fr">Jupe</span><span class="lex-en">skirt</span><span class="lex-def">Un tour à vide qui amorce la buse.</span></div>
<div class="lex-mot"><span class="lex-fr">Bordure</span><span class="lex-en">brim</span><span class="lex-def">Une collerette collée qui élargit l'accroche.</span></div>
<div class="lex-mot"><span class="lex-fr">Radeau</span><span class="lex-en">raft</span><span class="lex-def">Un tapis complet imprimé sous la pièce.</span></div>
<div class="lex-mot"><span class="lex-fr">Adhérence</span><span class="lex-en">bed adhesion</span><span class="lex-def">La tenue de la 1re couche sur le plateau.</span></div>
<div class="lex-mot"><span class="lex-fr">Placer sur la face</span><span class="lex-en">place on face</span><span class="lex-def">Poser à plat la face qu'on a choisie.</span></div>
<div class="lex-mot"><span class="lex-fr">Anisotropie</span><span class="lex-en">anisotropy</span><span class="lex-def">Deux fois moins solide entre les couches.</span></div>
</div>
<div>
<div class="lex-titre">Les ratés, tels qu'on les nomme</div>
<div class="lex-mot"><span class="lex-fr">Gondolage, tuilage</span><span class="lex-en">warping</span><span class="lex-def">Les coins se relèvent en refroidissant.</span></div>
<div class="lex-mot"><span class="lex-fr">Pied d'éléphant</span><span class="lex-en">elephant foot</span><span class="lex-def">La 1re couche s'évase sous le poids.</span></div>
<div class="lex-mot"><span class="lex-fr">Trous sur le dessus</span><span class="lex-en">pillowing</span><span class="lex-def">La coque du dessus manque d'appuis.</span></div>
<div class="lex-mot"><span class="lex-fr">Fils, cheveux d'ange</span><span class="lex-en">stringing, oozing</span><span class="lex-def">La matière coule pendant les déplacements.</span></div>
<div class="lex-mot"><span class="lex-fr">Bourrelets, points</span><span class="lex-en">blobs and zits</span><span class="lex-def">Des grumeaux là où la buse s'arrête.</span></div>
<div class="lex-mot"><span class="lex-fr">Couches décalées</span><span class="lex-en">layer shift</span><span class="lex-def">L'objet part de travers à partir d'une hauteur.</span></div>
<div class="lex-mot"><span class="lex-fr">Délaminage</span><span class="lex-en">delamination</span><span class="lex-def">Les couches se séparent sans effort.</span></div>
<div class="lex-mot"><span class="lex-fr">Sous-extrusion</span><span class="lex-en">under-extrusion</span><span class="lex-def">Il manque de la matière : traits maigres.</span></div>
<div class="lex-mot"><span class="lex-fr">Bouchon</span><span class="lex-en">clog</span><span class="lex-def">La buse est obstruée, plus rien ne sort.</span></div>
<div class="lex-mot"><span class="lex-fr">Grignotage</span><span class="lex-en">grinding</span><span class="lex-def">L'extrudeur a raboté un méplat dans le fil.</span></div>
<div class="lex-mot"><span class="lex-fr">Effet d'escalier</span><span class="lex-en">stair-stepping</span><span class="lex-def">Les marches visibles sur une pente douce.</span></div>
</div>
</div>

<!--
Suite de la slide précédente, même usage : à consulter, pas à commenter.

La troisième colonne est la plus utile en pratique. C'est elle qui permet de
taper le bon mot dans un moteur de recherche - « pillowing » ramène des
centaines de photos, « trous sur le dessus » n'en ramène aucune.

Elle prolonge aussi la galerie du module 7 : six défauts y étaient traités,
onze sont nommés ici. Si quelqu'un décrit un raté qui n'était pas au module 7,
c'est la slide vers laquelle le renvoyer.
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
<span style="color: var(--prusa-orange)">Toujours analyser l'aperçu avant l'export.</span>
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

---
layout: default
module: Annexe
hideInToc: true
bare: true
---

# Annexe - d'où viennent les images

<div class="text-sm opacity-60 -mt-3 mb-2">Les quatorze emplacements sont remplis. Voici ce qui vient d'ailleurs, ce qui a été dessiné, et ce qui gagnerait à être refait à l'atelier.</div>

<div class="tight-table grid grid-cols-3 gap-x-6 gap-y-0.5 text-[0.7rem]">

<div>

**Images reprises**

| Réf | Sujet | Source |
|---|---|---|
| cover | l'imprimante et le slicer | Wikimedia, CC BY-SA |
| 1.3 | macro de la buse | Wikimedia, CC BY |
| 3.3 | « Placer sur la face » | doc Prusa |
| 4.3 | liste des profils | doc Prusa |
| 5.7 | grille contre organique | doc Prusa |
| 6.3 | curseur de couches | doc Prusa |

<div class="mt-1 opacity-60">Captures Prusa en anglais. Attributions dans <code>docs/credits-images.md</code>, récupération par <code>scripts/fetch-images.sh</code>.</div>

</div>

<div>

**Schémas du diaporama**

| Réf | Composant |
|---|---|
| 1.2 | `MeshGrain` |
| 2.2 | `SlicerWindow` |
| 2.3 | `ModeSwitch` |
| 3.4 | `AnisotropyBreak` |
| 3.6a-c | `OrientationPose` |
| 5.6 | `Pillowing` |
| 5.8 | `SkirtBrim` |

<div class="mt-1 opacity-60">Dessinés en SVG, en français, justes dans les deux thèmes.</div>

</div>

<div class="opacity-70">

**Ce qui gagnerait une vraie prise de vue**

Trois emplacements sont corrects mais génériques : la **couverture** et la **macro de buse** ne montrent pas une MK2.5S, et **4.3** liste les profils d'une MK3. Les remplacer ne demande que d'écraser le fichier dans `public/`.

Chaque appel garde sa consigne de prise de vue dans son attribut `brief`. Ajouter `show-meta` fait réapparaître la référence et la source sur la slide, le temps de préparer la séance.

**Toujours à prévoir hors slides** : un G-code ouvert dans un éditeur, une caisse de pièces ratées, deux figurines en 0,35 et 0,10 mm, une pièce PLA et une pièce PETG à plier.

</div>

</div>

<!--
Cette slide est un aide-mémoire de production, pas une slide de formation.
Elle est placée après la slide de fin et retirée du sommaire par
« hideInToc: true » : on ne tombe pas dessus en naviguant par le programme,
mais elle reste atteignable en avançant jusqu'au bout.

Elle sert au moment où l'on veut refaire une image : elle dit d'où vient
chacune, et laquelle mériterait une vraie prise de vue à l'atelier.
-->
