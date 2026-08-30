<script setup lang="ts">
import { computed, ref, watch } from 'vue'

/**
 * Les deux curseurs de la vue Aperçu de PrusaSlicer, redessinés, et la pièce
 * sur laquelle ils agissent.
 *
 * Redessinés plutôt que capturés, pour la même raison que SlicerWindow et
 * PresetsDropdown : la capture disponible est en interface anglaise, et elle
 * est figée - or c'est le mouvement qui explique ces deux curseurs.
 *
 * La pièce est réduite à ce que la slide doit faire comprendre : dix couches
 * au lieu de cent vingt-cinq, et dix-sept déplacements de buse par couche au
 * lieu de quelques milliers. Assez pour que chaque cran du curseur se voie
 * depuis le fond de la salle, ce qu'un vrai G-code ne permet pas.
 *
 *  - le curseur vertical empile et coupe : sa poignée haute est la dernière
 *    couche posée, sa poignée basse masque tout ce qui est en dessous ;
 *  - le curseur horizontal rejoue le trajet de la buse À L'INTÉRIEUR de la
 *    couche du dessus, dans l'ordre réel : périmètre externe, périmètre
 *    interne, puis remplissage.
 *
 * Les couleurs sont celles du logiciel, reprises telles quelles de
 * PreviewLegend : la slide précédente vient d'enseigner ce code couleur,
 * celle-ci le met en mouvement.
 *
 * La hauteur du bloc est fixe (300 px) : c'est celle de la capture qu'il
 * remplace, la colonne de droite est calée dessus.
 */
const props = withDefaults(defineProps<{
  /** Nombre de couches de la pièce tranchée */
  layers?: number
  /** Hauteur de couche, en mm - donne la cote affichée sur l'étiquette */
  layerHeight?: number
  /** Hauteur du bloc, celle de l'image remplacée */
  height?: string
}>(), { layers: 10, layerHeight: 0.2, height: '300px' })

/* ===== La scène, en projection isométrique =====
   Un point de la pièce est repéré par (u, v) dans le plan du plateau et par
   son numéro de couche. S est le pas de la grille, EP l'épaisseur d'une
   couche à l'écran - très exagérée, sans quoi dix couches feraient 2 mm. */
/* La pièce est calée sur la place que les deux curseurs lui laissent : le
   curseur vertical mange le bord droit, l'horizontal le bas du cadre. CY est
   posé pour que la pile complète - dix couches, plus le losange du dessus -
   tombe au milieu de ce qui reste. */
const S = 20
const EP = 13
const CX = 180
const CY = 201

/**
 * Le plateau ne s'arrête pas : ses lignes sortent du cadre de tous les côtés,
 * comme dans le logiciel où l'on voit le plateau de près. Une ligne toutes les
 * deux unités, sur seize de part et d'autre - de quoi couvrir les quatre coins
 * du bloc quelle que soit la couche affichée.
 */
const GRILLE_MAX = 16
const GRILLE = Array.from({ length: GRILLE_MAX + 1 }, (_, i) => -GRILLE_MAX + i * 2)

/** Demi-côté de la pièce, en unités de grille : le périmètre externe. */
const A = 2

function iso(u: number, v: number) {
  return { x: CX + (u - v) * S, y: CY + (u + v) * (S / 2) }
}

/** Les quatre coins de la pièce, du sommet de l'écran et dans le sens horaire. */
const COINS = [iso(-A, -A), iso(A, -A), iso(A, A), iso(-A, A)]

/** Les couleurs du logiciel, reprises de la légende du module. */
const TEINTES = {
  externe: '#ff7d38',
  interne: '#ffe64d',
  remplissage: '#b03029',
}

type Geste = { x1: number, y1: number, x2: number, y2: number, c: string }

/** Un contour fermé, à l'écart `a` du centre : quatre déplacements. */
function contour(a: number, c: string): Geste[] {
  const p = [iso(-a, -a), iso(a, -a), iso(a, a), iso(-a, a)]
  return p.map((d, i) => {
    const f = p[(i + 1) % 4]
    return { x1: d.x, y1: d.y, x2: f.x, y2: f.y, c }
  })
}

