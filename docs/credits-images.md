# Provenance des images

Les visuels externes du diaporama, leur source et leur statut. Le script
`scripts/fetch-images.sh` rejoue le téléchargement complet.

Les captures issues de la base de connaissances de Prusa Research sont
reprises au titre de la citation pédagogique. Elles restent la propriété de
Prusa Research.

**Ce fichier est le porteur de l'attribution.** Sur les slides, la mention de
source et la référence sont masquées par défaut : elles encombrent la
projection sans rien apprendre à la salle. Pour les faire apparaître pendant
la préparation, ajouter `show-meta` à l'appel du composant `Figure` :

```html
<Figure refId="3.3" src="/img/3.3-placer-sur-face.png"
  credit="Prusa Research - Knowledge Base" show-meta … />
```

| Fichier | Réf | Source | Détenteur | Récupéré le |
|---|---|---|---|---|
| `public/img/3.3-placer-sur-face.png` | 3.3 | <https://help.prusa3d.com/article/place-on-face-tool_1781> | Prusa Research | 2026-08-30 |
| `public/img/4.3-profils.png` | 4.3 | <https://help.prusa3d.com/article/first-print-with-prusaslicer_1753> | Prusa Research | 2026-08-30 |
| `public/img/5.7-supports-organiques.jpg` | 5.7 | <https://help.prusa3d.com/article/organic-supports_480131> | Prusa Research | 2026-08-30 |
| `public/img/6.3-curseur-couches.png` | 6.3 | <https://help.prusa3d.com/article/color-change_1687> | Prusa Research | 2026-08-30 |

## Wikimedia Commons, sous licence Creative Commons

Ces deux photos exigent l'attribution. Elle est portée **sur la slide**, pas
seulement ici : c'est la condition de leur licence sur un site publié.

| Fichier | Réf | Auteur | Licence | Page du fichier |
|---|---|---|---|---|
| `public/img/1.3-buse-macro.jpg` | 1.3 | Luke Jones | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.fr) | <https://commons.wikimedia.org/wiki/File:3D_Printer_-_the_first_layer(16661915478).jpg> |
| `public/cover.jpg` | cover | Jonathan Juursema | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.fr) | <https://commons.wikimedia.org/wiki/File:Felix_3D_Printer_-_Printing_Set-up_With_Examples.JPG> |

## Réserves connues

- **Toutes ces captures sont en interface anglaise.** PrusaSlicer n'était pas
  installé sur la machine de production du diaporama. Les libellés cités par
  les slides reçoivent leur équivalent français en note.
- **4.3** montre les profils d'une MK3, pas d'une MK2.5S. Les noms de profils
  ne sont pas traduits par PrusaSlicer, donc la capture reste lisible pour un
  public francophone, mais la liste diffère de celle de la machine de
  l'atelier. Le brief de la slide le dit.
- **5.7** est une photo de deux figurines imprimées - supports en grille contre
  supports organiques - et non la capture d'aperçu que demandait le brief
  d'origine. Elle sert mieux le message de la slide : le brief a été ajusté.
- **6.3** montre le curseur vertical de couches, mais posé sur la couche 14 et
  non sur la première. Le brief a été ajusté : la slide parle du curseur,
  l'image le montre. L'image est par ailleurs **recadrée sur sa moitié droite**
  par le script de récupération : dans l'image entière, le plateau occupe tout
  le champ et le curseur ne fait qu'un filet sur le bord. Le recadrage garde la
  poignée, son agrandissement et le repère de première couche.
  La slide évoque aussi le curseur **horizontal**, absent de cette capture.
- **1.3 et la couverture** ne montrent pas une MK2.5S : Wikimedia Commons n'en
  a pas de photo exploitable. La couverture montre une Felix, 1.3 une machine
  à hotend rouge non identifiée. Le geste illustré est le bon dans les deux
  cas. À remplacer par des photos prises à l'atelier quand l'occasion se
  présente : il suffit d'écraser les fichiers.
- **2.2** n'a pas de source. La base de connaissances de Prusa ne contient
  aucune capture plein écran non annotée, et la slide pose ses propres repères
  par-dessus l'image. Voir la tâche 11 du plan.

## Redimensionnement

`scripts/fetch-images.sh` plafonne la largeur à 1200 px et ne redimensionne
que vers le bas. Une capture plus petite que ce plafond est conservée telle
quelle : l'agrandir la rendrait floue sans rien apporter à la projection.
