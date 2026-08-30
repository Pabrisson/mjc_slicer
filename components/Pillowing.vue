<script setup lang="ts">
import { computed } from 'vue'

/**
 * Le pillowing : pourquoi le dessus se troue.
 *
 * Ce que le dessin doit faire comprendre en une seconde : la coque du dessus
 * n'est pas posée sur de la matière, elle est **tendue au-dessus du vide**,
 * d'un sommet de remplissage au suivant. Écarter les appuis, c'est demander
 * à la matière de franchir plus de vide - elle s'affaisse, puis elle craque.
 *
 * Les deux coupes sortent de la même fonction, appelée avec deux nombres
 * d'appuis différents : c'est bien l'écartement qui change, et rien d'autre.
 */

const BOITE = { x: 16, haut: 44, bas: 106, large: 120 }
/** Hauteur des sommets du remplissage, juste sous la coque. */
const SOMMET = 62

/** Le remplissage en zigzag : n sommets d'appui sous la coque. */
function zigzag(n: number) {
  const pas = BOITE.large / n
  const pts: string[] = [`${BOITE.x},${BOITE.bas}`]
  for (let i = 0; i < n; i++) {
    pts.push(`${(BOITE.x + i * pas + pas / 2).toFixed(1)},${SOMMET}`)
    pts.push(`${(BOITE.x + (i + 1) * pas).toFixed(1)},${BOITE.bas}`)
  }
  return pts.join(' ')
}

/** Les abscisses des sommets, là où la coque a un appui. */
function appuis(n: number) {
  const pas = BOITE.large / n
  return Array.from({ length: n }, (_, i) => BOITE.x + i * pas + pas / 2)
}

/**
 * La coque du dessus, échantillonnée entre les appuis.
 * Elle plonge d'autant plus que l'appui suivant est loin : l'affaissement
 * suit le carré de la portée, comme un fil tendu.
 */
function coque(n: number, affaissementMax: number) {
  const xs = appuis(n)
  const portee = BOITE.large / n
  const creux = affaissementMax * (portee / (BOITE.large / 3)) ** 2
  const pts: { x: number, y: number }[] = [{ x: BOITE.x, y: BOITE.haut + 8 }]
  for (let i = 0; i < xs.length; i++) {
    pts.push({ x: xs[i], y: BOITE.haut + 8 })
    const suivant = i + 1 < xs.length ? xs[i + 1] : BOITE.x + BOITE.large
    pts.push({ x: (xs[i] + suivant) / 2, y: BOITE.haut + 8 + creux })
  }
  pts.push({ x: BOITE.x + BOITE.large, y: BOITE.haut + 8 })
  return pts
}

const RATE = 3
const REUSSI = 9

const coqueRatee = computed(() => coque(RATE, 9))
const coqueReussie = computed(() => coque(REUSSI, 9))

function versTrace(pts: { x: number, y: number }[]) {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}

/**
 * Les deux trous du dessus raté : là où la coque a le plus plongé, elle a
 * fini par céder. On enlève les deux creux les plus profonds.
 */
const morceauxRates = computed(() => {
  const pts = coqueRatee.value
  const troues = [2, 4]
  const morceaux: { x: number, y: number }[][] = []
  let courant: { x: number, y: number }[] = []
  pts.forEach((p, i) => {
    const creux = Math.floor(i / 2)
    if (p.y > BOITE.haut + 8 && troues.includes(creux)) {
      if (courant.length > 1) morceaux.push(courant)
      courant = []
      return
    }
    courant.push(p)
  })
  if (courant.length > 1) morceaux.push(courant)
  return morceaux
})
</script>

<template>
  <svg viewBox="0 0 300 152" class="mx-auto w-full max-w-[430px]">
    <!-- ============ Le dessus raté : appuis trop espacés ============ -->
    <g>
      <!-- Les parois : sans elles, le dessin ne se lit pas comme une pièce -->
      <path
        :d="`M${BOITE.x},${BOITE.haut + 8} L${BOITE.x},${BOITE.bas} L${BOITE.x + BOITE.large},${BOITE.bas} L${BOITE.x + BOITE.large},${BOITE.haut + 8}`"
        fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"
      />
      <polyline :points="zigzag(RATE)" fill="none" stroke="currentColor" stroke-width="1.1" stroke-opacity="0.4" />
      <line
        v-for="x in appuis(RATE)" :key="`ar-${x}`"
        :x1="x" :y1="SOMMET" :x2="x" :y2="BOITE.haut + 8"
        stroke="currentColor" stroke-width="0.7" stroke-opacity="0.45" stroke-dasharray="2 2"
      />
      <polyline
        v-for="(m, i) in morceauxRates" :key="`cr-${i}`"
        :points="versTrace(m)"
        fill="none" stroke="var(--prusa-rouge)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
      />

      <text x="76" y="130" text-anchor="middle" fill="currentColor" fill-opacity="0.75" style="font-size:10.5px;font-weight:600">
        appuis écartés
      </text>
      <text x="76" y="143" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:9px">
        la coque plonge, puis se troue
      </text>
    </g>

    <line x1="150" y1="34" x2="150" y2="118" stroke="currentColor" stroke-opacity="0.14" stroke-dasharray="4 4" />

    <!-- ============ Le dessus réussi : appuis rapprochés ============ -->
    <g transform="translate(152 0)">
      <!-- Les parois : sans elles, le dessin ne se lit pas comme une pièce -->
      <path
        :d="`M${BOITE.x},${BOITE.haut + 8} L${BOITE.x},${BOITE.bas} L${BOITE.x + BOITE.large},${BOITE.bas} L${BOITE.x + BOITE.large},${BOITE.haut + 8}`"
        fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"
      />
      <polyline :points="zigzag(REUSSI)" fill="none" stroke="currentColor" stroke-width="1.1" stroke-opacity="0.4" />
      <line
        v-for="x in appuis(REUSSI)" :key="`ab-${x}`"
        :x1="x" :y1="SOMMET" :x2="x" :y2="BOITE.haut + 8"
        stroke="currentColor" stroke-width="0.7" stroke-opacity="0.45" stroke-dasharray="2 2"
      />
      <polyline
        :points="versTrace(coqueReussie)"
        fill="none" stroke="var(--prusa-orange)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
      />

      <text x="76" y="130" text-anchor="middle" fill="currentColor" fill-opacity="0.75" style="font-size:10.5px;font-weight:600">
        appuis rapprochés
      </text>
      <text x="76" y="143" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:9px">
        la coque reste tendue
      </text>
    </g>
  </svg>
</template>
