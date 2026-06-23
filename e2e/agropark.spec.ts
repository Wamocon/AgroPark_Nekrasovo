import { expect, Page, test } from "@playwright/test";
import { mkdirSync } from "fs";
import { join } from "path";

const SCREENSHOTS = join(process.cwd(), "qa_output", "e2e");
mkdirSync(SCREENSHOTS, { recursive: true });

async function screenshot(page: Page, name: string, fullPage = true) {
  await page.screenshot({ path: join(SCREENSHOTS, `${name}.png`), fullPage });
}

async function clickNavLink(page: Page, name: string) {
  const menuButton = page.locator("button[aria-label*='Men']").first();
  if (await menuButton.isVisible()) {
    await menuButton.click({ force: true });
    const mobileMenu = page.locator("div[aria-hidden='false']").first();
    await expect(mobileMenu).toBeVisible();
    await page.waitForTimeout(350);
    await mobileMenu.getByRole("link", { name, exact: true }).click({ force: true });
    return;
  }

  await page.getByRole("link", { name, exact: true }).first().click({ force: true });
}

async function login(page: Page, email = "admin@agropark.demo") {
  await page.goto("/login");
  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", "password");
  await Promise.all([
    page.waitForURL("**/dashboard", { timeout: 15_000 }),
    page.getByRole("button", { name: "Anmelden" }).click(),
  ]);
}

const roles = [
  { email: "admin@agropark.demo", name: "Administrator", badge: "Administrator" },
  { email: "manager@agropark.demo", name: "Park Manager", badge: "Manager" },
  { email: "staff@agropark.demo", name: "Mitarbeiter", badge: "Mitarbeiter" },
  { email: "visitor@agropark.demo", name: "Besucher", badge: "Besucher" },
];

const publicPages = [
  { path: "/", name: "home" },
  { path: "/park", name: "park" },
  { path: "/attraktionen", name: "attraktionen" },
  { path: "/buchung", name: "buchung" },
  { path: "/kontakt", name: "kontakt" },
  { path: "/impressum", name: "impressum" },
  { path: "/datenschutz", name: "datenschutz" },
  { path: "/agb", name: "agb" },
];

const comingSoonPages = [
  { path: "/membership", name: "membership" },
  { path: "/vr-tour", name: "vr-tour" },
  { path: "/iot", name: "iot" },
  { path: "/shop", name: "shop" },
  { path: "/workshops", name: "workshops" },
];

test.describe("Public pages", () => {
  for (const { path, name } of publicPages) {
    test(`${name} page loads`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/AgroPark|Nekrasovo|Некрасово/);
      await expect(page.locator("body")).toBeVisible();
      await screenshot(page, `01_public_${name}`);
    });
  }

  test("Home page is a client-facing park website, not the pitch deck", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /AgroPark Nekrasovo|Некрасово поле/ })).toBeVisible();
 await expect(page.getByRole("link", { name: "Buchung testen", exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Parkinhalt und digitale Services/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ein System, vier echte Wege/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Besuch planen oder Demo prüfen/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Marktanalyse/ })).toHaveCount(0);
    await expect(page.locator("footer")).toBeVisible();
  });

  test("Navigation links work", async ({ page }) => {
    await page.goto("/");
    await clickNavLink(page, "Park");
    await expect(page).toHaveURL(/\/park/);
    await clickNavLink(page, "Attraktionen");
    await expect(page).toHaveURL(/\/attraktionen/);
    await clickNavLink(page, "Buchung");
    await expect(page).toHaveURL(/\/buchung/);
  });

  test("Mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const openButton = page.locator("button[aria-label*='Men']").first();
    await openButton.click({ force: true });
    await expect(page.getByRole("link", { name: "Park", exact: true }).last()).toBeVisible();
    await screenshot(page, "02_mobile_menu_open");
    await page.locator("button[aria-label*='schlie']").click({ force: true });
    await expect(openButton).toBeVisible();
  });
});

test.describe("Pitch deck", () => {
  test("Standalone pitch deck is separate and links back to the app", async ({ page }) => {
    await page.goto("/proposal.html");
    await expect(page.getByRole("heading", { name: /State-of-the-art/ })).toBeVisible();
    await expect(page.locator("#roi")).toBeVisible();
    await expect(page.getByRole("link", { name: /Anwendung ansehen|Live Demo|Live Anwendung/ }).first()).toBeVisible();
    await screenshot(page, "03_pitch_deck");
  });
});

