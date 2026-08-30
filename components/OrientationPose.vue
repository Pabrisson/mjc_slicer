<script setup lang="ts">
import { computed } from 'vue'

/**
 * Le même objet, posé de trois façons.
 *
 * Un seul composant pour les trois slides, et ce n'est pas une économie :
 * c'est la condition pour que la comparaison tienne. Un seul porte-téléphone
 * est décrit - une semelle et un dosseret incliné - et chaque pose n'est
 * qu'une rotation de ce profil unique, reposé automatiquement sur le
 * plateau. Trois dessins séparés dériveraient l'un de l'autre et la salle
 * verrait trois objets au lieu d'un objet et trois décisions.
 *
 * Les supports ne sont pas placés à la main non plus. On descend un rayon
 * vertical sous la silhouette, et là où la face du dessous penche de moins de
 * 45° sur l'horizontale sans toucher le plateau, il faut l'étayer. C'est
 * exactement la règle des 45° enseignée deux slides plus tôt : le dessin ne
 * peut donc pas contredire le cours.
 */
const props = defineProps<{
  /** Comment la pièce est posée sur le plateau */
  pose: 'plat' | 'debout' | 'flanc'
}>()

/**
 * Le porte-téléphone, y vers le haut, en millimètres :
 * une semelle de 44 mm et un dosseret incliné qui déborde en arrière.
 */
const PROFIL: [number, number][] = [
  [0, 0], [44, 0], [44, 12], [104, 68], [94, 81], [14, 26], [0, 26],
]

/**
 * L'inclinaison de chaque pose.
 * 0° : la pièce repose sur sa semelle, en position d'usage.
 * 325° : elle est couchée sur le dos du dosseret, sa plus grande face.
 * 90° : elle est dressée sur sa tranche arrière.
 */
const ANGLES = { debout: 0, plat: 325, flanc: 90 } as const

const ECHELLE = 1.35
const PLATEAU = 168
const CX = 130

/** L'écartement des colonnes de support, en coordonnées d'écran. */
const PAS = 6.5

/** Le profil tourné, reposé sur le plateau et centré, en coordonnées d'écran. */
const silhouette = computed(() => {
  const a = (ANGLES[props.pose] * Math.PI) / 180
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const tournes = PROFIL.map(([x, y]) => [
    (x * cos - y * sin) * ECHELLE,
    (x * sin + y * cos) * ECHELLE,
  ] as [number, number])

  const yMin = Math.min(...tournes.map(p => p[1]))
  const xMin = Math.min(...tournes.map(p => p[0]))
  const xMax = Math.max(...tournes.map(p => p[0]))
  const decalage = CX - (xMin + xMax) / 2

  return tournes.map(([x, y]) => ({ x: x + decalage, y: PLATEAU - (y - yMin) }))
})

const trace = computed(() => silhouette.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '))
const sommet = computed(() => Math.min(...silhouette.value.map(p => p.y)))
const hauteur = computed(() => PLATEAU - sommet.value)

/**
 * Les supports, par lancer de rayon sous la silhouette.
 * Une face du dessous plus redressée que 45° se tient toute seule : la
 * matière suivante repose encore assez sur la précédente. En dessous de 45°,
 * elle part dans le vide et il faut l'étayer.
 */
const supports = computed(() => {
  const pts = silhouette.value
  const xMin = Math.min(...pts.map(p => p.x))
  const xMax = Math.max(...pts.map(p => p.x))
  const SEUIL = 4
  const traits: { x: number, y: number }[] = []

  for (let x = xMin + PAS / 2; x < xMax; x += PAS) {
    let bas = -Infinity
    let pente = 0
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i]
      const b = pts[(i + 1) % pts.length]
      if ((a.x - x) * (b.x - x) > 0 || a.x === b.x) continue
      const y = a.y + ((x - a.x) / (b.x - a.x)) * (b.y - a.y)
      if (y > bas) {
        bas = y
        const brut = Math.abs((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI)
        pente = brut > 90 ? 180 - brut : brut
      }
    }
    if (bas > -Infinity && PLATEAU - bas > SEUIL && pente < 45) traits.push({ x, y: bas })
  }
  return traits
})

