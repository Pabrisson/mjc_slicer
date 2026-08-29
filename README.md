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
de prise de vue. **La slide 44 récapitule la liste complète** des captures et photos à
produire. Chaque placeholder se remplace par :

```html
<img src="/mon-image.jpg" class="rounded-lg" />
```

en déposant le fichier dans `public/`.

Pour l'image de couverture, ajouter `background: /cover.jpg` au frontmatter de `slides.md`.

## Modèles 3D

Les objets témoins de la formation, tous gratuits sur Printables. Vérifier la licence
au téléchargement.

| Sert à | Modèle | Ex. |
|---|---|:---:|
| **Fil rouge**, modules 2 à 6 | [Phone Stand (no supports)](https://www.printables.com/model/569525-phone-stand-no-supports) · OverMaintained | 1 |
| **Anisotropie**, module 3 | [Simple low-poly wall hook](https://www.printables.com/model/153118-simple-low-poly-wall-hook) · A. Jachowicz | 2 |
| **Règle des 45°**, module 3 | [Angle Test Print](https://www.printables.com/model/61391-angle-test-print) · Onnig | 1 |
| **Couche et supports**, modules 4 et 5 | [Marie Curie bust](https://www.printables.com/model/588930-marie-curie-bust) · Antoine | 2 |
| **Tolérances**, module 5 | [Tolerance Test for press fit Box](https://www.printables.com/model/12548-tolerance-test-for-press-fit-box) · Fipsthedog | 1 jeu |
| **Tolérances**, module 5 | [Storage Box Snap-Fit Lid](https://www.printables.com/model/20961-storage-box-snap-fit-lid) · Extrutim | 2 |
| **Stringing**, module 7 | [Quick Overhang and Stringing Test](https://www.printables.com/model/167648-quick-overhang-and-stringing-test) · mrichardson | 1 |

**Les impressions en double comptent.** Le crochet en deux orientations, à plat et
debout. Le buste en **0.35mm FAST** et **0.10mm DETAIL**. Le couvercle de boîte en
version serrée et en version ajustée. C'est la comparaison qui enseigne, pas la pièce
seule.

Si un modèle ne convient pas :

- porte-téléphone → [810465](https://www.printables.com/model/810465-phone-stand-no-support)
- crochet → [864834](https://www.printables.com/model/864834-wall-hook-optimized-for-printing-wandhaken-3d-druc)
- buste → [513569](https://www.printables.com/model/513569-albert-einstein-bust) (Einstein)
- angles → [132290](https://www.printables.com/model/132290-convexconcavestraight-overhang-test)

Notes de préparation :

- Le **buste Marie Curie** sert trois fois : son maillage à plus d'un million de
  triangles illustre le module 1, sa hauteur de couche le module 4, ses supports
  organiques le module 5. C'est le modèle à imprimer en premier si le temps manque.
  Son auteur indique 0,16 mm ; la MK2.5S n'a pas ce profil, prendre **0.15mm OPTIMAL**.
- Le **porte-téléphone** d'OverMaintained a été choisi parce que son auteur précise
  lui-même qu'il s'imprime sans supports « sur le côté » : la démonstration du module 3
  est fournie avec le modèle, même pièce, deux orientations, deux résultats.

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

## Publier une version

Le site et le PDF sont publiés automatiquement à la création d'un tag de version :

```bash
git tag 1.0.0
git push origin 1.0.0
```

Le workflow `.github/workflows/release.yml` construit alors la présentation, en exporte un PDF, puis :

- déploie le site sur <https://pabrisson.github.io/mjc_slicer/>
- crée la Release `1.0.0` avec `mjc-slicer-1.0.0.pdf` en pièce jointe et des notes générées depuis les commits

Le tag doit suivre le motif `*.*.*`, sans préfixe `v`. Aucun autre événement ne déclenche de publication : les commits sur `main` ne modifient pas le site en ligne.

### Prérequis, à faire une seule fois

Dans **Settings → Pages**, régler **Source** sur **GitHub Actions**. Sans cela, le job `deploy` échoue. Le dépôt doit par ailleurs être public.
