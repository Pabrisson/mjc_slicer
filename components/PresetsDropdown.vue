<script setup lang="ts">
/**
 * Réplique de la liste déroulante « Réglages d'impression » de PrusaSlicer,
 * ouverte sur les préréglages système d'une MK2.5S en buse Ø 0,4 mm.
 *
 * Redessinée plutôt que capturée, pour la même raison que SlicerWindow : les
 * captures disponibles sont en interface anglaise, et cette slide sert de
 * modèle à ce que la salle doit retrouver à l'écran, en français.
 *
 * Libellés et ordre relevés directement dans le logiciel : les deux profils
 * « Linear Advance » sont bien là, entre les cinq profils du tableau de gauche.
 */

/** Les préréglages système, dans l'ordre exact de la liste. */
const presets = [
  '0.05mm ULTRADETAIL',
  '0.10mm DETAIL',
  '0.15mm 100mms Linear Advance',
  '0.15mm OPTIMAL',
  '0.20mm 100mms Linear Advance',
  '0.20mm NORMAL',
  '0.35mm FAST',
]

/** Le profil sélectionné : celui de la combo, surligné dans la liste. */
const courant = '0.20mm NORMAL'
</script>

<template>
  <div class="pspreset">
    <!-- Les deux icônes de chaque ligne, définies une fois et réutilisées.
         La roue dentée signale un préréglage système, le cadenas qu'il est
         verrouillé - non modifiable sans l'enregistrer sous un autre nom. -->
    <svg width="0" height="0" class="ps-defs" aria-hidden="true">
      <defs>
        <symbol id="ps-gear" viewBox="0 0 16 16">
          <g fill="currentColor">
            <rect
              v-for="i in 8" :key="i"
              x="7.1" y="0.7" width="1.8" height="3.4" rx="0.5"
              :transform="`rotate(${(i - 1) * 45} 8 8)`"
            />
          </g>
          <path
            fill="currentColor" fill-rule="evenodd"
            d="M8 2.9a5.1 5.1 0 1 0 0 10.2A5.1 5.1 0 0 0 8 2.9Zm0 2.8a2.3 2.3 0 1 1 0 4.6a2.3 2.3 0 0 1 0-4.6Z"
          />
        </symbol>

        <symbol id="ps-lock" viewBox="0 0 16 16">
          <path d="M4.8 7V4.9a3.2 3.2 0 0 1 6.4 0V7" fill="none" stroke="currentColor" stroke-width="1.6" />
          <rect x="3.1" y="6.7" width="9.8" height="7.2" rx="1.1" fill="currentColor" />
        </symbol>
      </defs>
    </svg>

    <div class="ps-label">Réglages d’impression :</div>

    <div class="ps-combo-row">
      <div class="ps-combo">
        <svg class="ps-ico ps-gear"><use href="#ps-gear" /></svg>
        <svg class="ps-ico ps-lock"><use href="#ps-lock" /></svg>
        <span class="ps-name">{{ courant }}</span>
        <span class="ps-caret">
          <svg viewBox="0 0 12 12"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.3" /></svg>
        </span>
      </div>
      <!-- Le bouton « revenir à la valeur système », à droite de la liste -->
      <svg class="ps-ico ps-gear ps-side"><use href="#ps-gear" /></svg>
    </div>

    <div class="ps-popup">
      <div class="ps-sep"><span>Préréglages système</span></div>

      <div
        v-for="p in presets" :key="p"
        class="ps-row" :class="{ 'is-current': p === courant }"
      >
        <svg class="ps-ico ps-gear"><use href="#ps-gear" /></svg>
        <svg class="ps-ico ps-lock"><use href="#ps-lock" /></svg>
        <span class="ps-name">{{ p }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les tons sont ceux de l'interface PrusaSlicer en thème sombre : le panneau
   doit être reconnaissable au premier coup d'œil, quel que soit le thème de
   la slide. */
.pspreset {
  --ps-bg: #3c3f41;
  --ps-field: #2b2b2b;
  --ps-txt: #d7d7d7;
  --ps-gear: #e8873a;
  --ps-edge: #c1562a;

  width: 100%;
  padding: 0.5em 0.6em 0.6em;
  border: 1px solid #262626;
  border-radius: 0.35em;
  background: var(--ps-bg);
  color: var(--ps-txt);
  font-size: 0.66rem;
  line-height: 1.35;
}

.ps-defs {
  position: absolute;
}

.ps-label {
  margin-bottom: 0.3em;
}

.ps-combo-row {
  display: flex;
  align-items: center;
  gap: 0.45em;
}

.ps-combo {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.45em;
  padding: 0.25em 0 0.25em 0.45em;
  border: 1px solid #1f1f1f;
  border-radius: 0.15em;
  background: var(--ps-field);
}

.ps-caret {
  margin-left: auto;
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 0.4em;
  border-left: 1px solid rgb(255 255 255 / 12%);
  opacity: 0.7;
}
.ps-caret svg {
  width: 0.85em;
  height: 0.85em;
}

/* La liste ouverte se superpose à la fenêtre : c'est le liseré orange qui la
   détache du fond, exactement comme dans le logiciel. */
.ps-popup {
  margin-top: 0.15em;
  padding: 0.25em 0 0.3em;
  border: 1px solid var(--ps-edge);
  border-radius: 0.15em;
  background: var(--ps-field);
}

.ps-sep {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.1em 1.2em 0.3em;
  white-space: nowrap;
}
.ps-sep::before,
.ps-sep::after {
  content: "";
  flex: 1;
  border-top: 1px solid rgb(255 255 255 / 55%);
}

.ps-row {
  display: flex;
  align-items: center;
  gap: 0.45em;
  padding: 0.12em 0.5em;
  border: 1px solid transparent;
}

/* Le profil courant : le survol clair du logiciel, pas une sélection bleue. */
.ps-row.is-current {
  background: #4c4c4c;
  border-color: #6e6e6e;
}

.ps-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ps-ico {
  width: 1.05em;
  height: 1.05em;
  flex: none;
}
.ps-gear {
  color: var(--ps-gear);
}
.ps-lock {
  color: #cfcfcf;
  width: 0.9em;
  height: 0.9em;
}
.ps-side {
  width: 1.15em;
  height: 1.15em;
}
</style>
