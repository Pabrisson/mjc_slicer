<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * Les deux curseurs de la vue Aperçu de PrusaSlicer, redessinés.
 *
 * Redessinés plutôt que capturés, pour la même raison que SlicerWindow et
 * PresetsDropdown : la capture disponible est en interface anglaise, et elle
 * embarque tout le plateau et l'objet, alors que la slide ne parle que des
 * deux curseurs. Ici ils sont seuls, donc lisibles depuis le fond de la salle.
 *
 * Et surtout ils bougent. La slide dit « poser le curseur vertical sur la
 * première couche » et rappelle les raccourcis flèches : autant que le geste
 * soit fait à l'écran plutôt que décrit. À la souris comme au clavier - le
 * curseur vertical prend le focus, ↑ ↓ le déplacent d'une couche, Maj de dix.
 *
 * La hauteur du bloc est fixe (300 px) : c'est celle de la capture qu'il
 * remplace, la colonne de droite est calée dessus.
 */
const props = withDefaults(defineProps<{
  /** Nombre de couches de la pièce tranchée */
  layers?: number
  /** Hauteur de couche, en mm - donne la cote affichée sur l'étiquette */
  layerHeight?: number
  /** Nombre de déplacements de la buse dans la couche affichée */
  moves?: number
  /** Hauteur du bloc, celle de l'image remplacée */
  height?: string
}>(), { layers: 125, layerHeight: 0.2, moves: 14452, height: '300px' })

/** Couche du haut : celle qui coupe l'objet. Part du sommet, comme au chargement. */
const haut = ref(props.layers)
/** Couche du bas : tout ce qui est en dessous est masqué. */
const bas = ref(1)
/** Position dans le trajet de la buse, pour le curseur horizontal. */
const geste = ref(Math.round(props.moves * 0.86))

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
const partGeste = computed(() => geste.value / props.moves)
const pctGeste = computed(() => `${partGeste.value * 100}%`)
/** Près du bout du rail, l'étiquette passe à gauche pour ne pas sortir du cadre. */
const gesteAuBout = computed(() => partGeste.value > 0.78)

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
  return Math.min(props.moves, Math.max(1, Math.round(t * props.moves)))
}

function suivre(e: PointerEvent) {
  if (prise.value === 'geste') geste.value = gesteSous(e)
  else if (prise.value) poser(prise.value, coucheSous(e))
}

function saisir(e: PointerEvent, quoi: 'haut' | 'bas' | 'geste') {
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  prise.value = quoi
  suivre(e)
}

function lacher() {
  prise.value = null
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
    <!-- Le plateau, réduit à sa trame : il situe la scène sans rien y poser. -->
    <div class="pvs-plateau" aria-hidden="true" />

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
          class="pvs-poignee pvs-plus" :style="{ bottom: pctHaut }"
          role="slider" tabindex="0"
          aria-label="Curseur de couches, poignée haute"
          :aria-valuemin="1" :aria-valuemax="layers" :aria-valuenow="haut"
          :aria-valuetext="`couche ${haut}, ${cote(haut)} millimètres`"
          @pointerdown.stop="saisir($event, 'haut')"
          @pointermove="suivre"
          @pointerup="lacher"
          @pointercancel="lacher"
          @keydown="clavier($event, 'haut')"
        />

        <!-- Poignée basse : elle masque tout ce qui est en dessous. -->
        <div
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
        />
      </div>

      <!-- Sous le rail : le mode « une seule couche », puis les réglages. -->
      <svg class="pvs-ico pvs-ico-orange" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4.8 7.2V4.9a3.2 3.2 0 0 1 6.4 0v2.3" fill="none" stroke="currentColor" stroke-width="1.6" />
        <rect x="3.2" y="6.9" width="9.6" height="7" rx="1.1" fill="currentColor" />
      </svg>
      <svg class="pvs-ico pvs-ico-gris" viewBox="0 0 16 16" aria-hidden="true">
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
    </div>

    <!-- ===== Le curseur horizontal, en bas ===== -->
    <div ref="railH" class="pvs-h-rail" @pointerdown="saisir($event, 'geste')">
      <div class="pvs-h-fait" :style="{ width: pctGeste }" />
      <div
        class="pvs-poignee pvs-h-poignee" :style="{ left: pctGeste }"
        role="slider" tabindex="0"
        aria-label="Curseur de trajet dans la couche"
        :aria-valuemin="1" :aria-valuemax="moves" :aria-valuenow="geste"
        @pointerdown.stop="saisir($event, 'geste')"
        @pointermove="suivre"
        @pointerup="lacher"
        @pointercancel="lacher"
      />
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
.pvs-plateau {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgb(255 255 255 / 9%) 1px, transparent 1px) 0 0 / 100% 46px,
    linear-gradient(90deg, rgb(255 255 255 / 9%) 1px, transparent 1px) 0 0 / 52px 100%,
    radial-gradient(120% 90% at 40% 35%, #464646, #333);
}

/* ===== Curseur vertical ===== */
.pvs-v {
  position: absolute;
  top: 12px;
  right: 14px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.pvs-v-rail {
  position: relative;
  flex: 1;
  width: 3px;
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
  bottom: 12px;
  left: 22px;
  right: 46px;
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

/* ===== Poignées ===== */
.pvs-poignee {
  position: absolute;
  left: 50%;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--pvs-orange);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 35%);
  transform: translate(-50%, 50%);
  cursor: grab;
}
.pvs-poignee:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
.pvs-poignee:active {
  cursor: grabbing;
}

/* Le « + » de la poignée haute, tracé en deux barres. */
.pvs-plus::before,
.pvs-plus::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
}
.pvs-plus::before {
  width: 7px;
  height: 1.5px;
}
.pvs-plus::after {
  width: 1.5px;
  height: 7px;
}

.pvs-h-poignee {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}

/* ===== Étiquettes ===== */
.pvs-tag {
  position: absolute;
  padding: 0.15em 0.35em;
  border-radius: 0.15em;
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
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1em;
  transform: translateY(50%);
}

.pvs-tag-n {
  opacity: 0.8;
}

/* Le compteur de gestes suit sa poignée, posé juste à sa droite. */
.pvs-tag-geste {
  top: 50%;
  margin-left: 10px;
  transform: translateY(-50%);
}
.pvs-tag-avant {
  margin-left: 0;
  transform: translate(calc(-100% - 10px), -50%);
}

/* ===== Icônes sous le rail vertical ===== */
.pvs-ico {
  width: 13px;
  height: 13px;
  flex: none;
}
.pvs-ico-orange {
  color: var(--pvs-orange);
}
.pvs-ico-gris {
  color: #d0d0d0;
}
</style>
