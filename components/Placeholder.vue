<script setup lang="ts">
/**
 * Emplacement d'image à tourner.
 * Affiche la consigne de prise de vue directement sur la slide,
 * pour qu'elle reste visible tant que l'image n'est pas faite.
 */
defineProps<{
  /** Ce qu'il faut photographier ou capturer */
  brief: string
  /** 'capture' = copie d'écran PrusaSlicer, 'photo' = objet réel, 'schema' = dessin à produire */
  kind?: 'capture' | 'photo' | 'schema'
  /** Proportions du cadre, ex. '16/9', '4/3', '1/1' */
  ratio?: string
  /** Référence courte, reprise dans la liste de fin */
  ref?: string
  /** Hauteur maximale du cadre, pour qu'il ne pousse jamais la slide */
  maxH?: string
}>()

const label = {
  capture: 'Copie d’écran PrusaSlicer',
  photo: 'Photo d’objet réel',
  schema: 'Schéma à produire',
}
</script>

<template>
  <div
    class="ph relative mx-auto w-full flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg px-4 py-3 text-center"
    :style="{ aspectRatio: ratio ?? '16/9', maxHeight: maxH ?? '215px' }"
  >
    <div class="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest opacity-60">
      <carbon:camera v-if="kind === 'photo'" />
      <carbon:screen v-else-if="kind === 'schema'" />
      <carbon:image v-else />
      <span>{{ label[kind ?? 'capture'] }}</span>
    </div>
    <p class="!m-0 max-w-[48ch] text-sm leading-snug opacity-65">{{ brief }}</p>
    <span v-if="ref" class="absolute right-2 top-2 rounded px-1.5 py-0.5 font-mono text-[0.65rem] opacity-50 ph-ref">
      {{ ref }}
    </span>
  </div>
</template>

<style scoped>
.ph {
  border: 2px dashed var(--prusa-orange, #fa6831);
  background:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(250, 104, 49, 0.05) 10px,
      rgba(250, 104, 49, 0.05) 20px
    );
  color: inherit;
}
.ph-ref {
  border: 1px solid currentColor;
}
</style>
