<script setup lang="ts">
/**
 * Réplique du panneau « Légende » de l'onglet Aperçu de PrusaSlicer,
 * liste déroulante « Type d'élément ».
 *
 * Couleurs et libellés relevés directement dans le logiciel (version FR) :
 * ce sont les valeurs exactes, pas une interprétation. Le panneau remplace
 * la copie d'écran : la slide se suffit à elle-même.
 */
const rows = [
  { c: '#ffe64d', n: 'Périmètre', t: '6m', p: 16.2, m: '0.38', g: '1.12' },
  { c: '#ff7d38', n: 'Périmètre externe', t: '7m', p: 18.7, m: '0.38', g: '1.15' },
  { c: '#1f1fff', n: 'Périmètre en surplomb', t: '17s', p: 0.8, m: '0.01', g: '0.03' },
  { c: '#b03029', n: 'Remplissage interne', t: '11m', p: 32.7, m: '0.91', g: '2.72' },
  { c: '#9654cc', n: 'Remplissage solide', t: '5m', p: 14.6, m: '0.37', g: '1.11' },
  { c: '#f04040', n: 'Remplissage solide supérieur', t: '6s', p: 0.3, m: '0.01', g: '0.01' },
  { c: '#4d80ba', n: 'Remplissage du pont', t: '7s', p: 0.4, m: '0.01', g: '0.02' },
  { c: '#00876e', n: 'Jupe/Bordure', t: '21s', p: 1.0, m: '0.02', g: '0.05' },
  { c: '#00ff00', n: 'Supports', t: '26s', p: 1.2, m: '0.02', g: '0.05' },
  { c: '#008000', n: 'Interface des supports', t: '6s', p: 0.3, m: '0.01', g: '0.02' },
  { c: '#5ed194', n: 'Personnalisé', t: '6s', p: 0.3, m: '0.02', g: '0.06' },
]

/** La barre la plus longue cale l'échelle, comme dans le logiciel. */
const maxP = Math.max(...rows.map(r => r.p))

const pct = (v: number) => `${v.toFixed(1).replace('.', ',')}%`
</script>

<template>
  <div class="pslegend">
    <div class="ps-title">▾ Légende</div>

    <div class="ps-body">
      <div class="ps-combo">
        <span>Type d'élément</span>
        <span class="ps-caret">▾</span>
      </div>

      <div class="ps-grid">
        <div class="ps-head ps-l" />
        <div class="ps-head">Durée</div>
        <div class="ps-head ps-span2">Pourcentage</div>
        <div class="ps-head ps-span2">Filament utilisé</div>

        <template v-for="r in rows" :key="r.n">
          <div class="ps-l">
            <span class="ps-swatch" :style="{ background: r.c }" />
            <span>{{ r.n }}</span>
          </div>
          <div class="ps-num">{{ r.t }}</div>
          <div class="ps-bar"><i :style="{ width: `${(r.p / maxP) * 100}%` }" /></div>
          <div class="ps-num">{{ pct(r.p) }}</div>
          <div class="ps-num">{{ r.m }} m</div>
          <div class="ps-num">{{ r.g }} g</div>
        </template>
      </div>

      <div class="ps-sep" />

      <div class="ps-foot">
        <div class="ps-foot-title">Temps d'impression estimés :</div>
        <div class="ps-foot-line"><span class="ps-key">Première couche :</span><span>41s</span></div>
        <div class="ps-foot-line"><span class="ps-key">Total :</span><span>35m</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les tons sont ceux de l'interface PrusaSlicer : le panneau doit être
   reconnaissable au premier coup d'œil, quel que soit le thème de la slide. */
.pslegend {
  border-radius: 0.35em;
  overflow: hidden;
  border: 1px solid #333;
  background: #5c5c5c;
  color: #d8d8d8;
  font-size: 0.62rem;
  line-height: 1.35;
  box-shadow: 0 6px 18px rgb(0 0 0 / 22%);
}

.ps-title {
  background: #2a2c2e;
  color: #cfcfcf;
  padding: 0.25em 0.7em;
  font-weight: 600;
}

.ps-body {
  padding: 0.55em 0.7em 0.6em;
}

.ps-combo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #282828;
  border: 1px solid #eb8143;
  border-radius: 0.2em;
  padding: 0.25em 0 0.25em 0.5em;
  margin-bottom: 0.7em;
}

.ps-caret {
  background: #eb8143;
  color: #1e1e1e;
  padding: 0.1em 0.45em;
  margin: -0.25em 0;
  align-self: stretch;
  display: flex;
  align-items: center;
}

.ps-grid {
  display: grid;
  grid-template-columns: 1fr auto 2.6em auto auto auto;
  column-gap: 0.55em;
  row-gap: 0.18em;
  align-items: center;
}

.ps-head {
  color: #eaeaea;
  opacity: 0.75;
  text-align: right;
  padding-bottom: 0.25em;
}
.ps-span2 {
  grid-column: span 2;
}

.ps-l {
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-align: left;
  min-width: 0;
}

.ps-swatch {
  width: 0.85em;
  height: 0.85em;
  flex: none;
  border-radius: 1px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 25%);
}

.ps-num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* La barre du logiciel n'a pas de rail visible : seule la part remplie s'affiche. */
.ps-bar {
  height: 0.75em;
  display: flex;
  justify-content: flex-end;
}
.ps-bar i {
  background: #eb8143;
  min-width: 2px;
  border-radius: 1px;
}

.ps-sep {
  border-top: 1px solid rgb(255 255 255 / 18%);
  margin: 0.6em 0 0.45em;
}

.ps-foot-title {
  margin-bottom: 0.15em;
}
.ps-foot-line {
  display: flex;
  gap: 0.6em;
}
.ps-key {
  color: #eb8143;
  min-width: 8.5em;
}
</style>
