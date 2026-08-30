<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '@slidev/client/layoutHelper.ts'

/**
 * Emplacement d'image de la formation.
 *
 * Deux rendus dans un seul composant :
 *  - avec `src`, l'image en place, avec sa mention de source ;
 *  - sans `src`, le cadre de consigne, pour que la prise de vue à faire
 *    reste visible sur la slide tant qu'elle n'est pas faite.
 *
 * La référence passe par `refId` et non par `ref` : `ref` est un attribut
 * réservé de Vue, écarté des props avant d'atteindre le composant. Tant que
 * la prop s'appelait `ref`, le badge n'a jamais été rendu.
 */
const props = defineProps<{
  /** Ce qu'il faut photographier ou capturer */
  brief: string
  /** 'capture' = copie d'écran PrusaSlicer, 'photo' = objet réel, 'schema' = dessin à produire */
  kind?: 'capture' | 'photo' | 'schema'
  /** Proportions du cadre, ex. '16/9', '4/3', '1/1' */
  ratio?: string
  /** Référence courte, reprise dans l'annexe */
  refId?: string
  /** Hauteur maximale du cadre, pour qu'il ne pousse jamais la slide */
  maxH?: string
  /** Chemin de l'image dans public/ - sa présence bascule le rendu */
  src?: string
  /** Mention de source, affichée en bas à droite de l'image */
  credit?: string
  /** Texte alternatif de l'image */
  alt?: string
  /**
   * Affiche les repères de production - la référence et la mention de source.
   * Masqués par défaut : ils servent à préparer la séance, pas à la projeter.
   * Les mentions de source restent consignées dans docs/credits-images.md.
   */
  showMeta?: boolean
}>()

/**
 * Le site est publié sous un sous-chemin - `/mjc_slicer/` sur GitHub Pages.
 * `src` arrive ici comme une chaîne passée en prop : Vite ne peut pas la
 * réécrire à la construction, comme il le ferait pour un attribut statique,
 * et un chemin absolu viserait alors la racine du domaine. On lui applique
 * donc la base nous-mêmes, avec l'utilitaire dont Slidev se sert déjà pour
 * les fonds de slide.
 */
const srcUrl = computed(() => (props.src ? resolveAssetUrl(props.src) : undefined))

const label = {
  capture: 'Copie d’écran PrusaSlicer',
  photo: 'Photo d’objet réel',
  schema: 'Schéma à produire',
}
</script>

<template>
  <!-- L'image est en place. Le cadre épouse l'image plutôt que d'occuper
       toute la colonne : sinon le liseré dessine deux bandes vides de part
       et d'autre d'une capture plus étroite que son emplacement. C'est donc
       l'image qui donne ses proportions, et `ratio` ne sert plus qu'au
       cadre de consigne. -->
  <figure
    v-if="src"
    class="fig relative mx-auto !my-0 w-fit max-w-full overflow-hidden rounded-lg"
  >
    <img
      :src="srcUrl" :alt="alt ?? brief"
      class="block h-auto w-auto max-w-full"
      :style="{ maxHeight: maxH ?? '215px' }"
    >
    <figcaption v-if="showMeta && credit" class="fig-pill absolute bottom-0 right-0 text-[0.55rem]">
      {{ credit }}
    </figcaption>
    <span v-if="showMeta && refId" class="fig-pill fig-ref absolute right-1.5 top-1.5 rounded font-mono text-[0.6rem]">
      {{ refId }}
    </span>
  </figure>

  <!-- L'emplacement est encore vide : on affiche la consigne -->
  <div
    v-else
    class="ph relative mx-auto w-full flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg px-4 py-3 text-center"
    :style="{ aspectRatio: ratio ?? '16/9', maxHeight: maxH ?? '215px' }"
  >
    <div class="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest opacity-60">
      <carbon:camera v-if="kind === 'photo'" />
      <carbon:screen v-else-if="kind === 'schema'" />
      <carbon:image v-else />
      <span>{{ label[kind ?? 'capture'] }}</span>
    </div>
    <p class="!m-0 max-w-[48ch] text-sm leading-snug opacity-65">{{ brief }}</p>
    <span v-if="showMeta && refId" class="absolute right-2 top-2 rounded px-1.5 py-0.5 font-mono text-[0.65rem] opacity-50 ph-ref">
      {{ refId }}
    </span>
  </div>
</template>

<style scoped>
.ph {
  border: 2px dashed var(--prusa-orange, #fa6831);
  background:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(250, 104, 49, 0.05) 10px,
      rgba(250, 104, 49, 0.05) 20px
    );
  color: inherit;
}
.ph-ref {
  border: 1px solid currentColor;
}

.fig {
  border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
}

/* La mention et le badge se posent sur l'image, dont on ne connaît pas la
   couleur. Un jeton sombre à texte clair reste lisible sur une capture
   blanche comme sur une photo sombre, et dans les deux thèmes : c'est plus
   sûr que de parier sur le fond du thème. */
.fig-pill {
  padding: 0.1rem 0.35rem;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  line-height: 1.5;
}
.fig-pill:not(.fig-ref) {
  border-top-left-radius: 0.25rem;
}
</style>
