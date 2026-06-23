import { test, expect, Page } from "@playwright/test";
import { mkdirSync } from "fs";
import { join } from "path";

const SCREENSHOTS = join(process.cwd(), "qa_output", "e2e");
mkdirSync(SCREENSHOTS, { recursive: true });

async function screenshot(page: Page, name: string, fullPage = true) {
  await page.screenshot({ path: join(SCREENSHOTS, `${name}.png`), fullPage });
}

async function clickNavLink(page: Page, name: string) {
  const menuButton = page.locator("button[aria-label='Menü öffnen']");
  if (await menuButton.isVisible()) {
    await menuButton.click({ force: true });
  }
  await page.getByRole("link", { name, exact: true }).first().click();
}

const roles = [
  { email: "admin@agropark.demo", password: "password", name: "Administrator", badge: "Administrator", expectedPath: "/dashboard" },
  { email: "manager@agropark.demo", password: "password", name: "Park Manager", badge: "Manager", expectedPath: "/dashboard" },
  { email: "staff@agropark.demo", password: "password", name: "Mitarbeiter", badge: "Mitarbeiter", expectedPath: "/dashboard" },
  { email: "visitor@agropark.demo", password: "password", name: "Besucher", badge: "Besucher", expectedPath: "/dashboard" },
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
    test(`${name} page loads and has correct metadata`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/AgroPark/);
      await expect(page.locator("body")).toBeVisible();
      await screenshot(page, `01_public_${name}`);
    });
  }

  test("Home page has all key sections", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /AgroPark Nekrasovo als buchbare/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Marktanalyse/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ein Pitch, der sofort/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Buchung testen/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Technologie-Architektur/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Investition & Rendite/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Bereit für die nächste Phase/ })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("Navigation links work", async ({ page }) => {
    await page.goto("/");
    await clickNavLink(page, "Der Park");
    await expect(page).toHaveURL(/\/park/);
    await clickNavLink(page, "Attraktionen");
    await expect(page).toHaveURL(/\/attraktionen/);
    await clickNavLink(page, "Tickets");
    await expect(page).toHaveURL(/\/buchung/);
  });

  test("Mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const openButton = page.locator("button[aria-label='Menü öffnen']");
    await openButton.click({ force: true });
    await expect(page.getByRole("link", { name: "Der Park" }).nth(1)).toBeVisible();
    await screenshot(page, "02_mobile_menu_open");
    const closeButton = page.locator("button[aria-label='Menü schließen']");
    await closeButton.click({ force: true });
    await expect(openButton).toBeVisible();
  });
});

