---
layout: section
module: 2 · Le tour du propriétaire
routeAlias: mod2
---

# Le tour du propriétaire

Trois vues, trois modes, trois profils

<!--
Minutage : 17-18 min.

C'est le moment de basculer sur PrusaSlicer en vrai. Prévoir le logiciel déjà
ouvert dans un autre espace de travail, profil MK2.5S chargé, plateau vide.

Annoncer : « Pendant 10 minutes, on ne fait que se repérer. Je ne règle rien. »
Ça évite les questions prématurées sur les réglages.
-->

---
module: 2 · Le tour du propriétaire
---

# L'écran, en quatre zones

<Placeholder ref="2.2"
  brief="Copie d'écran plein cadre de PrusaSlicer, onglet Plateau, mode Avancé, avec le porte-téléphone posé sur le plateau de la MK2.5S. Interface en français. Ne rien annoter : les repères sont ajoutés par-dessus dans Slidev."
  ratio="16/7" maxH="360px" />

<div v-drag="[60,180,150,60]" class="drag-note">
  <strong>1 · Barre d'outils</strong><br>
  <span class="op-60">déplacer, tourner, poser sur la face</span>
</div>

<div v-drag="[350,120,150,60]" class="drag-note">
  <strong>2 · Les onglets</strong><br>
  <span class="op-60">Plateau · Aperçu · les réglages</span>
</div>

<div v-drag="[640,180,160,60]" class="drag-note">
  <strong>3 · Les trois profils</strong><br>
  <span class="op-60">imprimante, filament, qualité</span>
</div>

<div v-drag="[640,330,160,60]" class="drag-note">
  <strong>4 · Découper / Exporter</strong><br>
  <span class="op-60">et le temps estimé</span>
</div>

<style>
.drag-note {
  font-size: 0.72rem;
  line-height: 1.25;
  background: var(--prusa-orange);
  color: white;
  padding: 0.4em 0.6em;
  border-radius: 0.35em;
  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
}
</style>

<!--
Minutage : 18-21 min.

Les quatre étiquettes sont des éléments v-drag : en mode développement
(pnpm dev), on peut les attraper à la souris et les repositionner sur la
capture réelle - Slidev réécrit les coordonnées dans le fichier tout seul.
Faire ce calage une fois la vraie capture en place.

Pendant la démo, montrer chaque zone dans l'ordre 1-2-3-4 en pointant à
l'écran, pas sur la slide. La slide sert de mémoire, la démo sert de guide.

