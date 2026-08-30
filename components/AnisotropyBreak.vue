<script setup lang="ts">
import { computed } from 'vue'
import type { Point } from '../lib/coupe'

/**
 * L'anisotropie : la même pièce, deux orientations, deux résistances.
 *
 * Ce que le dessin doit faire voir, et rien d'autre : la direction des
 * couches par rapport à l'effort. À gauche elles sont perpendiculaires à la
 * charge, qui les décolle une par une - la rupture est un plan de couche,
 * pas une cassure au hasard. À droite elles sont dans le plan de l'effort,
 * et rien ne cède.
 *
 * Contrairement aux trois poses du porte-téléphone, c'est ici la pièce qui
 * est dessinée fixe, en position d'usage, et l'impression qui a tourné : les
 * couches sont donc horizontales d'un côté et verticales de l'autre. Le
 * hachurage lui-même vient du composant `Couches`, comme partout ailleurs -
 * une couche a la même épaisseur sur toutes les slides du deck.
 *
 * Les trois fragments sont découpés dans la même silhouette et partagent la
 * même grille de couches : c'est ce qui garantit que les deux moitiés
 * montrent bien la même pièce et que seule l'orientation change.
 */

/** Silhouette de l'équerre, en coordonnées locales d'une moitié. */
const COLONNE = { x: 40, y: 50, w: 19, h: 100 }
const BRAS = { x: 59, y: 50, w: 54, h: 15 }
/** Hauteur du plan de rupture, à la racine du bras. */
const Y_RUPTURE = 74

const SOL = 150

/** L'équerre entière, en L. */
const ENTIERE: Point[] = [
  { x: COLONNE.x, y: BRAS.y },
  { x: BRAS.x + BRAS.w, y: BRAS.y },
  { x: BRAS.x + BRAS.w, y: BRAS.y + BRAS.h },
  { x: COLONNE.x + COLONNE.w, y: BRAS.y + BRAS.h },
  { x: COLONNE.x + COLONNE.w, y: SOL },
  { x: COLONNE.x, y: SOL },
]

/** Le tronçon resté debout, sous le plan de rupture. */
const SOUCHE: Point[] = [
  { x: COLONNE.x, y: Y_RUPTURE },
  { x: COLONNE.x + COLONNE.w, y: Y_RUPTURE },
  { x: COLONNE.x + COLONNE.w, y: SOL },
  { x: COLONNE.x, y: SOL },
]

/** Le morceau tombé, dessiné à sa place d'origine avant d'être basculé. */
const TOMBE: Point[] = [
  { x: COLONNE.x, y: BRAS.y },
  { x: BRAS.x + BRAS.w, y: BRAS.y },
  { x: BRAS.x + BRAS.w, y: BRAS.y + BRAS.h },
  { x: COLONNE.x + COLONNE.w, y: BRAS.y + BRAS.h },
  { x: COLONNE.x + COLONNE.w, y: Y_RUPTURE },
  { x: COLONNE.x, y: Y_RUPTURE },
]

/** Le bout du bras, où la charge est accrochée dans les deux moitiés. */
const CHARGE = computed(() => ({ x: BRAS.x + BRAS.w - 12, y: BRAS.y + BRAS.h }))
</script>

<template>
  <svg viewBox="0 0 300 184" class="mx-auto w-full max-w-[430px]">
    <!-- ================= À plat : les couches cèdent ================= -->
    <g>
      <line x1="18" :y1="SOL" x2="132" :y2="SOL" class="coupe-plateau" />

      <!-- La souche, restée sur place. Sa grille de couches est ancrée au
           plateau, celle du morceau tombé aussi : les traits se prolongent
           donc d'un fragment à l'autre, comme dans la pièce d'avant rupture. -->
      <Couches :points="SOUCHE" :origine="SOL" sens="posee" />

      <!-- Le morceau tombé, basculé autour du bord de la rupture -->
      <g :transform="`rotate(13 ${COLONNE.x + COLONNE.w} ${Y_RUPTURE}) translate(7 5)`">
        <Couches :points="TOMBE" :origine="SOL" sens="posee" />

        <!-- La même charge qu'à droite : elle est tombée avec le morceau -->
        <line :x1="CHARGE.x" :y1="CHARGE.y" :x2="CHARGE.x" y2="102" stroke="var(--prusa-orange)" stroke-width="1.2" />
        <rect :x="CHARGE.x - 12" y="102" width="24" height="18" rx="2" fill="var(--prusa-orange)" fill-opacity="0.75" />
        <text :x="CHARGE.x" y="115" text-anchor="middle" fill="#fff" style="font-size:9px;font-weight:700">kg</text>

        <!-- La face de rupture : un plan de couche, net -->
        <line
          :x1="COLONNE.x" :y1="Y_RUPTURE" :x2="COLONNE.x + COLONNE.w" :y2="Y_RUPTURE"
          class="coupe-rupture"
        />
      </g>
      <line
        :x1="COLONNE.x" :y1="Y_RUPTURE" :x2="COLONNE.x + COLONNE.w" :y2="Y_RUPTURE"
        class="coupe-rupture"
      />

      <text x="75" y="168" text-anchor="middle" fill="currentColor" fill-opacity="0.75" style="font-size:11px;font-weight:600">
        à plat
      </text>
      <text x="75" y="177" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:8.5px">
        les couches se décollent
      </text>
    </g>

    <line x1="150" y1="18" x2="150" y2="158" stroke="currentColor" stroke-opacity="0.14" stroke-dasharray="4 4" />

    <!-- ================= Debout : les couches tiennent ================= -->
    <g transform="translate(150 0)">
      <line x1="18" :y1="SOL" x2="132" :y2="SOL" class="coupe-plateau" />

      <!-- Imprimée debout, la pièce est couchée dans la machine : ses couches
           sont perpendiculaires au sol du dessin, empilées depuis le flanc
           gauche - qui était le plateau ce jour-là. -->
      <Couches :points="ENTIERE" :origine="COLONNE.x" sens="debout" />

      <!-- La charge, accrochée au bout du bras -->
      <line :x1="CHARGE.x" :y1="CHARGE.y" :x2="CHARGE.x" y2="102" stroke="var(--prusa-orange)" stroke-width="1.2" />
      <rect :x="CHARGE.x - 12" y="102" width="24" height="18" rx="2" fill="var(--prusa-orange)" fill-opacity="0.75" />
      <text :x="CHARGE.x" y="115" text-anchor="middle" fill="#fff" style="font-size:9px;font-weight:700">kg</text>

      <text x="75" y="168" text-anchor="middle" fill="currentColor" fill-opacity="0.75" style="font-size:11px;font-weight:600">
        debout
      </text>
      <text x="75" y="177" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:8.5px">
        les couches tiennent ensemble
      </text>
    </g>
  </svg>
</template>
