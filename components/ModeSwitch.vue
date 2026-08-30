<script setup lang="ts">
/**
 * Le sélecteur de mode de PrusaSlicer.
 *
 * Redessiné plutôt que capturé : sur une copie d'écran, les trois libellés
 * font quelques pixels de haut et sont en anglais. Ici ils sont en français
 * et lisibles au fond de la salle, ce qui est tout l'intérêt de la slide -
 * montrer où on clique et ce qu'on choisit.
 *
 * La barre qui les porte n'est pas décorative : elle rappelle que le sélecteur
 * vit dans le bandeau supérieur de la fenêtre, là où personne ne le cherche.
 * Le trio y est centré - c'est la légende, dessous, qui dit de quel côté
 * regarder ; le décaler à droite ne faisait que déséquilibrer le dessin.
 */
const modes = [
  { nom: 'Simple', teinte: '#4a9d4a', actif: false },
  { nom: 'Avancé', teinte: '#e8b333', actif: true },
  { nom: 'Expert', teinte: '#c62828', actif: false },
]

/**
 * Abscisse du premier mode, puis pas régulier. Le groupe encré va de X0 à
 * X0 + 2 * PAS + largeur d'« Expert », soit 218 unités : le centrer sur les
 * 165 du milieu de la barre donne X0 = 56. Le pas de 80 laisse de la place au
 * cadre du mode actif sans qu'il vienne toucher la pastille du suivant - les
 * trois libellés font six lettres, la largeur du cadre peut donc être fixe.
 */
const X0 = 56
const PAS = 80
</script>

<template>
  <svg viewBox="0 0 330 78" class="mx-auto w-full max-w-[460px]">
    <!-- La barre du haut de la fenêtre -->
    <rect
      x="4" y="10" width="322" height="34" rx="5"
      fill="currentColor" fill-opacity="0.04"
      stroke="currentColor" stroke-opacity="0.18"
    />

    <g v-for="(m, i) in modes" :key="m.nom" :transform="`translate(${X0 + i * PAS}, 0)`">
      <!-- Le fond ne s'allume que sous le mode retenu -->
      <rect
        v-if="m.actif"
        x="-7" y="15" width="78" height="24" rx="4"
        :fill="m.teinte" fill-opacity="0.16"
        :stroke="m.teinte" stroke-width="1.4"
      />
      <rect y="21" width="12" height="12" rx="2.5" :fill="m.teinte" :fill-opacity="m.actif ? 1 : 0.5" />
      <text
        x="18" y="31"
        fill="currentColor"
        :fill-opacity="m.actif ? 0.95 : 0.5"
        :style="`font-size:13px;font-weight:${m.actif ? 700 : 400}`"
      >{{ m.nom }}</text>
    </g>

    <text x="165" y="66" text-anchor="middle" fill="currentColor" fill-opacity="0.42" style="font-size:10px">
      en haut à droite de la fenêtre
    </text>
  </svg>
</template>
