<script setup lang="ts">
import { computed } from 'vue'

/**
 * Le grain du maillage.
 *
 * Ce que la slide doit faire voir : un fichier 3D ne contient qu'une peau de
 * facettes triangulaires. Pas de matière, pas d'intérieur - des sommets et
 * des faces.
 *
 * Le dôme est volontairement dessiné avec assez de facettes pour paraître
 * lisse : c'est ainsi qu'un STL se présente à l'écran, et c'est ce qui fait
 * oublier ce qu'il contient. La loupe fait le travail - elle montre qu'à
 * l'échelle du fichier, la courbe n'existe pas : il n'y a que des segments
 * droits entre des sommets.
 */

/** Le dôme */
const CX = 92
const CY = 134
const R = 74
/** Assez de facettes pour que le contour paraisse lisse de loin, pas trop pour que la loupe montre une vraie cassure. */
const N = 30
/** Une arête interne sur PAS_EVENTAIL : assez pour dire « triangles », pas assez pour saturer. */
const PAS_EVENTAIL = 4

/** La loupe */
const LX = 240
const LY = 58
const LR = 46
/** Première facette montrée, et nombre de facettes agrandies. */
const DEPART = 8
const COMBIEN = 3
const ZOOM = 3.7

function pointArc(i: number, rayon = R) {
  const a = Math.PI - (i / N) * Math.PI
  return { x: CX + Math.cos(a) * rayon, y: CY - Math.sin(a) * rayon }
}

const sommets = computed(() => Array.from({ length: N + 1 }, (_, i) => pointArc(i)))

/** Le contour facetté, fermé par la base. */
const contour = computed(
  () => `${sommets.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}`,
)

/** Les arêtes internes : un éventail clairsemé depuis le milieu de la base. */
const eventail = computed(() =>
  sommets.value.filter((_, i) => i > 0 && i < N && i % PAS_EVENTAIL === 0),
)

/** Le centre de la portion regardée, qui vient se poser au centre de la loupe. */
const centreVise = computed(() => pointArc(DEPART + COMBIEN / 2))

function versLoupe(p: { x: number, y: number }) {
  return {
    x: LX + (p.x - centreVise.value.x) * ZOOM,
    y: LY + (p.y - centreVise.value.y) * ZOOM,
  }
}

/** Les mêmes facettes, agrandies : des segments droits et leurs sommets. */
const facettesZoom = computed(() =>
  Array.from({ length: COMBIEN + 1 }, (_, k) => versLoupe(pointArc(DEPART + k))),
)
</script>

<template>
  <svg viewBox="0 0 300 168" class="mx-auto w-full max-w-[400px]">
    <defs>
      <clipPath id="mesh-loupe">
        <circle :cx="LX" :cy="LY" :r="LR" />
      </clipPath>
    </defs>

    <!-- Le dôme : lisse à l'œil, facetté en vérité -->
    <polygon
      :points="`${contour} ${CX + R},${CY} ${CX - R},${CY}`"
      fill="currentColor" fill-opacity="0.06"
      stroke="currentColor" stroke-opacity="0.5" stroke-width="1.1"
    />
    <line
      v-for="(p, i) in eventail" :key="`ev-${i}`"
      :x1="CX" :y1="CY" :x2="p.x" :y2="p.y"
      stroke="currentColor" stroke-opacity="0.22" stroke-width="0.6"
    />
    <line :x1="CX - R" :y1="CY" :x2="CX + R" :y2="CY" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.1" />

    <!-- Les rayons de la loupe, tirés vers la portion regardée -->
    <line
      :x1="centreVise.x" :y1="centreVise.y" :x2="LX - LR * 0.8" :y2="LY + LR * 0.62"
      stroke="var(--prusa-orange)" stroke-opacity="0.4" stroke-width="0.7"
    />
    <line
      :x1="centreVise.x" :y1="centreVise.y" :x2="LX - LR * 0.99" :y2="LY - LR * 0.12"
      stroke="var(--prusa-orange)" stroke-opacity="0.4" stroke-width="0.7"
    />

    <!-- La loupe : trois segments droits et quatre sommets, rien d'autre -->
    <g clip-path="url(#mesh-loupe)">
      <circle :cx="LX" :cy="LY" :r="LR" fill="currentColor" fill-opacity="0.05" />
      <polyline
        :points="facettesZoom.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')"
        fill="none" stroke="var(--prusa-orange)" stroke-width="2.4" stroke-linejoin="round"
      />
      <circle v-for="(p, i) in facettesZoom" :key="`z-${i}`" :cx="p.x" :cy="p.y" r="3.4" fill="var(--prusa-orange)" />
    </g>
    <circle :cx="LX" :cy="LY" :r="LR" fill="none" stroke="var(--prusa-orange)" stroke-width="1.5" />

    <text x="150" y="163" text-anchor="middle" fill="currentColor" fill-opacity="0.45" style="font-size:9.5px">
      des sommets et des faces - ni matière, ni intérieur
    </text>
  </svg>
</template>
