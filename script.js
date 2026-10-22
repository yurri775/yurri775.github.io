/* ============ CONTENU ============ */
// Uniquement des faits vérifiés (registre faits_verifies.json). Les quatre avatars : une tenue par étape.
const CHARS = [
  { page: "s1", k: "s1", src: "assets/ink/who.webp" },
  { page: "s2", k: "s2", src: "assets/ink/parcours.webp" },
  { page: "s3", k: "s3", src: "assets/ink/travail.webp" },
  { page: "s4", k: "s4", src: "assets/ink/passions.webp" },
];
const SRC = { who: CHARS[0].src, parcours: CHARS[1].src, travail: CHARS[2].src, passions: CHARS[3].src };

const T = {
  fr: {
    skip: "passer ›", enter: "[ entrer ]", contact: "./exfiltrer",
    gate: "Voir le portfolio ›", gateBack: "Voir le portfolio ›", sndHint: "🔊 avec le son, c'est mieux", wipe: "connexion…",
    fkNav1: "Projets", fkNav2: "Parcours", fkNav3: "Contact", fkKicker: "Ingénieur logiciel · disponible",
    fkTitle: "Je conçois des applications web, des chaînes de données et des systèmes d'IA, et je les mets en production.",
    fkF1k: "formation", fkF1: "Master 2 Informatique, INSA", fkF2k: "base", fkF2: "Valenciennes, France", fkF3k: "langues", fkF3: "FR · AR · EN C1", fkCap: "Valenciennes · 2026",
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
    lead: "Ingénieur logiciel, Bac+5. Full-stack, data, cloud, et de l'IA qui tient en production.",
    qParcours: "parcours", qProjets: "projets", qContact: "contact",
    down: "descends ↓", pick: "choisis ta cible",
    s1: "01_reconnaissance", s2: "02_dechiffrement", s3: "03_payload", s4: "04_ingenierie_sociale", s5: "05_exfiltration",
    v1: "Première règle : connaître sa cible. Ici, la cible, c'est moi. Passe le doigt sur ce qui est caviardé.",
    v2: "Son parcours est chiffré. Descends la ligne : chaque station se déchiffre à ton passage.",
    v3: "Voilà ce qu'il fabrique. Ne me crois pas sur parole : lance-le toi-même.",
    v4: "Tout le monde a des failles. Les siennes en disent plus long que son CV.",
    v5: "Dernière étape. Tu repars avec ce qu'il te faut.",
    reveal: "tout révéler", weak: "points faibles", langs: "langues",
    exfil: "[ exfiltrer le contact ]", dont: "ne pas cliquer", copied: "copié :",
    me: "moi", him: "lui",
    dossier: [
      ["SUJET", "Ayoub Amrani"],
      ["RÔLE", "ingénieur logiciel : full-stack, data, cloud, IA"],
      ["STATUT", "disponible immédiatement : poste d'ingénieur logiciel, data ou IA"],
      ["FORMATION", "Bac+5 : Master 2 Informatique, parcours TNSID, INSA Hauts-de-France (2024 – 2026)"],
      ["ANTÉCÉDENTS", "trois ans de médecine à Paris 7 · régulateur au SAMU 92"],
      ["TERRAIN", "applications web (React, Java Spring Boot), données (Python, SQL, Power BI), serveurs en production (Docker, Nginx, Linux), chaînes LLM fiables"],
      ["DERNIÈRE MISSION", "IDC Academy, 2026 : plateforme e-learning mise en production, plus de 1 000 leçons vidéo produites par une chaîne IA et vérifiées"],
      ["BASE", "Valenciennes (Nord)"],
      ["PREUVES", "chaque phrase de ce site vient d'un registre de faits vérifiés ; rien n'est inventé"],
    ],
    duo1: [["d", "Dis-leur que tu ne fais que de l'IA. Ça vend."], ["a", "Non. Une banque, un groupe industriel, une plateforme en production. L'IA en plus."], ["d", "Trop honnête."], ["a", "Vérifiable."]],
    duo4: [["d", "Mets que tu parles japonais."], ["a", "Arabe, français, anglais C1."], ["d", "Personne ne vérifiera."], ["a", "Moi, si. C'est le principe."]],
    notes: [
      ["Jeux vidéo", "les systèmes à règles, et l'endroit exact où elles cèdent."],
      ["Cuisine", "la précision d'abord, l'improvisation ensuite."],
      ["Voyage", "Maroc, France : il s'adapte vite à un nouvel environnement."],
      ["Recherche", "lit la publication jusqu'aux annexes avant d'y croire."],
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
    gate: "View portfolio ›", gateBack: "View portfolio ›", sndHint: "🔊 better with sound on", wipe: "connecting…",
    fkNav1: "Projects", fkNav2: "Background", fkNav3: "Contact", fkKicker: "Software engineer · available",
    fkTitle: "I design web applications, data pipelines and AI systems, and I put them into production.",
    fkF1k: "education", fkF1: "Master's in CS, INSA", fkF2k: "based in", fkF2: "Valenciennes, France", fkF3k: "languages", fkF3: "FR · AR · EN C1", fkCap: "Valenciennes · 2026",
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
    lead: "Software engineer, Master's degree. Full-stack, data, cloud, and AI that holds up in production.",
    qParcours: "path", qProjets: "projects", qContact: "contact",
    down: "scroll ↓", pick: "pick your target",
    s1: "01_recon", s2: "02_decrypt", s3: "03_payload", s4: "04_social_engineering", s5: "05_exfiltration",
    v1: "First rule: know your target. Here, the target is me. Run your finger over what's redacted.",
    v2: "His path is encrypted. Ride the line down: each stop decrypts as you pass.",
    v3: "This is what he builds. Don't take my word for it: run it yourself.",
    v4: "Everyone has weaknesses. His say more than his CV.",
    v5: "Last step. You leave with what you need.",
    reveal: "reveal all", weak: "weaknesses", langs: "languages",
    exfil: "[ exfiltrate contact ]", dont: "do not click", copied: "copied:",
    me: "me", him: "him",
    dossier: [
      ["SUBJECT", "Ayoub Amrani"],
      ["ROLE", "software engineer: full-stack, data, cloud, AI"],
      ["STATUS", "available now: software, data or AI engineering role"],
      ["EDUCATION", "Master's in Computer Science, TNSID track, INSA Hauts-de-France (2024 – 2026)"],
      ["BACKGROUND", "three years of medical school in Paris · emergency dispatcher at SAMU 92"],
      ["FIELD", "web apps (React, Java Spring Boot), data (Python, SQL, Power BI), production servers (Docker, Nginx, Linux), reliable LLM pipelines"],
      ["LAST MISSION", "IDC Academy, 2026: e-learning platform put into production, more than 1,000 video lessons produced by an AI pipeline and checked"],
      ["BASE", "Valenciennes, France"],
      ["EVIDENCE", "every sentence on this site comes from a register of checked facts; nothing is made up"],
    ],
    duo1: [["d", "Tell them you only do AI. It sells."], ["a", "No. A bank, an industrial group, a platform in production. AI on top."], ["d", "Too honest."], ["a", "Verifiable."]],
    duo4: [["d", "Say you speak Japanese."], ["a", "Arabic, French, English C1."], ["d", "Nobody will check."], ["a", "I will. That's the point."]],
    notes: [
      ["Video games", "systems with rules, and the exact spot where they give way."],
      ["Cooking", "precision first, improvisation second."],
      ["Travel", "Morocco, France: adapts fast to a new environment."],
      ["Research", "reads the paper down to the appendix before believing it."],
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
// Le parcours, du plus récent au plus ancien : une ligne de métro. k : "edu" (formation, station express) ou "job" (expérience, station locale).
// Uniquement des faits vérifiés (registre faits_verifies.json).
const FILES = [
  { f: "master.gpg", k: "edu", y: "2024–2026", t: ["Master 2 Informatique · TNSID", "Master's in Computer Science · TNSID"], d: ["INSA Hauts-de-France, Valenciennes. Diplôme en cours de délivrance.", "INSA Hauts-de-France, Valenciennes. Degree being issued."] },
  { f: "idc.log", k: "job", y: "2026", t: ["Stage de fin d'études · IDC Academy (StockData)", "Final internship · IDC Academy (StockData)"], d: ["Paris. Développeur et ingénieur IA : plateforme e-learning sous Odoo 17 livrée en 13 sprints et mise en production, chaîne IA de production de cours (plus de 1 000 leçons vidéo publiées), exploitation du serveur (Docker, Nginx).", "Paris. Developer and AI engineer: Odoo 17 e-learning platform shipped in 13 sprints and put in production, AI course-production pipeline (over 1,000 video lessons published), server operations (Docker, Nginx)."] },
  { f: "attijari.log", k: "job", y: ["juin–août 2024", "Jun–Aug 2024"], t: ["Stage développeur full-stack · Attijariwafa Bank", "Full-stack developer intern · Attijariwafa Bank"], d: ["Maroc. Plateforme de gestion de crédit en React et Spring Boot, API REST sécurisées, documentation technique.", "Morocco. Credit management platform in React and Spring Boot, secured REST APIs, technical documentation."] },
  { f: "licence.gpg", k: "edu", y: "2021–2024", t: ["Licence Ingénierie logicielle", "Bachelor in Software Engineering"], d: ["ESISA, Fès (Maroc).", "ESISA, Fès (Morocco)."] },
  { f: "ocp.log", k: "job", y: ["juin–août 2023", "Jun–Aug 2023"], t: ["Stage Data Analyst · OCP Group", "Data Analyst intern · OCP Group"], d: ["Maroc. Données industrielles en Python (Pandas, NumPy), tableaux de bord Power BI, détection d'anomalies par machine learning.", "Morocco. Industrial data in Python (Pandas, NumPy), Power BI dashboards, machine-learning anomaly detection."] },
  { f: "samu.log", k: "job", y: ["2020–2021", "2020–2021"], t: ["Régulateur · SAMU 92", "Emergency dispatcher · SAMU 92"], d: ["Organisation des interventions d'urgence, en équipe, sous pression, avec des protocoles stricts.", "Coordinating emergency responses, as a team, under pressure, with strict protocols."] },
  { f: "medecine.gpg", k: "edu", y: ["3e année", "3rd year"], t: ["Études de médecine", "Medical school"], d: ["Université Paris 7 (Bichat). Avant l'informatique.", "Université Paris 7 (Bichat). Before computer science."] },
  { f: "croix-rouge.log", k: "job", y: "2018–2021", t: ["Bénévole · Croix-Rouge 92", "Volunteer · Red Cross 92"], d: ["Accompagnement des personnes en difficulté, en équipe.", "Supporting people in difficulty, as a team."] },
  { f: "bac.gpg", k: "edu", y: "2017", t: ["Baccalauréat scientifique", "Scientific baccalaureate"], d: ["Série S. Le point de départ.", "Science track. Where it started."] },
];
// certifications : celles du CV vérifié et celles de son profil LinkedIn, intitulées comme l'organisme les délivre
const CERTS = [
  ["Building with the Claude API", ["Anthropic · 2026", "Anthropic · 2026"]],
  ["L'IA et moi : usage éthique et raisonné", ["Université Polytechnique Hauts-de-France · 2025", "Université Polytechnique Hauts-de-France · 2025"]],
  ["Azure Fundamentals (AZ-900)", "Microsoft"],
  ["Cloud Digital Leader", "Google Cloud"],
  ["SecNumacadémie", ["ANSSI · cybersécurité · 2024", "ANSSI · cybersecurity · 2024"]],
  ["Ethical Hacker", "Cisco Networking Academy · 2024"],
  ["Python Essentials 1", "Cisco Networking Academy · 2024"],
  ["NDG Linux Essentials", "Cisco"],
  ["IBM Data Science", "IBM · 2024"],
  ["Learn React · Learn JavaScript", "Scrimba · 2024"],
  ["TOEIC · C1", ["anglais", "English"]],
];
// Projets triés : l'IA d'abord, puis le reste qui montre autre chose (recherche, mobile, Java).
const PROJ = {
  guardloop: { c: "ia", g: "ia", u: "https://github.com/yurri775/guardloop", d: ["Harnais pour chaînes LLM en production : relances, repli sur un autre modèle, journal des coûts, validation par règles et réparation ciblée.", "Harness for production LLM pipelines: retries, model fallback, cost journal, rule-based validation with targeted repair."] },
  "software-company-ia": { c: "ia", g: "ia", priv: true, d: ["Plateforme multi-agents (LangGraph) : un brief texte passe par un CTO, un architecte, des agents front et back, QA, sécurité et DevOps, et ressort en application.", "Multi-agent platform (LangGraph): a text brief goes through a CTO, an architect, front and back agents, QA, security and DevOps, and comes out as an application."] },
  doc2video: { c: "ia", g: "ia", u: "https://github.com/yurri775/doc2video", d: ["Un document Markdown devient une vidéo de cours narrée, avec diapositives et sous-titres.", "A Markdown document becomes a narrated lesson video with slides and subtitles."] },
  spec2diagram: { c: "ia", g: "ia", u: "https://github.com/yurri775/spec2diagram", d: ["Des schémas propres à partir d'une spécification JSON, en SVG ou en formes PowerPoint modifiables.", "Clean diagrams from a JSON spec, as SVG or editable PowerPoint shapes."] },
  "prospect-qualifier": { c: "ia", g: "ia", u: "https://github.com/yurri775/prospect-qualifier", d: ["Agent de qualification de prospects : n8n, LLM, RAG sur Qdrant avec embeddings locaux, synchronisation HubSpot.", "Lead-qualification agent: n8n, LLM, RAG on Qdrant with local embeddings, HubSpot sync."] },
  rag: { c: "ia", g: "ia", u: "https://github.com/yurri775/rag", d: ["Cinq chaînes RAG dans n8n, de la recherche vectorielle simple à la recherche contextuelle avec reclassement.", "Five RAG pipelines in n8n, from basic vector search to contextual retrieval with re-ranking."] },
  "kit-candidature": { c: "ia", g: "ia", u: "https://github.com/yurri775/kit-candidature", d: ["CV lisibles par les logiciels de recrutement, générés depuis un seul fichier, et un dossier par offre en une commande.", "ATS-readable CVs generated from a single file, and one application folder per job offer in one command."] },
  maya: { c: "recherche", g: "autres", u: "https://github.com/yurri775/MAYA", d: ["Recherche : morphing de visages, qualité biométrique et attaques par inférence d'appartenance sur des classifieurs.", "Research: face morphing, biometric quality and membership-inference attacks on face classifiers."] },
  "test-mately": { c: "web", g: "autres", u: "https://github.com/yurri775/test-mately", d: ["Gestionnaire de tâches collaboratif en temps réel : Node.js, Socket.io, MongoDB et application mobile React Native.", "Real-time collaborative task manager: Node.js, Socket.io, MongoDB and a React Native mobile app."] },
  palapi: { c: "web", g: "autres", u: "https://github.com/yurri775/palapi-pal-default", d: ["API REST en Java Spring Boot et PostgreSQL, image Docker en plusieurs étapes, analysée par Trivy et Docker Scout.", "REST API in Java Spring Boot and PostgreSQL, multi-stage Docker build, scanned with Trivy and Docker Scout."] },
  "idc-academy": { c: "web", g: "autres", priv: true, d: ["Plateforme e-learning gamifiée sous Odoo 17 (Python) pour un organisme de formation IT : livrée en 13 sprints et mise en production.", "Gamified e-learning platform on Odoo 17 (Python) for an IT training company: shipped in 13 sprints and put into production."] },
  "pptx-pipeline": { c: "ia", g: "ia", priv: true, d: ["La chaîne IA de production de cours vidéo d'IDC Academy : plus de 1 000 leçons publiées. Voir l'étude de cas ci-dessus.", "IDC Academy's AI video-course pipeline: over 1,000 lessons published. See the case study above."] },
  "fraud-detection": { c: "data", g: "autres", u: "https://github.com/yurri775/system_detection_fraud_credit_card", d: ["Détection de fraude à la carte bancaire sur données déséquilibrées : modèles de machine learning, interface React, architecture AWS.", "Credit-card fraud detection on imbalanced data: machine-learning models, React front end, AWS architecture."] },
  "cascade": { c: "data", g: "autres", u: "https://github.com/yurri775/CascadeProjects", d: ["Simulation logistique de barges : positions de la flotte, taux d'utilisation et couverture de la demande.", "Barge logistics simulation: fleet positions, utilisation and demand coverage."] },
  "nurse-rostering": { c: "recherche", g: "autres", u: "https://github.com/yurri775/nurse-rostering-vns", d: ["Planification des équipes d'infirmiers résolue par une métaheuristique de recherche à voisinage variable (VNS).", "Nurse rostering solved with a Variable Neighbourhood Search metaheuristic."] },
  "face-morphing": { c: "recherche", g: "autres", u: "https://github.com/yurri775/Face-Morphing", d: ["Morphing entre deux visages : points caractéristiques, triangulation de Delaunay, rendu vidéo.", "Morphing between two faces: facial landmarks, Delaunay triangulation, video output."] },
  "dip-controle": { c: "web", g: "autres", priv: true, d: ["Site de révision en droit international privé : quiz, cas pratiques en trois niveaux, contrôle blanc chronométré ; testé sur iPhone, lisible même sans JavaScript.", "Private international law revision site: quiz, practice cases in three levels, timed mock exam; tested on iPhone, readable even without JavaScript."] },
  "eps1.0_ayoub.exe": { c: "web", g: "autres", u: "https://github.com/yurri775/yurri775.github.io", d: ["Ce site : un monde 3D en Three.js, GSAP et Howler, construit et testé à chaque envoi (Playwright, iPhone et ordinateur).", "This site: a 3D world in Three.js, GSAP and Howler, built and tested on every push (Playwright, iPhone and desktop)."] },
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
// Avatars animés (vidéo MiniMax sur fond noir, fondue dans la page) : l'image reste en secours.
const MOTION = {}; // la vidéo animée était en couleurs : retirée du monde à l’encre
function fig(src, alt, noMotion) {
  const d = document.createElement("div"); d.className = "fig";
  if (MOTION[src] && !still && !noMotion) {
    const v = document.createElement("video");
    Object.assign(v, { muted: true, loop: true, autoplay: true, playsInline: true, preload: "auto", poster: src });
    v.setAttribute("aria-label", alt); v.src = MOTION[src];
    v.onerror = () => { const im = new Image(); im.alt = alt; im.src = src; v.replaceWith(im); };
    d.classList.add("anim"); d.appendChild(v); return d;
  }
  const im = new Image(); im.alt = alt; im.decoding = "async";
  im.onerror = () => { d.innerHTML = `<div class="ph">${SIL}</div>`; };
  im.src = src; d.appendChild(im); return d;
}
function glitch(el) { if (!el || still) return; el.dataset.text = el.textContent; el.classList.remove("go"); void el.offsetWidth; el.classList.add("go"); }

/* ============ voix ============ */
// Un seul élément audio, réutilisé pour toutes les répliques. Safari (iPhone) n'autorise le son
// que si un geste du visiteur lance une vraie lecture NON muette : au premier toucher, on joue un
// court silence sur cet élément, qui reste ensuite autorisé pour toute la visite.
const voiceEl = new Audio(); voiceEl.preload = "auto"; voiceEl.setAttribute("playsinline", "");
let soundOn = store.get("sound") !== "off", voiceUnlocked = false;
function unlockVoice() {
  if (voiceUnlocked || !soundOn) return;
  voiceEl.muted = false; voiceEl.src = "assets/voice/silence.mp3";
  const pr = voiceEl.play();
  if (pr) pr.then(() => { voiceUnlocked = true; }).catch(() => {}); else voiceUnlocked = true;
}
// tout premier toucher, n'importe où (bouton « passer », exfiltration…), débloque aussi le son
["pointerdown", "touchend", "keydown"].forEach((ev) => addEventListener(ev, unlockVoice, { capture: true, passive: true }));
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
$("#snd").onclick = () => { soundOn = !soundOn; store.set("sound", soundOn ? "on" : "off"); if (!soundOn) voiceEl.pause(); else unlockVoice(); renderSnd(); };
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
  try { const g = await getJSON("https://ipapi.co/json/", 5000); if (g && g.ip && !g.error) return g; } catch (e) {}
  try { const g = await getJSON("https://api.ipify.org?format=json", 3000); return { ip: g.ip }; } catch (e) { return {}; }
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
  for (const ch of text) { if (introDone) return; span.textContent += ch; await sleep(32); }
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
  // navigateur piloté (tests sur serveur sans carte graphique) : la 3D occupe le processeur, on retire l'intro tout de suite
  if (navigator.webdriver) $("#intro").remove(); else setTimeout(() => $("#intro") && $("#intro").remove(), 700);
  glitch($("#home h1")); if (window.world && window.world.start) world.start();
}
$("#enter").onclick = endIntro; $("#skip").onclick = endIntro;

/* ============ navigation ============ */
const views = ["home", "s1", "s2", "s3", "s4", "s5"];
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
  if (window.world && window.world.start) world.onView(name);
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
$("#contact").onclick = () => go("s5");
$$(".sw button").forEach((b) => (b.onclick = () => setLang(b.dataset.l)));

/* ============ accueil : le monde (world.js) ============ */
// world.js anime la rue, le personnage et les bâtiments ; il expose window.world.

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
  const lab = (fr, en) => (L === "fr" ? fr : en);
  $("#files").innerHTML =
    `<div class="metro-key"><span><i class="dot edu"></i>${lab("formation", "education")}</span><span><i class="dot job"></i>${lab("expérience", "experience")}</span></div>` +
    `<div class="metro"><div class="here">${lab("vous êtes ici · disponible immédiatement", "you are here · available now")}</div>` +
    FILES.map((f, i) => `<button type="button" class="file stop ${f.k}" data-k="${i}"><span class="yr">${esc(p(f.y))}</span><div class="fn"><span>${f.f}</span><span>${f.k === "edu" ? lab("formation", "education") : lab("expérience", "experience")}</span></div><h3>${esc(scramble(p(f.t)))}</h3><p>${esc(scramble(p(f.d)))}</p></button>`).join("") +
    `<div class="terminus">${lab("terminus · 2017", "end of the line · 2017")}</div></div>` +
    `<div class="branch"><h3>${lab("ligne C · certifications", "line C · certifications")}</h3><ul>${CERTS.map(([n, o]) => `<li><b>${esc(n)}</b><span>${esc(p(o))}</span></li>`).join("")}</ul></div>`;
  $$(".file").forEach((el) => (el.onclick = () => decrypt(el)));
  // chaque station se déchiffre quand elle arrive à l'écran
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && current === "s2") { io.unobserve(e.target); setTimeout(() => decrypt(e.target), 150); } }), { threshold: 0.6 });
    $$(".file").forEach((el) => io.observe(el));
  }
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

