# Fabrique les sons du monde par synthèse (aucun échantillon tiers) : ambiance de ville vide,
# bourdonnement de la salle serveurs, pas, porte. Sortie : assets/sfx/*.mp3 (ffmpeg requis).
# Usage : ~/openvoice-env/bin/python scripts/sons.py
import os, subprocess, tempfile
import numpy as np
from scipy.signal import butter, lfilter
from scipy.io import wavfile

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "sfx")
rng = np.random.default_rng(7)


def lp(x, hz, order=2):
    b, a = butter(order, hz / (SR / 2), "low"); return lfilter(b, a, x)


def bp(x, lo, hi, order=2):
    b, a = butter(order, [lo / (SR / 2), hi / (SR / 2)], "band"); return lfilter(b, a, x)


def loopable(x, fade=2.0):
    # fondu enchaîné entre la fin et le début : la boucle ne s'entend pas
    n = int(fade * SR); w = np.linspace(0, 1, n)
    head, body, tail = x[:n], x[n:-n], x[-n:]
    return np.concatenate([tail * (1 - w) + head * w, body])


def save(name, x, br="96k"):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    os.makedirs(OUT, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav") as f:
        wavfile.write(f.name, SR, (x * 32767).astype(np.int16))
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f.name, "-ac", "1", "-b:a", br, os.path.join(OUT, name + ".mp3")], check=True)


t = np.arange(int(26 * SR)) / SR
# ambiance : vent filtré qui respire lentement, une note grave tenue, une quinte lointaine
wind = bp(rng.standard_normal(t.size), 180, 900) * (0.55 + 0.45 * np.sin(2 * np.pi * t / 13) ** 2)
drone = sum(a * np.sin(2 * np.pi * f * t + p) for f, a, p in [(55, 0.5, 0), (82.4, 0.25, 1), (110.2, 0.12, 2), (164.8, 0.05, 0.5)])
drone *= 0.7 + 0.3 * np.sin(2 * np.pi * t / 8.666)
save("ambiance", loopable(wind * 1.2 + drone * 0.35))

# salle serveurs : secteur 50 Hz et harmoniques, ventilateurs
t = np.arange(int(8 * SR)) / SR
hum = sum(np.sin(2 * np.pi * 50 * k * t) / k for k in range(1, 7))
fans = bp(rng.standard_normal(t.size), 400, 2400) * 0.4
save("serveurs", loopable(hum * 0.5 + fans, 1.0))

# pas : choc sourd et court sur du béton
t = np.arange(int(0.18 * SR)) / SR
step = lp(rng.standard_normal(t.size), 900) * np.exp(-t * 38) + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 30) * 0.8
save("pas", step, "64k")

# porte : souffle qui monte puis se ferme
t = np.arange(int(1.1 * SR)) / SR
env = np.sin(np.pi * np.clip(t / 1.1, 0, 1)) ** 2
door = bp(rng.standard_normal(t.size), 250, 3000) * env + np.sin(2 * np.pi * (60 + 80 * t) * t) * env * 0.5
save("porte", door, "64k")
print("ok :", sorted(os.listdir(OUT)))
