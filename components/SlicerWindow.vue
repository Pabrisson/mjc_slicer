<script setup lang="ts">
/**
 * La fenêtre de PrusaSlicer, en maquette HTML/CSS.
 *
 * Redessinée et non capturée, pour deux raisons. D'abord la langue : toutes
 * les captures disponibles sont en interface anglaise, et cette slide est la
 * première vue d'ensemble que la salle reçoit - c'est le pire endroit pour
 * lui montrer des libellés qu'elle ne retrouvera pas à l'écran.
 *
 * Ensuite les repères : les quatre zones numérotées vivent dans le composant,
 * ancrées en CSS sur les blocs qu'elles désignent. Elles suivent la maquette
 * quelle que soit la taille de la slide, là où des étiquettes posées en
 * coordonnées absolues par-dessus une image se décalent au premier ajustement.
 *
 * Chaque zone a sa couleur, reprise par sa pastille et par sa ligne de
 * légende : quatre teintes assez écartées pour se distinguer de loin, mais
 * tenues dans la gamme des bobines Prusament - sarcelle, bleu, or et violet.
 * L'orange de la marque n'en fait pas partie : il habille déjà l'interface
 * elle-même. La zone 1 apparaît deux fois : les outils de gauche et ceux du
 * centre sont la même barre, que le logiciel coupe en deux.
 *
 * Les tons du logiciel sont ceux du thème sombre, comme PresetsDropdown : la
 * fenêtre doit être reconnaissable au premier coup d'œil, quel que soit le
 * thème de la slide. La maquette reste volontairement simplifiée - elle montre
 * où regarder, pas à quoi ça ressemble en détail. La vraie fenêtre est
 * projetée juste après, en direct.
 */

/** Les trois listes du panneau de droite, de haut en bas comme dans le logiciel. */
const profils = [
  { libelle: 'Réglages d’impression', valeur: '0.20mm NORMAL', pastille: '' },
  { libelle: 'Filament', valeur: 'Prusament PLA', pastille: '#e8873a' },
  { libelle: 'Imprimante', valeur: 'Original Prusa i3 MK2.5S', pastille: '' },
]

/** Les quatre repères de la slide, dans l'ordre où on les commente. */
const reperes = [
  { n: 1, titre: 'Barres d’outils', sous: 'déplacer, tourner, poser' },
  { n: 2, titre: 'Les onglets', sous: 'plateau, réglages, filaments' },
  { n: 3, titre: 'Les trois profils', sous: 'imprimante, filament, qualité' },
  { n: 4, titre: 'Découper / Exporter', sous: 'et le temps estimé' },
]
</script>