/**
 * Le remplissage : cinq passes en diagonale, reliées le long du mur. Les
 * liaisons comptent comme des déplacements - c'est justement ce que le
 * curseur horizontal donne à voir.
 */
function remplissage(a: number, c: string): Geste[] {
  const g: Geste[] = []
  let fin: { x: number, y: number } | null = null

  ;[-1.7, -0.85, 0, 0.85, 1.7].forEach((k, i) => {
    const uMin = Math.max(-a, k - a)
    const uMax = Math.min(a, k + a)
    const bouts = [iso(uMin, k - uMin), iso(uMax, k - uMax)]
    const [d, f] = i % 2 ? [bouts[1], bouts[0]] : bouts

    if (fin) g.push({ x1: fin.x, y1: fin.y, x2: d.x, y2: d.y, c })
    g.push({ x1: d.x, y1: d.y, x2: f.x, y2: f.y, c })
    fin = f
  })

  return g
}

/** Le trajet d'une couche, dans l'ordre où la buse le parcourt. */
const trajet: Geste[] = [
  ...contour(A, TEINTES.externe),
  ...contour(A - 0.38, TEINTES.interne),
  ...remplissage(A - 0.72, TEINTES.remplissage),
]

/** Couche du haut : celle qui coupe l'objet. Part du sommet, comme au chargement. */
const haut = ref(props.layers)
/** Couche du bas : tout ce qui est en dessous est masqué. */
const bas = ref(1)
/** Position dans le trajet de la buse, pour le curseur horizontal. */
const geste = ref(trajet.length)

/** Changer de couche la réaffiche entière, comme dans le logiciel. */
watch(haut, () => { geste.value = trajet.length })

/** Les déplacements déjà posés sur la couche du dessus. */
const posés = computed(() => trajet.slice(0, geste.value))

/** La buse, au bout du dernier déplacement. */
const buse = computed(() => {
  const g = posés.value[posés.value.length - 1]
  return g ? { x: g.x2, y: g.y2 } : null
})

/** Les couches pleines, du bas visible jusqu'à celle qui est en cours. */
const empilement = computed(() =>
  Array.from({ length: haut.value - bas.value + 1 }, (_, i) => bas.value + i),
)

/** Le décalage à l'écran d'une couche : c'est toute la pile qui monte. */
function niveau(n: number) {
  return `translate(0 ${-n * EP})`
}

/** Poignée en cours de déplacement, pour router les pointermove. */
const prise = ref<'haut' | 'bas' | 'geste' | null>(null)

const railV = ref<HTMLElement>()
const railH = ref<HTMLElement>()

/** Position d'une couche sur le rail, de 0 (en bas) à 1 (en haut). */
function part(n: number) {
  return props.layers > 1 ? (n - 1) / (props.layers - 1) : 1
}

const pctHaut = computed(() => `${part(haut.value) * 100}%`)
const pctBas = computed(() => `${part(bas.value) * 100}%`)
const pctPlage = computed(() => `${(part(haut.value) - part(bas.value)) * 100}%`)
const partGeste = computed(() => geste.value / trajet.length)
const pctGeste = computed(() => `${partGeste.value * 100}%`)
/** Près du bout du rail, l'étiquette passe à gauche pour ne pas sortir du cadre. */
const gesteAuBout = computed(() => partGeste.value > 0.78)

/**
 * Quand les deux poignées se rejoignent - le geste que la slide demande :
 * descendre sur la première couche - leurs deux étiquettes se superposeraient.
 * Seule celle du haut reste, comme dans le logiciel.
 */
const coteBasLisible = computed(() => part(haut.value) - part(bas.value) > 0.13)

/** La cote affichée : couche 1 à 0,20 mm, couche 125 à 25,00 mm. */
function cote(n: number) {
  return (n * props.layerHeight).toFixed(2)
}

function borne(n: number) {
  return Math.min(props.layers, Math.max(1, Math.round(n)))
}

/** Les deux poignées ne se croisent pas : le bas reste sous le haut. */
function poser(quoi: 'haut' | 'bas', n: number) {
  if (quoi === 'haut') haut.value = Math.max(bas.value, borne(n))
  else bas.value = Math.min(haut.value, borne(n))
}

