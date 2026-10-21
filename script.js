/* ============ CONTENU ============ */
// Uniquement des faits vérifiés (registre faits_verifies.json). Les quatre avatars : une tenue par étape.
const CHARS = [
  { page: "s1", k: "s1", src: "assets/chars/who.webp" },
  { page: "s2", k: "s2", src: "assets/chars/parcours.webp" },
  { page: "s3", k: "s3", src: "assets/chars/travail.webp" },
  { page: "s4", k: "s4", src: "assets/chars/passions.webp" },
];
const SRC = { who: CHARS[0].src, parcours: CHARS[1].src, travail: CHARS[2].src, passions: CHARS[3].src };

const T = {
  fr: {
    skip: "passer ›", enter: "[ entrer ]", contact: "./exfiltrer",
    gate: "Voir le portfolio ›", gateBack: "Reprendre ›", sndHint: "son conseillé", wipe: "connexion…",
    scanHead: "connexion entrante détectée",
    scan: { ip: "ip publique", dev: "appareil", scr: "écran", tz: "fuseau", lang: "langue", net: "réseau", bat: "batterie", cpu: "processeur", th: "thème", city: "position", approx: "(approx.)", isp: "opérateur", hidden: "masquée (bien joué)", cores: "cœurs", dark: "sombre", light: "clair" },
    granted: "accès obtenu.",
    intro: [
      "Salut, toi.",
      "Tu croyais lire un portfolio. C'est toi qu'on vient de lire.",
      "Rassure-toi : je n'enregistre rien. Je voulais juste ton attention.",
      "Maintenant, on entre.",
    ],
    introBack: ["Te revoilà{ip}.", "On reprend où on s'était arrêtés."],
    introNight: "Il est tard. Moi non plus, je ne dors pas.",
    lead: "Ingénieur IA. Je construis des agents qui n'ont pas le droit de mentir.",
    down: "descends ↓", pick: "choisis ta cible",
    s1: "01_reconnaissance", s2: "02_dechiffrement", s3: "03_payload", s4: "04_ingenierie_sociale", s5: "05_exfiltration",
    v1: "Première règle : connaître sa cible. Ici, la cible, c'est moi. Passe le doigt sur ce qui est caviardé.",
    v2: "Ses diplômes sont chiffrés. Touche un fichier pour le déchiffrer.",
    v3: "Voilà ce qu'il fabrique. Ne me crois pas sur parole : lance-le toi-même.",
    v4: "Tout le monde a des failles. Voici les siennes.",
    v5: "Dernière étape. Tu repars avec ce qu'il te faut.",
    reveal: "tout révéler", weak: "points faibles", langs: "langues",
    exfil: "[ exfiltrer le contact ]", dont: "ne pas cliquer", copied: "copié :",
    me: "moi", him: "lui",
    dossier: [
      ["SUJET", "Ayoub Amrani"],
      ["RÔLE", "ingénieur IA et développeur"],
      ["STATUT", "disponible immédiatement : cherche un poste en IA générative"],
      ["FORMATION", "Master 2 Informatique, parcours TNSID, INSA Hauts-de-France (2024 – 2026)"],
      ["ANTÉCÉDENTS", "trois ans de médecine à Paris 7 · régulateur au SAMU 92"],
      ["SPÉCIALITÉ", "agents et chaînes LLM en production : relances, contrôle de ce que produit le modèle, journal de chaque appel"],
      ["DERNIÈRE MISSION", "IDC Academy, 2026 : plateforme e-learning mise en production, plus de 1 000 leçons vidéo produites par une chaîne IA et vérifiées"],
      ["BASE", "Valenciennes (Nord)"],
      ["PREUVES", "chaque phrase de ce site vient d'un registre de faits vérifiés ; rien n'est inventé"],
    ],
    duo1: [["d", "Dis-leur que t'as dix ans d'expérience."], ["a", "Non. Trois stages, et une plateforme en production."], ["d", "Ennuyeux."], ["a", "Vrai."]],
    duo4: [["d", "Mets que tu parles japonais."], ["a", "Arabe, français, anglais C1. C'est tout."], ["d", "Personne ne vérifiera."], ["a", "Moi, si."]],
    notes: [
      ["Jeux vidéo", "aime les systèmes qui ont des règles. et trouver où elles cassent."],
      ["Cuisine", "suit la recette une fois. ensuite, il la modifie."],
      ["Voyage", "change de décor pour mieux réfléchir."],
      ["Recherche", "lit l'article jusqu'aux annexes."],
    ],
    langList: [["Arabe", "langue maternelle"], ["Français", "langue maternelle"], ["Anglais", "C1 · TOEIC"]],
    exsteps: ["connexion à ayoub@amrani", "contournement du pare-feu RH", "chiffrement du canal", "copie de l'adresse dans ton presse-papier"],
    exdone: "Données exfiltrées. À toi de jouer.",
    twist: [
      "Une dernière chose.",
      "La voix qui te parle depuis le début, ce n'était pas moi.",
      "C'était mon agent.",
      "Je l'ai construit pour qu'il n'ait pas le droit d'inventer : chaque phrase de ce site a été vérifiée.",
      "C'est exactement ce que je fais pour les entreprises.",
    ],
    sig: "— Ayoub",
    crash: "KERNEL PANIC — not syncing: le visiteur a cliqué.\n\n[  0.000000] tu avais une seule consigne.\n[  0.004211] dump de la mémoire…\n[  0.009870] ████████████████ 100 %\n\n",
    crashEnd: "> pardon. réflexe. on reprend.",
    term: {
      hello: "Tape une commande, ou touche-en une en dessous. Essaie <hl>help</hl>.",
      help: "commandes :\n  <hl>ls</hl>                  lister les projets\n  <hl>run</hl> &lt;projet&gt;       lancer une démo\n  <hl>open</hl> &lt;projet&gt;      voir le code\n  <hl>cat experiences</hl>     les missions\n  <hl>cat chiffres</hl>        les résultats\n  <hl>cat stack</hl>           les outils\n  <hl>whoami</hl>  ·  <hl>clear</hl>",
      unknown: "commande introuvable : {c}. essaie help.",
      whoami: "visiteur. moi, je sais qui tu es. toi, tu cherches qui je suis.",
      sudo: "bien essayé.",
      exit: "tu ne peux pas partir. (si, en fait : cd .. en haut.)",
      noproj: "projet introuvable : {p}. tape ls.",
      opening: "ouverture de {u} …",
      priv: "dépôt privé : code montré sur demande.",
      groups: { ia: "~/projets/ia", autres: "~/projets/autres" },
      numbers: "+1 000      leçons vidéo publiées par la chaîne IA\n8 700       unités traitées en production par la chaîne vidéo\n13          sprints pour livrer la plateforme e-learning\n~9 000      figures auditées (licences) · 510 images d'un tiers retirées\n11          parcours de certification couverts : AZ-104, AZ-500, AZ-305,\n            SC-200, SC-900, PL-300, DP-900, CKA, CKAD, Linux, Security+",
      stack: "IA / LLM    Claude API, LangChain, LangGraph, RAG, n8n\nbackend     Python, FastAPI, Java Spring Boot\ndonnées     SQL, PostgreSQL, Pandas, Power BI\nprod        Docker, Nginx, Linux, CI\nfront       React, JavaScript",
    },
  },
  en: {
    skip: "skip ›", enter: "[ enter ]", contact: "./exfiltrate",
    gate: "View portfolio ›", gateBack: "Resume ›", sndHint: "sound on recommended", wipe: "connecting…",
    scanHead: "incoming connection detected",
    scan: { ip: "public ip", dev: "device", scr: "screen", tz: "timezone", lang: "language", net: "network", bat: "battery", cpu: "cpu", th: "theme", city: "location", approx: "(approx.)", isp: "provider", hidden: "hidden (well played)", cores: "cores", dark: "dark", light: "light" },
    granted: "access granted.",
    intro: [
      "Hello, you.",
      "You thought you were reading a portfolio. You're the one being read.",
      "Relax: I don't store anything. I just wanted your attention.",
      "Now, let's get in.",
    ],
    introBack: ["You're back{ip}.", "Let's pick up where we left off."],
    introNight: "It's late. I don't sleep either.",
    lead: "AI engineer. I build agents that aren't allowed to lie.",
    down: "scroll ↓", pick: "pick your target",
    s1: "01_recon", s2: "02_decrypt", s3: "03_payload", s4: "04_social_engineering", s5: "05_exfiltration",
    v1: "First rule: know your target. Here, the target is me. Run your finger over what's redacted.",
    v2: "His degrees are encrypted. Tap a file to decrypt it.",
    v3: "This is what he builds. Don't take my word for it: run it yourself.",
    v4: "Everyone has weaknesses. Here are his.",
    v5: "Last step. You leave with what you need.",
    reveal: "reveal all", weak: "weaknesses", langs: "languages",
    exfil: "[ exfiltrate contact ]", dont: "do not click", copied: "copied:",
    me: "me", him: "him",
    dossier: [
      ["SUBJECT", "Ayoub Amrani"],
      ["ROLE", "AI engineer and developer"],
      ["STATUS", "available now: looking for a generative AI role"],
      ["EDUCATION", "Master's in Computer Science, TNSID track, INSA Hauts-de-France (2024 – 2026)"],
      ["BACKGROUND", "three years of medical school in Paris · emergency dispatcher at SAMU 92"],
      ["SPECIALTY", "agents and LLM pipelines in production: retries, checks on what the model produces, a log of every call"],
      ["LAST MISSION", "IDC Academy, 2026: e-learning platform put into production, more than 1,000 video lessons produced by an AI pipeline and checked"],
      ["BASE", "Valenciennes, France"],
      ["EVIDENCE", "every sentence on this site comes from a register of checked facts; nothing is made up"],
    ],
    duo1: [["d", "Tell them you have ten years of experience."], ["a", "No. Three internships, and a platform in production."], ["d", "Boring."], ["a", "True."]],
    duo4: [["d", "Say you speak Japanese."], ["a", "Arabic, French, English C1. That's it."], ["d", "Nobody will check."], ["a", "I will."]],
    notes: [
      ["Video games", "likes systems with rules. and finding where they break."],
      ["Cooking", "follows the recipe once. then he changes it."],
      ["Travel", "changes the scenery to think better."],
      ["Research", "reads the paper down to the appendix."],
    ],
    langList: [["Arabic", "native"], ["French", "native"], ["English", "C1 · TOEIC"]],
    exsteps: ["connecting to ayoub@amrani", "bypassing the HR firewall", "encrypting the channel", "copying the address to your clipboard"],
    exdone: "Data exfiltrated. Your move.",
    twist: [
      "One last thing.",
      "The voice talking to you since the start wasn't me.",
      "It was my agent.",
      "I built it so it isn't allowed to make things up: every sentence on this site has been checked.",
      "That's exactly what I do for companies.",
    ],
    sig: "— Ayoub",
    crash: "KERNEL PANIC — not syncing: the visitor clicked.\n\n[  0.000000] you had one instruction.\n[  0.004211] dumping memory…\n[  0.009870] ████████████████ 100 %\n\n",
    crashEnd: "> sorry. reflex. carrying on.",
    term: {
      hello: "Type a command, or tap one below. Try <hl>help</hl>.",
      help: "commands:\n  <hl>ls</hl>                  list projects\n  <hl>run</hl> &lt;project&gt;      run a demo\n  <hl>open</hl> &lt;project&gt;     see the code\n  <hl>cat experiences</hl>     missions\n  <hl>cat numbers</hl>         results\n  <hl>cat stack</hl>           tools\n  <hl>whoami</hl>  ·  <hl>clear</hl>",
      unknown: "command not found: {c}. try help.",
      whoami: "visitor. I know who you are. you're looking for who I am.",
      sudo: "nice try.",
      exit: "you can't leave. (you can: cd .. at the top.)",
      noproj: "project not found: {p}. type ls.",
      opening: "opening {u} …",
      priv: "private repository: code shown on request.",
      groups: { ia: "~/projects/ai", autres: "~/projects/other" },
      numbers: "1,000+      video lessons published by the AI pipeline\n8,700       units processed in production by the video pipeline\n13          sprints to ship the e-learning platform\n~9,000      figures audited (licences) · 510 third-party images removed\n11          certification tracks covered: AZ-104, AZ-500, AZ-305,\n            SC-200, SC-900, PL-300, DP-900, CKA, CKAD, Linux, Security+",
      stack: "AI / LLM    Claude API, LangChain, LangGraph, RAG, n8n\nbackend     Python, FastAPI, Java Spring Boot\ndata        SQL, PostgreSQL, Pandas, Power BI\nprod        Docker, Nginx, Linux, CI\nfront       React, JavaScript",
    },
  },
};
// [fr, en]
const FILES = [
  { f: "master.gpg", y: "2024–2026", t: ["Master 2 Informatique · TNSID", "Master's in Computer Science · TNSID"], d: ["INSA Hauts-de-France, Valenciennes. Diplôme en cours de délivrance.", "INSA Hauts-de-France, Valenciennes. Degree being issued."] },
  { f: "licence.gpg", y: "2021–2024", t: ["Licence Ingénierie logicielle", "Bachelor in Software Engineering"], d: ["ESISA, Fès (Maroc).", "ESISA, Fès (Morocco)."] },
  { f: "medecine.gpg", y: ["3e année", "3rd year"], t: ["Études de médecine", "Medical school"], d: ["Université Paris 7 (Bichat). Avant l'informatique.", "Université Paris 7 (Bichat). Before computer science."] },
  { f: "bac.gpg", y: "2017", t: ["Baccalauréat scientifique", "Scientific baccalaureate"], d: ["Série S. Le point de départ.", "Science track. Where it started."] },
  { f: "az-900.cert", y: "Microsoft", t: ["Azure Fundamentals", "Azure Fundamentals"], d: ["Certification AZ-900.", "AZ-900 certification."] },
  { f: "gcp.cert", y: "Google", t: ["Cloud Digital Leader", "Cloud Digital Leader"], d: ["Certification Google Cloud.", "Google Cloud certification."] },
  { f: "linux.cert", y: "Cisco", t: ["NDG Linux Essentials", "NDG Linux Essentials"], d: ["Certification Cisco NDG.", "Cisco NDG certification."] },
  { f: "toeic.cert", y: "C1", t: ["TOEIC · anglais C1", "TOEIC · English C1"], d: ["Niveau C1 attesté.", "C1 level, certified."] },
];
// Projets triés : l'IA d'abord, puis le reste qui montre autre chose (recherche, mobile, Java).
const PROJ = {
  guardloop: { g: "ia", u: "https://github.com/yurri775/guardloop", d: ["Harnais pour chaînes LLM en production : relances, repli sur un autre modèle, journal des coûts, validation par règles et réparation ciblée.", "Harness for production LLM pipelines: retries, model fallback, cost journal, rule-based validation with targeted repair."] },
  "software-company-ia": { g: "ia", priv: true, d: ["Plateforme multi-agents (LangGraph) : un brief texte passe par un CTO, un architecte, des agents front et back, QA, sécurité et DevOps, et ressort en application.", "Multi-agent platform (LangGraph): a text brief goes through a CTO, an architect, front and back agents, QA, security and DevOps, and comes out as an application."] },
  doc2video: { g: "ia", u: "https://github.com/yurri775/doc2video", d: ["Un document Markdown devient une vidéo de cours narrée, avec diapositives et sous-titres.", "A Markdown document becomes a narrated lesson video with slides and subtitles."] },
  spec2diagram: { g: "ia", u: "https://github.com/yurri775/spec2diagram", d: ["Des schémas propres à partir d'une spécification JSON, en SVG ou en formes PowerPoint modifiables.", "Clean diagrams from a JSON spec, as SVG or editable PowerPoint shapes."] },
  "prospect-qualifier": { g: "ia", u: "https://github.com/yurri775/prospect-qualifier", d: ["Agent de qualification de prospects : n8n, LLM, RAG sur Qdrant avec embeddings locaux, synchronisation HubSpot.", "Lead-qualification agent: n8n, LLM, RAG on Qdrant with local embeddings, HubSpot sync."] },
  rag: { g: "ia", u: "https://github.com/yurri775/rag", d: ["Cinq chaînes RAG dans n8n, de la recherche vectorielle simple à la recherche contextuelle avec reclassement.", "Five RAG pipelines in n8n, from basic vector search to contextual retrieval with re-ranking."] },
  "kit-candidature": { g: "ia", u: "https://github.com/yurri775/kit-candidature", d: ["CV lisibles par les logiciels de recrutement, générés depuis un seul fichier, et un dossier par offre en une commande.", "ATS-readable CVs generated from a single file, and one application folder per job offer in one command."] },
  maya: { g: "autres", u: "https://github.com/yurri775/MAYA", d: ["Recherche : morphing de visages, qualité biométrique et attaques par inférence d'appartenance sur des classifieurs.", "Research: face morphing, biometric quality and membership-inference attacks on face classifiers."] },
  "test-mately": { g: "autres", u: "https://github.com/yurri775/test-mately", d: ["Gestionnaire de tâches collaboratif en temps réel : Node.js, Socket.io, MongoDB et application mobile React Native.", "Real-time collaborative task manager: Node.js, Socket.io, MongoDB and a React Native mobile app."] },
  palapi: { g: "autres", u: "https://github.com/yurri775/palapi-pal-default", d: ["API REST en Java Spring Boot et PostgreSQL, image Docker en plusieurs étapes, analysée par Trivy et Docker Scout.", "REST API in Java Spring Boot and PostgreSQL, multi-stage Docker build, scanned with Trivy and Docker Scout."] },
};
const EXP = [
  ["IDC Academy (StockData) · 2026", ["stage de fin d'études : plateforme e-learning Odoo 17 livrée en 13 sprints et mise en production ; chaîne IA de production de cours (extraction PPTX, génération, voix, montage), plus de 1 000 leçons vidéo publiées ; contrôle automatique qui repère ce que le modèle invente ; audit des licences d'environ 9 000 figures ; exploitation du serveur (Ubuntu, Docker, Nginx, sauvegardes).", "final-year internship: Odoo 17 e-learning platform delivered in 13 sprints and put into production; AI course-production pipeline (PPTX extraction, generation, voice, editing), more than 1,000 video lessons published; automated checks that catch what the model makes up; licence audit of about 9,000 figures; server operations (Ubuntu, Docker, Nginx, backups)."]],
  ["Attijariwafa Bank · 2024", ["stage full-stack : plateforme de gestion de crédit en React et Spring Boot, API REST sécurisées.", "full-stack internship: credit management platform in React and Spring Boot, secured REST APIs."]],
  ["OCP Group · 2023", ["stage data : données industrielles en Python, tableaux de bord Power BI, détection d'anomalies par machine learning.", "data internship: industrial data in Python, Power BI dashboards, machine-learning anomaly detection."]],
  ["SAMU 92 · 2020 – 2021", ["régulateur : interventions d'urgence, sous pression, selon des protocoles stricts.", "dispatcher: emergency responses, under pressure, following strict protocols."]],
];

