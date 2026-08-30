<script setup lang="ts">
import { computed } from 'vue'

/**
 * L'anisotropie : la même pièce, deux orientations, deux résistances.
 *
 * Ce que le dessin doit faire voir, et rien d'autre : la direction des
 * couches par rapport à l'effort. À gauche elles sont perpendiculaires à la
 * charge, qui les décolle une par une - la rupture est un plan de couche,
 * pas une cassure au hasard. À droite elles sont dans le plan de l'effort,
 * et rien ne cède.
 *
 * Le hachurage suit une seule silhouette, découpée deux fois dans deux
 * directions : c'est ce qui garantit que les deux moitiés montrent bien la
 * même pièce et que seule l'orientation change.
 */

/** Silhouette de l'équerre, en coordonnées locales d'une moitié. */
const COLONNE = { x: 40, y: 50, w: 19, h: 100 }
const BRAS = { x: 59, y: 50, w: 54, h: 15 }
/** Hauteur du plan de rupture, à la racine du bras. */
const Y_RUPTURE = 74

const SOL = 150
const PAS = 5.6

/** Les traits de couche, dans un sens ou dans l'autre. */
const couchesHorizontales = computed(() =>
  Array.from({ length: Math.floor((SOL - COLONNE.y) / PAS) }, (_, i) => COLONNE.y + (i + 1) * PAS),
)
const couchesVerticales = computed(() =>
  Array.from({ length: Math.floor((BRAS.x + BRAS.w - COLONNE.x) / PAS) }, (_, i) => COLONNE.x + (i + 1) * PAS),
)
</script>

<template>
  <svg viewBox="0 0 300 184" class="mx-auto w-full max-w-[430px]">
    <defs>
      <!-- La pièce entière, pour la moitié droite -->
      <clipPath id="ani-entiere">
        <rect :x="COLONNE.x" :y="COLONNE.y" :width="COLONNE.w" :height="COLONNE.h" />
        <rect :x="BRAS.x" :y="BRAS.y" :width="BRAS.w" :height="BRAS.h" />
      </clipPath>
      <!-- Le tronçon resté debout, pour la moitié gauche -->
      <clipPath id="ani-souche">
        <rect :x="COLONNE.x" :y="Y_RUPTURE" :width="COLONNE.w" :height="SOL - Y_RUPTURE" />
      </clipPath>
      <!-- Le morceau tombé, redressé à l'origine avant d'être basculé -->
      <clipPath id="ani-tombe">
        <rect :x="COLONNE.x" :y="COLONNE.y" :width="COLONNE.w" :height="Y_RUPTURE - COLONNE.y" />
        <rect :x="BRAS.x" :y="BRAS.y" :width="BRAS.w" :height="BRAS.h" />
      </clipPath>
    </defs>

    <!-- ================= À plat : les couches cèdent ================= -->
    <g>
      <line x1="18" :y1="SOL" x2="132" :y2="SOL" stroke="currentColor" stroke-width="1.6" stroke-opacity="0.35" />

      <!-- La souche, restée sur place -->
      <g clip-path="url(#ani-souche)">
        <rect :x="COLONNE.x" :y="Y_RUPTURE" :width="COLONNE.w" :height="SOL - Y_RUPTURE" fill="currentColor" fill-opacity="0.16" />
        <line
          v-for="y in couchesHorizontales" :key="`sh-${y}`"
          :x1="COLONNE.x" :y1="y" :x2="COLONNE.x + COLONNE.w" :y2="y"
          stroke="currentColor" stroke-width="0.9" stroke-opacity="0.45"
        />
      </g>

      <!-- Le morceau tombé, basculé autour du bord de la rupture -->
      <g :transform="`rotate(13 ${COLONNE.x + COLONNE.w} ${Y_RUPTURE}) translate(7 5)`">
        <g clip-path="url(#ani-tombe)">
          <rect :x="COLONNE.x" :y="COLONNE.y" :width="BRAS.x + BRAS.w - COLONNE.x" :height="Y_RUPTURE - COLONNE.y" fill="currentColor" fill-opacity="0.16" />
          <line
            v-for="y in couchesHorizontales" :key="`th-${y}`"
            :x1="COLONNE.x" :y1="y" :x2="BRAS.x + BRAS.w" :y2="y"
            stroke="currentColor" stroke-width="0.9" stroke-opacity="0.45"
          />
        </g>
        <!-- La même charge qu'à droite : elle est tombée avec le morceau -->
        <line :x1="BRAS.x + BRAS.w - 12" :y1="BRAS.y + BRAS.h" :x2="BRAS.x + BRAS.w - 12" y2="102" stroke="var(--prusa-orange)" stroke-width="1.2" />
        <rect :x="BRAS.x + BRAS.w - 24" y="102" width="24" height="18" rx="2" fill="var(--prusa-orange)" fill-opacity="0.75" />
        <text :x="BRAS.x + BRAS.w - 12" y="115" text-anchor="middle" fill="#fff" style="font-size:9px;font-weight:700">kg</text>

        <!-- La face de rupture : un plan de couche, net -->
        <line
          :x1="COLONNE.x" :y1="Y_RUPTURE" :x2="COLONNE.x + COLONNE.w" :y2="Y_RUPTURE"
          stroke="var(--prusa-rouge)" stroke-width="2.6"
        />
      </g>
      <line
        :x1="COLONNE.x" :y1="Y_RUPTURE" :x2="COLONNE.x + COLONNE.w" :y2="Y_RUPTURE"
        stroke="var(--prusa-rouge)" stroke-width="2.6"
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
      <line x1="18" :y1="SOL" x2="132" :y2="SOL" stroke="currentColor" stroke-width="1.6" stroke-opacity="0.35" />

      <g clip-path="url(#ani-entiere)">
        <rect :x="COLONNE.x" :y="COLONNE.y" :width="BRAS.x + BRAS.w - COLONNE.x" :height="SOL - COLONNE.y" fill="currentColor" fill-opacity="0.16" />
        <line
          v-for="x in couchesVerticales" :key="`v-${x}`"
          :x1="x" :y1="COLONNE.y" :x2="x" :y2="SOL"
          stroke="currentColor" stroke-width="0.9" stroke-opacity="0.45"
        />
      </g>

      <!-- La charge, accrochée au bout du bras -->
      <line :x1="BRAS.x + BRAS.w - 12" :y1="BRAS.y + BRAS.h" :x2="BRAS.x + BRAS.w - 12" y2="102" stroke="var(--prusa-orange)" stroke-width="1.2" />
      <rect :x="BRAS.x + BRAS.w - 24" y="102" width="24" height="18" rx="2" fill="var(--prusa-orange)" fill-opacity="0.75" />
      <text :x="BRAS.x + BRAS.w - 12" y="115" text-anchor="middle" fill="#fff" style="font-size:9px;font-weight:700">kg</text>

      <text x="75" y="168" text-anchor="middle" fill="currentColor" fill-opacity="0.75" style="font-size:11px;font-weight:600">
        debout
      </text>
      <text x="75" y="177" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:8.5px">
        les couches tiennent ensemble
      </text>
    </g>
  </svg>
</template>