/** Couche visée par un pointeur, d'après sa position sur le rail vertical. */
function coucheSous(e: PointerEvent) {
  const r = railV.value?.getBoundingClientRect()
  if (!r) return haut.value
  const t = 1 - (e.clientY - r.top) / r.height
  return borne(1 + t * (props.layers - 1))
}

function gesteSous(e: PointerEvent) {
  const r = railH.value?.getBoundingClientRect()
  if (!r) return geste.value
  const t = (e.clientX - r.left) / r.width
  return Math.min(trajet.length, Math.max(1, Math.round(t * trajet.length)))
}

function suivre(e: PointerEvent) {
  if (prise.value === 'geste') geste.value = gesteSous(e)
  else if (prise.value) poser(prise.value, coucheSous(e))
}

function lacher() {
  prise.value = null
}

function saisir(e: PointerEvent, quoi: 'haut' | 'bas' | 'geste') {
  // La capture garde le pointeur sur la poignée même quand la main déborde du
  // rail. Si elle échoue, le glissement doit quand même partir : en salle, un
  // curseur qui ne répond pas au premier essai coûte plus cher que ce détail.
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  catch {}

  // Le relâchement est écouté au niveau de la fenêtre, et pas seulement sur la
  // poignée : sans capture, un doigt levé ailleurs laisserait la prise ouverte,
  // et le curseur suivrait ensuite la souris sans qu'on lui demande rien.
  window.addEventListener('pointerup', lacher, { once: true })
  window.addEventListener('pointercancel', lacher, { once: true })

  prise.value = quoi
  suivre(e)
}

/** Clic dans le rail : c'est la poignée la plus proche qui vient au doigt. */
function viser(e: PointerEvent) {
  const n = coucheSous(e)
  const quoi = Math.abs(n - haut.value) <= Math.abs(n - bas.value) ? 'haut' : 'bas'
  saisir(e, quoi)
}

/**
 * Les flèches du clavier, comme dans le logiciel - et comme l'annonce la
 * slide. On arrête l'événement : sans cela ↑ ↓ feraient tourner les pages
 * de Slidev au lieu de déplacer le curseur.
 */
function clavier(e: KeyboardEvent, quoi: 'haut' | 'bas') {
  const sens = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0
  if (!sens) return
  e.preventDefault()
  e.stopPropagation()
  poser(quoi, (quoi === 'haut' ? haut.value : bas.value) + sens * (e.shiftKey ? 10 : 1))
}
</script>

