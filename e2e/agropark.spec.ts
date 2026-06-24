import { expect, test, type Page } from "@playwright/test";

async function setEnglish(page: Page) {
  await page.getByRole("button", { name: "English" }).click();
}

async function login(page: Page, email = "admin@agropark.demo") {
  await page.goto("/login");
  await setEnglish(page);
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Open dashboard" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

const roles = [
  { email: "admin@agropark.demo", badge: "Director" },
  { email: "manager@agropark.demo", badge: "Manager" },
  { email: "staff@agropark.demo", badge: "Administrator" },
  { email: "visitor@agropark.demo", badge: "Guest" },
];

test.describe("Public AgroPark app", () => {
  test("home page presents the upgraded client website and keeps pitch in the footer", async ({ page }) => {
    await page.goto("/");
    await setEnglish(page);

    await expect(page.getByRole("heading", { name: /domes, walks and nature events/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Book" }).first()).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: /pitch/i })).toHaveCount(0);
    await expect(page.locator("footer").getByRole("link", { name: "Pitch deck" })).toBeVisible();
  });

  test("language switcher changes body copy across public pages", async ({ page }) => {
    await page.goto("/kontakt");
    await setEnglish(page);
    await expect(page.getByRole("heading", { name: "Ask about the park, booking or route." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Send request" })).toBeVisible();

    await page.goto("/buchung");
    await expect(page.getByRole("heading", { name: "Book your visit" })).toBeVisible();
    await expect(page.getByText("Choose a date", { exact: true })).toBeVisible();

    await page.goto("/park");
    await expect(page.getByRole("heading", { name: "About the park" })).toBeVisible();
    await expect(page.getByText("Zones and visit scenarios", { exact: true })).toBeVisible();

    await page.goto("/attraktionen");
    await expect(page.getByRole("heading", { name: "Programs and areas" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Book a visit/ })).toBeVisible();
  });

  test("chat opens with localized controls and uses AgroPark fallback", async ({ page }) => {
    await page.goto("/");
    await setEnglish(page);
    await page.getByRole("button", { name: "Open AI chat" }).click();
    await expect(page.getByText("AgroPark AI Assist", { exact: true })).toBeVisible();
    await page.getByLabel("Message for AI").fill("What are the grill dome prices?");
    await page.keyboard.press("Enter");
    await expect(page.getByText(/Grill domes start/)).toBeVisible({ timeout: 10_000 });
  });

  test("pitch deck remains a separate commercial presentation", async ({ page }) => {
    await page.goto("/proposal.html");

    await expect(page.getByRole("heading", { name: /State-of-the-art/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /У вас уже есть сильный офлайн-продукт/ })).toBeVisible();
    await expect(page.getByText("05. Живая симуляция продукта")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/У клиента|Клиенту|backend|Supabase/);
    await expect(page.getByText(/24\.06\.2026/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Открыть приложение/ }).first()).toBeVisible();
  });
});

test.describe("Authentication and dashboard", () => {
  for (const role of roles) {
    test(`login as ${role.badge}`, async ({ page }) => {
      await login(page, role.email);
      await expect(page.getByTestId("user-role-badge")).toContainText(role.badge);
      await expect(page.getByRole("heading", { name: "AgroPark OS Dashboard" })).toBeVisible();
      await expect(page.getByText("Requests, bookings, AI support")).toBeVisible();
    });
  }
});
