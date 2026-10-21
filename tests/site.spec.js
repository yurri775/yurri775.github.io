// Parcours complet du site construit (dist/), sur iPhone et sur ordinateur.
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const path = require("path");

const URL = "file://" + path.join(__dirname, "..", "dist", "index.html");
const GEO = { ip: "203.0.113.42", city: "Lille", country_name: "France", org: "Exemple Télécom" };

test.beforeEach(async ({ page }) => {
  // la géolocalisation par IP est simulée : le test ne dépend pas du réseau
  await page.route("https://ipapi.co/**", (r) => r.fulfill({ json: GEO }));
  await page.route("https://api.ipify.org/**", (r) => r.fulfill({ json: { ip: GEO.ip } }));
});

async function open(page, hash = "") {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(URL + hash);
  return errors;
}
const skip = (page) => page.locator("#skip").click();
const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - innerWidth);

test("l'intro piratée affiche le scan puis la voix", async ({ page }) => {
  const errors = await open(page);
  await expect(page.locator("#gate")).toBeVisible();
  await page.locator("#gate").click();
  await expect(page.locator(".scan-row").first()).toContainText(GEO.ip, { timeout: 8000 });
  await expect(page.locator("#introTerm")).toContainText("Lille, France");
  await expect(page.locator("#introTerm")).toContainText("Exemple Télécom");
  await expect(page.locator(".granted")).toBeVisible({ timeout: 15000 });
  await expect(page.locator("#enter")).toBeVisible({ timeout: 40000 });
  await page.locator("#enter").click();
  await expect(page.locator("#intro")).toHaveCount(0, { timeout: 3000 });
  expect(errors).toEqual([]);
});

test("le carrousel montre les 4 avatars, chargés", async ({ page }) => {
  const errors = await open(page);
  await skip(page);
  await page.mouse.wheel(0, 1200);
  await expect(page.locator(".char")).toHaveCount(4);
  const loaded = await page.$$eval(".char img", (ims) => ims.map((i) => i.complete && i.naturalWidth > 300));
  expect(loaded).toEqual([true, true, true, true]);
  expect(await overflow(page)).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("chaque étape s'ouvre depuis le carrousel, sans débordement", async ({ page }) => {
  const errors = await open(page);
  await skip(page);
  await page.mouse.wheel(0, 1200);
  for (const [id, title] of [["s1", "01_reconnaissance"], ["s2", "02_dechiffrement"], ["s3", "03_payload"], ["s4", "04_ingenierie_sociale"]]) {
    await page.locator(".char[data-o='0']").click();
    await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator(`#${id} h2`)).toHaveText(title);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
    await page.locator("#back").click();
    await page.locator("#next").click();
  }
  expect(errors).toEqual([]);
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
  await open(page);
  await skip(page);
  await page.locator("#footer").scrollIntoViewIfNeeded();
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
