// Construit dist/ : copie le site, ajoute une empreinte aux fichiers CSS et JS (le cache des navigateurs
// se renouvelle à chaque déploiement), vérifie que chaque ressource citée existe et que le poids reste raisonnable.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const BUDGET = 3 * 1024 * 1024; // 3 Mo pour tout le site

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const hash = (f) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, f))).digest("hex").slice(0, 10);

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const f of ["style.css", "script.js"]) {
  if (!html.includes(`"${f}"`)) throw new Error(`index.html ne référence plus ${f}`);
  html = html.replace(`"${f}"`, `"${f}?v=${hash(f)}"`);
  fs.copyFileSync(path.join(root, f), path.join(dist, f));
}
fs.writeFileSync(path.join(dist, "index.html"), html);
fs.cpSync(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });
fs.writeFileSync(path.join(dist, ".nojekyll"), "");

// Toutes les ressources citées dans le HTML et le JS doivent exister.
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const refs = new Set([...(html + js).matchAll(/assets\/[\w./-]+\.(?:webp|png|jpg|mp3)/g)].map((m) => m[0]));
const voices = [...js.matchAll(/speak\("(\w+?)"(?: \+ \w+)?\)/g)].map((m) => m[1]);
refs.add("assets/voice/silence.mp3");
for (const lang of ["fr", "en"]) {
  for (const k of ["intro_0", "intro_1", "intro_2", "intro_3", "back_0", "twist_0", "twist_1", "twist_2", "twist_3", "twist_4"]) refs.add(`assets/voice/${lang}/${k}.mp3`);
}
const missing = [...refs].filter((r) => !fs.existsSync(path.join(dist, r)));
if (missing.length) throw new Error("Ressources manquantes :\n  " + missing.join("\n  "));

const size = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((s, e) => s + (e.isDirectory() ? size(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
const total = size(dist);
if (total > BUDGET) throw new Error(`Budget dépassé : ${(total / 1048576).toFixed(2)} Mo > 3 Mo`);
console.log(`dist/ : ${refs.size} ressources vérifiées, ${(total / 1024).toFixed(0)} Ko (budget 3 Mo)`);
