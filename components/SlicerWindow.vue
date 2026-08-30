<script setup lang="ts">
/**
 * La fenêtre de PrusaSlicer, en maquette.
 *
 * Redessinée et non capturée, pour deux raisons. D'abord la langue : toutes
 * les captures disponibles sont en interface anglaise, et cette slide est la
 * première vue d'ensemble que la salle reçoit - c'est le pire endroit pour
 * lui montrer des libellés qu'elle ne retrouvera pas à l'écran.
 *
 * Ensuite l'alignement : la slide pose ses quatre repères en coordonnées
 * absolues par-dessus l'image. Une capture les ferait tomber à côté, et une
 * capture déjà annotée - toutes celles de la documentation le sont -
 * ajouterait une seconde série de numéros contradictoire. Ici les zones sont
 * placées pour tomber exactement sous les repères.
 *
 * Le dessin reste volontairement schématique : il montre où regarder, pas à
 * quoi ça ressemble. La vraie fenêtre est projetée juste après, en direct.
 */

/** Les trois listes du panneau de droite, de haut en bas comme dans le logiciel. */
const profils = [
  { libelle: 'Réglages d’impression', valeur: '0.20mm QUALITY' },
  { libelle: 'Filament', valeur: 'Prusament PLA' },
  { libelle: 'Imprimante', valeur: 'Original Prusa MK2.5S' },
]

/** Les outils de la barre latérale, réduits à leur silhouette. */
const OUTILS = 7
</script>

<template>
  <svg viewBox="0 0 400 175" class="mx-auto w-full">
    <!-- Le cadre de la fenêtre -->
    <rect x="3" y="3" width="394" height="169" rx="4" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.28" stroke-width="1" />

    <!-- ===== 2 · Les onglets, en haut ===== -->
    <g>
      <rect x="4" y="4" width="392" height="19" rx="3" fill="currentColor" fill-opacity="0.07" />
      <text x="12" y="17" fill="currentColor" fill-opacity="0.4" style="font-size:6px">Fichier</text>
      <text x="40" y="17" fill="currentColor" fill-opacity="0.4" style="font-size:6px">Édition</text>

      <rect x="76" y="6.5" width="42" height="14" rx="2.5" fill="var(--prusa-orange)" fill-opacity="0.9" />
      <text x="97" y="16.5" text-anchor="middle" fill="#fff" style="font-size:7px;font-weight:700">Plateau</text>
      <text x="143" y="16.5" text-anchor="middle" fill="currentColor" fill-opacity="0.62" style="font-size:7px">Aperçu</text>
      <text x="192" y="16.5" text-anchor="middle" fill="currentColor" fill-opacity="0.4" style="font-size:6.5px">Réglages</text>
      <text x="240" y="16.5" text-anchor="middle" fill="currentColor" fill-opacity="0.4" style="font-size:6.5px">Filaments</text>
    </g>

    <!-- La barre d'outils du haut, décorative : elle situe la vue 3D -->
    <g>
      <rect x="120" y="28" width="150" height="15" rx="2.5" fill="currentColor" fill-opacity="0.09" />
      <rect
        v-for="i in 8" :key="`ho-${i}`"
        :x="127 + (i - 1) * 17" y="31.5" width="10" height="8" rx="1.5"
        fill="currentColor" fill-opacity="0.3"
      />
    </g>

    <!-- ===== 1 · La barre d'outils latérale ===== -->
    <g>
      <rect x="7" y="50" width="22" height="112" rx="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.8" />
      <rect
        v-for="i in OUTILS" :key="`vo-${i}`"
        x="11.5" :y="55 + (i - 1) * 15" width="13" height="11" rx="2"
        fill="currentColor" :fill-opacity="i === 3 ? 0.62 : 0.3"
      />
    </g>

    <!-- La vue 3D : le plateau en perspective et l'objet posé dessus -->
    <g>
      <polygon points="70,148 250,148 224,166 96,166" fill="currentColor" fill-opacity="0.16" />
      <polygon points="70,148 250,148 224,166 96,166" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.8" />
      <line
        v-for="i in 4" :key="`gx-${i}`"
        :x1="70 + i * 36" y1="148" :x2="96 + i * 25.6" y2="166"
        stroke="currentColor" stroke-opacity="0.16" stroke-width="0.6"
      />
      <!-- L'objet : très exactement le porte-téléphone des slides
           suivantes, au même profil, pour que la salle reconnaisse la même
           pièce du module 2 au module 3. -->
      <polygon
        points="150,157 171.1,157 171.1,151.2 199.9,124.4 195.1,118.1 156.7,144.5 150,144.5"
        fill="#4a9d4a" fill-opacity="0.62" stroke="#4a9d4a" stroke-width="1" stroke-linejoin="round"
      />
    </g>

    <!-- ===== 3 · Les trois profils ===== -->
    <g>
      <rect x="292" y="28" width="102" height="134" rx="3" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.8" />
      <g v-for="(p, i) in profils" :key="p.libelle" :transform="`translate(0 ${i * 21})`">
        <text x="297" y="41" fill="currentColor" fill-opacity="0.5" style="font-size:5.6px">{{ p.libelle }}</text>
        <rect x="297" y="44" width="92" height="11" rx="2" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7" />
        <text x="301" y="51.5" fill="currentColor" fill-opacity="0.75" style="font-size:6px">{{ p.valeur }}</text>
        <path d="M383,48 l3,3 l3,-3" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="0.9" />
      </g>

      <!-- Supports, remplissage : les deux cases du panneau, en un trait -->
      <text x="297" y="104" fill="currentColor" fill-opacity="0.45" style="font-size:5.6px">Supports</text>
      <rect x="330" y="98" width="58" height="9" rx="2" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.25" stroke-width="0.6" />
      <text x="297" y="118" fill="currentColor" fill-opacity="0.45" style="font-size:5.6px">Remplissage</text>
      <rect x="341" y="112" width="47" height="9" rx="2" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.25" stroke-width="0.6" />
    </g>

    <!-- ===== 4 · Découper et exporter ===== -->
    <g>
      <text x="343" y="134" text-anchor="middle" fill="currentColor" fill-opacity="0.45" style="font-size:5.6px">Temps estimé : 2 h 14 min</text>
      <rect x="297" y="140" width="92" height="17" rx="3" fill="var(--prusa-orange)" fill-opacity="0.9" />
      <text x="343" y="151.5" text-anchor="middle" fill="#fff" style="font-size:8px;font-weight:700">Découper maintenant</text>
    </g>

    <!-- Les deux bascules de vue, en bas à gauche -->
    <g>
      <rect x="7" y="150" width="15" height="12" rx="2" fill="currentColor" fill-opacity="0.45" />
      <rect x="24" y="150" width="15" height="12" rx="2" fill="currentColor" fill-opacity="0.22" />
    </g>
  </svg>
</template>
