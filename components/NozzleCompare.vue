<script setup lang="ts">
import { computed } from 'vue'

/**
 * Ce que le diamètre de buse change, vu en coupe dans un mur.
 * Pendant que la hauteur de couche décide de la finesse en Z,
 * la buse décide de la largeur d'un trait - donc du plus petit
 * détail imprimable et de l'épaisseur minimale d'un mur.
 */
const props = withDefaults(defineProps<{
  diameters?: number[]
  /** Ce à quoi sert chaque diamètre, dans le même ordre */
  notes?: string[]
  /** Le diamètre monté sur la machine de l'atelier, mis en avant */
  current?: number
  /** Hauteur de couche dessinée, en mm - la même pour les trois */
  layer?: number
}>(), {
  diameters: () => [0.25, 0.4, 0.6],
  notes: () => ['Miniature', 'Standard', 'Gros volumes'],
  current: 0.4,
  layer: 0.2,
})

/** Largeur réelle d'un trait : PrusaSlicer étale la matière au-delà de l'orifice. */
const widthOf = (d: number) => Math.round(d * 1.125 * 100) / 100
/** Règle des 75 % du diamètre, arrondie au cran de profil le plus proche. */
const maxLayerOf = (d: number) => Math.round((d * 0.75) / 0.05) * 0.05

const SC = 56 // unités SVG par mm
const CX = 62 // axe du trait en cours de dépôt
const NOZZLE_H = 30 // hauteur dessinée de la buse
const TOP = 34 // haut de la couche en cours
const LAYERS = 3

const cards = computed(() =>
  props.diameters.map((d, i) => {
    const w = widthOf(d)
    const wPx = w * SC
    const hPx = props.layer * SC
    // Un mur de deux périmètres : le trait en cours, et celui déjà posé à sa gauche.
    const beads: { x: number, y: number, live: boolean }[] = []
    for (let k = 0; k < LAYERS; k++) {
      const y = TOP + k * hPx
      beads.push({ x: CX - 1.5 * wPx, y, live: false })
      beads.push({ x: CX - 0.5 * wPx, y, live: k === 0 })
    }
    const lip = (d / 2) * SC // demi-orifice
    return {
      d,
      w,
      wPx,
      hPx,
      beads,
      lip,
      wall: w * 2,
      maxLayer: maxLayerOf(d),
      nozzle: `M ${CX - 26} 0 L ${CX + 26} 0 L ${CX + lip} ${NOZZLE_H - 4} L ${CX + lip} ${NOZZLE_H} L ${CX - lip} ${NOZZLE_H} L ${CX - lip} ${NOZZLE_H - 4} Z`,
      base: TOP + LAYERS * hPx,
      note: props.notes[i] ?? '',
      here: Math.abs(d - props.current) < 0.001,
    }
  }),
)
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <div v-for="c in cards" :key="c.d" class="flex flex-col items-center gap-1">
      <div class="font-mono text-xl" :style="{ color: c.here ? 'var(--prusa-orange, #fa6831)' : 'currentColor', opacity: c.here ? 1 : 0.5 }">
        Ø {{ c.d.toFixed(2) }} mm
      </div>

      <svg viewBox="0 0 124 92" class="w-full max-w-[132px]">
        <!-- la buse en coupe, ouverture = le diamètre -->
        <path :d="c.nozzle" fill="currentColor" fill-opacity="0.28" />

        <!-- le mur en construction : deux périmètres, trois couches -->
        <rect v-for="(b, i) in c.beads" :key="i"
          :x="b.x" :y="b.y" :width="c.wPx - 1" :height="c.hPx - 0.8" :rx="c.hPx / 3"
          :fill="b.live ? 'var(--prusa-orange, #fa6831)' : 'currentColor'"
          :fill-opacity="b.live ? 0.95 : 0.45" />

        <!-- le plateau -->
        <line x1="6" :y1="c.base + 1" x2="118" :y2="c.base + 1" stroke="currentColor" stroke-width="1.2" stroke-opacity="0.5" />

        <!-- la cote de la largeur d'un trait -->
        <g stroke="var(--prusa-orange, #fa6831)" stroke-width="0.9">
          <line :x1="CX - 0.5 * c.wPx" :y1="c.base + 8" :x2="CX + 0.5 * c.wPx" :y2="c.base + 8" />
          <line :x1="CX - 0.5 * c.wPx" :y1="c.base + 5" :x2="CX - 0.5 * c.wPx" :y2="c.base + 11" />
          <line :x1="CX + 0.5 * c.wPx" :y1="c.base + 5" :x2="CX + 0.5 * c.wPx" :y2="c.base + 11" />
        </g>
        <text :x="CX" :y="c.base + 21" text-anchor="middle" style="font-size:9px"
          fill="var(--prusa-orange, #fa6831)">{{ c.w.toFixed(2) }} mm</text>
      </svg>

      <div class="text-center text-sm leading-tight">
        <div>2 périmètres <span class="font-mono">{{ c.wall.toFixed(2) }}</span> mm</div>
        <div class="opacity-60">Couche max <span class="font-mono">{{ c.maxLayer.toFixed(2) }}</span> mm</div>
        <div class="mt-0.5 text-xs opacity-50">{{ c.note }}</div>
      </div>
    </div>
  </div>
</template>
