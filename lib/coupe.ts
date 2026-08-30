/**
 * La géométrie commune des dessins en coupe.
 *
 * Quatre slides montrent le porte-téléphone : posé de trois façons au module 3,
 * et sur le plateau du slicer au module 2. C'est le même objet, et il n'est
 * décrit qu'ici. Un profil recopié dans chaque composant dériverait au premier
 * ajustement, et la salle verrait quatre pièces au lieu d'une pièce et
 * quatre situations.
 *
 * Ce module ne porte que des coordonnées. L'apparence - opacité de la matière,
 * épaisseur d'un trait de couche - vit dans `style.css` sous les classes
 * `.coupe-*`, pour la même raison que les cartouches `.temoin` : le langage
 * visuel du deck se règle en un seul endroit.
 */

export type Point = { x: number, y: number }

/**
 * Le porte-téléphone, y vers le haut, en millimètres :
 * une semelle de 44 mm et un dosseret incliné qui déborde en arrière.
 */
export const PORTE_TELEPHONE: [number, number][] = [
  [0, 0], [44, 0], [44, 12], [104, 68], [94, 81], [14, 26], [0, 26],
]

/**
 * L'inclinaison de chaque pose, en degrés.
 * 0° : la pièce repose sur sa semelle, en position d'usage.
 * 325° : elle est couchée sur le dos du dosseret, sa plus grande face.
 * 90° : elle est dressée sur sa tranche arrière.
 */
export const POSES = { debout: 0, plat: 325, flanc: 90 } as const

export type Pose = keyof typeof POSES

/**
 * Pas entre deux traits de couche, en unités de viewBox.
 *
 * Une seule valeur pour tout le deck : c'est elle qui donne à une couche la
 * même épaisseur apparente d'un dessin à l'autre. Sans elle, la salle
 * comparerait des styles de hachure au lieu de comparer des orientations.
 * Volontairement très exagérée - à l'échelle, 0.2 mm ferait moins d'un pixel.
 */
export const PAS_COUCHE = 5.6

/**
 * Un profil tourné, reposé sur le plateau et centré : les coordonnées d'écran
 * de la silhouette.
 *
 * Reposer et centrer sont faits ici, pas dans l'appelant, parce que c'est ce
 * que fait PrusaSlicer après une rotation. Le dessin ne peut donc pas montrer
 * une pièce qui flotte ou qui traverse le plateau.
 */
export function poser(
  profil: [number, number][],
  angleDeg: number,
  { echelle, cx, plateau }: { echelle: number, cx: number, plateau: number },
): Point[] {
  const a = (angleDeg * Math.PI) / 180
  const cos = Math.cos(a)
  const sin = Math.sin(a)
  const tournes = profil.map(([x, y]) => [
    (x * cos - y * sin) * echelle,
    (x * sin + y * cos) * echelle,
  ] as [number, number])

  const yMin = Math.min(...tournes.map(p => p[1]))
  const { xMin, xMax } = bornes(tournes.map(([x, y]) => ({ x, y })))
  const decalage = cx - (xMin + xMax) / 2

  return tournes.map(([x, y]) => ({ x: x + decalage, y: plateau - (y - yMin) }))
}

/** La boîte englobante d'une silhouette, en coordonnées d'écran. */
export function bornes(points: Point[]) {
  return {
    xMin: Math.min(...points.map(p => p.x)),
    xMax: Math.max(...points.map(p => p.x)),
    yMin: Math.min(...points.map(p => p.y)),
    yMax: Math.max(...points.map(p => p.y)),
  }
}

/** La silhouette au format attendu par un `<polygon points="...">`. */
export function trace(points: Point[]) {
  return points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}
