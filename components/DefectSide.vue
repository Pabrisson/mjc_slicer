<script setup lang="ts">
/**
 * En-tête d'une colonne de la galerie de défauts (module 7).
 *
 * Porte le message du module : ce n'est pas le défaut qui compte, c'est le
 * côté où l'on va chercher - et ce qu'on fait une fois qu'on y est.
 * Le même code couleur sert dans l'arbre de décision de la slide suivante.
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
    <div class="c-filet" />
    <div class="c-label">{{ cotes[side].label }}</div>
    <div class="c-geste">{{ cotes[side].geste }}</div>
  </div>
</template>

<style scoped>
.cote {
  --tone: var(--cote-slicer);
  padding-bottom: 0.2rem;
}

/* Le filet s'éteint vers la droite : donne un sens de lecture à la colonne */
.c-filet {
  height: 3px;
  border-radius: 2px;
  margin-bottom: 0.3rem;
  background: linear-gradient(
    90deg,
    var(--tone),
    color-mix(in srgb, var(--tone) 12%, transparent)
  );
}

.c-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  line-height: 1.2;
  color: var(--tone);
}

.c-geste {
  font-size: 0.69rem;
  line-height: 1.3;
  opacity: 0.5;
}
</style>
