<script setup lang="ts">
/**
 * Un défaut d'impression : ce qu'on voit, ce qui se passe, le geste correctif.
 *
 * La carte ne porte plus d'étiquette « côté slicer / machine / matière » :
 * c'est la colonne qui la porte (voir DefectSide), et la couleur du filet
 * et du geste suffit à rattacher la carte à sa colonne. Le filet horizontal
 * sépare le constat (ce qu'on voit) de l'action (ce qu'on fait).
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
</script>

<template>
  <div class="defect" :style="{ '--tone': `var(--cote-${side})` }">
    <h4 class="d-titre">{{ title }}</h4>
    <p class="d-symptome">{{ symptom }}</p>

    <div class="d-filet" />

    <p class="d-cause">{{ cause }}</p>
    <p class="d-geste">
      <carbon:arrow-right class="d-fleche" />
      <span>{{ fix }}</span>
    </p>
  </div>
</template>

<style scoped>
.defect {
  --tone: var(--cote-slicer);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.8rem 0.58rem;
  /* Coin vif côté filet, arrondi ailleurs : la carte « sort » de sa colonne */
  border-radius: 0 0.4rem 0.4rem 0;
  border: 1px solid color-mix(in srgb, var(--tone) 22%, transparent);
  border-left: 3px solid var(--tone);
  background: color-mix(in srgb, var(--tone) 5%, transparent);
}

.defect > p,
.defect > h4 {
  margin: 0 !important;
}

.d-titre {
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.2;
}

.d-symptome {
  margin-top: 0.12rem !important;
  font-size: 0.73rem;
  font-style: italic;
  line-height: 1.3;
  opacity: 0.55;
}

/* Sépare le constat de l'action : au-dessus ce qu'on voit, en dessous ce qu'on fait */
.d-filet {
  height: 1px;
  margin: 0.42rem 0 0.38rem;
  background: color-mix(in srgb, var(--tone) 28%, transparent);
}

.d-cause {
  font-size: 0.77rem;
  line-height: 1.34;
  /* Pousse le geste en bas : les gestes s'alignent d'une carte à l'autre */
  flex: 1;
}

.d-geste {
  display: flex;
  gap: 0.3em;
  align-items: baseline;
  margin-top: 0.38rem !important;
  font-size: 0.77rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--tone);
}

.d-fleche {
  flex: none;
  font-size: 0.8em;
  transform: translateY(0.1em);
}
</style>
