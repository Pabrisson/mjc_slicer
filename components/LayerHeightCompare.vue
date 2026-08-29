<script setup lang="ts">
import { computed } from 'vue'

/**
 * Effet d'escalier sur une surface courbe selon la hauteur de couche.
 * Le dessin est un zoom sur un détail de la pièce : à l'échelle réelle,
 * une couche de 0,2 mm sur une figurine de 40 mm ferait moins d'un pixel.
 */
const props = withDefaults(defineProps<{
  heights?: number[]
  /** Hauteur de la pièce entière, en mm - sert au nombre de couches */
  part?: number
  /** Hauteur du détail représenté, en mm */
  detail?: number
}>(), { heights: () => [0.3, 0.2, 0.1], part: 40, detail: 6 })

const R = 100 // rayon du quart de cercle, en unités SVG
const scale = computed(() => R / props.detail) // unités SVG par mm

/** Courbe théorique : le quart de cercle centré sur le coin bas-gauche. */
const arc = computed(() => {
  const pts: string[] = []
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * (Math.PI / 2)
    pts.push(`${(R * Math.sin(a)).toFixed(1)} ${(R - R * Math.cos(a)).toFixed(1)}`)
  }
  return `M ${pts.join(' L ')}`
})

const cards = computed(() =>
  props.heights.map((h) => {
    const step = h * scale.value
    const steps: { y: number, w: number, hh: number }[] = []
    for (let k = 0; k * step < R; k++) {
      const yTop = k * step // depuis le haut du dessin
      const yMid = yTop + step / 2
      // largeur de la marche au milieu de la couche
      const w = Math.sqrt(Math.max(0, R * R - (R - yMid) * (R - yMid)))
      steps.push({ y: yTop, w, hh: Math.max(0.7, step - 0.35) })
    }
    return {
      h,
      steps,
      layers: Math.round(props.part / h),
      time: (0.2 / h),
    }
  }),
)
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <div v-for="c in cards" :key="c.h" class="flex flex-col items-center gap-1">
      <div class="font-mono text-xl" style="color: var(--prusa-orange, #fa6831)">{{ c.h.toFixed(2) }} mm</div>
      <svg viewBox="-3 -3 112 112" class="w-full max-w-[104px]">
        <rect v-for="(s, i) in c.steps" :key="i" x="0" :y="s.y" :width="s.w" :height="s.hh"
          fill="currentColor" fill-opacity="0.62" />
        <path :d="arc" fill="none" stroke="var(--prusa-orange, #fa6831)" stroke-width="1.4" stroke-dasharray="3 3" />
      </svg>
      <div class="text-center text-sm leading-tight">
        <div><span class="font-mono">{{ c.layers }}</span> couches</div>
        <div class="opacity-60">temps <span class="font-mono">×{{ c.time.toFixed(1) }}</span></div>
      </div>
    </div>
  </div>
</template>