Insister sur une seule chose : le sens de lecture. On travaille de gauche
(l'objet) vers la droite (les réglages) puis vers le bas (découper).
C'est l'ordre des 90 minutes qui suivent.
-->

---
module: 2 · Le tour du propriétaire
layout: two-cols-header
---

# Les trois modes

<div class="text-sm opacity-60 -mt-3 mb-3">En haut à droite. Le même logiciel, trois niveaux de rideau levé.</div>

::left::

<div class="pr-6">

<v-clicks>

<div class="temoin mb-2">
<strong>Simple</strong> - une trentaine de réglages<br>
<span class="text-xs opacity-60">Pour imprimer sans réfléchir. On y est vite à l'étroit.</span>
</div>

<div class="temoin mb-2" style="border-color: var(--prusa-orange); border-width: 2px">
<strong style="color: var(--prusa-orange)">Avancé</strong> - environ 120 réglages<br>
<span class="text-xs opacity-60">Tout ce dont on a besoin. <strong>C'est ici qu'on vit aujourd'hui.</strong></span>
</div>

<div class="temoin">
<strong>Expert</strong> - plus de 350 réglages<br>
<span class="text-xs opacity-60">Tout est déverrouillé, y compris de quoi tout casser.</span>
</div>

</v-clicks>

</div>

::right::

<div class="pl-4">

<Placeholder ref="2.3"
  brief="Copie d'écran serrée sur le sélecteur de mode en haut à droite de PrusaSlicer (Simple / Avancé / Expert), avec Avancé sélectionné. Zoom net, on doit lire les trois libellés."
  ratio="16/6" />

<div v-click class="regle mt-5 text-sm">

**Le conseil** : rester en Avancé. Passer en Expert seulement pour un réglage précis qu'on est allé chercher volontairement - puis revenir.

</div>

<div v-click class="mt-4 text-sm opacity-60">

Le mode ne change **rien** à l'impression. Il ne fait que masquer des réglages. Ceux qu'on ne voit pas sont quand même actifs.

</div>

</div>

<!--
Minutage : 21-23 min.

Le dernier point est souvent mal compris : passer en Expert ne « débloque » pas
de meilleures performances. Les 350 réglages sont toujours appliqués, même en
mode Simple. On choisit seulement ce qu'on accepte de voir.

Basculer les trois modes en direct et faire regarder la colonne de droite
s'allonger. L'effet est parlant et prend 10 secondes.
-->

---
module: 2 · Le tour du propriétaire
---

# Le trio qui décide de tout

<div class="grid grid-cols-3 gap-4 mt-6">

<div v-click class="temoin">
<div class="text-xs uppercase tracking-wide opacity-50">Imprimante</div>
<div class="font-mono text-sm mt-1" style="color: var(--prusa-orange)">Original Prusa i3 MK2.5S<br>0.4 nozzle</div>
<div class="text-xs opacity-60 mt-2">Le modèle exact <strong>et le diamètre de buse</strong>. Il définit le volume, la cinématique, le G-code de démarrage.</div>
</div>

<div v-click class="temoin">
<div class="text-xs uppercase tracking-wide opacity-50">Filament</div>
<div class="font-mono text-sm mt-1" style="color: var(--prusa-orange)">Prusament PLA</div>
<div class="text-xs opacity-60 mt-2">La matière <strong>et la marque</strong>. Températures, ventilation, rétraction, débit.</div>
</div>

<div v-click class="temoin">
<div class="text-xs uppercase tracking-wide opacity-50">Réglages d'impression</div>
<div class="font-mono text-sm mt-1" style="color: var(--prusa-orange)">0.20mm NORMAL</div>
<div class="text-xs opacity-60 mt-2">La qualité visée. Hauteur de couche, périmètres, remplissage, vitesses.</div>
</div>

</div>

<div v-click class="mt-6">

Les trois listes sont **liées** : changer d'imprimante filtre les profils compatibles. On ne peut pas afficher un profil 0,25 mm avec une buse 0,4 - PrusaSlicer le cache.

</div>

<div v-click class="piege mt-4">

**Le piège n°1** : changer la buse sur la machine sans changer le profil. Le slicer continue à calculer pour 0,4 mm. Résultat garanti : sous-extrusion ou bouchon.

</div>

<div v-click class="mt-4 text-sm">

<carbon-warning-alt class="inline opacity-60" /> Un **astérisque orange** devant un nom de profil signifie « modifié, non enregistré ». On le verra souvent aujourd'hui.

</div>

<!--
Minutage : 23-27 min.

C'est la slide la plus importante du module. Le trio est la seule chose qu'ils
DOIVENT vérifier avant chaque impression.

Formuler le réflexe à emporter, à répéter à chaque module :
« Avant de découper : la bonne imprimante, le bon filament, le bon profil. »

Sur l'astérisque : le montrer en direct en changeant le remplissage à 25 %.
Puis expliquer les deux boutons qui apparaissent : la disquette pour
enregistrer un nouveau profil, la flèche pour tout annuler.
Dire qu'on utilisera surtout la flèche aujourd'hui.

C'est aussi le moment d'ouvrir le fil rouge : glisser-déposer le STL du
porte-téléphone sur le plateau. Il ne bougera plus jusqu'au module 7.
-->
