import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.UI_AUDIT_BASE_URL || "http://127.0.0.1:3000";
const OUT_DIR = path.join(process.cwd(), "qa_output", "ui_audit");

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const routes = [
  "/",
  "/park",
  "/attraktionen",
  "/buchung",
  "/kontakt",
  "/login",
  "/membership",
  "/vr-tour",
  "/iot",
  "/shop",
  "/workshops",
  "/proposal.html",
];

function routeToFile(route) {
  const normalized = route === "/" ? "home" : route.replace(/[^a-z0-9]/gi, "_");
  return normalized.replace(/^_+|_+$/g, "") || "home";
}

async function auditPage(page, route, viewportName) {
  const errors = [];

  page.removeAllListeners("pageerror");
  page.removeAllListeners("console");
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console: ${message.text()}`);
    }
  });

  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const textOf = (element) => (element.textContent || "").replace(/\s+/g, " ").trim();
    const labelFor = (element) => {
      const id = element.getAttribute("id");
      if (!id) return "";
      const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
      return label ? textOf(label) : "";
    };
    const nameOf = (element) =>
      element.getAttribute("aria-label") ||
      element.getAttribute("title") ||
      labelFor(element) ||
      textOf(element) ||
      element.getAttribute("placeholder") ||
      "";

    const html = document.documentElement;
    const h1 = [...document.querySelectorAll("h1")].map(textOf);

    const overflow = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return false;
        const style = getComputedStyle(element);
        if (style.visibility === "hidden" || style.display === "none") return false;
        return element.scrollWidth > element.clientWidth + 2 && style.overflowX !== "hidden";
      })
      .slice(0, 10)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: (element.getAttribute("class") || "").slice(0, 140),
        text: textOf(element).slice(0, 90),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
      }));

    const unnamed = [...document.querySelectorAll("button,a,input,textarea,select")]
      .filter((element) => {
        const tag = element.tagName.toLowerCase();
        const type = element.getAttribute("type");
        if (tag === "input" && ["hidden", "submit", "button"].includes(type || "")) {
          return false;
        }
        return !nameOf(element);
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        type: element.getAttribute("type") || "",
        className: (element.getAttribute("class") || "").slice(0, 140),
        html: element.outerHTML.slice(0, 180),
      }));

    const smallTargets = [...document.querySelectorAll("button,a,input,textarea,select")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return false;
        const style = getComputedStyle(element);
        if (style.visibility === "hidden" || style.display === "none") return false;
        return rect.width < 40 || rect.height < 40;
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        name: nameOf(element).slice(0, 90),
        width: Math.round(element.getBoundingClientRect().width),
        height: Math.round(element.getBoundingClientRect().height),
      }));

    return {
      title: document.title,
      h1,
      width: window.innerWidth,
      scrollWidth: html.scrollWidth,
      horizontalOverflow: html.scrollWidth - window.innerWidth,
      overflow,
      unnamed,
      smallTargets,
    };
  });

  await page.screenshot({
    path: path.join(OUT_DIR, `${viewportName}_${routeToFile(route)}.png`),
    fullPage: false,
  });

  return { ...data, errors };
}

async function login(page) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await page.fill('input[name="email"]', "admin@agropark.demo");
  await page.fill('input[name="password"]', "password");
  await Promise.all([
    page.waitForURL("**/dashboard", { timeout: 15_000 }),
    page.getByRole("button", { name: /Anmelden|Sign in/i }).click(),
  ]);
  await page.waitForTimeout(500);
}

function summarize(item) {
  const issues = [];
  if (item.fatal) issues.push(`fatal=${item.fatal}`);
  if (item.errors?.length) issues.push(`errors=${item.errors.length}`);
  if (item.horizontalOverflow > 2) issues.push(`horizontalOverflow=${item.horizontalOverflow}`);
  if (item.unnamed?.length) issues.push(`unnamed=${item.unnamed.length}`);
  if (item.smallTargets?.length) issues.push(`smallTargets=${item.smallTargets.length}`);
  if (!item.h1 || item.h1.length !== 1) issues.push(`h1=${item.h1 ? item.h1.length : 0}`);
  return issues;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const report = [];

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const route of routes) {
      try {
        report.push({
          viewport: viewport.name,
          route,
          ...(await auditPage(page, route, viewport.name)),
        });
      } catch (error) {
        report.push({
          viewport: viewport.name,
          route,
          fatal: error instanceof Error ? error.message : String(error),
        });
      }
    }

    try {
      await login(page);
      report.push({
        viewport: viewport.name,
        route: "/dashboard-authenticated",
        ...(await auditPage(page, "/dashboard", viewport.name)),
      });
    } catch (error) {
      report.push({
        viewport: viewport.name,
        route: "/dashboard-authenticated",
        fatal: error instanceof Error ? error.message : String(error),
      });
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(OUT_DIR, "report.json"), JSON.stringify(report, null, 2));

  let hasIssues = false;
  for (const item of report) {
    const issues = summarize(item);
    if (issues.length > 0) {
      hasIssues = true;
      console.log(`${item.viewport} ${item.route}: ${issues.join(" ")}`);
    }
  }

  if (!hasIssues) {
    console.log("No structural UI audit issues found.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
