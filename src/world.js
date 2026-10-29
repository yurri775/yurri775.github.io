/* ============ le monde : une rue de grande ville, la nuit, en 3D (Three.js), à la troisième personne ============ */
// Source du monde ; `npm run bundle` en fait world3d.js (Three.js, GSAP et Howler inclus).
// Entre Gotham et New York : immeubles en brique photo-scannés (kit modulaire Poly Haven, CC0), escaliers de secours,
// lampadaires, chaussée mouillée qui reflète les lumières, pluie, lune rouge au bout de la rue.
// Un personnage animé (repos, marche, course) y marche ; les 5 lieux bordent la rue, chacun garde un fragment rouge.
import * as T3 from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { gsap } from "gsap";
import { Howl, Howler } from "howler";

const WT = {
  fr: {
    quest: "objectif : récupérer les 5 fragments", enterBtn: "▲ entrer", enter: "entrer",
    helpW: "ZQSD ou flèches pour courir · Maj pour marcher · glisser pour regarder · ↵ pour entrer", helpT: "joystick pour marcher · glisse pour regarder · touche une porte",
    hello: "Bienvenue dans mon monde.", done: "Les 5 fragments. Merci d'être venu jusqu'ici.", got: "fragment récupéré",
    names: ["DOSSIERS", "UNIVERSITÉ", "SALLE SERVEURS", "ARCADE", "ANTENNE"],
  },
  en: {
    quest: "objective: collect the 5 fragments", enterBtn: "▲ enter", enter: "enter",
    helpW: "WASD or arrows to run · Shift to walk · drag to look · ↵ to enter", helpT: "joystick to walk · swipe to look · tap a door",
    hello: "Welcome to my world.", done: "All 5 fragments. Thanks for coming this far.", got: "fragment collected",
    names: ["FILES", "UNIVERSITY", "SERVER ROOM", "ARCADE", "ANTENNA"],
  },
};
const wt = (k) => WT[L][k];
// les animations suivent l'horloge réelle, même si les images sont lentes (sinon GSAP « étire » le temps)
gsap.ticker.lagSmoothing(0);
const NIGHT = 0x06070a, HAZE = 0x16111a, RED = 0xc0161e;
const hdr = (hex, k) => new T3.Color(hex).multiplyScalar(k); // couleurs « au-delà de 1 » : seules elles passent le seuil du halo
const GLOW = hdr(RED, 4), WARM = new T3.Color(1.0, 0.68, 0.38), NEON = new T3.Color(2.6, 2.4, 2.2);
const INK_SRC = { who: "assets/ink/who.webp", parcours: "assets/ink/parcours.webp", travail: "assets/ink/travail.webp", passions: "assets/ink/passions.webp" };

// échelle : le personnage mesure 1,80 m pour HERO_H unités ; tout le kit (en mètres) est multiplié par M
const HERO_H = 4, M = HERO_H / 1.8;
const AV = 10, SIDE = AV + 6; // demi-largeur de la chaussée ; alignement des façades (trottoir de 6 unités)
const CW = 3 * M; // largeur d'une travée de façade (3 m)
const START = { x: 0, z: 4 }, RUN = 11, WALK = 4.5, END = -150, ZTOP = 14;
// les lieux sont calés sur les travées : la porte occupe la travée du milieu d'un immeuble de 3 travées
const colZ = (k) => ZTOP - (k + 0.5) * CW;
const PLACES = [
  { page: "s1", outfit: "who", k: 4, side: -1, floors: 6, kind: "files" },
  { page: "s2", outfit: "parcours", k: 8, side: 1, floors: 5, kind: "uni" },
  { page: "s3", outfit: "travail", k: 12, side: -1, floors: 8, kind: "servers" },
  { page: "s4", outfit: "passions", k: 16, side: 1, floors: 4, kind: "arcade" },
  { page: "s5", outfit: "who", k: 20, side: -1, floors: 6, kind: "antenna" },
];
PLACES.forEach((p) => { p.z = colZ(p.k); p.w = 3 * CW; p.dx = p.side * (SIDE - 2.2); p.dz = p.z; }); // dx, dz : devant la porte
const touch = matchMedia("(hover: none)").matches;
const W = $("#world"), bubble = $("#bubble");

/* ---------- rendu : anti-crénelage, halo, vignettage, grain ---------- */
let renderer;
try {
  renderer = new T3.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
} catch (e) {
  // le contexte WebGL n'a pas pu être créé (accélération matérielle désactivée, GPU bloqué…) :
  // on bascule sur l'accueil 2D (photo + accès direct) plutôt qu'un écran noir
  W.classList.add("no3d");
  throw e;
}

