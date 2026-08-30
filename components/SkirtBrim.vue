<script setup lang="ts">
/**
 * Jupe et bordure, vues de dessus.
 *
 * Elles se ressemblent de loin et ne servent pas à la même chose. Tout le
 * dessin tient dans une seule différence, et il ne doit rien montrer d'autre :
 * la jupe est un anneau **détaché**, la bordure est une collerette **soudée**
 * au contour. Le vide, à gauche, et son absence à droite.
 *
 * La pièce est décrite une seule fois et sert aux deux moitiés : seul ce qui
 * l'entoure change.
 */

/** Demi-côté de la pièce, et rayon d'arrondi. */
const COTE = 31
const ARRONDI = 7
/** Écart de la jupe au contour, et largeur de la bordure. */
const ECART = 15
const BORDURE = 13
/** Nombre d'anneaux dans la bordure : elle est pleine, pas ajourée. */
const ANNEAUX = 5

const CY = 62

function carre(cx: number, dilatation: number) {
  const c = COTE + dilatation
  const r = ARRONDI + dilatation * 0.5
  return `M${cx - c + r},${CY - c}
          L${cx + c - r},${CY - c} Q${cx + c},${CY - c} ${cx + c},${CY - c + r}
          L${cx + c},${CY + c - r} Q${cx + c},${CY + c} ${cx + c - r},${CY + c}
          L${cx - c + r},${CY + c} Q${cx - c},${CY + c} ${cx - c},${CY + c - r}
          L${cx - c},${CY - c + r} Q${cx - c},${CY - c} ${cx - c + r},${CY - c} Z`
}

const GAUCHE = 78
const DROITE = 222

/** Les anneaux de la bordure, du contour vers l'extérieur, sans aucun vide. */
const anneaux = Array.from({ length: ANNEAUX }, (_, i) => ((i + 1) * BORDURE) / ANNEAUX)
</script>

<template>
  <svg viewBox="0 0 300 158" class="mx-auto w-full max-w-[440px]">
    <!-- ==================== La jupe ==================== -->
    <g>
      <path :d="carre(GAUCHE, 0)" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.4" stroke-opacity="0.7" />
      <path :d="carre(GAUCHE, ECART)" fill="none" stroke="var(--prusa-orange)" stroke-width="1.8" />

      <!-- La cote qui mesure le vide : c'est tout le sujet de la moitié gauche -->
      <line :x1="GAUCHE" :y1="CY - COTE" :x2="GAUCHE" :y2="CY - COTE - ECART" stroke="var(--prusa-orange)" stroke-width="0.8" stroke-opacity="0.8" />
      <line :x1="GAUCHE - 4" :y1="CY - COTE" :x2="GAUCHE + 4" :y2="CY - COTE" stroke="var(--prusa-orange)" stroke-width="0.8" stroke-opacity="0.8" />
      <line :x1="GAUCHE - 4" :y1="CY - COTE - ECART" :x2="GAUCHE + 4" :y2="CY - COTE - ECART" stroke="var(--prusa-orange)" stroke-width="0.8" stroke-opacity="0.8" />
      <text :x="GAUCHE - 8" :y="CY - COTE - ECART / 2 + 3" text-anchor="end" fill="var(--prusa-orange)" style="font-size:9px">vide</text>

      <text :x="GAUCHE" y="130" text-anchor="middle" fill="currentColor" fill-opacity="0.8" style="font-size:12px;font-weight:700">
        Jupe
      </text>
      <text :x="GAUCHE" y="143" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:9px">
        détachée - amorce l'extrusion
      </text>
    </g>

    <line x1="150" y1="16" x2="150" y2="116" stroke="currentColor" stroke-opacity="0.14" stroke-dasharray="4 4" />

    <!-- ==================== La bordure ==================== -->
    <g>
      <!-- La collerette d'abord : la pièce se pose par-dessus, donc le
           contact se voit sans le moindre interstice. -->
      <path :d="carre(DROITE, BORDURE)" fill="var(--prusa-orange)" fill-opacity="0.28" />
      <path
        v-for="(d, i) in anneaux" :key="`an-${i}`"
        :d="carre(DROITE, d)"
        fill="none" stroke="var(--prusa-orange)" stroke-width="1.1"
      />
      <path :d="carre(DROITE, 0)" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.4" stroke-opacity="0.7" />

      <text :x="DROITE - COTE - BORDURE" :y="CY - COTE - BORDURE - 6" fill="var(--prusa-orange)" style="font-size:9px">aucun vide</text>

      <text :x="DROITE" y="130" text-anchor="middle" fill="currentColor" fill-opacity="0.8" style="font-size:12px;font-weight:700">
        Bordure
      </text>
      <text :x="DROITE" y="143" text-anchor="middle" fill="currentColor" fill-opacity="0.5" style="font-size:9px">
        soudée - tient la pièce
      </text>
    </g>
  </svg>
</template>
