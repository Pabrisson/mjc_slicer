<script setup lang="ts">
import { computed, useId } from 'vue'
import { bornes, PAS_COUCHE, trace, type Point } from '../lib/coupe'

/**
 * La matière vue en coupe, hachurée par ses couches.
 *
 * Le seul endroit du deck qui dessine « de la matière imprimée ». Une pièce
 * pleine et lisse dirait un bloc de plastique moulé ; ce que la salle doit
 * voir partout, c'est un paquet de tranches collées. Le hachurage est donc
 * porté par un composant et non recopié : c'est ce qui garantit qu'une couche
 * a la même épaisseur d'une slide à l'autre.
 *
 * La grille de couches est ancrée sur `origine`, jamais sur la pièce. Les
 * couches ne suivent pas l'objet : elles suivent le plateau, et c'est
 * exactement le point du module 3. Deux fragments d'une même pièce - la souche
 * et le morceau tombé du crochet - partagent ainsi la même grille.
 */
const props = withDefaults(defineProps<{
  /** La silhouette à remplir, en coordonnées d'écran */
  points: Point[]
  /**
   * D'où part l'empilement, en coordonnées d'écran : le plateau.
   * En `posee`, l'altitude du plateau ; en `debout`, l'abscisse du bord par
   * lequel l'impression a commencé.
   */
  origine: number
  /**
   * `posee` : les couches sont parallèles au plateau - le cas normal, la pièce
   * est dessinée telle qu'elle est imprimée.
   * `debout` : elles lui sont perpendiculaires - le cas du crochet, où la pièce
   * est dessinée en position d'usage et c'est l'impression qui a tourné.
   */
  sens?: 'posee' | 'debout'
  pas?: number
}>(), { sens: 'posee', pas: PAS_COUCHE })

/** Un identifiant par instance : Slidev garde plusieurs slides dans le DOM,
    et deux clipPath de même nom feraient dessiner la première partout. */
const id = `coupe-${useId()}`

const boite = computed(() => bornes(props.points))
const contour = computed(() => trace(props.points))

/** Les traits de couche, empilés depuis l'origine jusqu'à sortir de la pièce. */
const traits = computed(() => {
  const { xMin, xMax, yMin, yMax } = boite.value
  const positions: number[] = []
  if (props.sens === 'posee') {
    for (let y = props.origine - props.pas; y > yMin; y -= props.pas) positions.push(y)
    return positions.map(y => ({ x1: xMin, y1: y, x2: xMax, y2: y }))
  }
  for (let x = props.origine + props.pas; x < xMax; x += props.pas) positions.push(x)
  return positions.map(x => ({ x1: x, y1: yMin, x2: x, y2: yMax }))
})
</script>

<template>
  <g>
    <defs>
      <clipPath :id="id">
        <polygon :points="contour" />
      </clipPath>
    </defs>

    <polygon :points="contour" class="coupe-matiere" />
    <g :clip-path="`url(#${id})`">
      <line
        v-for="(t, i) in traits" :key="i"
        :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
        class="coupe-couche"
      />
    </g>
    <polygon :points="contour" class="coupe-contour" />
  </g>
</template>