// ---- repli 2D automatique quand le GPU ne peut pas rendre la scène (rendu noir, ou trop lent) ----
let fellBack = false, blackChecks = 0, renderedFrames = 0, slow2 = 0;
function fallTo2D() {            // on arrête la 3D et on montre l'accueil 2D clair (.no3d masque le canvas)
  if (fellBack) return; fellBack = true;
  W.classList.add("no3d");
  try { renderer.dispose(); } catch (e) {}
}
// une scène correcte a toujours des points lumineux (néons, lune rouge, route éclairée) ;
// si aucun pixel n'est notable, le rendu est noir (ex. post-traitement en demi-flottant non géré par ce GPU)
function frameIsBlack() {
  try {
    const gl = renderer.getContext(), w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
    if (!w || !h) return false;
    const px = new Uint8Array(4); let max = 0;
    for (let gy = 1; gy <= 5; gy++) for (let gx = 0; gx < 12; gx++) {
      gl.readPixels(Math.floor(w * (gx + 0.5) / 12), Math.floor(h * gy / 6), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      max = Math.max(max, px[0], px[1], px[2]);
    }
    return max < 10;
  } catch (e) { return false; }
}
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, touch ? 1.5 : 1.75));
renderer.setClearColor(NIGHT);
renderer.toneMapping = T3.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = T3.PCFSoftShadowMap;
W.prepend(renderer.domElement); renderer.domElement.className = "gl3d";
// si le navigateur perd la 3D (mémoire du téléphone), on garde une image de la rue derrière les boutons d'accès direct
renderer.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); W.classList.add("no3d"); });
const scene = new T3.Scene();
scene.background = new T3.Color(NIGHT);
scene.fog = new T3.FogExp2(HAZE, 0.011);
const camera = new T3.PerspectiveCamera(48, 1, 0.1, 900);
const composer = new EffectComposer(renderer, new T3.WebGLRenderTarget(4, 4, { type: T3.HalfFloatType, samples: touch ? 2 : 4 }));
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new T3.Vector2(256, 256), 0.7, 0.55, 0.95);
composer.addPass(bloom);
composer.addPass(new OutputPass());
// dernière passe : léger décalage des couleurs sur les bords, vignettage, grain de pellicule
const finish = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, time: { value: 0 } },
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 d = vUv - 0.5; float r2 = dot(d, d); vec2 o = d * r2 * 0.012;
      vec3 c = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
      c *= 1.0 - r2 * 1.2;
      c += (h(vUv * 1000.0 + fract(time) * 7.0) - 0.5) * 0.035;
      gl_FragColor = vec4(c, 1.0);
    }`,
});
composer.addPass(finish);
let hq = true; // qualité haute (ombres, définition) ; réduite si la machine peine (voir la boucle)
// post-traitement (bloom + cible de rendu HalfFloat multi-échantillonnée) DÉSACTIVÉ par défaut :
// sur beaucoup de GPU (desktop compris) il rend la scène noire ou partielle alors que le reste marche.
// Sans lui la ville reste belle (lampadaires, lune rouge, matériaux émissifs) et s'affiche partout.
let useBloom = false;

/* ---------- ciel et lune rouge ; l'éclairage d'ambiance vient d'une vraie photo de rue la nuit (HDRI Poly Haven) ---------- */
const sky = new T3.Mesh(new T3.SphereGeometry(700, 32, 16), new T3.ShaderMaterial({
  side: T3.BackSide, depthWrite: false, fog: false,
  uniforms: { top: { value: new T3.Color(0x030407) }, mid: { value: new T3.Color(HAZE) }, glow: { value: new T3.Color(0x3a070b) } },
  vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: `uniform vec3 top, mid, glow; varying vec3 vP;
    void main(){
      vec3 c = mix(mid, top, pow(max(vP.y, 0.0), 0.5));
      c += glow * pow(max(dot(vP, normalize(vec3(0.0, 0.1, -1.0))), 0.0), 8.0) * 1.8;
      gl_FragColor = vec4(c, 1.0);
    }`,
}));
scene.add(sky);
const moon = new T3.Mesh(new T3.CircleGeometry(34, 64), new T3.MeshBasicMaterial({ color: GLOW, fog: false, toneMapped: false }));
moon.position.set(0, 70, -560); scene.add(moon);
const pmrem = new T3.PMREMGenerator(renderer);
new RGBELoader().load("assets/city/tex/night.hdr", (t) => { t.mapping = T3.EquirectangularReflectionMapping; scene.environment = pmrem.fromEquirectangular(t).texture; t.dispose(); });

/* ---------- lumières : lune froide qui porte les ombres, contre-jour rouge, lampadaires (les plus proches s'allument) ---------- */
scene.add(new T3.HemisphereLight(0x3a4458, 0x0a0b0e, 0.6));
const moonL = new T3.DirectionalLight(0x9fb2d8, 0.9);
moonL.castShadow = true; moonL.shadow.mapSize.set(touch ? 1024 : 2048, touch ? 1024 : 2048);
Object.assign(moonL.shadow.camera, { left: -40, right: 40, top: 40, bottom: -40, near: 1, far: 220 });
moonL.shadow.bias = -0.0004; moonL.shadow.normalBias = 0.05;
scene.add(moonL, moonL.target);
const backL = new T3.DirectionalLight(0xff3030, 0.6); backL.position.set(0, 30, -200); scene.add(backL);
// un nombre fixe de vraies lumières, déplacées vers les lampadaires les plus proches du personnage (pas de recompilation)
const LAMP_LIGHTS = touch ? 4 : 6, lampLights = [];
for (let i = 0; i < LAMP_LIGHTS; i++) { const l = new T3.PointLight(0xffd6a8, 70, 30, 1.8); scene.add(l); lampLights.push(l); }

/* ---------- outils ---------- */
const ANISO = renderer.capabilities.getMaxAnisotropy();
const texL = new T3.TextureLoader();
function tex(src, rep, color) { const t = texL.load(src); t.wrapS = t.wrapT = T3.RepeatWrapping; t.repeat.set(rep[0], rep[1]); t.anisotropy = ANISO; if (color) t.colorSpace = T3.SRGBColorSpace; return t; }
function canvasTex(size, draw) { const c = document.createElement("canvas"); c.width = c.height = size; draw(c.getContext("2d"), size); const t = new T3.CanvasTexture(c); t.colorSpace = T3.SRGBColorSpace; return t; }
// dégradés : halo radial ; trait vertical qui s'efface (reflet étiré d'une lumière sur le mouillé)
const radial = canvasTex(128, (g, s) => { const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,.35)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, s, s); });
const streak = canvasTex(64, (g, s) => { const gr = g.createLinearGradient(0, 0, 0, s); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(0.5, "rgba(255,255,255,.9)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, s, s); g.globalCompositeOperation = "destination-in"; const gx = g.createLinearGradient(0, 0, s, 0); gx.addColorStop(0, "rgba(0,0,0,0)"); gx.addColorStop(0.5, "rgba(0,0,0,1)"); gx.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gx; g.fillRect(0, 0, s, s); });
const additive = (map, color, opacity) => new T3.MeshBasicMaterial({ map, color, transparent: true, opacity, blending: T3.AdditiveBlending, depthWrite: false, toneMapped: false });
function onGround(mat, w, l, x, z) { const m = new T3.Mesh(new T3.PlaneGeometry(w, l), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.05, z); m.renderOrder = 2; scene.add(m); return m; }
function textTex(txt, opt = {}) {
  const c = document.createElement("canvas"), g = c.getContext("2d"), fs = opt.size || 64, pad = fs * 0.6;
  g.font = `600 ${fs}px "IBM Plex Mono", ui-monospace, monospace`;
  const w = Math.ceil(g.measureText(txt).width) + pad * 2, h = Math.ceil(fs * 2.3);
  c.width = w; c.height = h; g.font = `600 ${fs}px "IBM Plex Mono", ui-monospace, monospace`; g.textBaseline = "middle";
  g.shadowColor = opt.glow || "#ff3030"; g.shadowBlur = fs * 0.35;
  g.fillStyle = opt.fg || "#ffffff"; g.fillText(txt, pad, h / 2 + 2);
  const t = new T3.CanvasTexture(c); t.colorSpace = T3.SRGBColorSpace; t.anisotropy = 4; return { t, ratio: w / h };
}
function label(txt, height, opt = {}) {
  const { t, ratio } = textTex(txt, opt);
  return new T3.Mesh(new T3.PlaneGeometry(height * ratio, height), new T3.MeshBasicMaterial({ map: t, color: opt.color || NEON, transparent: true, depthWrite: false, side: T3.DoubleSide, toneMapped: false }));
}
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let a = Math.imul(seed ^ (seed >>> 15), 1 | seed); a = (a + Math.imul(a ^ (a >>> 7), 61 | a)) ^ a; return ((a ^ (a >>> 14)) >>> 0) / 4294967296; }; }
const r = rng(7);
const pick = (a) => a[Math.floor(r() * a.length)];

/* ---------- sol : bitume mouillé et dalles de trottoir (textures photo Poly Haven, CC0) ---------- */
const LEN = ZTOP - END + 40, ZMID = (ZTOP + END) / 2;
const road = new T3.Mesh(new T3.PlaneGeometry(AV * 2, LEN), new T3.MeshStandardMaterial({
  map: tex("assets/city/tex/asphalt_diff.webp", [3, LEN / 7], true), normalMap: tex("assets/city/tex/asphalt_nor_gl.webp", [3, LEN / 7]),
  roughnessMap: tex("assets/city/tex/asphalt_rough.webp", [3, LEN / 7]), roughness: 0.42, metalness: 0.1, color: 0x8a8a90, normalScale: new T3.Vector2(0.6, 0.6),
}));
road.rotation.x = -Math.PI / 2; road.position.set(0, 0, ZMID); road.receiveShadow = true; scene.add(road);
// ligne médiane en pointillés, un peu usée
const dash = new T3.MeshStandardMaterial({ color: 0xb9b3a2, roughness: 0.5 });
for (let z = ZTOP; z > END; z -= 9) { const d = new T3.Mesh(new T3.PlaneGeometry(0.35, 4), dash); d.rotation.x = -Math.PI / 2; d.position.set(0, 0.02, z); d.receiveShadow = true; scene.add(d); }
const paveMat = new T3.MeshStandardMaterial({ map: tex("assets/city/tex/pave_diff.webp", [2, LEN / 6], true), normalMap: tex("assets/city/tex/pave_nor_gl.webp", [2, LEN / 6]), roughnessMap: tex("assets/city/tex/pave_rough.webp", [2, LEN / 6]), roughness: 0.6, color: 0x77777c });
const curbMat = new T3.MeshStandardMaterial({ color: 0x3a3b40, roughness: 0.7 });
for (const sd of [-1, 1]) {
  const walk = new T3.Mesh(new T3.BoxGeometry(SIDE - AV + 2, 0.35, LEN), paveMat); walk.position.set(sd * (AV + (SIDE - AV + 2) / 2), 0.175, ZMID); walk.receiveShadow = true; scene.add(walk);
  const curb = new T3.Mesh(new T3.BoxGeometry(0.4, 0.4, LEN), curbMat); curb.position.set(sd * (AV + 0.2), 0.2, ZMID); curb.receiveShadow = true; scene.add(curb);
}
const far = new T3.Mesh(new T3.PlaneGeometry(1200, 1200), new T3.MeshStandardMaterial({ color: 0x0b0c0f, roughness: 0.35 }));
far.rotation.x = -Math.PI / 2; far.position.set(0, -0.03, -300); scene.add(far);

/* ---------- au loin : la ligne des tours, en silhouettes, avec leurs feux rouges d'aviation ---------- */
const skyline = [];
for (let i = 0; i < 60; i++) {
  const h = 60 + r() * 180, w = 14 + r() * 26, x = (r() - 0.5) * 600, zz = -300 - r() * 240;
  if (Math.abs(x) < 70) continue; // la rue reste ouverte sur la lune
  const t = new T3.Mesh(new T3.BoxGeometry(w, h, w), new T3.MeshBasicMaterial({ color: new T3.Color(0x09090d).lerp(new T3.Color(HAZE), Math.min(1, (-zz - 300) / 300)), fog: false }));
  t.position.set(x, h / 2 - 2, zz); scene.add(t);
  if (r() < 0.5) { const l = new T3.Mesh(new T3.SphereGeometry(1, 8, 8), new T3.MeshBasicMaterial({ color: GLOW, fog: false, toneMapped: false })); l.position.set(x, h + 1, zz); l.userData.ph = r() * 6; scene.add(l); skyline.push(l); }
}

/* ---------- les immeubles : kit modulaire, une InstancedMesh par pièce (quelques dizaines d'appels de dessin pour toute la rue) ---------- */
// repère de façade, en mètres : u le long de la façade (une travée = 3 m), v vers le haut, w vers la rue
function frame(sd) { return new T3.Matrix4().makeTranslation(sd * SIDE, 0, 0).multiply(new T3.Matrix4().makeRotationY(sd < 0 ? Math.PI / 2 : -Math.PI / 2)).multiply(new T3.Matrix4().makeScale(M, M, M)); }
// u (m) du bord droit de la travée k : à gauche, u croît vers -z ; à droite, vers +z
const colU = (sd, k) => (sd < 0 ? -(colZ(k) - CW / 2) / M : (colZ(k) + CW / 2) / M);
const placeAt = (sd, k, v, w = 0) => frame(sd).multiply(new T3.Matrix4().makeTranslation(colU(sd, k), v, w));
const kit = {}, batches = new Map(), chunks = [];
let BASEH = 0; // hauteur du soubassement du kit (m), mesurée au chargement
let VIEW = 170; // distance de vue (au-delà, le brouillard cache tout)
function put(name, m, tint, lit) {
  const parts = kit[name]; if (!parts) return;
  for (const p of parts) {
    // regroupées par tronçon de rue de 40 unités : on ne dessine que les tronçons proches
    const mm = m.clone().multiply(p.rel), ch = Math.round(mm.elements[14] / 40), key = p.key + "|" + ch;
    let b = batches.get(key); if (!b) batches.set(key, (b = { p, z: ch * 40, mats: [], cols: [] }));
    b.mats.push(mm); b.cols.push(p.mat === glass ? lit || DARK : tint || WHITE);
  }
}
const WHITE = new T3.Color(1, 1, 1), DARK = new T3.Color(0.035, 0.04, 0.05);
// vitre d'une fenêtre : pièce allumée (lumière chaude), éteinte, ou rouge
function lit(state) { return state === "red" ? GLOW.clone().multiplyScalar(0.3) : state ? WARM.clone().multiplyScalar(0.55 + r() * 1.1) : DARK.clone().multiplyScalar(0.6 + r() * 0.8); }
const STYLES = ["centered_small", "centered_large", "centered_double"];
// teintes : la brique du kit, assombrie et refroidie (suie, pierre grise, brique foncée)
const tints = [new T3.Color(0.62, 0.6, 0.62), new T3.Color(0.5, 0.5, 0.56), new T3.Color(0.42, 0.42, 0.48), new T3.Color(0.7, 0.62, 0.6), new T3.Color(0.34, 0.34, 0.4)];
const escapes = [], cans = [], hydrants = [];
function building(sd, k0, cols, floors, opts = {}) {
  // B : hauteur du soubassement ; tout l'immeuble est posé dessus, comme les brownstones (on monte au rez-de-chaussée par un perron)
  const tint = opts.tint || pick(tints), style = opts.style || pick(STYLES), B = BASEH, H = floors * 3 + B;
  for (let c = 0; c < cols; c++) {
    const k = k0 + c;
    if (opts.door !== k) put("base_standard_01", placeAt(sd, k, 0), tint);
    // rez-de-chaussée : le lieu a un mur plein (son entrée est construite à part, voir buildEntrance) ; ailleurs une porte d'immeuble ou une fenêtre
    if (opts.door === k) put("wall_standard_standard_01", placeAt(sd, k, B), tint);
    else {
      const g = r();
      if (g < 0.3) { put("wall_door_centered_small_01", placeAt(sd, k, B), tint); put("door_centered_small_01", placeAt(sd, k, B)); }
      else { put("wall_window_centered_large_01", placeAt(sd, k, B), tint); put("window_centered_large_01", placeAt(sd, k, B), null, lit(r() < 0.12 ? "red" : r() < 0.7)); }
    }
    for (let f = 1; f < floors; f++) {
      const top = f === floors - 1, n = top ? "03" : f % 2 ? "01" : "02";
      put(`wall_window_${style}_${n}`, placeAt(sd, k, B + f * 3), tint); put(`window_${style}_${n}`, placeAt(sd, k, B + f * 3), null, lit(opts.windows ? opts.windows(f, c) : r() < 0.04 ? "red" : r() < 0.42));
      put("dado_standard_standard_01", placeAt(sd, k, B + f * 3 - 0.25), tint);
    }
    put("cornice_standard_standard_01", placeAt(sd, k, H), tint); put("crown_standard_standard_01", placeAt(sd, k, H + 0.2), tint);
  }
  // pilastres aux deux bords, couronnés
  for (const k of [k0, k0 + cols]) {
    const m0 = k === k0 + cols ? placeAt(sd, k - 1, B).multiply(new T3.Matrix4().makeTranslation(-3, 0, 0)) : placeAt(sd, k, B);
    for (let f = 0; f < floors; f++) put("wall_pier_standard_01", m0.clone().multiply(new T3.Matrix4().makeTranslation(0, f * 3, 0)), tint);
    put("crown_pier_pedestal_01", m0.clone().multiply(new T3.Matrix4().makeTranslation(0, floors * 3 + 0.2, 0)), tint);
  }
  // masse de l'immeuble derrière la façade (on la voit de biais et entre deux hauteurs différentes)
  mass.push({ sd, k0, cols, H, tint });
  if (!opts.door && floors >= 5 && r() < 0.45) escapes.push(placeAt(sd, k0 + Math.floor(r() * cols), B + 3 + 3.65, 0.85));
  if (r() < 0.5) cans.push({ sd, z: colZ(k0) + (r() - 0.5) * CW });
}
const mass = [];
function layout() {
  for (const sd of [-1, 1]) {
    const mine = PLACES.filter((p) => p.side === sd);
    for (let k = -2; colZ(k) > END - 20;) {
      const p = mine.find((q) => q.k - 1 === k);
      if (p) { building(sd, k, 3, p.floors, place3(p)); k += 3; continue; }
      const next = mine.find((q) => q.k - 1 > k), room0 = next ? next.k - 1 - k : 99;
      const cols = Math.min(room0, 2 + Math.floor(r() * 3));
      building(sd, k, cols, 4 + Math.floor(r() * 4)); k += cols;
      if (r() < 0.25) hydrants.push({ sd, z: colZ(k) + CW / 2 });
    }
  }
}
// chaque lieu a son style de façade : la salle serveurs a des fenêtres rouges, l'université de grandes baies…
function place3(p) {
  const o = { door: p.k, tint: [tints[1], tints[0], tints[4], tints[3], tints[2]][PLACES.indexOf(p)] };
  if (p.kind === "servers") Object.assign(o, { style: "centered_double", windows: (f, c) => ((f + c) % 3 === 0 ? "red" : false) });
  if (p.kind === "uni") o.style = "centered_large";
  if (p.kind === "files") o.style = "centered_small";
  return o;
}

/* ---------- lampadaires, cônes de lumière, reflets étirés dans le mouillé ---------- */
const LAMPS = [];
for (const sd of [-1, 1]) for (let z = 8 + (sd > 0 ? 8 : 0); z > END; z -= 16) LAMPS.push(new T3.Vector3(sd * (AV + 1.2), 0, z));
const coneMat = new T3.ShaderMaterial({
  transparent: true, depthWrite: false, blending: T3.AdditiveBlending, side: T3.DoubleSide,
  uniforms: { c: { value: new T3.Color(1.0, 0.75, 0.45) } },
  vertexShader: "varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: "uniform vec3 c; varying float vY; void main(){ gl_FragColor = vec4(c * 0.03 * pow(vY, 1.8), 1.0); }",
});
const streakMat = additive(streak, new T3.Color(1.0, 0.7, 0.4), 0.45);
LAMPS.forEach((p) => {
  const cone = new T3.Mesh(new T3.CylinderGeometry(0.4, 4.2, 3.4 * M, 24, 1, true), coneMat); cone.position.set(p.x, 1.7 * M, p.z); scene.add(cone);
  onGround(streakMat, 1.1, 10, p.x - Math.sign(p.x) * 2.5, p.z + 5);
});

/* ---------- chargement des modèles (Poly Haven) ---------- */
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const loading = [];
const load = (src) => { const p = new Promise((ok) => loader.load(src, ok, undefined, () => ok(null))); loading.push(p); return p; };
// les vitres ne sont pas éclairées par la scène : chacune porte sa couleur (pièce allumée, éteinte, ou rouge)
const glass = new T3.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
const massMat = new T3.MeshStandardMaterial({ color: 0x1a1513, roughness: 0.95 });
function ready(o) { o.traverse((m) => { if (m.isMesh) { m.castShadow = m.receiveShadow = true; } }); return o; }
load("assets/city/modular_urban_apartments_facade.glb").then((g) => {
  if (!g) return;
  // chaque pièce du kit : ses maillages, ramenés à l'origine (le fichier les range côte à côte)
  g.scene.updateMatrixWorld(true);
  g.scene.children.forEach((node) => {
    node.position.set(0, 0, 0); node.updateMatrixWorld(true);
    const parts = []; const bb = new T3.Box3();
    node.traverse((o) => {
      if (!o.isMesh) return;
      let mat = o.material;
      if (/glass/.test(mat.name)) mat = glass;
      else if (/plaster|trim/.test(mat.name)) { mat = mat.clone(); mat.vertexColors = false; }
      parts.push({ key: o.uuid, geo: o.geometry, mat, rel: o.matrixWorld.clone() });
      o.geometry.computeBoundingBox(); bb.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld));
    });
    kit[node.name] = parts; parts.bb = bb;
  });
  if (kit.base_standard_01) BASEH = kit.base_standard_01.bb.max.y;
  layout();
  places.forEach((g) => buildEntrance(g));
  for (const b of batches.values()) {
    const im = new T3.InstancedMesh(b.p.geo, b.p.mat, b.mats.length);
    b.mats.forEach((m, i) => { im.setMatrixAt(i, m); im.setColorAt(i, b.cols[i]); });
    im.castShadow = b.p.mat !== glass; im.receiveShadow = true; im.computeBoundingSphere(); im.userData.z = b.z; chunks.push(im); scene.add(im);
  }
  const massGeo = new T3.BoxGeometry(1, 1, 1), mi = new T3.InstancedMesh(massGeo, massMat, mass.length);
  mass.forEach((b, i) => { const zc = colZ(b.k0) + CW / 2 - (b.cols * CW) / 2; mi.setMatrixAt(i, new T3.Matrix4().compose(new T3.Vector3(b.sd * (SIDE + 9), (b.H * M) / 2, zc), new T3.Quaternion(), new T3.Vector3(17.6, b.H * M - 0.1, b.cols * CW))); mi.setColorAt(i, b.tint); });
  mi.receiveShadow = true; scene.add(mi);
  waterTowers();
  // les accessoires de rue arrivent ensuite
  props();
});
function scatter(src, list, fn) { load(src).then((g) => { if (!g) return; ready(g.scene); list.forEach((x, i) => { const o = i ? g.scene.clone() : g.scene; fn(o, x); scene.add(o); }); }); }
function props() {
  scatter("assets/city/modular_fire_escape.glb", escapes, (o, m) => { o.applyMatrix4(m); });
  scatter("assets/city/metal_trash_can.glb", cans, (o, c) => { o.scale.setScalar(M); o.position.set(c.sd * (SIDE - 1), 0.35, c.z); o.rotation.y = r() * 6; });
  scatter("assets/city/fire_hydrant.glb", hydrants, (o, c) => { o.scale.setScalar(M); o.position.set(c.sd * (AV + 1.4), 0.35, c.z); o.rotation.y = c.sd < 0 ? Math.PI / 2 : -Math.PI / 2; });
  scatter("assets/city/street_lamp_01.glb", LAMPS, (o, p) => {
    o.scale.setScalar(M); o.position.set(p.x, 0.35, p.z);
    o.traverse((m) => { if (m.isMesh && /glass/.test(m.material.name)) { m.material = new T3.MeshBasicMaterial({ color: WARM.clone().multiplyScalar(3), toneMapped: false }); m.castShadow = false; } });
  });
  // deux braseros, avec leur feu qui vacille
  scatter("assets/city/barrel_stove.glb", STOVES, (o, s) => {
    o.scale.setScalar(M); o.position.set(s.x, 0.35, s.z);
    const fire = new T3.Mesh(new T3.PlaneGeometry(1.6, 2.4), additive(radial, new T3.Color(1, 0.45, 0.12), 0.9)); fire.position.set(s.x, 0.35 + 0.86 * M + 0.9, s.z); scene.add(fire); s.fire = fire;
    const l = new T3.PointLight(0xff7a2a, 60, 22, 1.8); l.position.set(s.x, 3, s.z); scene.add(l); s.light = l;
  });
}
// New York : les réservoirs d'eau en bois sur les toits (cuve cerclée, toit conique, pieds en acier)
function waterTowers() {
  const spots = mass.filter(() => r() < 0.45);
  if (!spots.length) return;
  const cv = document.createElement("canvas"); cv.width = 128; cv.height = 64; const c = cv.getContext("2d");
  c.fillStyle = "#3b2b20"; c.fillRect(0, 0, 128, 64);
  for (let x = 0; x < 128; x += 8) { c.fillStyle = `rgba(0,0,0,${0.15 + Math.random() * 0.25})`; c.fillRect(x, 0, 1.5, 64); c.fillStyle = `rgba(120,90,60,${Math.random() * 0.25})`; c.fillRect(x + 2, 0, 4, 64); }
  c.fillStyle = "#15110e"; [10, 30, 50].forEach((y) => c.fillRect(0, y, 128, 2)); // cerclages
  const wood = new T3.MeshStandardMaterial({ map: new T3.CanvasTexture(cv), roughness: 0.9 }), steel = new T3.MeshStandardMaterial({ color: 0x1c1d20, roughness: 0.6, metalness: 0.6 });
  wood.map.colorSpace = T3.SRGBColorSpace; wood.map.wrapS = T3.RepeatWrapping; wood.map.repeat.x = 3;
  const R = 1.7 * M, Ht = 3.6 * M, legH = 2.6 * M;
  const tank = new T3.InstancedMesh(new T3.CylinderGeometry(R, R, Ht, 20), wood, spots.length);
  const roof = new T3.InstancedMesh(new T3.ConeGeometry(R * 1.08, 1.3 * M, 20), wood, spots.length);
  const legs = new T3.InstancedMesh(new T3.BoxGeometry(0.22 * M, legH, 0.22 * M), steel, spots.length * 4);
  const m4 = new T3.Matrix4();
  spots.forEach((b, i) => {
    const x = b.sd * (SIDE + 5 + r() * 4), z = colZ(b.k0) + CW / 2 - (b.cols * CW) * (0.25 + r() * 0.5), y = b.H * M;
    tank.setMatrixAt(i, m4.makeTranslation(x, y + legH + Ht / 2, z)); roof.setMatrixAt(i, m4.makeTranslation(x, y + legH + Ht + 0.65 * M, z));
    [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, d], j) => legs.setMatrixAt(i * 4 + j, m4.makeTranslation(x + a * R * 0.7, y + legH / 2, z + d * R * 0.7)));
  });
  [tank, roof, legs].forEach((o) => { o.castShadow = true; o.receiveShadow = true; o.computeBoundingSphere(); scene.add(o); });
}
// New York : la vapeur qui sort des plaques d'égout, au milieu de la chaussée
const steam = [];
[-30, -86, -122].forEach((z, v) => {
  const cap = new T3.Mesh(new T3.CircleGeometry(0.9, 20), new T3.MeshStandardMaterial({ color: 0x18181a, roughness: 0.5, metalness: 0.6 }));
  cap.rotation.x = -Math.PI / 2; cap.position.set(v % 2 ? 3.5 : -3.5, 0.04, z); scene.add(cap);
  for (let i = 0; i < 7; i++) {
    const puff = new T3.Mesh(new T3.PlaneGeometry(1, 1), additive(radial, new T3.Color(0.55, 0.5, 0.52), 0.35));
    puff.position.copy(cap.position); puff.userData = { x0: cap.position.x, z0: cap.position.z, t: i / 7 }; scene.add(puff); steam.push(puff);
  }
});
// plaques de rue vertes, comme aux carrefours de Manhattan
[["W 4 ST", -1, -18], ["BROADWAY", 1, -70], ["BLEECKER ST", -1, -112]].forEach(([txt, sd, z]) => {
  const pole = new T3.Mesh(new T3.CylinderGeometry(0.07, 0.07, 6.2, 8), new T3.MeshStandardMaterial({ color: 0x1a2a1f, roughness: 0.5, metalness: 0.5 }));
  pole.position.set(sd * (AV + 0.8), 3.1 + 0.35, z); scene.add(pole);
  const s = label(txt, 0.62, { fg: "#f4f4ee", glow: "rgba(0,0,0,0)", color: new T3.Color(0.9, 0.9, 0.9) }); s.material.toneMapped = true;
  const plate = new T3.Mesh(new T3.BoxGeometry(s.geometry.parameters.width * 0.92, 0.56, 0.06), new T3.MeshStandardMaterial({ color: 0x1e6a3c, roughness: 0.45, metalness: 0.2 }));
  plate.position.set(sd * (AV + 0.8), 6.3, z); plate.rotation.y = Math.PI / 2; s.position.set(0, 0, 0.035); plate.add(s);
  const back = s.clone(); back.position.z = -0.035; back.rotation.y = Math.PI; plate.add(back); scene.add(plate);
});
const STOVES = [{ x: -(SIDE - 2.5), z: -52 }, { x: SIDE - 3, z: -128 }];

/* ---------- entrée d'un lieu : perron de brownstone, porte double en bois, encadrement de pierre, imposte rouge ---------- */
const stone = new T3.MeshStandardMaterial({ color: 0x4a3328, roughness: 0.85 }), iron = new T3.MeshStandardMaterial({ color: 0x0e0f11, roughness: 0.45, metalness: 0.7 });
const woodDoor = new T3.MeshStandardMaterial({ color: 0x2b1a12, roughness: 0.55 }), brass = new T3.MeshStandardMaterial({ color: 0xb08a4a, roughness: 0.3, metalness: 0.9 });
function buildEntrance(g) {
  const u = M, top = BASEH * u, box = (w, h, d, mat, x, y, z) => { const m = new T3.Mesh(new T3.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m; };
  // perron : 6 marches de la porte au trottoir (0,35 = hauteur du trottoir)
  const n = 5, d = 0.3 * u, z0 = 0.15 * u, rise = (top - 0.35) / n, W = 2.3 * u;
  for (let i = 0; i < n; i++) { const h = top - i * rise; box(W, h, d, stone, 0, h / 2, z0 + (i + 0.5) * d); }
  // rampes en fer : main courante inclinée et barreaux
  const run = n * d, slope = Math.atan2(top - 0.35, run);
  for (const sx of [-1, 1]) {
    const x = sx * (W / 2 - 0.08 * u), L = Math.hypot(run, top - 0.35);
    const rail = box(0.07 * u, 0.07 * u, L, iron, x, (top + 0.35) / 2 + 0.95 * u, z0 + run / 2); rail.rotation.x = slope;
    for (let j = 0; j < n; j++) { const z = z0 + (j + 0.5) * d, y = top - j * rise; box(0.035 * u, 0.95 * u, 0.035 * u, iron, x, y + 0.47 * u, z); }
  }
  // encadrement : deux pilastres et un entablement, porte double avec panneaux et poignées
  const dw = 1.4 * u, dh = 2.25 * u, y0 = top;
  for (const sx of [-1, 1]) box(0.3 * u, dh + 0.42 * u, 0.3 * u, stone, sx * (dw / 2 + 0.15 * u), y0 + (dh + 0.42 * u) / 2, 0.15 * u);
  box(dw + 0.9 * u, 0.24 * u, 0.4 * u, stone, 0, y0 + dh + 0.54 * u, 0.2 * u);
  const transom = box(dw, 0.34 * u, 0.06 * u, neonMat, 0, y0 + dh + 0.2 * u, 0.04 * u); // imposte vitrée, éclairée en rouge de l'intérieur
  for (const sx of [-1, 1]) {
    const leaf = box(dw / 2 - 0.03 * u, dh, 0.1 * u, woodDoor, sx * (dw / 4), y0 + dh / 2, 0.05 * u);
    for (const py of [0.3, 0.72]) box(dw / 2 - 0.22 * u, dh * 0.3, 0.04 * u, woodDoor, sx * (dw / 4), y0 + dh * py, 0.12 * u);
    const knob = new T3.Mesh(new T3.SphereGeometry(0.05 * u, 10, 8), brass); knob.position.set(sx * 0.12 * u, y0 + dh * 0.48, 0.14 * u); g.add(knob);
  }
  g.userData.lintel.visible = false;
  g.userData.light.position.set(0, top + 1.2 * u, 1.6 * u);
  g.userData.sign.position.y = y0 + dh + 1.6 * u;
  g.userData.frag.position.y = top + 1.2 * u; g.userData.fragY = top + 1.2 * u;
}

/* ---------- les 5 lieux : enseigne au néon, porte encadrée de rouge, fragment à récupérer ---------- */
const places = [];
let visited = new Set(); try { visited = new Set(JSON.parse(store.get("visited") || "[]")); } catch (e) {}
const neonMat = new T3.MeshBasicMaterial({ color: GLOW, toneMapped: false });
function buildPlace(p, i) {
  // repère du lieu : au pied de la porte, tourné vers la rue (z+ local = vers la chaussée)
  const g = new T3.Group(); g.userData.i = i;
  g.position.set(p.side * SIDE, 0, p.z); g.rotation.y = p.side < 0 ? Math.PI / 2 : -Math.PI / 2;
  // la porte vient du kit d'immeubles (vitres éclairées en rouge) ; au-dessus, un trait de néon. Recalé sur la porte réelle au chargement du kit
  const dw = 2.2 * M, dh = 2.9 * M;
  const lintel = new T3.Mesh(new T3.BoxGeometry(dw * 0.9, 0.12, 0.12), neonMat); lintel.position.set(0, dh + 0.5, 0.3); g.add(lintel); g.userData.lintel = lintel;
  const light = new T3.PointLight(0xff2020, 30, 14, 1.6); light.position.set(0, 2.2, 2.5); g.add(light); g.userData.light = light;
  const sign = label(`0${i + 1} · ${wt("names")[i]}`, 1.25); sign.position.set(0, dh + 1.5, 0.5); g.add(sign); g.userData.sign = sign;
  const roofY = p.floors * 3 * M;
  if (p.kind === "servers" || p.kind === "antenna") { const n = p.kind === "antenna" ? 24 : 12; const ant = new T3.Mesh(new T3.CylinderGeometry(0.12, 0.2, n, 8), new T3.MeshStandardMaterial({ color: 0x24262c, metalness: 0.7, roughness: 0.4 })); ant.position.set(0, roofY + n / 2, -6); g.add(ant); const tip = new T3.Mesh(new T3.SphereGeometry(0.5, 12, 12), neonMat); tip.position.set(0, roofY + n + 0.3, -6); g.add(tip); g.userData.blink = tip; }
  if (p.kind === "files") { const s2 = label(L === "fr" ? "CONFIDENTIEL" : "CLASSIFIED", 1, { fg: "#ff6a6a", color: GLOW.clone().multiplyScalar(0.45) }); s2.position.set(-CW, 3.6 * M, 0.6); s2.rotation.z = 0.08; g.add(s2); }
  if (p.kind === "arcade") { const marq = label("◆ OPEN 24/7 ◆", 1.3, { fg: "#ff6a6a", color: GLOW.clone().multiplyScalar(0.6) }); marq.position.set(0, roofY - 2.5, 0.6); g.add(marq); g.userData.flicker = marq; }
  if (p.kind === "uni") { const s3 = label("EST. 2021 · M2 INFO", 0.9, { fg: "#ffffff", color: new T3.Color(1.4, 1.3, 1.2) }); s3.position.set(0, roofY - 1.6, 0.6); g.add(s3); }
  // zone cliquable (invisible) : toute la façade du lieu
  const hit = new T3.Mesh(new T3.BoxGeometry(p.w, roofY, 2), new T3.MeshBasicMaterial({ visible: false })); hit.position.set(0, roofY / 2, 0); g.add(hit);
  // le fragment : un cristal rouge qui tourne devant la porte, tant qu'on n'est pas entré
  const frag = new T3.Mesh(new T3.OctahedronGeometry(0.5, 0), neonMat); frag.position.set(0, 3, 3.6); g.add(frag); g.userData.frag = frag;
  if (visited.has(p.page)) frag.scale.setScalar(0);
  const doorMat = { emissiveIntensity: 0 }; g.userData.door = doorMat; // intensité animée : on la reporte sur le néon et la lumière
  scene.add(g); places.push(g);
  onGround(additive(radial, new T3.Color(1, 0.1, 0.1), 0.45), 8, 8, p.side * (SIDE - 3), p.z);
}
function relabelSigns() {
  places.forEach((g, i) => { const old = g.userData.sign; const s = label(`0${i + 1} · ${wt("names")[i]}`, 1.25); s.position.copy(old.position); g.remove(old); g.add(s); g.userData.sign = s; });
}
PLACES.forEach(buildPlace);

/* ---------- personnage : Mixamo en costume, liseré rouge en contre-jour ---------- */
function rim(mat, color) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.rimC = { value: color };
    sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform vec3 rimC;")
      .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += rimC * pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);");
  };
  return mat;
}
const hero = new T3.Group(); scene.add(hero);
const heroLight = new T3.PointLight(0xffd2a0, 10, 12, 1.5); heroLight.position.set(1.5, 6, 3); hero.add(heroLight); // le garde lisible
let mixer = null, act = {}, state = "";
load("assets/models/hero.glb").then((gltf) => {
  if (!gltf) return; // modèle introuvable : le monde reste utilisable sans personnage
  const m = gltf.scene;
  m.scale.setScalar(M); // le personnage mesure 1,80 m dans le fichier
  // personnage Mixamo en costume, textures d'origine ; un léger liseré rouge le détache de la rue la nuit
  m.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = true; o.frustumCulled = false;
    rim(o.material, new T3.Color(0.16, 0.03, 0.04));
    if (o.material.transparent) o.material.depthWrite = false; // cheveux
  });
  hero.add(m);
  mixer = new T3.AnimationMixer(m);
  gltf.animations.forEach((c) => (act[c.name] = mixer.clipAction(c)));
  if (act.agree) { act.agree.setLoop(T3.LoopOnce); act.agree.clampWhenFinished = false; }
  play("idle", 0);
  gsap.from(m.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.9, ease: "back.out(1.7)" });
});
function play(name, fade = 0.25) {
  if (state === name || !act[name]) return;
  const next = act[name].reset().play(), prev = act[state];
  if (prev) next.crossFadeFrom(prev, fade, true);
  state = name;
}
function nod() { if (!act.agree) return; act.agree.reset().setEffectiveWeight(1).fadeIn(0.15).play(); setTimeout(() => act.agree.fadeOut(0.3), 1300); }
const blob = new T3.Mesh(new T3.CircleGeometry(1, 32), new T3.MeshBasicMaterial({ map: radial, color: 0x000000, transparent: true, opacity: 0.7, depthWrite: false }));
blob.rotation.x = -Math.PI / 2; scene.add(blob);

// la tenue du lieu : portrait à l'encre qui apparaît dans un coin quand on est devant un bâtiment
const card = document.createElement("figure"); card.className = "outfit-card"; card.innerHTML = "<img alt=''>"; W.appendChild(card);
let outfit = "who";
function setOutfit(o, show) {
  if (o !== outfit) { outfit = o; card.firstChild.src = INK_SRC[o]; gsap.fromTo(card, { rotate: -6, scale: 0.9 }, { rotate: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }); }
  card.classList.toggle("show", show);
}
card.firstChild.src = INK_SRC.who;

/* ---------- pluie : des traits qui tombent autour du personnage ---------- */
const rainN = touch ? 700 : 1800, rainPos = new Float32Array(rainN * 6);
for (let i = 0; i < rainN; i++) { const x = (r() - 0.5) * 70, y = r() * 30, z = (r() - 0.5) * 70; rainPos.set([x, y, z, x + 0.05, y - 0.9, z], i * 6); }
const rainGeo = new T3.BufferGeometry(); rainGeo.setAttribute("position", new T3.BufferAttribute(rainPos, 3));
const rain = new T3.LineSegments(rainGeo, new T3.LineBasicMaterial({ color: 0x8d97ab, transparent: true, opacity: 0.3, depthWrite: false })); rain.frustumCulled = false; scene.add(rain);

/* ---------- son (Howler) : ambiance, salle serveurs spatialisée, pas, porte ---------- */
const sfx = {
  amb: new Howl({ src: ["assets/sfx/ambiance.mp3"], loop: true, volume: 0 }),
  hum: new Howl({ src: ["assets/sfx/serveurs.mp3"], loop: true, volume: 0 }),
  step: new Howl({ src: ["assets/sfx/pas.mp3"], volume: 0.3 }),
  door: new Howl({ src: ["assets/sfx/porte.mp3"], volume: 0.6 }),
};
let audioOn = false;
function syncAudio() {
  const want = started && soundOn && !still && current === "home";
  if (want === audioOn) return;
  audioOn = want; Howler.mute(!want);
  if (want) {
    if (!sfx.amb.playing()) { sfx.amb.play(); sfx.hum.play(); }
    sfx.amb.fade(sfx.amb.volume(), 0.45, 1500);
  }
}

/* ---------- état ---------- */
const pos = new T3.Vector3(START.x, 0, START.z);
let yaw = 0, pitch = 0.18, heading = Math.PI, near = -1, started = false, moved = false, last = 0;
let target = null, autoEnter = null, entering = false, stepPh = 0, slow = 0, frames = 0;
const cine = { k: 1, e: 0 }; // k : plan aérien d'ouverture (1) → caméra de suivi (0) ; e : travelling vers la porte
const keys = new Set(), joy = { x: 0, y: 0 };
function say(txt, ms = 2600) { bubble.textContent = txt; bubble.hidden = false; clearTimeout(say.t); if (ms) say.t = setTimeout(() => { if (near < 0) bubble.hidden = true; }, ms); }
function walkTo(i, enterAfter) { const p = PLACES[i]; target = new T3.Vector3(p.dx, 0, p.dz); autoEnter = enterAfter ? i : null; }
function enterPlace(i) {
  if (entering) return;
  entering = true; keys.clear(); joy.x = joy.y = 0; target = null; autoEnter = null;
  const p = PLACES[i], g = places[i], first = !visited.has(p.page);
  visited.add(p.page); store.set("visited", JSON.stringify([...visited])); renderMap();
  if (audioOn) sfx.door.play();
  // le personnage se tourne vers la porte, le fragment est aspiré, la caméra plonge vers l'entrée, puis la page s'ouvre
  heading = p.side < 0 ? -Math.PI / 2 : Math.PI / 2;
  if (first) {
    gsap.to(g.userData.frag.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: "back.in(2)" });
    gsap.to(g.userData.frag.rotation, { y: "+=8", duration: 0.5 });
    say(`◆ ${wt("got")} · ${visited.size}/5`, 1600);
  }
  gsap.to(g.userData.light, { intensity: 160, duration: 0.6, yoyo: true, repeat: 1 });
  gsap.fromTo(cine, { e: 0 }, { e: 1, duration: 0.85, ease: "power2.in", onComplete: () => { go(p.page); } });
}
function renderMap() {
  $$("#map li").forEach((li, i) => { li.classList.toggle("done", visited.has(PLACES[i].page)); li.classList.toggle("here", i === near); });
  $("#questN").textContent = `${visited.size}/5`;
}
$("#map").innerHTML = PLACES.map((p, i) => `<li data-i="${i}"><b>0${i + 1}</b></li>`).join("");
$$("#map li").forEach((li) => li.addEventListener("click", () => walkTo(+li.dataset.i, true)));

/* ---------- commandes : clavier, glisser pour regarder, joystick ---------- */
const MOVE = { ArrowUp: "f", z: "f", w: "f", Z: "f", W: "f", ArrowDown: "b", s: "b", S: "b", ArrowLeft: "l", q: "l", a: "l", Q: "l", A: "l", ArrowRight: "r", d: "r", D: "r" };
let shift = false;
addEventListener("keydown", (e) => {
  shift = e.shiftKey;
  if (current !== "home" || !introDone || e.target.tagName === "INPUT") return;
  if (MOVE[e.key]) { keys.add(MOVE[e.key]); e.preventDefault(); }
  if (["Enter", " ", "e", "E"].includes(e.key) && near >= 0) { e.preventDefault(); enterPlace(near); }
});
addEventListener("keyup", (e) => { shift = e.shiftKey; if (MOVE[e.key]) keys.delete(MOVE[e.key]); });
const cv = renderer.domElement; let drag = null;
cv.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; });
addEventListener("pointermove", (e) => {
  if (!drag || current !== "home") return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
  yaw -= dx * 0.005; pitch = Math.max(0.02, Math.min(0.75, pitch + dy * 0.003));
});
addEventListener("pointerup", (e) => {
  if (drag && drag.moved < 6 && e.target === cv) clickAt(e.clientX, e.clientY);
  drag = null;
});
// clic ou toucher sur un lieu : le personnage y court, puis entre
const ray = new T3.Raycaster(), ndc = new T3.Vector2();
function clickAt(cx, cy) {
  const rc = cv.getBoundingClientRect();
  ndc.set(((cx - rc.left) / rc.width) * 2 - 1, -((cy - rc.top) / rc.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(places, true)[0];
  if (hit) { let o = hit.object; while (o && o.userData.i === undefined) o = o.parent; if (o) walkTo(o.userData.i, true); }
}
// joystick virtuel (téléphone) : plus on pousse, plus il court
const stick = document.createElement("div"); stick.className = "stick-j"; stick.innerHTML = "<i></i>"; W.appendChild(stick);
let jid = null, jc = null;
stick.addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); jid = e.pointerId; const rc = stick.getBoundingClientRect(); jc = { x: rc.left + rc.width / 2, y: rc.top + rc.height / 2, r: rc.width / 2 }; stick.setPointerCapture(jid); });
stick.addEventListener("pointermove", (e) => {
  if (e.pointerId !== jid) return; e.stopPropagation();
  let dx = (e.clientX - jc.x) / jc.r, dy = (e.clientY - jc.y) / jc.r; const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
  joy.x = dx; joy.y = dy; stick.firstChild.style.transform = `translate(${dx * 28}px, ${dy * 28}px)`;
});
const stickEnd = () => { jid = null; joy.x = joy.y = 0; stick.firstChild.style.transform = ""; };
stick.addEventListener("pointerup", stickEnd); stick.addEventListener("pointercancel", stickEnd);
$("#padUp").addEventListener("click", () => { if (near >= 0) enterPlace(near); });

/* ---------- boucle ---------- */
function resize() {
  const w = W.clientWidth || innerWidth, h = W.clientHeight || innerHeight;
  renderer.setSize(w, h, false); composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h); bloom.resolution.set(w / 2, h / 2);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener("resize", resize);
const fwd = new T3.Vector3(), right = new T3.Vector3(), mv = new T3.Vector3(), camGoal = new T3.Vector3(), look = new T3.Vector3(), proj = new T3.Vector3();
const aerial = new T3.Vector3(), aerialLook = new T3.Vector3(), doorP = new T3.Vector3(), doorCam = new T3.Vector3();
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const byDist = LAMPS.map((p) => ({ p, d: 0 }));
// mode léger (machine lente, vieux téléphone) : définition réduite, sans ombres ni halo, brouillard plus proche
function lowQuality() {
  hq = false; bloom.enabled = false; VIEW = 90; scene.fog.density = 0.02;
  renderer.setPixelRatio(navigator.webdriver ? 0.5 : Math.min(1, renderer.getPixelRatio())); renderer.shadowMap.enabled = false;
  scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => (m.needsUpdate = true)); });
  resize();
}
function tick(now) {
  if (fellBack) return;                 // repli 2D en cours : on arrête la boucle 3D
  requestAnimationFrame(tick);
  const raw = (now - last) / 1000 || 0, dt = Math.min(0.25, raw); last = now;
  syncAudio();
  // rien à dessiner tant que l'intro couvre l'écran, ni quand une page est ouverte
  if (current !== "home" || !introDone) return;
  // si la machine peine (plus de 40 ms par image en moyenne), on baisse la définition et on espace le calcul des ombres
  // téléphone (Safari iOS rend noir le post-traitement en demi-flottants multi-échantillonnés) et navigateur piloté (tests) : rendu léger d'emblée
  if (hq && (touch || navigator.webdriver)) lowQuality();
  if (hq && raw > 0) { slow += raw > 0.04 ? 1 : -0.5; slow = Math.max(0, slow); if (++frames > 30 && slow > 20) lowQuality(); }
  for (const c of chunks) c.visible = Math.abs(c.userData.z - pos.z) < VIEW;
  // direction voulue, relative à la caméra
  fwd.set(-Math.sin(yaw), 0, -Math.cos(yaw)); right.set(Math.cos(yaw), 0, -Math.sin(yaw));
  const f = (keys.has("f") ? 1 : 0) - (keys.has("b") ? 1 : 0) - joy.y, s = (keys.has("r") ? 1 : 0) - (keys.has("l") ? 1 : 0) + joy.x;
  mv.set(0, 0, 0).addScaledVector(fwd, f).addScaledVector(right, s);
  const push = Math.min(1, mv.length()); // poussée du joystick (1 au clavier)
  if (entering) mv.set(0, 0, 0);
  else if (mv.lengthSq() > 0.01) { target = null; autoEnter = null; }
  else if (target) {
    mv.subVectors(target, pos); mv.y = 0;
    if (mv.length() < 0.4) { mv.set(0, 0, 0); target = null; if (autoEnter !== null) { const i = autoEnter; autoEnter = null; enterPlace(i); } }
  }
  const moving = mv.lengthSq() > 0.01, running = moving && !shift && (target || push > 0.6);
  if (moving) {
    mv.normalize(); pos.addScaledVector(mv, (running ? RUN : WALK) * dt);
    pos.x = Math.max(-SIDE + 1.2, Math.min(SIDE - 1.2, pos.x)); pos.z = Math.max(END, Math.min(ZTOP - 4, pos.z));
    heading = Math.atan2(mv.x, mv.z);
    if (started && !moved) { moved = true; W.classList.add("moved"); }
  }
  // sur le trottoir, on marche 35 cm plus haut
  const ground = Math.abs(pos.x) > AV + 0.2 ? 0.35 : 0;
  hero.position.set(pos.x, hero.position.y + (ground - hero.position.y) * Math.min(1, dt * 14), pos.z);
  hero.rotation.y += wrap(heading - hero.rotation.y) * Math.min(1, dt * 12);
  play(moving ? (running ? "run" : "walk") : "idle");
  if (mixer) {
    if (act.run) act.run.timeScale = 1.05; if (act.walk) act.walk.timeScale = 1.1;
    mixer.update(still ? 0 : dt);
    const a = act[state], clip = a && a.getClip();
    if (moving && clip) { const ph = ((a.time / clip.duration) * 2) % 1; if (ph < stepPh && audioOn) { sfx.step.rate(0.9 + Math.random() * 0.2); sfx.step.play(); } stepPh = ph; }
  }
  blob.position.set(pos.x, hero.position.y + 0.05, pos.z); blob.scale.setScalar(moving ? 1.3 : 1.5);
  // ombres nettes autour du personnage : la lune « suit » la scène ; les lampadaires proches s'allument pour de vrai
  moonL.position.set(pos.x + 25, 70, pos.z + 30); moonL.target.position.copy(pos);
  byDist.forEach((o) => (o.d = Math.abs(o.p.z - pos.z) + Math.abs(o.p.x - pos.x) * 0.3)); byDist.sort((a, b) => a.d - b.d);
  lampLights.forEach((l, i) => l.position.set(byDist[i].p.x, 3.5 * M, byDist[i].p.z));
  // caméra à la troisième personne : derrière, un peu au-dessus, avec retard ; recule sur écran étroit ; ne rentre pas dans les murs
  const dist = 11 * (camera.aspect < 0.8 ? 1.4 : 1);
  camGoal.set(pos.x + Math.sin(yaw) * Math.cos(pitch) * dist, 1.6 + Math.sin(pitch) * dist + 2, pos.z + Math.cos(yaw) * Math.cos(pitch) * dist);
  camGoal.x = Math.max(-SIDE + 0.8, Math.min(SIDE - 0.8, camGoal.x));
  look.set(pos.x - Math.sin(yaw) * 4, HERO_H * 0.85, pos.z - Math.cos(yaw) * 4);
  // ouverture : un plan aérien sur toute la rue qui redescend derrière le personnage
  if (cine.k > 0) { aerial.set(pos.x + 4, 62, pos.z + 46); aerialLook.set(0, 6, -90); camGoal.lerp(aerial, cine.k); look.lerp(aerialLook, cine.k); }
  // entrée : la caméra glisse vers la porte
  if (cine.e > 0 && near >= 0) { const p = PLACES[near]; doorP.set(p.side * SIDE, 2.6, p.z); doorCam.set(-p.side * 6, 1.5, 0).add(doorP); camGoal.lerp(doorCam, cine.e); look.lerp(doorP, cine.e); }
  camera.position.lerp(camGoal, cine.k > 0 || cine.e > 0 ? 1 : Math.min(1, dt * 4));
  camera.lookAt(look);
  // lieu le plus proche : la tenue suit le lieu ; devant la porte, on peut entrer
  let inside = -1, close = -1, best = 1e9;
  PLACES.forEach((p, i) => { const dz = Math.abs(pos.z - p.z); if (dz < p.w / 2 + 2 && Math.sign(pos.x) === p.side) inside = i; const d2 = Math.hypot(pos.x - p.dx, pos.z - p.dz); if (d2 < 4.5 && d2 < best) { best = d2; close = i; } });
  setOutfit(inside >= 0 ? PLACES[inside].outfit : "who", inside >= 0);
  if (close !== near && !entering) {
    if (near >= 0) { gsap.to(places[near].userData.light, { intensity: 40, duration: 0.4 }); gsap.to(places[near].userData.sign.scale, { x: 1, y: 1, duration: 0.3 }); }
    near = close; $("#padUp").hidden = near < 0;
    if (near >= 0) {
      say(`▲ ${t(PLACES[near].page)} · ${wt("enter")}`, 0); nod();
      gsap.to(places[near].userData.light, { intensity: 90, duration: 0.4 });
      gsap.to(places[near].userData.sign.scale, { x: 1.15, y: 1.15, duration: 0.5, ease: "back.out(3)" });
    } else bubble.hidden = true;
    renderMap();
  }
  // salle serveurs : son spatial, plus fort et plus à gauche ou à droite selon où elle se trouve par rapport à la caméra
  if (audioOn) {
    const p = PLACES[2], d = Math.hypot(pos.x - p.dx, pos.z - p.z);
    sfx.hum.volume(Math.max(0, 1 - d / 28) * 0.5);
    proj.set(p.side * SIDE, 4, p.z).project(camera); sfx.hum.stereo(Math.max(-1, Math.min(1, proj.x)) * 0.8);
  }
  proj.set(pos.x, HERO_H + 1.3, pos.z).project(camera);
  bubble.style.left = ((proj.x + 1) / 2) * 100 + "%"; bubble.style.top = ((1 - proj.y) / 2) * 100 + "%";
  const tt = now / 1000;
  finish.uniforms.time.value = tt;
  if (!still) {
    // la pluie suit le personnage : on la décale par blocs pour qu'elle l'entoure toujours
    rain.position.set(Math.round(pos.x / 70) * 70, 0, Math.round(pos.z / 70) * 70);
    for (let i = 0; i < rainN; i++) { const o = i * 6; let y = rainPos[o + 1] - dt * 28; if (y < 0) y += 30; rainPos[o + 1] = y; rainPos[o + 4] = y - 0.9; }
    rainGeo.attributes.position.needsUpdate = true;
    skyline.forEach((l) => (l.visible = Math.sin(tt * 2 + l.userData.ph) > 0));
    steam.forEach((p) => { const u = (p.userData.t = (p.userData.t + dt * 0.18) % 1); p.position.set(p.userData.x0 + Math.sin(u * 5 + p.userData.z0) * 0.6, 0.3 + u * 7, p.userData.z0 + u * 1.2); p.scale.setScalar(1.2 + u * 5); p.material.opacity = 0.32 * Math.sin(u * Math.PI); p.lookAt(camera.position); });
    STOVES.forEach((s) => { if (!s.fire) return; const k = 0.75 + Math.sin(tt * 13 + s.z) * 0.12 + Math.random() * 0.13; s.fire.material.opacity = k; s.light.intensity = 60 * k; s.fire.lookAt(camera.position.x, s.fire.position.y, camera.position.z); });
    places.forEach((g) => {
      if (g.userData.blink) g.userData.blink.visible = Math.floor(tt * 1.5) % 2 === 0;
      if (g.userData.flicker) g.userData.flicker.material.opacity = Math.random() < 0.03 ? 0.15 : 1; // néon qui grésille
      const fr = g.userData.frag; fr.rotation.y += dt * 1.6; fr.position.y = (g.userData.fragY || 3) + Math.sin(tt * 2 + g.userData.i) * 0.35;
    });
  }
  if (hq && useBloom) composer.render(); else renderer.render(scene, camera);
  // surveillance du rendu (hors tests pilotés) : scène noire -> rendu simple, puis accueil 2D si toujours noir ; FPS au sol -> accueil 2D
  if (!navigator.webdriver && !fellBack) {
    renderedFrames++;
    if (blackChecks < 2 && renderedFrames === (blackChecks === 0 ? 30 : 90)) {
      if (frameIsBlack()) { blackChecks++; if (hq) lowQuality(); else fallTo2D(); }
      else blackChecks = 2;
    }
    if (!hq && raw > 0) { slow2 += raw > 0.09 ? 1 : -1; slow2 = Math.max(0, slow2); if (slow2 > 90) fallTo2D(); }
  }
}

/* ---------- interface publique ---------- */
window.world = {
  start() {
    if (started) return; started = true;
    // ouverture : plan aérien sur la ville, puis la caméra redescend derrière le personnage
    gsap.fromTo(cine, { k: 1 }, { k: 0, duration: still ? 0 : 3.6, ease: "power3.inOut", delay: 0.2 });
    gsap.from("#world .hud > *, #helpW", { y: -16, opacity: 0, duration: 0.8, stagger: 0.12, delay: 1.8, ease: "power2.out", clearProps: "all" });
    setTimeout(() => say(wt("hello"), 3200), 2800);
  },
  onView(name) {
    if (name !== "home") return;
    keys.clear(); resize(); renderMap();
    // retour d'un lieu : on ressort sur le trottoir, face à la rue
    if (entering) { entering = false; cine.e = 0; if (near >= 0) { pos.x = PLACES[near].dx * 0.8; heading = PLACES[near].side < 0 ? Math.PI / 2 : -Math.PI / 2; } }
    if (visited.size === 5) setTimeout(() => say(wt("done"), 4000), 600);
  },
  relabel() {
    if (!places.length) return;
    relabelSigns();
    $("#helpW").textContent = touch ? wt("helpT") : wt("helpW");
    $("#padUp").textContent = wt("enterBtn");
    $$("#home [data-i='quest']").forEach((e) => (e.textContent = wt("quest")));
    if (near >= 0) say(`▲ ${t(PLACES[near].page)} · ${wt("enter")}`, 0);
  },
  get x() { return pos.x; }, get z() { return pos.z; }, get near() { return near; }, get outfit() { return outfit; }, get anim() { return state; }, places: PLACES,
  teleport(i) { const p = PLACES[i]; pos.set(p.dx * 0.8, 0, p.dz + 1); },
  look(y) { yaw = y; },
};

pos.set(START.x, 0, START.z); camera.position.set(4, 62, 50);
resize(); world.relabel(); renderMap();
if (introDone) world.start();
// pendant l'intro, on prépare les shaders de la rue : sinon tout se compile d'un coup au clic sur « entrer » et la page se fige
Promise.all(loading).then(() => setTimeout(() => {
  if (introDone || !renderer.compileAsync) return;
  renderer.compileAsync(scene, camera).catch(() => {});
}, 0));
requestAnimationFrame(tick);