<template>
  <div class="pvs" :style="{ height }">
    <div class="pvs-fond" aria-hidden="true" />

    <!-- ===== La pièce, telle que les deux curseurs la donnent à voir ===== -->
    <svg
      class="pvs-scene" viewBox="0 0 420 300"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    >
      <!-- Le plateau : la grille du logiciel, en projection, coupée par les
           bords du cadre plutôt que par ses propres limites. -->
      <g class="pvs-grille">
        <template v-for="k in GRILLE" :key="`g${k}`">
          <line
            :x1="iso(k, -GRILLE_MAX).x" :y1="iso(k, -GRILLE_MAX).y"
            :x2="iso(k, GRILLE_MAX).x" :y2="iso(k, GRILLE_MAX).y"
          />
          <line
            :x1="iso(-GRILLE_MAX, k).x" :y1="iso(-GRILLE_MAX, k).y"
            :x2="iso(GRILLE_MAX, k).x" :y2="iso(GRILLE_MAX, k).y"
          />
        </template>
      </g>

      <!-- Les flancs de la pile : une bande par couche, et le trait qui les
           sépare - c'est là qu'on compte les couches à l'œil nu. -->
      <g class="pvs-flancs">
        <g v-for="n in empilement" :key="`c${n}`" :transform="niveau(n)">
          <polygon
            :points="`${COINS[1].x},${COINS[1].y} ${COINS[2].x},${COINS[2].y}
                      ${COINS[2].x},${COINS[2].y + EP} ${COINS[1].x},${COINS[1].y + EP}`"
            fill="#b25a26"
          />
          <polygon
            :points="`${COINS[2].x},${COINS[2].y} ${COINS[3].x},${COINS[3].y}
                      ${COINS[3].x},${COINS[3].y + EP} ${COINS[2].x},${COINS[2].y + EP}`"
            fill="#d97337"
          />
        </g>
      </g>

      <!-- Le dessus de la couche précédente : ce que la buse recouvre au fur
           et à mesure, et ce qui reste visible tant qu'elle n'y est pas. -->
      <g :transform="niveau(haut)">
        <template v-if="haut > bas">
          <polygon
            :points="COINS.map(c => `${c.x},${c.y}`).join(' ')"
            fill="#6d3a24"
          />
          <g class="pvs-trace pvs-dessous">
            <line
              v-for="(g, i) in trajet" :key="`d${i}`"
              :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2" :stroke="g.c"
            />
          </g>
        </template>

        <!-- Le trajet de la couche en cours, arrêté là où en est le curseur -->
        <g class="pvs-trace">
          <line
            v-for="(g, i) in posés" :key="i"
            :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2" :stroke="g.c"
          />
        </g>

        <!-- La buse, posée sur le dernier déplacement -->
        <circle
          v-if="buse" class="pvs-buse" :cx="buse.x" :cy="buse.y" r="3.4"
          fill="#fff"
        />
      </g>
    </svg>

    <!-- La poignée du logiciel est un hexagone, pas une pastille : ses deux
         pointes désignent la couche exacte sur laquelle elle est posée.
         Définie une fois, reprise par les trois poignées. -->
    <svg width="0" height="0" class="pvs-defs" aria-hidden="true">
      <defs>
        <symbol id="pvs-hex" viewBox="0 0 16 16">
          <polygon
            points="8,0.9 14.15,4.45 14.15,11.55 8,15.1 1.85,11.55 1.85,4.45"
            fill="currentColor" stroke="rgb(0 0 0 / 40%)" stroke-width="1.1"
          />
        </symbol>

        <symbol id="pvs-hex-plus" viewBox="0 0 16 16">
          <polygon
            points="8,0.9 14.15,4.45 14.15,11.55 8,15.1 1.85,11.55 1.85,4.45"
            fill="currentColor" stroke="rgb(0 0 0 / 40%)" stroke-width="1.1"
          />
          <path
            d="M8 4.6v6.8M4.6 8h6.8" fill="none"
            stroke="#fff" stroke-width="1.5" stroke-linecap="round"
          />
        </symbol>
      </defs>
    </svg>

    <!-- ===== Le curseur vertical, sur le bord droit ===== -->
    <div class="pvs-v">
      <div ref="railV" class="pvs-v-rail" @pointerdown="viser">
        <!-- La plage gardée entre les deux poignées -->
        <div class="pvs-v-plage" :style="{ bottom: pctBas, height: pctPlage }" />

        <!-- Poignée haute : elle coupe l'objet. Le « + » insère un
             changement de couleur à cette hauteur - on y revient au module 9. -->
        <div
          class="pvs-tag pvs-tag-haut" :style="{ bottom: pctHaut }"
        >
          <span>{{ cote(haut) }}</span><span class="pvs-tag-n">({{ haut }})</span>
        </div>
        <div
          class="pvs-poignee pvs-poignee-haute" :style="{ bottom: pctHaut }"
          role="slider" tabindex="0"
          aria-label="Curseur de couches, poignée haute"
          :aria-valuemin="1" :aria-valuemax="layers" :aria-valuenow="haut"
          :aria-valuetext="`couche ${haut}, ${cote(haut)} millimètres`"
          @pointerdown.stop="saisir($event, 'haut')"
          @pointermove="suivre"
          @pointerup="lacher"
          @pointercancel="lacher"
          @keydown="clavier($event, 'haut')"
        >
          <svg class="pvs-hex" viewBox="0 0 16 16"><use href="#pvs-hex-plus" /></svg>
        </div>

        <!-- Poignée basse : elle masque tout ce qui est en dessous. -->
        <div
          v-if="coteBasLisible"
          class="pvs-tag pvs-tag-bas" :style="{ bottom: pctBas }"
        >
          <span>{{ cote(bas) }}</span><span class="pvs-tag-n">({{ bas }})</span>
        </div>
        <div
          class="pvs-poignee" :style="{ bottom: pctBas }"
          role="slider" tabindex="0"
          aria-label="Curseur de couches, poignée basse"
          :aria-valuemin="1" :aria-valuemax="layers" :aria-valuenow="bas"
          :aria-valuetext="`couche ${bas}, ${cote(bas)} millimètres`"
          @pointerdown.stop="saisir($event, 'bas')"
          @pointermove="suivre"
          @pointerup="lacher"
          @pointercancel="lacher"
          @keydown="clavier($event, 'bas')"
        >
          <svg class="pvs-hex" viewBox="0 0 16 16"><use href="#pvs-hex" /></svg>
        </div>
      </div>

      <!-- Sous le rail, le mode « une seule couche ». -->
      <svg class="pvs-ico pvs-ico-orange" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4.8 7.2V4.9a3.2 3.2 0 0 1 6.4 0v2.3" fill="none" stroke="currentColor" stroke-width="1.6" />
        <rect x="3.2" y="6.9" width="9.6" height="7" rx="1.1" fill="currentColor" />
      </svg>
    </div>

    <!-- Les réglages de l'aperçu : dans le logiciel, la roue est posée au
         croisement des deux curseurs, sur la ligne du curseur horizontal. -->
    <svg class="pvs-ico pvs-ico-gris pvs-reglages" viewBox="0 0 16 16" aria-hidden="true">
      <g fill="currentColor">
        <rect
          v-for="i in 8" :key="i"
          x="7.1" y="0.9" width="1.8" height="3.2" rx="0.5"
          :transform="`rotate(${(i - 1) * 45} 8 8)`"
        />
      </g>
      <path
        fill="currentColor" fill-rule="evenodd"
        d="M8 3.1a4.9 4.9 0 1 0 0 9.8a4.9 4.9 0 0 0 0-9.8Zm0 2.7a2.2 2.2 0 1 1 0 4.4a2.2 2.2 0 0 1 0-4.4Z"
      />
    </svg>

    <!-- ===== Le curseur horizontal, en bas ===== -->
    <div ref="railH" class="pvs-h-rail" @pointerdown="saisir($event, 'geste')">
      <div class="pvs-h-fait" :style="{ width: pctGeste }" />
      <div
        class="pvs-poignee pvs-h-poignee" :style="{ left: pctGeste }"
        role="slider" tabindex="0"
        aria-label="Curseur de trajet dans la couche"
        :aria-valuemin="1" :aria-valuemax="trajet.length" :aria-valuenow="geste"
        @pointerdown.stop="saisir($event, 'geste')"
        @pointermove="suivre"
        @pointerup="lacher"
        @pointercancel="lacher"
      >
        <svg class="pvs-hex" viewBox="0 0 16 16"><use href="#pvs-hex" /></svg>
      </div>
      <div
        class="pvs-tag pvs-tag-geste" :class="{ 'pvs-tag-avant': gesteAuBout }"
        :style="{ left: pctGeste }"
      >
        {{ geste }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les tons sont ceux de l'aperçu PrusaSlicer : le fond gris du plateau et
   l'orange de la marque, qui est aussi celui des curseurs. */
.pvs {
  --pvs-orange: #f77f47;
  --pvs-fond: #3b3b3b;
  --pvs-tag: #2a2a2a;

  position: relative;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 0.35em;
  background: var(--pvs-fond);
  color: #e6e6e6;
  font-size: 0.62rem;
  line-height: 1.15;
  user-select: none;
  touch-action: none;
}

/* La trame du plateau, volontairement discrète : elle donne le décor sans
   attirer l'œil, qui doit rester sur les deux curseurs. */
.pvs-fond {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 40% 35%, #464646, #333);
}

/* La scène garde ses proportions et se cale à gauche : la colonne des
   curseurs occupe le reste, et rien ne se recouvre. */
/* La scène couvre tout le bloc - c'est ce qui permet à la grille d'être
   coupée par les bords. `slice` la fait toujours déborder plutôt que laisser
   une bande vide si le bloc est plus étroit que prévu. */
.pvs-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Épaisseurs et couleurs de trait déclarées ici, et non en attributs SVG :
   le preset attributify d'UnoCSS intercepte `stroke-width="1"` et le calcule
   à 0 px - les arêtes disparaissent sans la moindre erreur en console. */
.pvs-grille {
  stroke: #fff;
  stroke-opacity: 0.1;
  stroke-width: 1px;
}

/* L'arête entre deux bandes : c'est elle qui rend les dix couches comptables.
   Juste assez marquée pour qu'on les compte, pas au point de rayer le flanc. */
.pvs-flancs {
  stroke: rgb(122 56 22 / 32%);
  stroke-width: 1px;
}

.pvs-trace {
  stroke-width: 3.2px;
  stroke-linecap: round;
}

/* La couche précédente, entrevue sous celle que la buse est en train de poser. */
.pvs-dessous {
  stroke-opacity: 0.32;
}

.pvs-buse {
  stroke: rgb(60 24 8 / 40%);
  stroke-width: 1px;
}

.pvs-defs {
  position: absolute;
}

/* ===== Curseur vertical =====
   Le haut du rail laisse passer l'étiquette de la poignée, qui déborde de
   moitié au-dessus ; le bas s'arrête bien avant le curseur horizontal, pour
   que les deux ne se lisent jamais comme un seul dessin. */
.pvs-v {
  position: absolute;
  top: 20px;
  right: 10px;
  bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
}

/* La roue partage l'axe du rail vertical - la colonne fait la largeur d'une
   icône - et la ligne médiane du rail horizontal, 3 px de haut à 18 px du bas. */
.pvs-reglages {
  position: absolute;
  right: 10px;
  bottom: 12.5px;
}

.pvs-v-rail {
  position: relative;
  flex: 1;
  width: 3px;
  margin-bottom: 4px;
  border-radius: 2px;
  background: rgb(255 255 255 / 22%);
  cursor: pointer;
}

.pvs-v-plage {
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: 2px;
  background: var(--pvs-orange);
}

/* ===== Curseur horizontal ===== */
.pvs-h-rail {
  position: absolute;
  bottom: 18px;
  left: 26px;
  right: 40px;
  height: 3px;
  border-radius: 2px;
  background: rgb(255 255 255 / 22%);
  cursor: pointer;
}

.pvs-h-fait {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 2px;
  background: var(--pvs-orange);
}

/* ===== Poignées =====
   La boîte est un peu plus grande que l'hexagone : elle donne une cible
   confortable au doigt, et un peu d'air autour de la forme. */
.pvs-poignee {
  position: absolute;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  color: var(--pvs-orange);
  transform: translate(-50%, 50%);
  cursor: grab;
}
/* Posées sur la même couche, c'est la poignée haute - celle qu'on manipule,
   celle qui porte le « + » - qui reste devant. */
.pvs-poignee-haute {
  z-index: 2;
}

.pvs-poignee:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 1px;
}
.pvs-poignee:active {
  cursor: grabbing;
}

.pvs-hex {
  width: 16px;
  height: 16px;
}

.pvs-h-poignee {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}

/* ===== Étiquettes ===== */
.pvs-tag {
  position: absolute;
  padding: 0.3em 0.5em;
  border-radius: 0.2em;
  background: var(--pvs-tag);
  color: #ededed;
  font-family: ui-monospace, "SFMono-Regular", "Menlo", monospace;
  white-space: nowrap;
  pointer-events: none;
}

/* Les cotes du curseur vertical s'empilent à gauche de leur poignée, comme
   dans le logiciel : la valeur en mm, puis le numéro de couche en dessous. */
.pvs-tag-haut,
.pvs-tag-bas {
  right: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25em;
  transform: translateY(50%);
}

.pvs-tag-n {
  opacity: 0.8;
}

/* Le compteur de gestes suit sa poignée, posé juste à sa droite. */
.pvs-tag-geste {
  top: 50%;
  margin-left: 22px;
  transform: translateY(-50%);
}
.pvs-tag-avant {
  margin-left: 0;
  transform: translate(calc(-100% - 22px), -50%);
}

/* ===== Icônes sous le rail vertical ===== */
.pvs-ico {
  width: 14px;
  height: 14px;
  flex: none;
}
.pvs-ico-orange {
  color: var(--pvs-orange);
}
.pvs-ico-gris {
  color: #d0d0d0;
}
</style>