/* ============ outils ============ */
const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms) => new Promise((r) => setTimeout(r, still ? 0 : ms));
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
let L = store.get("lang") || ((navigator.language || "fr").startsWith("fr") ? "fr" : "en");
const t = (k) => T[L][k], p = (a) => (Array.isArray(a) ? a[L === "fr" ? 0 : 1] : a);
const night = new Date().getHours() < 5;
if (night) document.body.classList.add("night");
const SIL = `<svg viewBox="0 0 120 300" aria-hidden="true"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ececea" stop-opacity=".35"/><stop offset="1" stop-color="#ececea" stop-opacity=".04"/></linearGradient></defs><circle cx="60" cy="38" r="24" fill="url(#sg)"/><path d="M28 78q32-14 64 0l8 92h-16l-4 124H46l-4-124H20z" fill="url(#sg)"/></svg>`;
function fig(src, alt) {
  const d = document.createElement("div"); d.className = "fig";
  const im = new Image(); im.alt = alt; im.decoding = "async";
  im.onerror = () => { d.innerHTML = `<div class="ph">${SIL}</div>`; };
  im.src = src; d.appendChild(im); return d;
}
function glitch(el) { if (!el || still) return; el.dataset.text = el.textContent; el.classList.remove("go"); void el.offsetWidth; el.classList.add("go"); }

