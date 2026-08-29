<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * Coupe d'un emboîtement, vu de dessus dans le slicer.
 * Deux idées en une : un mur est un nombre entier de largeurs d'extrusion,
 * et deux pièces qui se touchent au dessin sont soudées à l'impression.
 */
const EW = 0.45 // largeur d'extrusion réelle avec une buse 0,4
const perimeters = ref(2)
const gap = ref(0.2)

const wall = computed(() => perimeters.value * EW)

const verdict = computed(() => {
  const g = gap.value
  if (g < 0.1) return { txt: 'Soudé - ça ne rentrera pas', tone: '#c62828' }
  if (g < 0.15) return { txt: 'Très serré - au marteau', tone: '#e0532f' }
  if (g <= 0.3) return { txt: 'Ajustement juste', tone: '#3fa34d' }
  if (g <= 0.45) return { txt: 'Libre, pièce mobile', tone: '#8bb43a' }
  return { txt: 'Ça flotte', tone: '#fa6831' }
})

const SC = 42 // unités SVG par mm
const wallPx = computed(() => wall.value * SC)
const gapPx = computed(() => gap.value * SC)
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <svg viewBox="0 0 300 92" class="w-full max-w-[400px]">
      <!-- paroi de la boîte -->
      <g>
        <rect v-for="i in perimeters" :key="`a${i}`"
          :x="30 + (i - 1) * EW * SC" y="16" :width="EW * SC - 1.5" height="60"
          fill="var(--prusa-orange, #fa6831)" :fill-opacity="i === 1 ? 0.95 : 0.5" rx="1" />
      </g>
      <!-- paroi du couvercle -->
      <g>
        <rect v-for="i in perimeters" :key="`b${i}`"
          :x="30 + wallPx + gapPx + (i - 1) * EW * SC" y="16" :width="EW * SC - 1.5" height="60"
          fill="currentColor" :fill-opacity="i === 1 ? 0.6 : 0.3" rx="1" />
      </g>
      <!-- cote du jeu -->
      <g v-if="gapPx > 1">
        <line :x1="30 + wallPx" y1="86" :x2="30 + wallPx + gapPx" y2="86" stroke="currentColor" stroke-width="1" />
        <line :x1="30 + wallPx" y1="82" :x2="30 + wallPx" y2="90" stroke="currentColor" stroke-width="1" />
        <line :x1="30 + wallPx + gapPx" y1="82" :x2="30 + wallPx + gapPx" y2="90" stroke="currentColor" stroke-width="1" />
      </g>
      <text :x="30 + wallPx + gapPx + 8" y="90" style="font-size:8px" fill="currentColor" fill-opacity="0.6">
        jeu {{ gap.toFixed(2) }} mm
      </text>
      <text x="30" y="10" style="font-size:8px" fill="var(--prusa-orange, #fa6831)">boîte - mur {{ wall.toFixed(2) }} mm</text>
      <text x="290" y="10" text-anchor="end" style="font-size:8px" fill="currentColor" fill-opacity="0.6">couvercle</text>
    </svg>

    <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
      <label class="flex items-center gap-2">
        <span class="opacity-60">Périmètres</span>
        <input v-model.number="perimeters" type="range" min="1" max="5" step="1" class="w-24 accent-[#fa6831]">
        <span class="w-24 font-mono">{{ perimeters }} → {{ wall.toFixed(2) }} mm</span>
      </label>
      <label class="flex items-center gap-2">
        <span class="opacity-60">Jeu au dessin</span>
        <input v-model.number="gap" type="range" min="0" max="0.6" step="0.05" class="w-24 accent-[#fa6831]">
        <span class="w-14 font-mono">{{ gap.toFixed(2) }} mm</span>
      </label>
    </div>

    <p class="!m-0 text-lg font-semibold" :style="{ color: verdict.tone }">{{ verdict.txt }}</p>
  </div>
</template>
