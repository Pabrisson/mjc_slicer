# Les bases d'un slicer - formation PrusaSlicer

Support de formation Slidev, 2 h, pour débutants ayant déjà vu une imprimante 3D tourner.
Matériel de référence : Prusa i3 MK2.5S, buse 0,4 mm, PLA.

## Lancer

```bash
pnpm install
pnpm dev        # http://localhost:3030
pnpm build      # export statique dans dist/
pnpm export     # PDF
```

Le **mode présentateur** (`/presenter/`) affiche les notes de chaque slide : minutage,
ce qu'il faut dire, ce qu'il faut montrer dans PrusaSlicer.

## Structure

```
slides.md              Frontmatter, accueil, sommaire, imports
pages/01..08-*.md      Un fichier par module
components/*.vue       Composants didactiques interactifs
style.css              Palette et styles partagés (.regle, .piege, .temoin)
global-bottom.vue      Bandeau permanent : module courant et progression
docs/superpowers/specs/ Le design de la formation
```

## Images

Toutes les illustrations sont des `<Placeholder>` qui affichent, à l'écran, la consigne
de prise de vue. **La slide 43 récapitule la liste complète** des captures et photos à
produire. Chaque placeholder se remplace par :

```html
<img src="/mon-image.jpg" class="rounded-lg" />
```

en déposant le fichier dans `public/`.

Pour l'image de couverture, ajouter `background: /cover.jpg` au frontmatter de `slides.md`.

## Modèles 3D

La slide 44 liste les modèles Printables utilisés comme objets témoins, avec le nombre
d'exemplaires à imprimer et les variantes d'orientation ou de hauteur de couche qui
servent aux comparaisons en séance.

## Annotations déplaçables

La slide 10 utilise `v-drag` : en mode `pnpm dev`, les quatre étiquettes se déplacent à la
souris et Slidev réécrit les coordonnées dans le markdown. À recaler une fois la vraie
capture d'écran en place.

## Piège à connaître

Slidev active le preset *attributify* d'UnoCSS. Dans un SVG, les attributs `opacity="0.7"`
et `font-size="9"` sont interceptés et réinterprétés comme des classes utilitaires
(`opacity: 0.007`, `font-size: 2.25rem`). Utiliser `fill-opacity` / `stroke-opacity` et
`style="font-size:9px"`.

De même, `.slidev-layout p` l'emporte sur `.m-0` : dans un composant, écrire `!m-0`.
Et le padding des cellules de tableau du thème résiste aux utilitaires de taille :
utiliser la classe `.tight-table` de `style.css` pour les listes denses.

## Vérifier qu'aucun texte ne sort des slides

Le mode `/print` ne reflète pas la mise en page réelle. Pour un audit fiable, ouvrir le
deck et exécuter dans la console du navigateur une boucle qui parcourt les slides via
`window.__slidev__.nav.go(i, 999)` et compare le bas de chaque élément feuille au bas de
`.slidev-page-<i>`, moins les 26 px du bandeau.
