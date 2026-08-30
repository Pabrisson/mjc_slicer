<script setup lang="ts">
import { computed } from 'vue'
import { bornes, POSES, PORTE_TELEPHONE, poser } from '../lib/coupe'

/**
 * Le même objet, posé de trois façons.
 *
 * Un seul composant pour les trois slides, et ce n'est pas une économie :
 * c'est la condition pour que la comparaison tienne. Le porte-téléphone est
 * décrit une fois pour tout le deck dans `lib/coupe.ts`, et chaque pose n'est
 * qu'une rotation de ce profil unique, reposé automatiquement sur le plateau.
 * Trois dessins séparés dériveraient l'un de l'autre et la salle verrait trois
 * objets au lieu d'un objet et trois décisions.
 *
 * Les couches restent horizontales dans les trois poses, empilées depuis le
 * plateau : elles ne suivent pas la pièce, elles suivent la machine. C'est ce
 * qui fait le lien avec le crochet deux slides plus tôt - tourner l'objet, ce
 * n'est pas le tourner dans sa matière, c'est changer la direction dans
 * laquelle ses couches le traversent.
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

const ECHELLE = 1.35
const PLATEAU = 168
const CX = 130

/** L'écartement des colonnes de support, en coordonnées d'écran. */
const PAS = 6.5

/** Le profil tourné, reposé sur le plateau et centré, en coordonnées d'écran. */
const silhouette = computed(() =>
  poser(PORTE_TELEPHONE, POSES[props.pose], { echelle: ECHELLE, cx: CX, plateau: PLATEAU }),
)

const sommet = computed(() => bornes(silhouette.value).yMin)
const hauteur = computed(() => PLATEAU - sommet.value)

/** Le nombre réel de couches, pas le nombre de traits dessinés : le
    hachurage est exagéré pour être visible en projection, mais le chiffre
    annoncé doit rester celui que la salle lira dans PrusaSlicer. */
const COUCHE_MM = 0.2
const nbCouches = computed(() => Math.round(hauteur.value / ECHELLE / COUCHE_MM))

/**
 * Les supports, par lancer de rayon sous la silhouette.
 * Une face du dessous plus redressée que 45° se tient toute seule : la
 * matière suivante repose encore assez sur la précédente. En dessous de 45°,
 * elle part dans le vide et il faut l'étayer.
 */
const supports = computed(() => {
  const pts = silhouette.value
  const { xMin, xMax } = bornes(pts)
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
    <rect x="14" :y="PLATEAU" width="232" height="7" rx="1.5" class="coupe-plateau-corps" />
    <line x1="14" :y1="PLATEAU" x2="246" :y2="PLATEAU" class="coupe-plateau" />

    <!-- Les supports : de la matière imprimée pour être jetée -->
    <g v-if="supports.length">
      <line
        v-for="(s, i) in supports" :key="`sup-${i}`"
        :x1="s.x" :y1="PLATEAU" :x2="s.x" :y2="s.y"
        class="coupe-support"
      />
      <line
        v-for="(e, i) in entretoises" :key="`lien-${i}`"
        :x1="e.x1" :y1="e.y" :x2="e.x2" :y2="e.y"
        class="coupe-entretoise"
      />
    </g>

    <!-- La pièce, et les couches qui la traversent -->
    <Couches :points="silhouette" :origine="PLATEAU" sens="posee" />

    <!-- La cote de hauteur : à hauteur de couche égale, elle dit le temps.
         Le chiffre est écrit le long de la ligne de cote, comme sur un plan :
         couché, il tomberait dans la pièce, qui occupe toute la largeur dès
         qu'elle est posée à plat. -->
    <g class="cote">
      <line x1="30" :y1="PLATEAU" x2="30" :y2="sommet" />
      <line x1="26" :y1="sommet" x2="34" :y2="sommet" />
      <line x1="26" :y1="PLATEAU" x2="34" :y2="PLATEAU" />
    </g>
    <text
      x="24" :y="sommet + hauteur / 2" text-anchor="middle"
      :transform="`rotate(-90 24 ${sommet + hauteur / 2})`"
      fill="currentColor" fill-opacity="0.5" style="font-size:9px"
    >{{ Math.round(hauteur / ECHELLE) }} mm</text>

    <!-- Le prix de cette hauteur, en couches à empiler : le vrai compte, pas
         celui des traits du dessin. -->
    <text x="248" y="20" text-anchor="end" fill="currentColor" fill-opacity="0.45" style="font-size:9px">
      {{ nbCouches }} couches
    </text>
    <text x="248" y="29" text-anchor="end" fill="currentColor" fill-opacity="0.3" style="font-size:7.5px">
      à 0.20 mm
    </text>

    <text x="130" y="192" text-anchor="middle" fill="currentColor" fill-opacity="0.6" style="font-size:10.5px">
      {{ legende[pose] }}
    </text>
  </svg>
</template>

<style scoped>
/* Les traits de cote : plus fins que le dessin, ils annotent sans concurrencer */
.cote line {
  stroke: currentColor;
  stroke-opacity: 0.4;
  stroke-width: 0.9;
}
</style>
