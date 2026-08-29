<script setup lang="ts">
/** Touche de clavier ou raccourci PrusaSlicer. */
defineProps<{ k?: string }>()
</script>

<template>
  <kbd class="keycap"><slot>{{ k }}</slot></kbd>
</template>

<style scoped>
.keycap {
  display: inline-block;
  padding: 0.05em 0.45em;
  margin: 0 0.15em;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.85em;
  line-height: 1.5;
  border: 1px solid currentColor;
  border-bottom-width: 2px;
  border-radius: 0.3em;
  opacity: 0.85;
}
</style>
