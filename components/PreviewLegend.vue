<script setup lang="ts">
/**
 * Code couleur de l'onglet Aperçu de PrusaSlicer, vue « Type de fonctionnalité ».
 * Sert de grille de lecture avant de projeter l'aperçu réel.
 */
const items = [
  { c: '#ffff00', n: 'Périmètre externe', d: 'La peau visible. C’est elle qui donne l’aspect et la cote.' },
  { c: '#ffaa00', n: 'Périmètre interne', d: 'Les murs derrière la peau. La solidité vient surtout d’eux.' },
  { c: '#d10000', n: 'Remplissage', d: 'La structure interne. Rapide, large, jamais visible.' },
  { c: '#8d5f00', n: 'Remplissage plein', d: 'Ferme le dessus et le dessous du remplissage.' },
  { c: '#4d9dff', n: 'Couche pleine du dessus', d: 'La face du dessus. Si elle est moche, tout l’objet paraît raté.' },
  { c: '#3fa34d', n: 'Pont', d: 'Extrusion tendue dans le vide. À surveiller.' },
  { c: '#00cbbb', n: 'Jupe et bordure', d: 'Amorçage et accroche. Ne fait pas partie de la pièce.' },
  { c: '#9b7fbb', n: 'Support', d: 'Matière jetable. Tout ce qui est violet finit à la poubelle.' },
  { c: '#22aa22', n: 'Déplacement', d: 'Trait fin : la buse bouge sans extruder. Souvent masqué.' },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
    <div v-for="i in items" :key="i.n" class="flex items-baseline gap-2.5">
      <span class="mt-1 h-3 w-3 shrink-0 rounded-sm" :style="{ background: i.c }" />
      <span>
        <span class="font-semibold">{{ i.n }}</span>
        <span class="block text-[0.68rem] leading-tight opacity-55">{{ i.d }}</span>
      </span>
    </div>
  </div>
</template>