/* ============ voix ============ */
// Un seul élément audio, débloqué par le clic du visiteur (iOS refuse le son sans geste), puis réutilisé.
const voiceEl = new Audio(); voiceEl.preload = "auto";
let soundOn = store.get("sound") !== "off";
function unlockVoice() {
  if (!soundOn) return;
  voiceEl.muted = true; voiceEl.src = `assets/voice/${L}/intro_0.mp3`;
  const pr = voiceEl.play(); if (pr) pr.then(() => { voiceEl.pause(); voiceEl.muted = false; }).catch(() => {});
}
function speak(key) {
  return new Promise((res) => {
    if (!soundOn || still) return res();
    voiceEl.onended = voiceEl.onerror = () => res();
    voiceEl.muted = false; voiceEl.src = `assets/voice/${L}/${key}.mp3`; voiceEl.currentTime = 0;
    const pr = voiceEl.play(); if (pr) pr.catch(() => res());
    setTimeout(res, 9000);
  });
}
function renderSnd() { const b = $("#snd"); b.textContent = soundOn ? "♪ on" : "♪ off"; b.classList.toggle("on", soundOn); }
$("#snd").onclick = () => { soundOn = !soundOn; store.set("sound", soundOn ? "on" : "off"); if (!soundOn) voiceEl.pause(); renderSnd(); };
renderSnd();