<template>
  <div class="psw-bloc">
    <div class="psw">
      <!-- ===== 2 · Les onglets, en haut ===== -->
      <header class="psw-tabs psw-zone z2">
        <span class="psw-num">2</span>
        <span class="psw-tab is-on">Plateau</span>
        <span class="psw-tab">Réglages d’impression</span>
        <span class="psw-tab">Filaments</span>
        <span class="psw-tab">Imprimantes</span>
        <span class="psw-mode"><i class="psw-pastille" />Mode normal</span>
      </header>

      <div class="psw-corps">
        <!-- ===== 1 · La barre d'outils, premier morceau ===== -->
        <nav class="psw-outils psw-zone z1">
          <span class="psw-num">1</span>
          <span class="psw-outil is-on" title="Déplacer"><carbon-move /></span>
          <span class="psw-outil" title="Échelle"><carbon-maximize /></span>
          <span class="psw-outil" title="Rotation"><carbon-rotate-clockwise /></span>
          <span class="psw-outil" title="Poser sur une face"><carbon-plane /></span>
          <span class="psw-outil" title="Couper"><carbon-cut /></span>
          <span class="psw-outil" title="Supports peints"><carbon-paint-brush /></span>
          <span class="psw-outil" title="Mesurer"><carbon-ruler /></span>
        </nav>

        <!-- La vue 3D : le plateau en perspective et l'objet posé dessus.
             Vraie perspective CSS plutôt que dessin en projection : la scène
             tourne d'un seul réglage, et le cube reste posé sur le plateau. -->
        <section class="psw-vue">
          <!-- ===== 1 · La barre d'outils, second morceau ===== -->
          <div class="psw-flottante psw-zone z1">
            <span class="psw-num">1</span>
            <span class="psw-outil" title="Ajouter"><carbon-add-alt /></span>
            <span class="psw-outil" title="Supprimer"><carbon-trash-can /></span>
            <span class="psw-outil" title="Copier"><carbon-copy /></span>
            <span class="psw-outil" title="Centrer"><carbon-center-circle /></span>
            <span class="psw-outil" title="Arranger"><carbon-cube /></span>
            <span class="psw-outil" title="Annuler"><carbon-undo /></span>
            <span class="psw-outil" title="Refaire"><carbon-redo /></span>
          </div>

          <div class="psw-scene">
            <div class="psw-monde">
              <div class="psw-plateau">
                <div class="psw-grille" />
                <div class="psw-logo">ORIGINAL PRUSA i3 MK2.5S</div>
              </div>
              <!-- Les six faces moins celle du dessous. Les trois tournées vers
                   le fond sont masquées par backface-visibility : le cube reste
                   fermé même si on change l'angle du monde. -->
              <div class="psw-cube">
                <i class="psw-f-dessus" />
                <i class="psw-f-y psw-f-y1" />
                <i class="psw-f-y psw-f-y2" />
                <i class="psw-f-x psw-f-x1" />
                <i class="psw-f-x psw-f-x2" />
              </div>
            </div>
          </div>

          <!-- Les deux bascules de vue, en bas à gauche. C'est ici, et non
               dans les onglets du haut, qu'on passe du plateau aux couches. -->
          <div class="psw-bascules">
            <span class="psw-outil is-on" title="Plateau"><carbon-cube /></span>
            <span class="psw-outil" title="Aperçu"><carbon-list /></span>
          </div>
        </section>

        <!-- Le panneau de droite -->
        <aside class="psw-panneau">
          <!-- ===== 3 · Les trois profils ===== -->
          <div class="psw-profils psw-zone z3">
            <span class="psw-num">3</span>
            <template v-for="p in profils" :key="p.libelle">
              <div class="psw-etiquette">{{ p.libelle }} :</div>
              <div class="psw-combo">
                <i v-if="p.pastille" class="psw-carre" :style="{ background: p.pastille }" />
                <carbon-locked v-else class="psw-cadenas" />
                <span class="psw-valeur">{{ p.valeur }}</span>
                <carbon-chevron-down class="psw-chevron" />
              </div>
            </template>
          </div>

          <div class="psw-ligne">
            <span class="psw-etiquette">Supports :</span>
            <span class="psw-combo psw-court">
              <span class="psw-valeur">Aucun</span>
              <carbon-chevron-down class="psw-chevron" />
            </span>
          </div>
          <div class="psw-ligne">
            <span class="psw-etiquette">Remplissage :</span>
            <span class="psw-combo psw-court">
              <span class="psw-valeur">15 %</span>
              <carbon-chevron-down class="psw-chevron" />
            </span>
            <span class="psw-etiquette">Bordure</span>
            <i class="psw-case" />
          </div>

          <div class="psw-objets">
            <div class="psw-objets-tete"><span>Nom</span><span>Édition</span></div>
            <div class="psw-objet"><span>Forme-Boîte</span><carbon-view /></div>
          </div>

          <!-- ===== 4 · Découper et exporter ===== -->
          <div class="psw-decouper psw-zone z4">
            <span class="psw-num">4</span>
            <div class="psw-temps">Temps estimé : 2 h 14 min</div>
            <div class="psw-bouton">Découper maintenant</div>
          </div>
        </aside>
      </div>
    </div>

    <!-- La légende : les quatre zones, dans l'ordre où on les commente -->
    <ul class="psw-legende">
      <li v-for="r in reperes" :key="r.n" :class="`z${r.n}`">
        <span class="psw-num psw-num-inline">{{ r.n }}</span>
        <strong>{{ r.titre }}</strong>
        <span class="psw-sous">{{ r.sous }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Les tons de l'interface PrusaSlicer en thème sombre. Un seul endroit pour
   les régler : la maquette doit rester une fenêtre de logiciel, pas une
   illustration qui suit le thème de la slide. */
.psw-bloc {
  --w-fond: #3c3f41;
  --w-champ: #2b2b2b;
  --w-bord: #212121;
  --w-txt: #d7d7d7;
  --w-att: #8a8a8a;
  --w-orange: #e8873a;

  width: 100%;
  font-size: 11px;
  line-height: 1.3;
}

/* Une couleur par zone, prise dans la gamme des bobines Prusament : sarcelle,
   bleu, or et violet. Chacune porte le liseré, la pastille et la ligne de
   légende de sa zone. Aucune ne reprend l'orange de la marque : il est déjà
   pris par l'interface elle-même - onglet actif, outil sélectionné, bouton
   « Découper ». Un repère orange se serait confondu avec eux. */
.z1 {
  --z: #12a396;
}
.z2 {
  --z: #3596dd;
}
.z3 {
  --z: #d99a20;
}
.z4 {
  --z: #9d74d4;
}

.psw {
  height: 372px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--w-bord);
  border-radius: 5px;
  background: var(--w-fond);
  color: var(--w-txt);
}

