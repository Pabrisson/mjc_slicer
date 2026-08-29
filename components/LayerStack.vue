<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

/**
 * Découpe d'un objet en couches horizontales.
 * Le cœur du module 1 : la machine ne fabrique jamais un volume,
 * elle empile des tranches plates.
 *
 * On dessine une pièce volontairement basse pour que les couches restent
 * visibles à l'écran, et on extrapole en texte vers une pièce de taille réelle.
 */
const props = withDefaults(defineProps<{
  /** Hauteur de la pièce dessinée, en mm */
  height?: number
  /** Hauteur de couche de départ, en mm */
  initial?: number
  /** Pièce de référence pour l'extrapolation en texte, en mm */
  reference?: number
}>(), { height: 12, initial: 0.2, reference: 60 })

const layerHeight = ref(props.initial)
const built = ref(1)
let timer: number | undefined

const count = computed(() => Math.round(props.height / layerHeight.value))
const refCount = computed(() => Math.round(props.reference / layerHeight.value))

/** Silhouette de l'objet : rayon relatif (0-1) en fonction de la hauteur relative t. */
function radiusAt(t: number) {
  if (t < 0.45) return 1
  const u = (t - 0.45) / 0.55
  return Math.sqrt(Math.max(0, 1 - u * u))
}

const W = 260
const H = 200
const BASE = H - 18 // ligne du plateau
const USABLE = BASE - 12

const layers = computed(() => {
  const n = count.value
  const step = USABLE / n
  return Array.from({ length: n }, (_, i) => ({
    i,
    y: BASE - (i + 1) * step,
    h: Math.max(1, step - Math.min(0.45, step * 0.14)),
    r: radiusAt((i + 0.5) / n),
  }))
})

const visible = computed(() => Math.ceil(count.value * built.value))

function play() {
  window.clearInterval(timer)
  built.value = 0
  timer = window.setInterval(() => {
    built.value = Math.min(1, built.value + 0.025)
    if (built.value >= 1) window.clearInterval(timer)
  }, 22)
}

onUnmounted(() => window.clearInterval(timer))
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <svg :viewBox="`0 0 ${W} ${H}`" class="h-[250px] w-auto">
      <line :x1="34" :y1="BASE + 3" :x2="W - 34" :y2="BASE + 3"
        stroke="currentColor" stroke-width="2.5" stroke-opacity="0.4" />
      <rect
        v-for="l in layers"
        :key="l.i"
        v-show="l.i < visible"
        :x="W / 2 - l.r * 72"
        :y="l.y"
        :width="l.r * 144"
        :height="l.h"
        :fill="l.i === visible - 1 ? 'var(--prusa-orange, #fa6831)' : 'currentColor'"
        :fill-opacity="l.i === visible - 1 ? 1 : 0.72"
      />
    </svg>

    <div class="flex items-center gap-4 text-sm">
      <label class="flex items-center gap-2">
        <span class="opacity-60">Couche</span>
        <input v-model.number="layerHeight" type="range" min="0.1" max="0.35" step="0.05" class="w-24 accent-[#fa6831]">
        <span class="w-16 font-mono">{{ layerHeight.toFixed(2) }} mm</span>
      </label>
      <button class="rounded border border-current px-2 py-0.5 text-xs opacity-70 hover:opacity-100" @click="play">
        <carbon:play class="inline" /> Empiler
      </button>
    </div>

    <p class="!m-0 text-center text-sm leading-snug">
      <span class="font-mono text-xl" style="color: var(--prusa-orange, #fa6831)">{{ count }}</span>
      couches pour {{ height }} mm de haut<br>
      <span class="text-xs opacity-55">soit {{ refCount }} couches pour une pièce de {{ reference }} mm</span>
    </p>
  </div>
</template>