/* ============ intro : l'écran piraté ============ */
// N'utilise que ce que le navigateur sait déjà ; rien n'est envoyé ni gardé.
function device() {
  const u = navigator.userAgent;
  const os = /iPhone/.test(u) ? "iPhone" : /iPad/.test(u) ? "iPad" : /Android/.test(u) ? "Android" : /Mac/.test(u) ? "Mac" : /Win/.test(u) ? "Windows" : /Linux/.test(u) ? "Linux" : "?";
  const br = /Edg\//.test(u) ? "Edge" : /Firefox\/|FxiOS/.test(u) ? "Firefox" : /CriOS|Chrome\//.test(u) ? "Chrome" : /Safari\//.test(u) ? "Safari" : (L === "fr" ? "un navigateur" : "a browser");
  return L === "fr" ? `${br} sur ${os}` : `${br} on ${os}`;
}
let introDone = false;
// L'IP, la ville approximative et l'opérateur sont demandés à ipapi.co (repli : ipify), qui les renvoie au visiteur.
// Ce site ne les envoie ni ne les garde nulle part : ils ne servent qu'à l'affichage de l'intro.
async function getJSON(url, ms) {
  const c = new AbortController(); setTimeout(() => c.abort(), ms);
  const r = await fetch(url, { signal: c.signal, cache: "no-store" }); if (!r.ok) throw new Error(r.status); return r.json();
}
const geoP = (async () => {
  try { const g = await getJSON("https://ipapi.co/json/", 2200); if (g && g.ip && !g.error) return g; } catch (e) {}
  try { const g = await getJSON("https://api.ipify.org?format=json", 1500); return { ip: g.ip }; } catch (e) { return {}; }
})();
const ipP = geoP.then((g) => g.ip || null);
async function battery() {
  try { if (!navigator.getBattery) return null; const b = await Promise.race([navigator.getBattery(), sleep(400).then(() => null)]); return b ? Math.round(b.level * 100) + " %" + (b.charging ? " ⚡" : "") : null; } catch (e) { return null; }
}
async function scanRows() {
  const sc = t("scan"), geo = await geoP, ip = geo.ip, now = new Date().toLocaleTimeString(L === "fr" ? "fr-FR" : "en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "?") + " · " + now;
  const net = navigator.connection && navigator.connection.effectiveType;
  return [
    [sc.ip, ip || sc.hidden, !!ip],
    geo.city && [sc.city, [geo.city, geo.country_name].filter(Boolean).join(", ") + " " + sc.approx, true],
    geo.org && [sc.isp, geo.org],
    [sc.dev, device()],
    [sc.scr, `${screen.width}×${screen.height} · ${Math.round((devicePixelRatio || 1) * 10) / 10}x`],
    [sc.tz, tz],
    [sc.lang, navigator.language || "?"],
    net && [sc.net, net],
    [sc.bat, await battery()],
    navigator.hardwareConcurrency && [sc.cpu, navigator.hardwareConcurrency + " " + sc.cores],
    [sc.th, matchMedia("(prefers-color-scheme: dark)").matches ? sc.dark : sc.light],
  ].filter((r) => r && r[1]);
}
async function typeLine(box, text, cls) {
  const row = document.createElement("div"); if (cls) row.className = cls;
  row.innerHTML = '<span class="r">&gt;</span> '; box.appendChild(row);
  const span = document.createElement("span"); row.appendChild(span);
  for (const ch of text) { if (introDone) return; span.textContent += ch; await sleep(22); }
}
async function intro() {
  const box = $("#introTerm"), seen = store.get("seen");
  $("#gate").textContent = seen ? t("gateBack") : t("gate");
  const rowsP = seen ? null : scanRows();
  // le visiteur clique sur un portfolio ordinaire… et c'est ce clic qui déclenche tout (et autorise le son)
  await new Promise((r) => ($("#gate").onclick = () => { unlockVoice(); r(); }));
  if (introDone) return;
  $(".fake").classList.add("tear"); await sleep(620); $(".fake").remove();
  if (seen) {
    const ip = await ipP;
    const lines = t("introBack");
    for (let i = 0; i < lines.length; i++) {
      if (introDone) return;
      await Promise.all([typeLine(box, lines[i].replace("{ip}", ip ? ", " + ip : "")), i === 0 ? speak("back_0") : null]);
      await sleep(300);
    }
  } else {
    if (introDone) return;
    box.insertAdjacentHTML("beforeend", `<div class="scan-h"><span class="r">[!]</span> ${esc(t("scanHead"))}<span class="cur">_</span></div>`);
    const rows = await rowsP; await sleep(500);
    const w = Math.max(...rows.map((r) => r[0].length)) + 3;
    for (const [k, v, hot] of rows) {
      if (introDone) return;
      const row = document.createElement("div"); row.className = "scan-row";
      row.innerHTML = `<span class="m">[+]</span> ${esc((k + " ").padEnd(w, "."))} <b class="${hot ? "hot" : ""}"></b>`; box.appendChild(row);
      const b = row.querySelector("b");
      for (let i = 0; i < 6; i++) { b.textContent = scramble(String(v)).slice(0, 16); await sleep(28); }
      b.textContent = v; await sleep(110);
    }
    await sleep(350); if (introDone) return;
    box.insertAdjacentHTML("beforeend", `<div class="granted">${esc(t("granted"))}</div>`);
    document.body.classList.add("flash"); await sleep(260); document.body.classList.remove("flash");
    await sleep(500);
    const lines = t("intro");
    for (let i = 0; i < lines.length; i++) {
      if (introDone) return;
      if (night && i === lines.length - 1) { await typeLine(box, t("introNight")); await sleep(400); }
      await Promise.all([typeLine(box, lines[i]), speak("intro_" + i)]);
      await sleep(250);
    }
  }
  if (!introDone) { $("#enter").hidden = false; $("#enter").focus({ preventScroll: true }); }
}
function endIntro() {
  if (introDone) return; introDone = true; store.set("seen", "1"); voiceEl.pause();
  $("#intro").classList.add("out"); document.body.classList.remove("locked");
  setTimeout(() => $("#intro") && $("#intro").remove(), 700);
  glitch($("#home h1"));
}
$("#enter").onclick = endIntro; $("#skip").onclick = endIntro;

/* ============ navigation ============ */
const views = ["home", "s1", "s2", "s3", "s4"];
let current = "home", homeY = 0;
function show(name) {
  if (!views.includes(name)) name = "home";
  if (current === "home" && name !== "home") homeY = scrollY;
  views.forEach((v) => $("#" + v).classList.toggle("on", v === name));
  current = name; $("#back").hidden = name === "home"; $("#prompt").hidden = name !== "home";
  document.documentElement.style.scrollBehavior = "auto";
  scrollTo(0, name === "home" ? homeY : 0);
  document.documentElement.style.scrollBehavior = "";
  if (name !== "home") { glitch($(`#${name} h2`)); enter(name); }
  onScroll();
}
let wiping = false;
async function go(n) {
  if (wiping || still) { location.hash = n; return; }
  wiping = true; const w = $("#wipe"); $("#wipeTxt").textContent = n === "home" ? "cd ~" : `./${t(n) || n}`;
  w.classList.remove("run"); void w.offsetWidth; w.classList.add("run");
  await sleep(300); location.hash = n; await sleep(340); w.classList.remove("run"); wiping = false;
}
addEventListener("hashchange", () => show(location.hash.slice(1)));
$("#back").onclick = () => go("home");
$("#contact").onclick = () => {
  const down = () => $("#footer").scrollIntoView({ behavior: "smooth" });
  if (current === "home") down(); else { location.hash = "home"; setTimeout(down, 250); }
};
$$(".sw button").forEach((b) => (b.onclick = () => setLang(b.dataset.l)));

/* ============ accueil : carrousel des 4 avatars ============ */
let act = 0; const n = CHARS.length, half = Math.floor(n / 2);
function renderChars() {
  const box = $("#chars"); box.innerHTML = "";
  CHARS.forEach((c, i) => {
    const b = document.createElement("button"); b.className = "char";
    b.appendChild(fig(c.src, t(c.k))); b.insertAdjacentHTML("beforeend", `<span>${esc(t(c.k))}</span>`);
    b.onclick = () => { if (i === act) go(c.page); else { act = i; layout(); } };
    box.appendChild(b);
  });
  layout();
}
function layout() { $$(".char").forEach((el, i) => { const o = ((i - act + n + half) % n) - half; el.style.setProperty("--o", o); el.style.setProperty("--s", o === 0 ? 1 : 0.62); el.dataset.o = o; }); }
$("#prev").onclick = () => { act = (act - 1 + n) % n; layout(); };
$("#next").onclick = () => { act = (act + 1) % n; layout(); };
let sx = null;
$("#stage").addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
$("#stage").addEventListener("touchend", (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) (dx < 0 ? $("#next") : $("#prev")).click(); sx = null; });
function onScroll() {
  if (current !== "home") return;
  const q = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.7)));
  $("#head").style.transform = `translateY(${-q * 30}vh) scale(${1 - 0.55 * q})`;
  $("#head").style.opacity = String(Math.max(0, 1 - q * 1.6));
  $("#hint").style.opacity = String(1 - q * 3);
  const s = $("#stage"); s.style.opacity = q; s.style.transform = `translateY(${(1 - q) * 60}px)`; s.style.pointerEvents = q > 0.6 ? "auto" : "none";
}
addEventListener("scroll", onScroll, { passive: true });

