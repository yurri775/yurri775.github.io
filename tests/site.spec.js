// Parcours complet du site construit (dist/), sur iPhone et sur ordinateur.
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const path = require("path");

const URL = "/index.html";
const GEO = { ip: "203.0.113.42", city: "Lille", country_name: "France", org: "Exemple Télécom" };

test.beforeEach(async ({ page }) => {
  // la géolocalisation par IP est simulée dans la page même : le test ne dépend ni du réseau ni de la charge
  // de la machine (une interception côté Playwright met parfois plusieurs secondes à répondre)
  await page.addInitScript((geo) => {
    const real = window.fetch;
    window.fetch = (url, opt) => {
      const u = String(url);
      if (u.includes("ipapi.co")) return Promise.resolve(new Response(JSON.stringify(geo)));
      if (u.includes("ipify.org")) return Promise.resolve(new Response(JSON.stringify({ ip: geo.ip })));
      return real(url, opt);
    };
  }, GEO);
});

async function open(page, hash = "") {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(URL + hash);
  return errors;
}
// le monde 3D est chargé après la page (script ajouté par script.js) : on attend qu'il soit prêt
const skip = async (page) => { await page.locator("#skip").click(); await expect.poll(() => page.evaluate(() => !!(window.world && window.world.places)), { timeout: 30000 }).toBe(true); };
const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - innerWidth);

test("l'intro piratée affiche le scan puis la voix", async ({ page }) => {
  const errors = await open(page);
  await expect(page.locator("#gate")).toBeVisible();
  await page.locator("#gate").click();
  await expect(page.locator(".scan-row").first()).toContainText(GEO.ip, { timeout: 8000 });
  await expect(page.locator("#introTerm")).toContainText("Lille, France", { timeout: 15000 });
  await expect(page.locator("#introTerm")).toContainText("Exemple Télécom", { timeout: 15000 });
  await expect(page.locator(".granted")).toBeVisible({ timeout: 15000 });
  await expect(page.locator("#enter")).toBeVisible({ timeout: 40000 });
  await page.locator("#enter").click();
  await expect(page.locator("#intro")).toHaveCount(0, { timeout: 10000 });
  expect(errors).toEqual([]);
});

test("le monde 3D se charge : rue, 5 lieux, personnage", async ({ page }) => {
  const errors = await open(page);
  await skip(page);
  await expect(page.locator("canvas.gl3d")).toBeVisible();
  await expect(page.locator("#map li")).toHaveCount(5);
  await expect.poll(() => page.evaluate(() => window.world && window.world.places.length)).toBe(5);
  expect(await overflow(page)).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("on marche jusqu'à chaque lieu, la tenue change, on entre", async ({ page }) => {
  const errors = await open(page);
  await skip(page);
  const pages = [["s1", "01_reconnaissance", "who"], ["s2", "02_dechiffrement", "parcours"], ["s3", "03_payload", "travail"], ["s4", "04_ingenierie_sociale", "passions"], ["s5", "05_exfiltration", "who"]];
  for (let i = 0; i < pages.length; i++) {
    const [id, title, outfit] = pages[i];
    await page.evaluate((k) => window.world.teleport(k), i);
    await expect.poll(() => page.evaluate(() => window.world.near)).toBe(i);
    expect(await page.evaluate(() => window.world.outfit)).toBe(outfit);
    await page.keyboard.press("Enter");
    await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator(`#${id} h2`)).toHaveText(title);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator("#back").click();
    await expect(page.locator("#home")).toBeVisible();
  }
  await expect(page.locator("#questN")).toHaveText("5/5");
  expect(errors).toEqual([]);
});

test("le clavier fait marcher le personnage", async ({ page }) => {
  await open(page);
  await skip(page);
  const z0 = await page.evaluate(() => window.world.z);
  await page.keyboard.down("ArrowUp"); await page.waitForTimeout(800); await page.keyboard.up("ArrowUp");
  expect(await page.evaluate(() => window.world.z)).toBeLessThan(z0 - 2);
});

test("le dossier se révèle et les diplômes se déchiffrent", async ({ page }) => {
  await open(page, "#s1");
  await skip(page);
  await page.locator("#reveal").click();
  await expect(page.locator("#dossier .red:not(.on)")).toHaveCount(0, { timeout: 4000 });
  await expect(page.locator("#dossier")).toContainText("INSA Hauts-de-France");
  await page.evaluate(() => (location.hash = "s2"));
  await page.locator(".file").first().click();
  await expect(page.locator(".file").first()).toContainText("Master 2 Informatique", { timeout: 4000 });
});

test("le terminal exécute les commandes", async ({ page }) => {
  await open(page, "#s3");
  await skip(page);
  await page.locator("#chips button", { hasText: "run guardloop" }).click();
  await expect(page.locator("#out")).toContainText("validate ✓", { timeout: 10000 });
  await expect(page.locator("#out")).toContainText("github.com/yurri775/guardloop", { timeout: 10000 });
  await page.locator("#chips button", { hasText: "cat chiffres" }).click();
  await expect(page.locator("#out")).toContainText("1 000");
  await page.locator("#cmd").fill("rm -rf /");
  await page.locator("#cmd").press("Enter");
  await expect(page.locator("#out")).toContainText("bien essayé");
});

test("l'exfiltration donne le contact puis la révélation", async ({ page, context, browserName }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page, "#s5");
  await skip(page);
  await page.locator("#exfil").click();
  await expect(page.locator("#links")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#twist")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#twistTxt")).toContainText("C'était mon agent", { timeout: 20000 });
});

test("la page passe en anglais", async ({ page }) => {
  await open(page, "#s1");
  await skip(page);
  await page.locator(".sw button", { hasText: "EN" }).click();
  await expect(page.locator("#s1 h2")).toHaveText("01_recon");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("accessibilité : aucune violation grave", async ({ page }) => {
  await open(page);
  await skip(page);
  await page.waitForTimeout(800);
  const res = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
  const serious = res.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test("sans WebGL : l'accueil 2D de repli s'affiche et reste navigable", async ({ page }) => {
  // on coupe le WebGL avant tout script (cas d'un PC sans accélération matérielle) : le site doit montrer l'accueil 2D, pas un écran noir
  await page.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...a) {
      return String(type).includes("webgl") ? null : orig.call(this, type, ...a);
    };
  });
  const errors = await open(page);
  await page.locator("#skip").click();                        // passer l'intro
  await expect(page.locator("#world")).toHaveClass(/no3d/);   // repli activé
  await expect(page.locator("canvas.gl3d")).toHaveCount(0);   // aucune 3D chargée
  await expect(page.locator("#home h1")).toBeVisible();       // « ayoub amrani » lisible
  await page.locator('.quick a[href="#s3"]').click();         // accès direct « projets »
  await expect(page).toHaveURL(/#s3$/);
  await expect(page.locator("#s3 h2")).toBeVisible();
  expect(errors).toEqual([]);
});
