import { chromium } from "playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";

async function setEnglish(page) {
  const english = page.getByRole("button", { name: "English" });
  if (await english.count()) await english.click();
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await setEnglish(page);
  await page.getByRole("heading", { name: /domes, walks and nature events/i }).waitFor({ timeout: 10_000 });
  await page.locator("header").getByRole("link", { name: /pitch/i }).waitFor({ state: "detached", timeout: 10_000 });
  await page.locator("footer").getByRole("link", { name: "Pitch deck" }).waitFor({ timeout: 10_000 });

  await page.goto(`${baseURL}/proposal.html`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: /State-of-the-art/ }).waitFor({ timeout: 10_000 });
  await page.getByRole("heading", { name: "Yandex Travel как рыночный ориентир" }).waitFor({ timeout: 10_000 });
  await page.getByRole("heading", { name: "Research and Markets: AI in hospitality" }).waitFor({ timeout: 10_000 });

  await page.goto(`${baseURL}/buchung`, { waitUntil: "networkidle" });
  await setEnglish(page);
  await page.getByRole("heading", { name: "Book your visit" }).waitFor({ timeout: 10_000 });
  await page.getByLabel("Visit date").fill("2026-06-28");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("Choose a format").waitFor({ timeout: 10_000 });
  await page.getByRole("button", { name: "Standard dome, morning increase" }).click();
  await page.getByLabel("Name").fill("Demo Guest");
  await page.getByLabel("E-mail").fill("demo@example.com");
  await page.getByRole("button", { name: "Book" }).click();
  await page.getByRole("heading", { name: "Booking confirmed" }).waitFor({ timeout: 10_000 });

  await page.goto(`${baseURL}/kontakt`, { waitUntil: "networkidle" });
  await setEnglish(page);
  await page.getByRole("heading", { name: "Ask about the park, booking or route." }).waitFor({ timeout: 10_000 });
  await page.getByLabel("Name").fill("Demo Guest");
  await page.getByLabel("E-mail").fill("demo@example.com");
  await page.getByLabel("Company or group").fill("Client presentation");
  await page.getByLabel("Message").fill("I want to book a grill dome for a family visit.");
  await page.getByRole("button", { name: "Send request" }).click();
  await page.getByText("Request saved.").waitFor({ timeout: 10_000 });

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await setEnglish(page);
  await page.getByRole("button", { name: "Open AI chat" }).click();
  await page.getByText("AgroPark AI Assist", { exact: true }).waitFor({ timeout: 10_000 });
  await page.getByLabel("Message for AI").fill("What are the grill dome prices?");
  await page.keyboard.press("Enter");
  await page.getByText(/Grill domes start/).waitFor({ timeout: 10_000 });

  await page.goto(`${baseURL}/login`, { waitUntil: "networkidle" });
  await setEnglish(page);
  await page.getByLabel("E-mail").fill("admin@agropark.demo");
  await page.getByLabel("Password").fill("password");
  await Promise.all([
    page.waitForURL("**/dashboard", { timeout: 15_000 }),
    page.getByRole("button", { name: "Open dashboard" }).click(),
  ]);
  await page.getByRole("heading", { name: "AgroPark OS Dashboard" }).waitFor({ timeout: 10_000 });
  await page.getByText("Live demo inbox").waitFor({ timeout: 10_000 });
  await page.getByText("Demo Guest").first().waitFor({ timeout: 10_000 });
  await page.getByText("Client presentation").waitFor({ timeout: 10_000 });
  await page.getByRole("main").getByRole("button", { name: "Open AI chat" }).click();
  await page.getByText("AgroPark AI Assist", { exact: true }).waitFor({ timeout: 10_000 });
  await page.getByRole("button", { name: "Close chat" }).click();
  await page.getByRole("link", { name: "New booking" }).click();
  await page.waitForURL("**/buchung", { timeout: 10_000 });

  for (const route of ["/membership", "/vr-tour", "/iot", "/shop", "/workshops"]) {
    await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
    await setEnglish(page);
    await page.getByRole("button", { name: "Notify me" }).waitFor({ timeout: 10_000 });
  }

  await browser.close();
  console.log("Manual presentation smoke passed.");
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