// étude de cas : la chaîne IA de production de cours (stage IDC Academy). Faits du registre uniquement.
const CASE = {
  fr: { k: "étude de cas · stage IDC Academy (StockData), 2026", h: "Une chaîne IA qui transforme des supports de cours en leçons vidéo", prob: ["le problème", "Un organisme de formation IT devait publier des cours vidéo sur des dizaines de certifications, à partir de supports PowerPoint."], built: ["ce que j'ai construit", "Une chaîne en Python pilotant des modèles Claude, de bout en bout, et la plateforme e-learning sous Odoo 17 qui les publie."], steps: ["supports PPTX", "extraction", "description et tri des images", "diapositives et narration", "synthèse vocale", "montage", "contrôle : rien d'inventé", "publication Odoo 17"], nums: [["1 000+", "leçons vidéo publiées"], ["13", "sprints livrés"], ["~9 000", "figures auditées (licences)"], ["11", "parcours de certification"]], learn: ["ce que j'en retiens", "Un modèle génère vite, mais il invente. Le contrôle automatique, qui repère ce qui n'est pas dans les sources, compte autant que la génération."] },
  en: { k: "case study · IDC Academy (StockData) internship, 2026", h: "An AI pipeline that turns course material into video lessons", prob: ["the problem", "An IT training company needed video courses across dozens of certifications, starting from PowerPoint material."], built: ["what I built", "An end-to-end Python pipeline driving Claude models, and the Odoo 17 e-learning platform that publishes the lessons."], steps: ["PPTX material", "extraction", "image description and sorting", "slides and narration", "text-to-speech", "editing", "check: nothing made up", "Odoo 17 publishing"], nums: [["1,000+", "video lessons published"], ["13", "sprints shipped"], ["~9,000", "figures audited (licences)"], ["11", "certification tracks"]], learn: ["what I took from it", "A model generates fast, but it makes things up. The automated check that catches what is not in the sources matters as much as the generation."] },
};
function renderCase() {
  const c = CASE[L];
  $("#case").innerHTML = `<p class="sec">${esc(c.k)}</p><h3 class="case-h">${esc(c.h)}</h3>
    <div class="case-cols"><div><h4>${esc(c.prob[0])}</h4><p>${esc(c.prob[1])}</p></div><div><h4>${esc(c.built[0])}</h4><p>${esc(c.built[1])}</p></div></div>
    <ol class="flow">${c.steps.map((s, i) => `<li class="${i === 6 ? "check" : ""}"><span>${String(i + 1).padStart(2, "0")}</span>${esc(s)}</li>`).join("")}</ol>
    <dl class="nums">${c.nums.map(([n, l]) => `<div><dt>${esc(n)}</dt><dd>${esc(l)}</dd></div>`).join("")}</dl>
    <blockquote><h4>${esc(c.learn[0])}</h4><p>${esc(c.learn[1])}</p></blockquote>`;
}
// les projets, visibles sans taper de commande ; la pile technique en dessous
// logos des technologies : Simple Icons (CC0), un tracé SVG 24×24 et la couleur de la marque
const ICONS = {"Python":["M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z","3776AB"],"Java":["M11.915 0 11.7.215C9.515 2.4 7.47 6.39 6.046 10.483c-1.064 1.024-3.633 2.81-3.711 3.551-.093.87 1.746 2.611 1.55 3.235-.198.625-1.304 1.408-1.014 1.939.1.188.823.011 1.277-.491a13.389 13.389 0 0 0-.017 2.14c.076.906.27 1.668.643 2.232.372.563.956.911 1.667.911.397 0 .727-.114 1.024-.264.298-.149.571-.33.91-.5.68-.34 1.634-.666 3.53-.604 1.903.062 2.872.39 3.559.704.687.314 1.15.664 1.925.664.767 0 1.395-.336 1.807-.9.412-.563.631-1.33.72-2.24.06-.623.055-1.32 0-2.066.454.45 1.117.604 1.213.424.29-.53-.816-1.314-1.013-1.937-.198-.624 1.642-2.366 1.549-3.236-.08-.748-2.707-2.568-3.748-3.586C16.428 6.374 14.308 2.394 12.13.215zm.175 6.038a2.95 2.95 0 0 1 2.943 2.942 2.95 2.95 0 0 1-2.943 2.943A2.95 2.95 0 0 1 9.148 8.98a2.95 2.95 0 0 1 2.942-2.942zM8.685 7.983a3.515 3.515 0 0 0-.145.997c0 1.951 1.6 3.55 3.55 3.55 1.95 0 3.55-1.598 3.55-3.55 0-.329-.046-.648-.132-.951.334.095.64.208.915.336a42.699 42.699 0 0 1 2.042 5.829c.678 2.545 1.01 4.92.846 6.607-.082.844-.29 1.51-.606 1.94-.315.431-.713.651-1.315.651-.593 0-.932-.27-1.673-.61-.741-.338-1.825-.694-3.792-.758-1.974-.064-3.073.293-3.821.669-.375.188-.659.373-.911.5s-.466.2-.752.2c-.53 0-.876-.209-1.16-.64-.285-.43-.474-1.101-.545-1.948-.141-1.693.176-4.069.823-6.614a43.155 43.155 0 0 1 1.934-5.783c.348-.167.749-.31 1.192-.425zm-3.382 4.362a.216.216 0 0 1 .13.031c-.166.56-.323 1.116-.463 1.665a33.849 33.849 0 0 0-.547 2.555 3.9 3.9 0 0 0-.2-.39c-.58-1.012-.914-1.642-1.16-2.08.315-.24 1.679-1.755 2.24-1.781zm13.394.01c.562.027 1.926 1.543 2.24 1.783-.246.438-.58 1.068-1.16 2.08a4.428 4.428 0 0 0-.163.309 32.354 32.354 0 0 0-.562-2.49 40.579 40.579 0 0 0-.482-1.652.216.216 0 0 1 .127-.03z","000000"],"JavaScript":["M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z","F7DF1E"],"React":["M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z","61DAFB"],"Spring Boot":["m23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z","6DB33F"],"Node.js":["M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z","5FA04E"],"Odoo 17":["M21.1002 15.7957c-1.6015 0-2.8997-1.2983-2.8997-2.8998s1.2983-2.8997 2.8997-2.8997c1.6015 0 2.8998 1.2982 2.8998 2.8997 0 1.5999-1.2979 2.8998-2.8998 2.8998zm0-1.2c.9388.0006 1.7003-.7601 1.7008-1.6989.0004-.9388-.7602-1.7003-1.699-1.7007h-.0018c-.9388.0004-1.6994.7619-1.699 1.7007.0005.9381.761 1.6985 1.699 1.699zm-6.0655 1.2c-1.6014 0-2.8997-1.2983-2.8997-2.8998s1.2983-2.8997 2.8997-2.8997c1.6015 0 2.8998 1.2982 2.8998 2.8997 0 1.5999-1.2999 2.8998-2.8998 2.8998zm0-1.2c.9389.0006 1.7003-.7601 1.7008-1.6989.0005-.9388-.7602-1.7003-1.699-1.7007h-.0018c-.9388.0004-1.6994.7619-1.699 1.7007.0005.9381.761 1.6985 1.699 1.699zM11.865 12.858c0 1.6199-1.2979 2.9378-2.8977 2.9378s-2.8998-1.314-2.8998-2.9358 1.1799-2.8597 2.8998-2.8597c.6359 0 1.2239.134 1.6998.484v-1.68a.6.6 0 0 1 1.2 0v4.0537h-.002zm-2.8977 1.7399c.9388.0005 1.7002-.7602 1.7007-1.699.0005-.9388-.7602-1.7003-1.699-1.7007h-.0017c-.9389.0004-1.6995.7619-1.699 1.7007.0004.9381.7608 1.6985 1.699 1.699zm-6.0675 1.1979C1.2983 15.7957 0 14.4974 0 12.8959s1.2983-2.8997 2.8998-2.8997 2.8997 1.2982 2.8997 2.8997c0 1.5999-1.2999 2.8998-2.8997 2.8998zm0-1.2c.9388.0006 1.7002-.7601 1.7007-1.699.0005-.9387-.7602-1.7002-1.699-1.7006h-.0017c-.9388.0004-1.6995.7619-1.699 1.7007.0004.9381.7608 1.6985 1.699 1.699z","714B67"],"Docker":["M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z","2496ED"],"Nginx":["M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm6 16.59c0 .705-.646 1.29-1.529 1.29-.631 0-1.351-.255-1.801-.81l-6-7.141v6.66c0 .721-.57 1.29-1.274 1.29H7.32c-.721 0-1.29-.6-1.29-1.29V7.41c0-.705.63-1.29 1.5-1.29.646 0 1.38.255 1.83.81l5.97 7.141V7.41c0-.721.6-1.29 1.29-1.29h.075c.72 0 1.29.6 1.29 1.29v9.18H18z","009639"],"Linux":["M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z","FCC624"],"Git":["M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187","F05032"],"Pandas":["M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z","150458"],"scikit-learn":["M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312a.21.21 0 0 1 .06-.013c.063 0 .116.047.157.14.04.095.061.221.061.38 0 .451-.104.888-.312 1.31-.207.422-.532.873-.974 1.352-.018.23-.027.388-.027.474 0 .193.036.345.106.458.071.113.165.169.282.169a.71.71 0 0 0 .382-.13c.132-.084.333-.26.602-.523.028-.418.187-.798.482-1.142.324-.38.685-.569 1.08-.569.206 0 .37.054.494.16a.524.524 0 0 1 .186.417c0 .458-.486.829-1.459 1.114.088.43.32.646.693.646a.807.807 0 0 0 .417-.117c.129-.076.321-.243.575-.497.032-.252.118-.495.259-.728.182-.3.416-.544.701-.73.285-.185.537-.278.756-.278.276 0 .47.127.58.381l.677-.374h.186l-.292.971c-.15.488-.226.823-.226 1.004 0 .19.067.285.202.285.086 0 .181-.045.285-.137.104-.092.25-.232.437-.42v.001c.143-.155.274-.32.392-.494-.19-.084-.285-.21-.285-.375 0-.17.058-.352.174-.545.116-.194.275-.29.479-.29.172 0 .258.088.258.265 0 .139-.05.338-.149.596.367-.04.687-.32.961-.842l.228-.01c1.059-2.438.828-5.075-.83-6.732-1.019-1.02-2.408-1.5-3.895-1.471zm4.725 8.203a8.938 8.938 0 0 1-1.333 2.151 1.09 1.09 0 0 0-.012.147c0 .168.047.309.14.423.092.113.206.17.34.17.296 0 .714-.264 1.254-.787-.001.04-.003.08-.003.121 0 .146.012.368.036.666l.733-.172c0-.2.003-.357.01-.474.01-.157.033-.33.066-.517.02-.11.07-.216.152-.315l.186-.216a5.276 5.276 0 0 1 .378-.397c.062-.055.116-.099.162-.13a.26.26 0 0 1 .123-.046c.055 0 .083.035.083.106 0 .07-.052.236-.156.497-.194.486-.292.848-.292 1.084 0 .175.046.314.136.418a.45.45 0 0 0 .358.155c.365 0 .803-.269 1.313-.808v-.381c-.361.426-.623.64-.784.64-.109 0-.163-.067-.163-.2 0-.1.065-.316.195-.65.19-.486.285-.836.285-1.048a.464.464 0 0 0-.112-.319.36.36 0 0 0-.282-.127c-.165 0-.354.077-.567.233-.213.156-.5.436-.863.84.053-.262.165-.622.335-1.08l-.809.156a6.54 6.54 0 0 0-.399 1.074c-.04.156-.07.316-.092.48a7.447 7.447 0 0 1-.49.45.38.38 0 0 1-.229.08.208.208 0 0 1-.174-.082.352.352 0 0 1-.064-.222c0-.1.019-.214.056-.343.038-.13.12-.373.249-.731l.308-.849zm-17.21-2.927c-.863-.016-1.67.263-2.261.854-1.352 1.352-1.07 3.827.631 5.527 1.7 1.701 4.95 1.21 5.527.632.467-.466 1.07-3.827-.631-5.527-.957-.957-2.158-1.465-3.267-1.486zm12.285.358h.166v.21H15.4zm.427 0h.166v.865l.46-.455h.195l-.364.362.428.684h-.198l-.357-.575-.164.166v.41h-.166zm1.016 0h.166v.21h-.166zm.481.122h.166v.288h.172v.135h-.172v.717c0 .037.006.062.02.075.012.013.037.02.074.02a.23.23 0 0 0 .078-.01v.141a.802.802 0 0 1-.136.014.23.23 0 0 1-.15-.043.15.15 0 0 1-.052-.123v-.79h-.141v-.136h.141zm-3.562.258c.081 0 .15.012.207.038.057.024.1.061.13.11s.045.106.045.173h-.176c-.006-.111-.075-.167-.208-.167a.285.285 0 0 0-.164.041.134.134 0 0 0-.06.117c0 .035.015.065.045.088.03.024.08.044.15.06l.16.039a.47.47 0 0 1 .224.105c.047.046.07.108.07.186a.3.3 0 0 1-.052.175.327.327 0 0 1-.152.116.585.585 0 0 1-.226.041c-.136 0-.24-.03-.309-.088-.069-.059-.105-.149-.109-.269h.176c.004.037.01.065.017.084a.166.166 0 0 0 .034.054c.044.043.112.065.204.065a.31.31 0 0 0 .177-.045.139.139 0 0 0 .067-.119.116.116 0 0 0-.038-.09.287.287 0 0 0-.124-.055l-.156-.038a1.248 1.248 0 0 1-.159-.05.359.359 0 0 1-.098-.061.22.22 0 0 1-.058-.083.32.32 0 0 1-.016-.108c0-.096.036-.174.109-.232a.45.45 0 0 1 .29-.087zm1.035 0a.46.46 0 0 1 .202.043.351.351 0 0 1 .187.212.577.577 0 0 1 .023.126h-.168a.256.256 0 0 0-.078-.168.242.242 0 0 0-.17-.06.248.248 0 0 0-.155.05.306.306 0 0 0-.1.144.662.662 0 0 0-.034.224.58.58 0 0 0 .035.214.299.299 0 0 0 .101.135.261.261 0 0 0 .157.048c.142 0 .227-.084.256-.252h.167a.519.519 0 0 1-.065.22.35.35 0 0 1-.146.138.464.464 0 0 1-.216.048.448.448 0 0 1-.246-.066.441.441 0 0 1-.161-.192.703.703 0 0 1-.057-.293c0-.085.01-.163.032-.233a.522.522 0 0 1 .095-.182.403.403 0 0 1 .15-.117.453.453 0 0 1 .191-.04zm.603.03h.166v1.046H15.4zm1.443 0h.166v1.046h-.166zm-5.05.618c-.08 0-.2.204-.356.611-.155.407-.308.977-.459 1.71.281-.312.509-.662.683-1.05.175-.387.262-.72.262-.999a.455.455 0 0 0-.036-.197c-.025-.05-.056-.075-.093-.075zm4.662 1.797c-.221 0-.431.188-.629.563-.197.376-.296.722-.296 1.038 0 .12.029.216.088.29a.273.273 0 0 0 .223.111c.221 0 .43-.188.625-.565.196-.377.294-.725.294-1.043a.457.457 0 0 0-.083-.29.269.269 0 0 0-.222-.104zm-2.848.007c-.146 0-.285.11-.417.333-.133.222-.2.51-.2.866.566-.159.849-.452.849-.881 0-.212-.077-.318-.232-.318Z","F7931E"],"LangChain":["M6.0988 5.9175C2.7359 5.9175 0 8.6462 0 12s2.736 6.0825 6.0988 6.0825h11.8024C21.2641 18.0825 24 15.3538 24 12s-2.736-6.0825-6.0988-6.0825ZM5.9774 7.851c.493.0124 1.02.2496 1.273.6228.3673.4592.4778 1.0668.8944 1.4932.5604.6118 1.199 1.1505 1.7161 1.802.4892.5954.8386 1.2937 1.1436 1.9975.1244.2335.1257.5202.31.7197.0908.1204.5346.4483.4383.5645.0555.1204.4702.286.3263.4027-.1944.04-.4129.0476-.5616-.1074-.0549.126-.183.0596-.2819.0432a4 4 0 0 0-.025.0736c-.3288.0219-.5754-.3126-.732-.565-.3111-.168-.6642-.2702-.982-.446-.0182.2895.0452.6485-.231.8353-.014.5565.8436.0656.9222.4804-.061.0067-.1286-.0095-.1774.0373-.2239.2172-.4805-.1645-.7385-.007-.3464.174-.3808.3161-.8096.352-.0237-.0359-.0143-.0592.0059-.0811.1207-.1399.1295-.3046.3356-.3643-.2122-.0334-.3899.0833-.5686.1757-.2323.095-.2304-.2141-.5878.0164-.0396-.0322-.0208-.0615.0018-.0864.0908-.1107.2102-.127.345-.1208-.663-.3686-.9751.4507-1.2813.0432-.092.0243-.1265.1068-.1845.1652-.05-.0548-.0123-.1212-.0099-.1857-.0598-.028-.1356-.041-.1179-.1366-.1171-.0395-.1988.0295-.286.0952-.0787-.0608.0532-.1492.0776-.2125.0702-.1216.23-.025.3111-.1126.2306-.1308.552.0814.8155.0455.203.0255.4544-.1825.3526-.39-.2171-.2767-.179-.6386-.1839-.9695-.0268-.1929-.491-.4382-.6252-.6462-.1659-.1873-.295-.4047-.4243-.6182-.4666-.9008-.3198-2.0584-.9077-2.8947-.266.1466-.6125.0774-.8418-.119-.1238.1125-.1292.2598-.139.4161-.297-.2962-.2593-.8559-.022-1.1855.0969-.1302.2127-.2373.342-.3316.0292-.0213.0391-.0419.0385-.0747.1174-.5267.5764-.7391 1.0694-.7267m12.4071.46c.5575 0 1.0806.2159 1.474.6082s.61.9145.61 1.4704c0 .556-.2167 1.078-.61 1.4698v.0006l-.902.8995a2.08 2.08 0 0 1-.8597.5166l-.0164.0047-.0058.0164a2.05 2.05 0 0 1-.474.7308l-.9018.8995c-.3934.3924-.917.6083-1.4745.6083s-1.0806-.216-1.474-.6083c-.813-.8107-.813-2.1294 0-2.9402l.9019-.8995a2.056 2.056 0 0 1 .858-.5143l.017-.0053.0058-.0158a2.07 2.07 0 0 1 .4752-.7337l.9018-.8995c.3934-.3924.9171-.6083 1.4745-.6083zm0 .8965a1.18 1.18 0 0 0-.8388.3462l-.9018.8995a1.181 1.181 0 0 0-.3427.9252l.0053.0572c.0323.2652.149.5044.3374.6917.13.1296.2733.2114.4471.2686a.9.9 0 0 1 .014.1582.884.884 0 0 1-.2609.6304l-.0554.0554c-.3013-.1028-.5525-.253-.7794-.4792a2.06 2.06 0 0 1-.5761-1.0968l-.0099-.0578-.0461.0368a1.1 1.1 0 0 0-.0876.0794l-.9024.8995c-.4623.461-.4623 1.212 0 1.673.2311.2305.535.346.8394.3461.3043 0 .6077-.1156.8388-.3462l.9019-.8995c.4623-.461.4623-1.2113 0-1.673a1.17 1.17 0 0 0-.4367-.2749 1 1 0 0 1-.014-.1611c0-.2591.1023-.505.2901-.6923.3019.1028.57.2694.7962.495.3007.2999.4994.679.5756 1.0968l.0105.0578.0455-.0373a1.1 1.1 0 0 0 .0887-.0794l.902-.8996c.4622-.461.4628-1.2124 0-1.6735a1.18 1.18 0 0 0-.8395-.3462Zm-9.973 5.1567-.0006.0006c-.0793.3078-.1048.8318-.506.847-.033.1776.1228.2445.2655.1874.141-.0645.2081.0508.2557.1657.2177.0317.5394-.0725.5516-.3298-.325-.1867-.4253-.5418-.5662-.8709","1C3C3C"],"n8n":["M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632","EA4B71"],"PostgreSQL":["M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z","4169E1"],"Claude":["m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z","D97757"]};
const STACK = ["Python", "Java", "JavaScript", "SQL", "React", "Spring Boot", "Node.js", "Odoo 17", "Docker", "Nginx", "Linux", "Git", "PostgreSQL", "Pandas", "scikit-learn", "Power BI", "Claude", "LangGraph", "LangChain", "n8n", "Qdrant"];
// une tuile par technologie : son logo dans sa couleur, ou ses initiales quand il n'y a pas de logo libre
const techTile = (s) => { const i = ICONS[s]; return `<li style="--brand:#${i ? i[1] : "151417"}">${i ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${i[0]}"/></svg>` : `<b aria-hidden="true">${esc(s.length <= 3 ? s : s.replace(/[^A-Z]/g, "").slice(0, 2))}</b>`}<span>${esc(s)}</span></li>`; };
// une image par projet : capture tirée du dépôt, ou schéma généré avec spec2diagram (son propre outil)
const PIMG = {
  guardloop: "assets/proj/guardloop.svg", "software-company-ia": "assets/proj/software-company-ia.svg", doc2video: "assets/proj/doc2video.webp",
  spec2diagram: "assets/proj/spec2diagram.svg", "prospect-qualifier": "assets/proj/prospect-qualifier.svg", rag: "assets/proj/rag.svg",
  "kit-candidature": "assets/proj/kit-candidature.svg", maya: "assets/proj/maya.svg", "test-mately": "assets/proj/test-mately.svg",
  palapi: "assets/proj/palapi.webp", "idc-academy": "assets/proj/idc-academy.svg", "pptx-pipeline": "assets/proj/pptx-pipeline.svg",
  "fraud-detection": "assets/proj/fraud-detection.webp", cascade: "assets/proj/cascade.webp", "nurse-rostering": "assets/proj/nurse-rostering.svg",
  "face-morphing": "assets/proj/face-morphing.svg", "dip-controle": "assets/proj/dip-controle.webp", "eps1.0_ayoub.exe": "assets/proj/portfolio.webp",
};
const CATS = [["tout", "all"], ["ia", "ai"], ["web", "web"], ["data", "data"], ["recherche", "research"]];
let projCat = "tout";
function renderFakeStack() { const el = $("#fakeStack"); if (el) el.innerHTML = ["Python", "Java", "React", "Spring Boot", "Docker", "PostgreSQL", "Claude"].map((n) => `<li title="${n}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n][0]}"/></svg><span>${n}</span></li>`).join(""); }
renderFakeStack();
function renderProjects() {
  const lab = (fr, en) => (L === "fr" ? fr : en);
  const link = (x) => x.priv ? `<span class="tag">${lab("privé", "private")}</span>` : x.live ? `<a href="${x.live}" target="_blank" rel="noopener">${lab("en ligne", "live")} ↗</a>` : `<a href="${x.u}" target="_blank" rel="noopener">code ↗</a>`;
  const card = ([n, x]) => `<article class="proj" data-c="${x.c}">${PIMG[n] ? `<figure class="shot${PIMG[n].endsWith(".svg") ? " diag" : ""}"><img src="${PIMG[n]}" alt="" loading="lazy" decoding="async"></figure>` : ""}<header><h3>${esc(n)}</h3>${link(x)}</header><p>${esc(p(x.d))}</p><span class="cat">${esc(p(CATS.find((c) => c[0] === x.c)))}</span></article>`;
  const all = Object.entries(PROJ), n = (c) => (c === "tout" ? all.length : all.filter(([, x]) => x.c === c).length);
  $("#projects").innerHTML =
    `<h3 class="sec">${lab(`projets · ${all.length}`, `projects · ${all.length}`)}</h3>` +
    `<div class="filters" role="group" aria-label="${lab("filtrer les projets", "filter projects")}">${CATS.map(([c, e]) => `<button type="button" data-c="${c}" aria-pressed="${c === projCat}">${lab(c, e)} <span>${n(c)}</span></button>`).join("")}</div>` +
    `<div class="grid">${all.map(card).join("")}</div>` +
    `<h3 class="sec">${lab("pile technique", "tech stack")}</h3><ul class="stack">${STACK.map(techTile).join("")}</ul>`;
  const apply = () => $$("#projects .proj").forEach((el) => (el.hidden = projCat !== "tout" && el.dataset.c !== projCat));
  $$("#projects .filters button").forEach((b) => (b.onclick = () => { projCat = b.dataset.c; $$("#projects .filters button").forEach((x) => x.setAttribute("aria-pressed", x === b)); apply(); }));
  apply();
}
// 04 : comment il travaille, chaque trait avec sa preuve
const PROOFS = [
  [["Sang-froid", "Composure"], ["Régulateur au SAMU 92 (2020–2021) : interventions d'urgence, sous pression, selon des protocoles stricts.", "Dispatcher at SAMU 92 (2020–2021): emergency responses, under pressure, following strict protocols."]],
  [["Livrer", "Shipping"], ["Une plateforme e-learning livrée en 13 sprints et mise en production pendant son stage.", "An e-learning platform delivered in 13 sprints and put into production during his internship."]],
  [["Rigueur", "Rigour"], ["Un contrôle automatique qui repère ce que le modèle invente, absent des sources. Ce site suit la même règle.", "Automated checks that catch what the model makes up, absent from the sources. This site follows the same rule."]],
  [["Équipe", "Team"], ["Bénévole à la Croix-Rouge 92 (2018–2021), accompagnement des personnes en difficulté.", "Volunteer at the Red Cross 92 (2018–2021), supporting people in difficulty."]],
];
function renderProofs() {
  $("#proofs").innerHTML = `<h3 class="sec">${L === "fr" ? "comment il travaille" : "how he works"}</h3><div class="grid">${PROOFS.map(([h, d], i) => `<article class="proof"><span class="n">0${i + 1}</span><h4>${esc(p(h))}</h4><p>${esc(p(d))}</p></article>`).join("")}</div>`;
}
// 05 : ce qu'il cherche, en clair, avant le bouton
function renderBrief() {
  const rows = L === "fr"
    ? [["poste", "ingénieur logiciel, data ou IA"], ["disponibilité", "immédiate"], ["base", "Valenciennes (Nord)"], ["langues", "français, arabe, anglais C1"]]
    : [["role", "software, data or AI engineer"], ["availability", "now"], ["based in", "Valenciennes, France"], ["languages", "French, Arabic, English C1"]];
  $("#brief").innerHTML = `<dl>${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}<div><dt>cv</dt><dd><a href="assets/cv/CV_Ayoub_Amrani.pdf" target="_blank" rel="noopener">${L === "fr" ? "télécharger le CV (PDF)" : "download the CV (PDF, French)"} ↓</a></dd></div></dl>`;
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
  if (name === "s2") $$("#s2 .file").forEach((el, i) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) setTimeout(() => current === "s2" && decrypt(el), 700 + i * 260); }); // les stations déjà visibles se déchiffrent en cascade
  if (name === "s1") { renderDuo("#duo1", t("duo1")); setTimeout(() => $("#duo1").classList.add("show"), 500); }
  if (name === "s4") { renderDuo("#duo4", t("duo4")); setTimeout(() => $("#duo4").classList.add("show"), 500); }
  if (name === "s3" && out().children.length <= 1) setTimeout(() => current === "s3" && out().children.length <= 1 && run("ls"), 700); // le terminal ne s'ouvre pas vide
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
  if (window.world && window.world.start) world.relabel(); renderDossier(); renderFiles(); renderTerm(); renderProfile(); renderProjects(); renderProofs(); renderBrief(); renderCase();
  if (!$("#twist").hidden) { renderTwist(); $$("#twistTxt p").forEach((el) => el.classList.add("on")); }
  if (current === "s1" || current === "s4") enter(current);
}
// le double reste une image : ses ombres rouge et cyan suivent la silhouette détourée, pas le cadre d'une vidéo
$$("[data-char]").forEach((el) => el.appendChild(fig(SRC[el.dataset.char], "Ayoub", el.classList.contains("double"))));
setLang(L);
show(location.hash.slice(1));
// entrée directe (QR code d'un salon, lien dans un CV) : ?qr saute l'intro et ouvre le dossier ; la 3D se charge derrière
const QR = /[?&]qr\b/.test(location.search);
// compteur de visites (Abacus, sans compte ni cookie) : vues, visiteurs uniques (une fois par navigateur), arrivées par QR code
(function compte() {
  if (navigator.webdriver || /^(localhost|127\.)/.test(location.hostname)) return;
  const hit = (k) => fetch("https://abacus.jasoncameron.dev/hit/yurri775-portfolio/" + k).catch(() => {});
  hit("vues");
  if (!store.get("vu")) { store.set("vu", "1"); hit("visiteurs"); }
  if (QR) { const src = (new URLSearchParams(location.search).get("qr") || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30); hit("qr" + (src ? "-" + src : "")); }
})();
function loadWorld() { const w = document.createElement("script"); w.src = document.querySelector('meta[name="world3d"]').content; document.body.appendChild(w); }
if (QR) addEventListener("load", () => setTimeout(loadWorld, 1200)); else loadWorld();
if (QR) { if (!location.hash) history.replaceState(null, "", location.pathname + location.search + "#s1"); endIntro(); show(location.hash.slice(1)); }
else intro();
