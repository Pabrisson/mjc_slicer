<template>
  <!-- Bandeau permanent : module en cours, avancement, numéro de slide -->
  <div
    v-if="$slidev.nav.currentPage > 1 && !$slidev.nav.currentSlideRoute?.meta?.slide?.frontmatter?.bare"
    class="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
  >
    <div class="flex items-center justify-between px-6 pb-2 text-[0.65rem] uppercase tracking-widest opacity-40">
      <span>{{ $slidev.nav.currentSlideRoute?.meta?.slide?.frontmatter?.module ?? 'Les bases d’un slicer' }}</span>
      <span class="font-mono">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
    <div class="h-[3px] w-full" style="background: color-mix(in srgb, currentColor 10%, transparent)">
      <div
        class="h-full transition-all duration-300"
        :style="{
          width: `${($slidev.nav.currentPage / $slidev.nav.total) * 100}%`,
          background: 'var(--prusa-orange, #fa6831)',
        }"
      />
    </div>
  </div>
</template>