/* ============ 01 · reconnaissance ============ */
function renderDossier() {
  $("#dossier").innerHTML = t("dossier").map(([k, v], i) => `<dt>${esc(k)}</dt><dd>${i === 0 ? esc(v) : `<span class="red" tabindex="0">${esc(v)}</span>`}</dd>`).join("");
  $$("#dossier .red").forEach((r) => { r.onclick = () => r.classList.add("on"); r.onkeydown = (e) => { if (e.key === "Enter") r.classList.add("on"); }; });
}
$("#reveal").onclick = () => $$("#dossier .red").forEach((r, i) => setTimeout(() => r.classList.add("on"), still ? 0 : i * 120));
function renderDuo(id, lines) {
  $(id).classList.remove("show");
  $(id).innerHTML = lines.map(([w, s], i) => `<p class="${w}" style="transition-delay:${i * 0.9}s"><b>${w === "d" ? t("him") : t("me")}&gt;</b>${esc(s)}</p>`).join("");
}

/* ============ 02 · déchiffrement ============ */
const GLYPHS = "▓▒░#$%&@0123456789ABCDEFabcdef/<>";
const noise = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
const scramble = (s) => s.replace(/\S/g, noise);
function renderFiles() {
  $("#files").innerHTML = FILES.map((f, i) => `<button type="button" class="file" data-k="${i}"><div class="fn"><span>${f.f}</span><span>${esc(p(f.y))}</span></div><h3>${esc(scramble(p(f.t)))}</h3><p>${esc(scramble(p(f.d)))}</p></button>`).join("");
  $$(".file").forEach((el) => (el.onclick = () => decrypt(el)));
}
async function decrypt(el) {
  if (el.classList.contains("dec")) return;
  el.classList.add("dec");
  const f = FILES[+el.dataset.k], h = el.querySelector("h3"), d = el.querySelector("p");
  const T1 = p(f.t), D1 = p(f.d), steps = still ? 1 : 14;
  for (let k = 1; k <= steps; k++) {
    const keep = (s) => s.split("").map((c, j) => (j / s.length < k / steps || c === " " ? c : noise())).join("");
    h.textContent = keep(T1); d.textContent = keep(D1);
    await sleep(45);
  }
  h.textContent = T1; d.textContent = D1;
}

