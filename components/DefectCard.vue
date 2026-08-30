<script setup lang="ts">
/**
 * Un défaut d'impression : ce qu'on voit, ce qui se passe, le geste correctif.
 *
 * La carte est le cartouche « .temoin » du reste du diaporama - même cadre,
 * même rayon, même taille - avec la couleur du côté en plus. Cette couleur ne
 * porte que sur deux points, le titre et le geste : c'est la colonne qui dit
 * de quel côté on cherche (voir DefectSide), la carte ne fait que le rappeler.
 *
 * La carte n'a pas d'étiquette « côté slicer / machine / matière » : la
 * position dans la grille EST la réponse, et c'est ce qui se joue à l'oral.
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
  <div class="temoin defect" :style="{ '--tone': `var(--cote-${side})` }">
    <strong class="d-titre">{{ title }}</strong>
    <span class="d-symptome">{{ symptom }}</span>
    <p class="d-cause">{{ cause }}</p>
    <p class="d-geste">
      <span class="d-fleche">→</span>
      <span>{{ fix }}</span>
    </p>
  </div>
</template>

<style scoped>
/* Le cadre, le rayon, le padding et la taille viennent de « .temoin »
   (style.css) : si le cartouche du diaporama change, la carte suit. */
.defect {
  --tone: var(--cote-slicer);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.defect > * {
  margin: 0 !important;
}

.d-titre {
  font-weight: 600;
  line-height: 1.25;
  color: var(--tone);
}

/* L'italique sépare ce qu'on voit de ce qui se passe : le filet horizontal
   qui jouait ce rôle n'existait nulle part ailleurs dans le diaporama. */
.d-symptome {
  margin-top: 0.1em !important;
  font-size: 0.86em;
  font-style: italic;
  line-height: 1.3;
  opacity: 0.55;
}

.d-cause {
  margin-top: 0.4em !important;
  font-size: 0.86em;
  line-height: 1.35;
  opacity: 0.7;
  /* Pousse le geste en bas : les gestes s'alignent d'une carte à l'autre */
  flex: 1;
}

.d-geste {
  display: flex;
  gap: 0.35em;
  margin-top: 0.4em !important;
  font-size: 0.86em;
  line-height: 1.3;
  color: var(--tone);
}

.d-fleche {
  flex: none;
}
</style>