test.describe("AI Chat", () => {
  test("Chat widget opens and responds to opening hours", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Chat/ }).first().click({ force: true });
    await expect(page.getByText("AgroPark Assist", { exact: true })).toBeVisible();
    await screenshot(page, "04_chat_open", false);

    await page.locator("input[placeholder='Nachricht schreiben...']").fill("Wann ist der Park geöffnet?");
    await page.locator("button[type='submit']").last().click({ force: true });

    await expect(page.getByTestId("chat-message").filter({ hasText: /10:00|19:00|Mai|September/ })).toBeVisible({
      timeout: 10_000,
    });
    await screenshot(page, "05_chat_response", false);
  });

  test("Chat widget responds to ticket pricing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Chat/ }).first().click({ force: true });
    await page.locator("input[placeholder='Nachricht schreiben...']").fill("Wie viel kostet ein Ticket?");
    await page.locator("button[type='submit']").last().click({ force: true });
    await expect(page.getByTestId("chat-message").filter({ hasText: /4,50|2,50|Familienticket|Ticket/ })).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe("Authentication", () => {
  for (const role of roles) {
    test(`Login as ${role.name}`, async ({ page }) => {
      await page.goto("/login");
      await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();
      await screenshot(page, "06_login_form");

      await login(page, role.email);
      await expect(page.getByTestId("user-role-badge")).toHaveText(role.badge);
      await screenshot(page, `07_dashboard_${role.email.split("@")[0]}`);

      await page.getByRole("button", { name: "Abmelden" }).click();
      await expect(page).toHaveURL(/\/login/);
    });
  }

  test("Invalid login shows an error", async ({ page }) => {
    await page.goto("/login");
    await page.fill("input[name='email']", "wrong@example.com");
    await page.fill("input[name='password']", "wrong");
    await page.click("button[type='submit']");
    await expect(page.getByText(/E-Mail oder Passwort/)).toBeVisible();
    await screenshot(page, "08_login_error");
  });

  test("Dashboard redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Booking flow", () => {
  test("Complete booking journey", async ({ page }) => {
    await page.goto("/buchung");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Tickets buchen" })).toBeVisible();
    await screenshot(page, "09_booking_step1");

    const dateInput = page.locator("input[type='date']");
    const dateStr = await dateInput.getAttribute("min");
    if (!dateStr) throw new Error("Booking date input is missing a min date.");
    await dateInput.fill(dateStr);
    await page.getByRole("button", { name: /Weiter/ }).click();

    await expect(page.getByText(/Tickets auswählen|Tickets ausw/)).toBeVisible();
    await screenshot(page, "10_booking_step2");

    await page.getByRole("button", { name: /Erwachsener.*erh/ }).click();
    await page.getByRole("button", { name: /Kind.*erh/ }).click();
    await page.fill("input#name", "Max Mustermann");
    await page.fill("input#email", "max@example.com");
    await screenshot(page, "11_booking_filled");

    await page.getByRole("button", { name: /Jetzt reservieren/ }).click();
    await expect(page.getByText(/Buchung best/)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Max Mustermann")).toBeVisible();
    await screenshot(page, "12_booking_confirmation");
  });

  test("Booking date and ticket controls guard invalid edge cases", async ({ page }) => {
    await page.goto("/buchung");
    const dateInput = page.locator("input[type='date']");
    const minDate = await dateInput.getAttribute("min");
    if (!minDate) throw new Error("Booking date input is missing a min date.");

    await dateInput.fill(`${minDate.slice(0, 4)}-01-10`);
    await expect(page.getByRole("button", { name: /Weiter/ })).toBeDisabled();
    await expect(page.getByText(/Parksaison/)).toBeVisible();

    await dateInput.fill(minDate);
    await page.getByRole("button", { name: /Weiter/ }).click();

    const adultMinus = page.getByRole("button", { name: /Erwachsener.*redu/ });
    const adultPlus = page.getByRole("button", { name: /Erwachsener.*erh/ });
    await expect(adultMinus).toBeDisabled();
    for (let i = 0; i < 20; i++) await adultPlus.click();
    await expect(adultPlus).toBeDisabled();
  });
});

test.describe("Coming soon pages", () => {
  for (const { path, name } of comingSoonPages) {
    test(`${name} shows coming soon teaser`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText("Coming Soon")).toBeVisible();
      await expect(page.locator("input[name='coming-soon-email']")).toBeVisible();
      await screenshot(page, `13_comingsoon_${name}`);
    });
  }
});

test.describe("Dashboard functionality", () => {
  test("Admin dashboard shows KPIs and charts", async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText("Heute Buchungen")).toBeVisible();
    await expect(page.getByText("Live-Umsatz")).toBeVisible();
    await expect(page.getByText("Buchungen und Umsatz")).toBeVisible();
    await screenshot(page, "14_dashboard_admin");

    await page.getByRole("link", { name: "Buchung" }).first().click();
    await expect(page).toHaveURL(/\/buchung/);
  });

  test("Dashboard remains usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await login(page);
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByRole("heading", { name: "Betriebsdashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Neue Buchung" })).toBeVisible();
    await screenshot(page, "15_dashboard_mobile");
  });
});