/* ============ 03 · payload : le terminal ============ */
const out = () => $("#out");
const fmt = (s) => esc(s).replace(/&lt;hl&gt;(.+?)&lt;\/hl&gt;/g, '<span class="hl">$1</span>').replace(/&amp;lt;/g, "&lt;").replace(/&amp;gt;/g, "&gt;");
function print(html, cls = "") { const d = document.createElement("div"); if (cls) d.className = cls; d.innerHTML = html; out().appendChild(d); out().scrollTop = out().scrollHeight; }
const say = (s, cls) => print(fmt(s), cls);
let busy = false;
const DEMOS = {
  guardloop: [
    ["c", "$ python examples/lesson_slides.py"],
    ["", "[1/3] pods        call claude-opus-5-5 …"], ["ko", "              429 rate_limited → nouvel essai dans 1.8 s"],
    ["", "              call claude-opus-5-5 … ok  1.2 s  3 104 tokens  cache 64 %"],
    ["ko", "              validate ✗ slides[2].bullets[0] : 14 mots, max 10"], ["ko", "              validate ✗ slides[3] : « Contoso » absent des sources"],
    ["", "              repair (passe 2/3) : corrige seulement ces 2 points …"], ["ok", "              validate ✓  enregistré"],
    ["", "[2/3] services    quota épuisé sur le modèle principal → repli sur claude-sonnet-5-5"], ["ok", "              validate ✓  enregistré"],
    ["ok", "[3/3] ingress     validate ✓  enregistré"],
    ["c", "terminé : 3 ok · 0 échec · une relance reprend là où ça s'est arrêté"],
  ],
  "software-company-ia": [
    ["c", "$ brief: « une appli de réservation de salles »"],
    ["", "cto        → périmètre et priorités"], ["", "architect  → découpage front / back / données"],
    ["", "frontend   → écrans"], ["", "backend    → API et modèle de données"],
    ["", "qa         → tests"], ["", "security   → revue"], ["", "devops     → conteneur et déploiement"],
    ["ok", "application générée, orchestrée par LangGraph"],
  ],
  spec2diagram: [
    ["c", "$ python -m spec2diagram examples/flow.json -o flow.svg"],
    ["", "┌──────────┐    ┌──────────┐    ┌──────────┐\n│ Generate │ ─▶ │ Validate │ ─▶ │   Ship   │\n└──────────┘    └────┬─────┘    └──────────┘\n      ▲              │ repair\n      └──────────────┘"],
    ["ok", "flow.svg écrit · flow.pptx écrit (formes modifiables)"],
  ],
  doc2video: [
    ["c", "$ python -m doc2video examples/pods.md -o pods.mp4"],
    ["", "plan    6 diapositives (extractif : aucun mot hors du document)"], ["", "render  ██████████████████████ 6/6"],
    ["", "voice   ██████████████████████ 6/6"], ["", "ffmpeg  ██████████████████████ assemblage"],
    ["ok", "pods.mp4 · 47 s · pods.srt synchronisé"],
  ],
};
function ls() {
  const tm = t("term"), rows = [];
  for (const g of ["ia", "autres"]) {
    rows.push(`<hl>${tm.groups[g]}</hl>`);
    for (const [k, v] of Object.entries(PROJ)) if (v.g === g) rows.push(`  ${k.padEnd(21)}${p(v.d)}`);
    rows.push("");
  }
  say(rows.join("\n").trim());
}
async function run(cmdRaw) {
  const cmd = cmdRaw.trim(); if (!cmd || busy) return;
  print(`<span class="ko">visiteur@ayoub:~$</span> ${esc(cmd)}`);
  const [c0, ...rest] = cmd.toLowerCase().split(/\s+/), arg = rest.join(" ");
  const tm = t("term");
  if (c0 === "help") say(tm.help);
  else if (c0 === "clear") out().innerHTML = "";
  else if (c0 === "whoami") say(tm.whoami);
  else if (c0 === "sudo" || c0 === "rm") say(tm.sudo, "ko");
  else if (c0 === "exit") say(tm.exit);
  else if (c0 === "ls") ls();
  else if (c0 === "cat" && arg.startsWith("exp")) say(EXP.map(([h, d]) => `<hl>${h}</hl>\n  ${p(d)}`).join("\n\n"));
  else if (c0 === "cat" && arg.startsWith("stack")) say(tm.stack);
  else if (c0 === "cat" && (arg.startsWith("chiffres") || arg.startsWith("numbers"))) say(tm.numbers);
  else if (c0 === "open" || c0 === "run") {
    const pr = PROJ[arg]; if (!pr) return say(tm.noproj.replace("{p}", arg), "ko");
    const link = pr.u ? `→ <a href="${pr.u}" target="_blank" rel="noopener">${pr.u}</a>` : esc(tm.priv);
    if (c0 === "open") { if (pr.u) { say(tm.opening.replace("{u}", pr.u)); window.open(pr.u, "_blank", "noopener"); } else say(tm.priv); return; }
    const demo = DEMOS[arg];
    if (!demo) { print(esc(p(pr.d))); print(link, "c"); return; }
    busy = true;
    for (const [cls, line] of demo) { await sleep(cls === "c" ? 200 : 380); print(esc(line), cls); }
    print(link, "c");
    busy = false;
  } else say(tm.unknown.replace("{c}", c0), "ko");
}
$("#cmdForm").onsubmit = (e) => { e.preventDefault(); const v = $("#cmd").value; $("#cmd").value = ""; run(v); };
function renderTerm() {
  out().innerHTML = ""; say(t("term").hello, "c");
  $("#chips").innerHTML = ["help", "ls", "run guardloop", "run software-company-ia", "run doc2video", "run spec2diagram", "cat chiffres", "cat experiences", "cat stack", "clear"].map((c) => `<button type="button">${c}</button>`).join("");
  $$("#chips button").forEach((b) => (b.onclick = () => run(b.textContent)));
}

