<script setup lang="ts">
/**
 * Ce qu'une option fait gagner, ce qu'elle fait perdre.
 * Sert aux trois orientations du porte-téléphone au module 3, et à tout
 * arbitrage du même genre : deux colonnes de signes, pas deux pavés de texte.
 *
 * Le gras markdown `**...**` est accepté dans les items.
 */
defineProps<{
  /** Ce qu'on y gagne */
  pour?: string[]
  /** Ce qu'on y perd */
  contre?: string[]
  /** Intitulés des deux colonnes, si le contexte ne les rend pas évidents */
  labels?: boolean
}>()

/** Le markdown n'est pas interprété dans une prop : on ne gère que le gras. */
const gras = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
</script>

<template>
  <div class="verdict flex flex-col">
    <div v-if="pour?.length" class="v-groupe v-pour">
      <div v-if="labels" class="v-titre">Ce qu'on y gagne</div>
      <div v-for="(t, i) in pour" :key="`p${i}`" class="v-ligne">
        <span class="v-signe"><carbon:checkmark /></span>
        <span v-html="gras(t)" />
      </div>
    </div>

    <div v-if="contre?.length" class="v-groupe v-contre">
      <div v-if="labels" class="v-titre">Ce qu'on y perd</div>
      <div v-for="(t, i) in contre" :key="`c${i}`" class="v-ligne">
        <span class="v-signe"><carbon:close /></span>
        <span v-html="gras(t)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les deux tons suivent la palette globale, y compris en thème sombre */
.verdict {
  --v-pour: var(--prusa-orange, #fa6831);
  --v-contre: var(--prusa-rouge, #c62828);
  gap: 0.75em;
}

.v-groupe {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding-left: 0.8em;
  border-left: 3px solid var(--ton);
}
.v-pour {
  --ton: color-mix(in srgb, var(--v-pour) 45%, transparent);
}
.v-contre {
  --ton: color-mix(in srgb, var(--v-contre) 45%, transparent);
}

.v-titre {
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.5;
}

.v-ligne {
  display: grid;
  grid-template-columns: 1.4em 1fr;
  gap: 0.55em;
  align-items: start;
  line-height: 1.35;
}

/* La pastille garde sa taille quelle que soit la longueur de la ligne */
.v-signe {
  display: inline-flex;
  width: 1.4em;
  height: 1.4em;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  margin-top: 0.05em;
  font-size: 0.85em;
}
.v-pour .v-signe {
  color: var(--v-pour);
  background: color-mix(in srgb, var(--v-pour) 16%, transparent);
}
.v-contre .v-signe {
  color: var(--v-contre);
  background: color-mix(in srgb, var(--v-contre) 16%, transparent);
}
</style>
