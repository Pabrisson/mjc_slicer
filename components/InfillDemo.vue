<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * Motif et taux de remplissage.
 * Le message : au-delà de 25 %, on paie surtout du temps.
 */
const density = ref(15)
const pattern = ref<'gyroid' | 'grid' | 'honeycomb'>('gyroid')

const patterns = [
  { id: 'gyroid', label: 'Gyroïde', note: 'Le polyvalent : solide dans toutes les directions, rapide' },
  { id: 'grid', label: 'Grille', note: 'Le plus rapide, un peu bruyant quand la buse recroise ses passages' },
  { id: 'honeycomb', label: 'Nid d’abeille', note: 'Très solide, nettement plus lent' },
] as const

/** Pas du motif : plus le taux monte, plus les lignes se resserrent. */
const step = computed(() => Math.max(6, 100 / Math.max(3, density.value) * 3.2))

const lines = computed(() => {
  const s = step.value
  const out: string[] = []
  if (pattern.value === 'grid') {
    for (let i = -100; i < 200; i += s) out.push(`M ${i} 0 L ${i} 100`, `M 0 ${i} L 100 ${i}`)
  }
  else if (pattern.value === 'gyroid') {
    for (let y = -s; y < 110; y += s) {
      let d = `M 0 ${y}`
      for (let x = 0; x <= 100; x += 4) d += ` L ${x} ${y + Math.sin((x / s) * Math.PI * 1.6) * (s * 0.32)}`
      out.push(d)
    }
  }
  else {
    const r = s * 0.6
    for (let row = -1; row * r * 1.5 < 115; row++) {
      for (let col = -1; col * r * 1.732 < 115; col++) {
        const cx = col * r * 1.732 + (row % 2 ? r * 0.866 : 0)
        const cy = row * r * 1.5
        const pts = Array.from({ length: 6 }, (_, k) => {
          const a = (Math.PI / 3) * k + Math.PI / 6
          return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`
        })
        out.push(`M ${pts.join(' L ')} Z`)
      }
    }
  }
  return out
})

/** Temps et matière : quasi linéaires en densité, la solidité sature vite. */
const time = computed(() => Math.round(60 + density.value * 1.9))
const strength = computed(() => Math.round(100 * (1 - Math.exp(-density.value / 13))))
const current = computed(() => patterns.find(p => p.id === pattern.value)!)
</script>

<template>
  <div class="flex items-center gap-6">
    <svg viewBox="0 0 100 100" class="w-40 shrink-0 rounded" style="border: 1.5px solid var(--prusa-orange, #fa6831)">
      <clipPath id="infill-clip"><rect x="0" y="0" width="100" height="100" /></clipPath>
      <g clip-path="url(#infill-clip)">
        <path v-for="(d, i) in lines" :key="i" :d="d" fill="none" stroke="currentColor" stroke-width="1.6"
          fill-opacity="0.55" stroke-linecap="round" />
      </g>
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--prusa-orange, #fa6831)" stroke-width="3.5" />
    </svg>

    <div class="flex-1 flex flex-col gap-3">
      <div class="flex gap-1.5">
        <button v-for="p in patterns" :key="p.id"
          class="rounded border px-2 py-0.5 text-xs transition"
          :class="pattern === p.id ? 'border-current opacity-100' : 'border-transparent opacity-45 hover:opacity-75'"
          :style="pattern === p.id ? { color: 'var(--prusa-orange, #fa6831)' } : {}"
          @click="pattern = p.id">
          {{ p.label }}
        </button>
      </div>
      <p class="!m-0 min-h-[2.4em] text-xs opacity-60">{{ current.note }}</p>

      <label class="flex items-center gap-3 text-sm">
        <input v-model.number="density" type="range" min="0" max="60" step="5" class="w-36 accent-[#fa6831]">
        <span class="w-14 font-mono text-lg">{{ density }} %</span>
      </label>

      <div class="flex flex-col gap-1 text-xs">
        <div class="flex items-center gap-2">
          <span class="w-16 opacity-60">Solidité</span>
          <div class="h-2 flex-1 rounded" style="background: color-mix(in srgb, currentColor 15%, transparent)">
            <div class="h-full rounded" :style="{ width: `${strength}%`, background: '#3fa34d' }" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-16 opacity-60">Temps</span>
          <div class="h-2 flex-1 rounded" style="background: color-mix(in srgb, currentColor 15%, transparent)">
            <div class="h-full rounded" :style="{ width: `${Math.min(100, time * 0.55)}%`, background: '#fa6831' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