/* ============ 04 · ingénierie sociale ============ */
function renderProfile() {
  $("#notes").innerHTML = t("notes").map(([h, s]) => `<li><b>${esc(h)}</b><span>${esc(s)}</span></li>`).join("");
  $("#langs").innerHTML = t("langList").map(([h, s]) => `<li>${esc(h)}<span>${esc(s)}</span></li>`).join("");
}

/* à l'ouverture d'une étape : la voix s'écrit, les lignes arrivent en cascade, les dialogues se rejouent */
let typeTok = 0;
async function typeVoice(el) {
  const tok = ++typeTok, full = t(el.dataset.i); el.innerHTML = '<span class="typed"></span>';
  const sp = el.firstChild;
  for (const ch of full) { if (tok !== typeTok) return; sp.textContent += ch; await sleep(14); }
  sp.classList.remove("typed");
}
function cascade(view) {
  $$(`#${view} #dossier dt, #${view} #dossier dd`).forEach((e, i) => (e.style.animationDelay = 0.35 + Math.floor(i / 2) * 0.07 + "s"));
  $$(`#${view} .file`).forEach((e, i) => (e.style.animationDelay = 0.3 + i * 0.06 + "s"));
  $$(`#${view} .notes li, #${view} .langs li`).forEach((e, i) => (e.style.animationDelay = 0.35 + i * 0.08 + "s"));
}
setInterval(() => {
  if (still || document.hidden) return;
  const el = current === "home" ? $("#home h1") : $(`#${current} h2`);
  if (!el) return; el.classList.remove("twitch"); void el.offsetWidth; el.classList.add("twitch");
}, 6500);
function enter(name) {
  const v = $(`#${name} .voice`); if (v) typeVoice(v);
  cascade(name);
  if (name === "s1") { renderDuo("#duo1", t("duo1")); setTimeout(() => $("#duo1").classList.add("show"), 500); }
  if (name === "s4") { renderDuo("#duo4", t("duo4")); setTimeout(() => $("#duo4").classList.add("show"), 500); }
  if (name === "s3" && matchMedia("(hover: hover)").matches) setTimeout(() => $("#cmd").focus({ preventScroll: true }), 300);
}

