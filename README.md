# eps1.0_ayoub.exe

Portfolio d'Ayoub Amrani, ingénieur IA, dans l'esprit d'un épisode de piratage : le visiteur croit ouvrir un
portfolio ordinaire, son « connexion » est scannée, puis il traverse cinq étapes guidées par une voix.

| Étape | Contenu |
|---|---|
| 01_reconnaissance | dossier caviardé : profil, formation, parcours |
| 02_dechiffrement | diplômes et certifications chiffrés, à déchiffrer |
| 03_payload | terminal : `ls`, `run <projet>`, `cat chiffres`, `cat experiences` |
| 04_ingenierie_sociale | passions et langues |
| 05_exfiltration | contact, puis la révélation |

Chaque phrase vient d'un registre de faits vérifiés : rien n'est inventé.

## Vie privée

L'intro affiche au visiteur son IP publique, sa ville approximative et son opérateur, demandés à ipapi.co
(repli : ipify). Ces données ne servent qu'à l'affichage : le site ne les envoie ni ne les enregistre nulle part.
Le son ne démarre qu'après un clic du visiteur et se coupe avec le bouton ♪.

## Développer

```sh
npm ci
npx playwright install chromium
npm test            # construit dist/ puis lance 16 tests (iPhone et ordinateur)
```

- `index.html`, `style.css`, `script.js` : le site, sans framework. Le texte (FR/EN) est dans `script.js`.
- `assets/chars/` : les quatre avatars (illustrations générées, détourées). `assets/voice/` : les répliques.
- `scripts/voix.py` : régénère les répliques (Inworld TTS ; la clé reste hors du dépôt).
- `scripts/build.js` : empreinte des fichiers, vérification des ressources, budget de poids.

## Déploiement

À chaque push sur `main`, GitHub Actions construit, teste et ne publie sur GitHub Pages que si tout passe.
Les pull requests sont testées sans être publiées.