test.describe("AI Chat", () => {
  test("Chat widget opens and responds to opening hours", async ({ page }) => {
    await page.goto("/");
    const chatButton = page.locator("button[aria-label='Chat öffnen']");
    await chatButton.click({ force: true });
    await expect(page.getByText("Hallo! Ich bin der KI-Assistent")).toBeVisible();
    await screenshot(page, "03_chat_open", false);

    const input = page.locator("input[placeholder='Nachricht schreiben...']");
    await input.fill("Wann ist der Park geöffnet?");
    await page.locator("button[type='submit']").last().click({ force: true });

    await expect(page.getByText("Mai bis September")).toBeVisible({ timeout: 10000 });
    await screenshot(page, "04_chat_response", false);
  });

  test("Chat widget responds to ticket pricing", async ({ page }) => {
    await page.goto("/");
    await page.locator("button[aria-label='Chat öffnen']").click({ force: true });
    const input = page.locator("input[placeholder='Nachricht schreiben...']");
    await input.fill("Wie viel kostet ein Ticket?");
    await page.locator("button[type='submit']").last().click({ force: true });
    await expect(page.getByTestId("chat-message").filter({ hasText: /4,50 €/ })).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Authentication", () => {
  for (const role of roles) {
    test(`Login as ${role.name} (${role.email})`, async ({ page }) => {
      await page.goto("/login");
      await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();
      await screenshot(page, `05_login_form`);

      await page.fill("input[name='email']", role.email);
      await page.fill("input[name='password']", role.password);
      await Promise.all([
        page.waitForURL(`**${role.expectedPath}`, { timeout: 15000 }),
        page.getByRole("button", { name: "Anmelden" }).click(),
      ]);
      await expect(page.getByTestId("user-role-badge")).toHaveText(role.badge);
      await screenshot(page, `06_dashboard_${role.email.split("@")[0]}`);

      // Logout
      await page.click("button:has-text('Abmelden')");
      await expect(page).toHaveURL(/\/login/);
    });
  }

  test("Invalid login shows error", async ({ page }) => {
    await page.goto("/login");
    await page.fill("input[name='email']", "wrong@example.com");
    await page.fill("input[name='password']", "wrong");
    await page.click("button[type='submit']");
    await expect(page.getByText("Ungültige E-Mail oder Passwort")).toBeVisible();
    await screenshot(page, "07_login_error");
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
    await screenshot(page, "08_booking_step1");

    // Step 1: Select date
    const dateInput = page.locator("input[type='date']");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    await dateInput.fill(dateStr);
    await page.click("button:has-text('Weiter')");

    await expect(page.getByText("Tickets auswählen")).toBeVisible();
    await screenshot(page, "09_booking_step2");

    // Step 2: Add tickets (first two ticket cards)
    await page.getByRole("button", { name: "Erwachsener erhöhen" }).click();
    await page.getByRole("button", { name: "Kind erhöhen" }).click();
    await page.fill("input#name", "Max Mustermann");
    await page.fill("input#email", "max@example.com");
    await screenshot(page, "10_booking_filled");

    await page.click("button:has-text('Jetzt reservieren')");

    await expect(page.getByText("Buchung bestätigt!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Max Mustermann")).toBeVisible();
    await screenshot(page, "11_booking_confirmation");
  });

  test("Booking date and ticket controls guard invalid edge cases", async ({ page }) => {
    await page.goto("/buchung");
    const dateInput = page.locator("input[type='date']");
    const minDate = await dateInput.getAttribute("min");
    if (!minDate) throw new Error("Booking date input is missing a min date.");

    await dateInput.fill(`${minDate.slice(0, 4)}-01-10`);
    await expect(page.getByRole("button", { name: /Weiter/ })).toBeDisabled();
    await expect(page.getByText(/innerhalb der Parksaison/)).toBeVisible();

    await dateInput.fill(minDate);
    await page.getByRole("button", { name: /Weiter/ }).click();

    const adultMinus = page.getByRole("button", { name: "Erwachsener reduzieren" });
    const adultPlus = page.getByRole("button", { name: "Erwachsener erhöhen" });
    await expect(adultMinus).toBeDisabled();
    for (let i = 0; i < 20; i++) {
      await adultPlus.click();
    }
    await expect(adultPlus).toBeDisabled();
  });
});

test.describe("ROI calculator", () => {
  test("Calculator clamps extreme values without NaN or Infinity", async ({ page }) => {
    await page.goto("/");
    await page.locator("#investment").scrollIntoViewIfNeeded();

    await page.locator("#visitors").fill("999999");
    await expect(page.locator("#visitors")).toHaveValue("5000");
    await page.locator("#ticket").fill("-99");
    await expect(page.locator("#ticket")).toHaveValue("1");
    await page.locator("#uplift").fill("0");

    await expect(page.locator("body")).not.toContainText(/NaN|Infinity/);
  });
});

test.describe("Coming soon pages", () => {
  for (const { path, name } of comingSoonPages) {
    test(`${name} shows coming soon teaser`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText("Coming Soon")).toBeVisible();
      await expect(page.locator("input[name='coming-soon-email']")).toBeVisible();
      await screenshot(page, `12_comingsoon_${name}`);
    });
  }
});

test.describe("Dashboard functionality", () => {
  test("Admin dashboard shows KPIs and charts", async ({ page }) => {
    await page.goto("/login");
    await page.fill("input[name='email']", "admin@agropark.demo");
    await page.fill("input[name='password']", "password");
    await page.click("button[type='submit']");

    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText("Heute Buchungen")).toBeVisible();
    await expect(page.getByText("Live-Umsatz")).toBeVisible();
    await expect(page.getByText("Buchungen & Umsatz")).toBeVisible();
    await screenshot(page, "13_dashboard_admin");

    // Quick actions
    await page.click("a:has-text('Buchung')");
    await expect(page).toHaveURL(/\/buchung/);
  });
});