/* ============ 05 · exfiltration et révélation ============ */
async function exfil() {
  const b = $("#exfil"), log = $("#exlog"); b.disabled = true; log.innerHTML = "";
  for (const s of t("exsteps")) {
    const row = document.createElement("div"); log.appendChild(row);
    for (let k = 0; k < 12; k++) { row.textContent = s + " " + "█".repeat(k + 1).padEnd(12, "░"); await sleep(55); }
    row.innerHTML = esc(s) + ' <span class="ok">ok</span>';
  }
  await copyText("amraniayoub846@gmail.com");
  log.insertAdjacentHTML("beforeend", `<div class="ok">${esc(t("exdone"))}</div>`);
  $("#links").hidden = false;
  await sleep(1400);
  document.body.classList.add("shake"); await sleep(450); document.body.classList.remove("shake");
  $("#twist").hidden = false; renderTwist();
  $("#twist").scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
  const ps = $$("#twistTxt p");
  for (let i = 0; i < ps.length; i++) {
    ps[i].classList.add("on");
    await (i < 5 ? Promise.all([speak("twist_" + i), sleep(900)]) : sleep(600));
    await sleep(250);
  }
}
function renderTwist() { $("#twistTxt").innerHTML = t("twist").map((s) => `<p>${esc(s)}</p>`).join("") + `<p class="sig">${esc(t("sig"))}</p>`; }
$("#exfil").onclick = exfil;
new IntersectionObserver((e) => { if (e[0].isIntersecting) glitch($("#footer h2")); }, { threshold: 0.4 }).observe($("#footer"));

/* « ne pas cliquer » */
$("#dont").onclick = async () => {
  const c = $("#crash"), tx = $("#crashTxt"); c.hidden = false; tx.textContent = "";
  for (const line of t("crash").split("\n")) { tx.textContent += line + "\n"; await sleep(160); }
  await sleep(900); tx.textContent += t("crashEnd"); await sleep(1300); c.hidden = true;
};

/* clavier : flèches dans le carrousel, et taper « help » n'importe où ouvre le terminal */
let buf = "";
addEventListener("keydown", (e) => {
  if (!introDone) { if (e.key === "Escape" || (e.key === "Enter" && !$("#enter").hidden)) endIntro(); return; }
  if (e.target.tagName === "INPUT") return;
  if (current === "home" && e.key === "ArrowLeft") $("#prev").click();
  if (current === "home" && e.key === "ArrowRight") $("#next").click();
  if (e.key.length === 1) { buf = (buf + e.key.toLowerCase()).slice(-4); if (buf === "help") { go("s3"); setTimeout(() => run("help"), 400); } }
});

/* ============ copie ============ */
let toastT;
function toast(msg) {
  let el = $("#toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("on"), 1800);
}
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); return true; } catch (e) {}
  try {
    const ta = document.createElement("textarea"); ta.value = txt; ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0"; document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove(); return ok;
  } catch (e) { return false; }
}
$$(".mail").forEach((b) => (b.onclick = async () => {
  if (await copyText(b.dataset.copy)) { b.classList.add("done"); toast(t("copied") + " " + b.dataset.copy); setTimeout(() => b.classList.remove("done"), 1500); }
  else toast(b.dataset.copy);
}));

/* ============ langue ============ */
function setLang(l) {
  L = l; store.set("lang", l);
  document.documentElement.lang = l;
  $$("[data-i]").forEach((e) => { const v = t(e.dataset.i); if (typeof v === "string") { e.textContent = v; if (e.hasAttribute("data-gl")) e.dataset.text = v; } });
  $$(".sw button").forEach((b) => b.classList.toggle("on", b.dataset.l === l));
  renderChars(); renderDossier(); renderFiles(); renderTerm(); renderProfile();
  if (!$("#twist").hidden) { renderTwist(); $$("#twistTxt p").forEach((el) => el.classList.add("on")); }
  if (current === "s1" || current === "s4") enter(current);
}
$$("[data-char]").forEach((el) => el.appendChild(fig(SRC[el.dataset.char], "Ayoub")));
setLang(L);
show(location.hash.slice(1));
intro();