/* ===== Les zones repérées =====
   Un liseré et un numéro à la couleur de la zone : les quatre points que la
   slide commente. Le contour est posé en outline pour ne décaler aucune mise
   en page. */
.psw-zone {
  position: relative;
  outline: 1.5px solid var(--z);
  outline-offset: -1.5px;
  border-radius: 3px;
}

.psw-num {
  position: absolute;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 17px;
  height: 17px;
  /* La boîte de ligne réserve la place d'un jambage que les chiffres n'ont
     pas : centrée telle quelle, l'encre tombe huit dixièmes de pixel trop
     bas. Le padding rend ce décalage au centrage. */
  padding-bottom: 1.6px;
  border-radius: 50%;
  background: var(--z);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 1px 5px rgb(0 0 0 / 45%);
}

/* Le « 1 » d'Inter n'est pas centré dans sa chasse - son encre penche d'un
   demi-pixel vers la gauche. Les trois pastilles de la zone 1 le rendent. */
.z1 > .psw-num {
  padding-left: 1.2px;
}

/* ===== 2 · Les onglets ===== */
.psw-tabs {
  flex: none;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  background: #333537;
}
.psw-tabs .psw-num {
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
}

.psw-tab {
  padding: 4px 10px;
  border-radius: 3px;
  color: var(--w-att);
  white-space: nowrap;
}
.psw-tab.is-on {
  background: var(--prusa-orange);
  color: #fff;
  font-weight: 600;
}

.psw-mode {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 32px 0 auto;
  color: var(--w-att);
}
.psw-pastille {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e8b53a;
}

