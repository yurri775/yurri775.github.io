"""Génère les répliques du portfolio avec la voix clonée d'Ayoub (Inworld TTS), en français et en anglais.
    python3 scripts/voix.py [fr] [en]   → assets/voice/<lang>/<clé>.mp3
La clé Inworld est lue dans ~/video-stage/.env.local (jamais copiée dans ce dépôt)."""
import base64, json, re, urllib.request
from pathlib import Path
ICI = Path(__file__).parent.parent
CLE = re.search(r"(?m)^INWORLD_KEY=(.+)$", (Path.home() / "video-stage/.env.local").read_text()).group(1).strip()
# Style « monologue intérieur » : voix jeunes, calmes, presque chuchotées, ralenties, avec des pauses.
# (Le clone d'Ayoub garde l'accent français en anglais ; Étienne et Jonah sont natifs.)
VOIX = {"fr": "Étienne", "en": "Jonah"}
DEBIT = 0.88
MODELE = "inworld-tts-2"
import sys
LANGUES = sys.argv[1:] or ["fr", "en"]
LIGNES = {
    "fr": {
        "intro_0": "Salut, toi.",
        "intro_1": "Tu croyais lire un portfolio. ... Non. C'est toi qu'on vient de lire.",
        "intro_2": "Rassure-toi. ... Je n'enregistre rien. Je voulais juste ton attention.",
        "intro_3": "Maintenant... on entre.",
        "back_0": "Te revoilà.",
        "twist_0": "Une dernière chose.",
        "twist_1": "La voix qui te parle depuis le début... ce n'était pas moi.",
        "twist_2": "C'était mon agent.",
        "twist_3": "Je l'ai construit pour qu'il n'ait pas le droit d'inventer : chaque phrase de ce site a été vérifiée.",
        "twist_4": "C'est exactement ce que je fais pour les entreprises.",
    },
    "en": {
        "intro_0": "Hello, you.",
        "intro_1": "You thought you were reading a portfolio. ... No. You're the one being read.",
        "intro_2": "Relax. ... I don't store anything. I just wanted your attention.",
        "intro_3": "Now... let's get in.",
        "back_0": "You're back.",
        "twist_0": "One last thing.",
        "twist_1": "The voice talking to you since the start... wasn't me.",
        "twist_2": "It was my agent.",
        "twist_3": "I built it so it isn't allowed to make things up: every sentence on this site has been checked.",
        "twist_4": "That's exactly what I do for companies.",
    },
}
for lang, lignes in LIGNES.items():
    if lang not in LANGUES: continue
    (ICI / "assets/voice" / lang).mkdir(parents=True, exist_ok=True)
    for cle, txt in lignes.items():
        corps = json.dumps({"text": txt, "voiceId": VOIX[lang], "modelId": MODELE, "temperature": 0.6,
                            "audioConfig": {"audioEncoding": "MP3", "sampleRateHertz": 24000, "speakingRate": DEBIT}}).encode()
        req = urllib.request.Request("https://api.inworld.ai/tts/v1/voice", corps,
                                     {"Authorization": f"Basic {CLE}", "Content-Type": "application/json"})
        d = json.load(urllib.request.urlopen(req, timeout=120))
        (ICI / f"assets/voice/{lang}/{cle}.mp3").write_bytes(base64.b64decode(d["audioContent"]))
        print("  ✓", lang, cle, flush=True)
