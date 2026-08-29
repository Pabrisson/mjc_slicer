<script setup lang="ts">
/**
 * Un défaut d'impression, sa cause, et surtout : de quel côté on le corrige.
 * La distinction slicer / machine est le vrai apprentissage du module 8.
 */
defineProps<{
  title: string
  /** Ce qu'on voit sur la pièce */
  symptom: string
  /** Ce qui se passe réellement */
  cause: string
  /** Le geste correctif */
  fix: string
  side: 'slicer' | 'machine' | 'matiere'
}>()

const sides = {
  slicer: { label: 'Côté slicer', tone: '#fa6831' },
  machine: { label: 'Côté machine', tone: '#4d9dff' },
  matiere: { label: 'Côté matière', tone: '#9b7fbb' },
}
</script>

<template>
  <div class="flex flex-col gap-0.5 rounded-lg px-2.5 py-1.5 defect" :style="{ '--tone': sides[side].tone }">
    <div class="flex items-baseline justify-between gap-2">
      <h4 class="!m-0 !mb-0 text-sm font-semibold !leading-tight">{{ title }}</h4>
      <span class="shrink-0 rounded px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide"
        :style="{ background: sides[side].tone, color: '#fff' }">
        {{ sides[side].label }}
      </span>
    </div>
    <p class="!m-0 text-[0.7rem] italic leading-snug opacity-55">{{ symptom }}</p>
    <p class="!m-0 text-[0.72rem] leading-snug">{{ cause }}</p>
    <p class="!m-0 text-[0.72rem] font-medium leading-snug" :style="{ color: sides[side].tone }">
      <carbon:arrow-right class="inline text-[0.8em]" /> {{ fix }}
    </p>
  </div>
</template>

<style scoped>
.defect {
  border: 1px solid currentColor;
  border-left: 4px solid var(--tone);
  border-color: color-mix(in srgb, currentColor 18%, transparent);
  border-left-color: var(--tone);
}
</style>
