<script setup lang="ts">
/**
 * En-tête d'une colonne de la galerie de défauts (module 7).
 *
 * Porte le message du module : ce n'est pas le défaut qui compte, c'est le
 * côté où l'on va chercher - et ce qu'on fait une fois qu'on y est.
 * Le même code couleur sert dans l'arbre de décision de la slide précédente.
 *
 * Rendu comme les autres titres de colonne du diaporama - un h2 coloré suivi
 * d'une ligne d'explication discrète, à la manière de « PLA » et « PETG » au
 * module 4. Seule la couleur change d'une colonne à l'autre.
 */
defineProps<{
  side: 'slicer' | 'machine' | 'matiere'
}>()

const cotes = {
  slicer: { label: 'Côté slicer', geste: 'On rouvre le fichier.' },
  machine: { label: 'Côté machine', geste: "Le logiciel n'y peut rien." },
  matiere: { label: 'Côté matière', geste: "C'est la bobine, pas le réglage." },
}
</script>

<template>
  <div class="cote" :style="{ '--tone': `var(--cote-${side})` }">
    <h2 class="c-label">{{ cotes[side].label }}</h2>
    <div class="c-geste">{{ cotes[side].geste }}</div>
  </div>
</template>

<style scoped>
.cote {
  --tone: var(--cote-slicer);
  padding-bottom: 0.15rem;
}

/* Le h2 du diaporama, ramené à la densité d'une slide qui porte six cartes */
.c-label {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--tone);
}

.c-geste {
  margin-top: 0.1rem;
  font-size: 0.75rem;
  line-height: 1.3;
  opacity: 0.6;
}
</style>
