<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * Porte-à-faux : chaque couche doit reposer sur la précédente.
 * Le décalage horizontal entre deux couches vaut hauteur × tan(angle) ;
 * comparé à la largeur d'extrusion, il dit ce qui part dans le vide.
 */
const angle = ref(30)
const layerHeight = 0.2
const extrusionWidth = 0.45

const shift = computed(() => layerHeight * Math.tan((angle.value * Math.PI) / 180))
const unsupported = computed(() => Math.min(100, (shift.value / extrusionWidth) * 100))

const verdict = computed(() => {
  const u = unsupported.value
  if (u < 25) return { txt: 'Aucun problème', tone: '#3fa34d', icon: 'ok' }
  if (u < 45) return { txt: 'Ça passe', tone: '#8bb43a', icon: 'ok' }
  if (u <= 55) return { txt: 'La limite des 45°', tone: '#fa6831', icon: 'warn' }
  if (u < 80) return { txt: 'Surface dégradée', tone: '#e0532f', icon: 'warn' }
  return { txt: 'Supports obligatoires', tone: '#c62828', icon: 'stop' }
})

const bricks = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({
    i,
    x: 60 + i * Math.tan((angle.value * Math.PI) / 180) * 11,
  })),
)
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <svg viewBox="0 0 260 165" class="w-full max-w-[360px]">
      <line x1="10" y1="152" x2="250" y2="152" stroke="currentColor" stroke-width="2" stroke-opacity="0.4" />
      <g>
        <rect
          v-for="b in bricks"
          :key="b.i"
          :x="b.x" :y="150 - (b.i + 1) * 11.5"
          width="46" height="10" rx="1"
          :fill="b.i === 11 ? verdict.tone : 'currentColor'"
          :fill-opacity="b.i === 11 ? 1 : 0.3"
        />
      </g>
      <!-- repère vertical et angle -->
      <line x1="60" y1="150" x2="60" y2="12" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="0.35" />
      <text x="64" y="20" style="font-size:9px" fill="currentColor" fill-opacity="0.45">vertical</text>
    </svg>

    <label class="flex items-center gap-3 text-sm">
      <span class="opacity-60">Inclinaison</span>
      <input v-model.number="angle" type="range" min="0" max="75" step="1" class="w-40 accent-[#fa6831]">
      <span class="w-12 font-mono text-lg">{{ angle }}°</span>
    </label>

    <div class="flex items-baseline gap-6 text-sm">
      <span class="opacity-60">Décalage&nbsp;: <span class="font-mono">{{ shift.toFixed(2) }} mm</span></span>
      <span class="opacity-60">Dans le vide&nbsp;: <span class="font-mono">{{ Math.round(unsupported) }} %</span></span>
    </div>

    <p class="!m-0 rounded px-3 py-1 text-lg font-semibold" :style="{ color: verdict.tone }">
      {{ verdict.txt }}
    </p>
  </div>
</template>
