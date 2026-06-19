#!/usr/bin/env node
"use strict";

import { spawn } from "child_process";
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const PORT = 3456;
const BASE = `http://localhost:${PORT}`;
const OUT = "qa_output";

const pages = [
  { path: "/", name: "home" },
  { path: "/park", name: "park" },
  { path: "/attraktionen", name: "attraktionen" },
  { path: "/buchung", name: "buchung" },
  { path: "/login", name: "login" },
  { path: "/dashboard", name: "dashboard" },
];

mkdirSync(OUT, { recursive: true });

async function main() {
  const server = spawn(process.platform === "win32" ? "cmd.exe" : "sh", [
    process.platform === "win32" ? "/c" : "-c",
    `npm run dev -- --port ${PORT}`,
  ], {
    stdio: "pipe",
    env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" },
  });

  // Wait for server
  await new Promise((resolve) => {
    server.stdout.on("data", (data) => {
      if (data.toString().includes("Ready")) resolve(true);
    });
    setTimeout(() => resolve(true), 15000);
  });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const page of pages) {
    const p = await context.newPage();
    await p.goto(`${BASE}${page.path}`, { waitUntil: "networkidle", timeout: 30000 });
    await p.waitForTimeout(2000);
    await p.screenshot({ path: `${OUT}/screenshot_${page.name}_1440.png`, fullPage: true });
    console.log(`✓ Screenshot: ${page.name}`);
    await p.close();
  }

  // Mobile screenshot of home
  const mobile = await context.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: `${OUT}/screenshot_home_390.png`, fullPage: true });
  console.log("✓ Screenshot: home mobile");
  await mobile.close();

  await browser.close();
  server.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
