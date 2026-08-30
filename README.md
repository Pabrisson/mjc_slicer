# Les bases d'un slicer

Support de formation **PrusaSlicer** — 2 h, pour débutants ayant déjà vu une imprimante 3D
tourner. Matériel de référence : Prusa i3 MK2.5S, buse 0,4 mm, PLA.

Huit modules, du fichier 3D au G-code : pourquoi un slicer, le tour de l'interface,
orienter la pièce, choisir son profil, les cinq réglages qui comptent, lire l'aperçu,
diagnostiquer un échec, aller plus loin.

---

## Voir la présentation en ligne

**<https://pabrisson.github.io/mjc_slicer/>**

Rien à installer, rien à télécharger : la présentation s'ouvre directement dans le
navigateur, sur ordinateur comme sur tablette. L'adresse peut être partagée telle quelle
aux participants.

| Pour | Touche |
|---|---|
| Avancer | `Espace` ou `→` |
| Reculer | `Maj`+`Espace` ou `←` |
| Slide suivante / précédente, sans les animations | `↓` / `↑` |
| Voir toutes les slides d'un coup | `o` (`Échap` pour sortir) |
| Aller à une slide par son numéro | `g` |
| Plein écran | `f` |
| Basculer clair / sombre | `d` |

Le sommaire de la deuxième slide est cliquable : chaque ligne mène à son module.

### Mode présentateur

**<https://pabrisson.github.io/mjc_slicer/#/presenter/1>**

La même présentation, avec les notes de chaque slide affichées à côté : minutage, ce
qu'il faut dire, ce qu'il faut montrer dans PrusaSlicer. À ouvrir sur l'écran du
formateur pendant que la salle voit l'adresse normale.

---

## Récupérer le PDF

Le PDF complet est joint à chaque version publiée, sur la page des Releases :

**<https://github.com/Pabrisson/mjc_slicer/releases/latest>**

Le fichier s'appelle `mjc-slicer-<version>.pdf` et se trouve sous **Assets**. Il est
exporté en thème sombre, une page par slide — pratique pour projeter sans connexion,
imprimer, ou envoyer aux participants après la séance.

La page des Releases reste vide tant qu'aucune version n'a été publiée.

---

## Publier une version

Le site en ligne **et** le PDF sont produits par le même geste : créer un tag de version.

```bash
git tag 1.0.0
git push origin 1.0.0
```

Le workflow `.github/workflows/release.yml` se charge du reste : il met à jour
<https://pabrisson.github.io/mjc_slicer/> et crée la Release `1.0.0` avec le PDF en pièce
jointe et des notes générées depuis les commits. Compter quelques minutes.

Le tag doit suivre le motif `1.0.0`, sans préfixe `v`. Rien d'autre ne déclenche de
publication : pousser des commits sur `main` ne change pas ce qui est en ligne.

### Deux réglages GitHub, à faire une seule fois

1. **Settings → Pages** : régler **Source** sur **GitHub Actions**. Le dépôt doit être public.
2. **Settings → Environments → `github-pages`** → **Deployment branches and tags** :
   choisir **Selected branches and tags**, puis **Add deployment branch or tag rule**,
   **Ref type** = **Tag**, motif `*.*.*`.

Sans le second, GitHub n'autorise que la branche par défaut et le déploiement du site est
refusé avec le message `Tag "1.0.0" is not allowed to deploy to github-pages due to
environment protection rules.` Le PDF et la Release, eux, aboutissent quand même.

---

## Travailler sur le support

```bash
pnpm install
pnpm dev      # aperçu local sur http://localhost:3030, rechargement à chaque
              # enregistrement
```

Le contenu est en Markdown : `slides.md` pour l'accueil et le sommaire, un fichier par
module dans `pages/`. Les crédits des images reprises sont dans `docs/credits-images.md`.

Fait avec [Slidev](https://sli.dev).