.psw-corps {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* ===== 1 · Les deux morceaux de la barre d'outils =====
   Même bouton des deux côtés : c'est la même barre, le logiciel la coupe en
   deux, la slide ne doit pas la faire passer pour deux objets différents. */
.psw-outil {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background: #4a4d4f;
  color: #c8c8c8;
  font-size: 15px;
}
.psw-outil.is-on {
  background: #5d6062;
  color: #fff;
  box-shadow: inset 0 0 0 1px var(--w-orange);
}
/* Les icônes sont des <svg> en ligne : sans cela, la ligne de base du texte
   les décale de un ou deux pixels vers le bas. */
.psw-outil :deep(svg) {
  display: block;
}

.psw-outils {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 7px 6px;
  background: #333537;
}
.psw-outils .psw-num {
  top: 50%;
  right: -23px;
  transform: translateY(-50%);
}

.psw-flottante {
  position: absolute;
  z-index: 2;
  top: 9px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  background: rgb(51 53 55 / 94%);
}
.psw-flottante .psw-num {
  top: 50%;
  right: -23px;
  transform: translateY(-50%);
}

/* ===== La vue 3D ===== */
.psw-vue {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  background: radial-gradient(120% 100% at 50% 30%, #4a4d50 0%, #2d2f31 70%, #262728 100%);
}

/* La scène : une vraie perspective CSS. Le plateau est le plan du monde, le
   cube y repose - sa face inférieure est à z = 0. */
.psw-scene {
  position: absolute;
  inset: 0;
  perspective: 900px;
  perspective-origin: 50% 42%;
}
.psw-monde {
  position: absolute;
  top: 57%;
  left: 50%;
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateZ(-22deg);
}

.psw-plateau {
  position: absolute;
  width: 320px;
  height: 274px;
  margin: -137px 0 0 -160px;
  border-radius: 3px;
  background: #1b1b1b;
  box-shadow: 0 0 0 7px #2a2a2a;
}
.psw-grille {
  position: absolute;
  inset: 10px;
  background-image:
    repeating-linear-gradient(to right, rgb(255 255 255 / 24%) 0 1px, transparent 1px 32px),
    repeating-linear-gradient(to bottom, rgb(255 255 255 / 24%) 0 1px, transparent 1px 32px);
  background-position: right bottom;
  border: 1px solid rgb(255 255 255 / 30%);
}
.psw-logo {
  position: absolute;
  right: 16px;
  bottom: 20px;
  color: rgb(255 255 255 / 45%);
  font-size: 13px;
  font-style: italic;
  font-weight: 700;
  letter-spacing: 0.04em;
}

/* L'objet posé : le cube de démonstration, au vert de PrusaSlicer. */
.psw-cube {
  position: absolute;
  width: 46px;
  height: 46px;
  margin: -23px 0 0 -23px;
  transform-style: preserve-3d;
  transform: translate3d(-8px, -4px, 23px);
}
.psw-cube i {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border: 1px solid rgb(0 0 0 / 22%);
}
.psw-f-dessus {
  background: #63cf63;
  transform: translateZ(23px);
}
.psw-f-y {
  background: #34a334;
}
.psw-f-y1 {
  transform: rotateX(-90deg) translateZ(23px);
}
.psw-f-y2 {
  transform: rotateX(90deg) translateZ(23px);
}
.psw-f-x {
  background: #268826;
}
.psw-f-x1 {
  transform: rotateY(90deg) translateZ(23px);
}
.psw-f-x2 {
  transform: rotateY(-90deg) translateZ(23px);
}

/* Les deux bascules de vue : même bouton et même plaque que la barre d'outils
   flottante, dont elles sont le pendant en bas de la vue. */
.psw-bascules {
  position: absolute;
  bottom: 9px;
  left: 9px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 3px;
  background: rgb(51 53 55 / 94%);
}

/* ===== Le panneau de droite ===== */
.psw-panneau {
  flex: none;
  width: 218px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 8px;
  background: #383a3c;
  border-left: 1px solid var(--w-bord);
}

.psw-profils {
  padding: 6px 6px 8px;
}
.psw-profils .psw-num {
  top: -8px;
  right: -4px;
}

.psw-etiquette {
  color: var(--w-att);
  white-space: nowrap;
}
.psw-profils .psw-etiquette {
  margin: 3px 0 2px;
}

.psw-combo {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  padding: 3px 0 3px 4px;
  border: 1px solid var(--w-bord);
  border-radius: 2px;
  background: var(--w-champ);
}
.psw-court {
  flex: 1;
}
.psw-valeur {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.psw-carre {
  flex: none;
  width: 11px;
  height: 11px;
  border: 1px solid rgb(0 0 0 / 45%);
}
.psw-cadenas {
  flex: none;
  color: var(--w-orange);
  font-size: 11px;
}
.psw-chevron {
  flex: none;
  margin-left: auto;
  padding: 0 3px;
  border-left: 1px solid rgb(255 255 255 / 12%);
  color: var(--w-att);
  font-size: 11px;
}

.psw-ligne {
  display: flex;
  align-items: center;
  gap: 5px;
}
.psw-case {
  width: 11px;
  height: 11px;
  border: 1px solid var(--w-bord);
  border-radius: 2px;
  background: var(--w-champ);
}

/* La liste des objets : deux lignes suffisent à la reconnaître. */
.psw-objets {
  flex: 1;
  min-height: 56px;
  border: 1px solid var(--w-bord);
  border-radius: 2px;
  background: #303233;
}
.psw-objets-tete,
.psw-objet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 6px;
}
.psw-objets-tete {
  color: var(--w-att);
  border-bottom: 1px solid var(--w-bord);
}
.psw-objet {
  background: #45484a;
}

.psw-decouper {
  padding: 5px 6px 6px;
  text-align: center;
}
.psw-decouper .psw-num {
  top: -8px;
  right: -4px;
}
.psw-temps {
  margin-bottom: 4px;
  color: var(--w-att);
}
.psw-bouton {
  padding: 6px 0;
  border-radius: 3px;
  background: var(--prusa-orange);
  color: #fff;
  font-weight: 700;
}

/* ===== La légende ===== */
.psw-legende {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 14px;
  margin: 9px 0 0;
  padding: 0;
  list-style: none;
}
.psw-legende li {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 5px;
  font-size: 12px;
}
.psw-num-inline {
  position: static;
  flex: none;
  align-self: center;
  width: 19px;
  height: 19px;
  line-height: 1;
}
.psw-sous {
  flex: 1 0 100%;
  padding-left: 24px;
  opacity: 0.6;
  font-size: 10.5px;
  line-height: 1.2;
}
</style>