/**
 * Les supports regroupés en massifs contigus.
 * Là où la pièce redescend toucher le plateau, le champ de supports se coupe
 * en deux : ce sont deux échafaudages distincts, qui ne se tiennent pas l'un
 * l'autre.
 */
const massifs = computed(() => {
  const groupes: { x: number, y: number }[][] = []
  for (const s of supports.value) {
    const courant = groupes[groupes.length - 1]
    if (courant && s.x - courant[courant.length - 1].x < PAS * 1.5) courant.push(s)
    else groupes.push([s])
  }
  return groupes
})

/**
 * Les entretoises horizontales qui rigidifient chaque massif.
 * Une entretoise ne relie que des colonnes qui montent réellement jusqu'à sa
 * hauteur. Tracée d'un bord à l'autre du massif, elle traverserait la pièce
 * partout où le dessous plonge sous elle - le dessin dirait alors qu'on
 * imprime du support à l'intérieur de la matière.
 */
const entretoises = computed(() => {
  const traits: { x1: number, x2: number, y: number }[] = []
  for (const massif of massifs.value) {
    const haut = PLATEAU - Math.min(...massif.map(s => s.y))
    for (const f of [0.4, 0.75]) {
      const y = PLATEAU - haut * f
      let debut = -1
      for (let i = 0; i <= massif.length; i++) {
        const porte = i < massif.length && massif[i].y <= y
        if (porte && debut < 0) debut = i
        if (!porte && debut >= 0) {
          if (i - debut > 1) traits.push({ x1: massif[debut].x, x2: massif[i - 1].x, y })
          debut = -1
        }
      }
    }
  }
  return traits
})

const legende = {
  plat: 'à plat, sur le dos',
  debout: 'debout, sur sa semelle',
  flanc: 'sur le flanc',
}
</script>

<template>
  <svg viewBox="0 0 260 200" class="mx-auto w-full max-w-[420px]">
    <!-- Le plateau, dessiné à l'identique dans les trois poses : c'est lui
         qui permet à l'œil de comparer d'une slide à l'autre. -->
    <rect x="14" :y="PLATEAU" width="232" height="7" rx="1.5" fill="currentColor" fill-opacity="0.22" />
    <line x1="14" :y1="PLATEAU" x2="246" :y2="PLATEAU" stroke="currentColor" stroke-width="1.6" stroke-opacity="0.45" />

    <!-- Les supports : de la matière imprimée pour être jetée -->
    <g v-if="supports.length">
      <line
        v-for="(s, i) in supports" :key="`sup-${i}`"
        :x1="s.x" :y1="PLATEAU" :x2="s.x" :y2="s.y"
        stroke="var(--prusa-orange)" stroke-width="0.9" stroke-opacity="0.8"
      />
      <line
        v-for="(e, i) in entretoises" :key="`lien-${i}`"
        :x1="e.x1" :y1="e.y" :x2="e.x2" :y2="e.y"
        stroke="var(--prusa-orange)" stroke-width="0.6" stroke-opacity="0.4"
      />
    </g>

    <!-- La pièce -->
    <polygon
      :points="trace"
      fill="currentColor" fill-opacity="0.22"
      stroke="currentColor" stroke-width="1.3" stroke-opacity="0.65"
      stroke-linejoin="round"
    />

    <!-- La cote de hauteur : à hauteur de couche égale, elle dit le temps -->
    <line x1="30" :y1="PLATEAU" x2="30" :y2="sommet" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.9" />
    <line x1="26" :y1="sommet" x2="34" :y2="sommet" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.9" />
    <line x1="26" :y1="PLATEAU" x2="34" :y2="PLATEAU" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.9" />
    <text
      x="38" :y="sommet + hauteur / 2 + 3"
      fill="currentColor" fill-opacity="0.5" style="font-size:9px"
    >{{ Math.round(hauteur / ECHELLE) }} mm</text>

    <text x="130" y="192" text-anchor="middle" fill="currentColor" fill-opacity="0.6" style="font-size:10.5px">
      {{ legende[pose] }}
    </text>
  </svg>
</template>
