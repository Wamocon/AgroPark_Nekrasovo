#!/usr/bin/env node
"use strict";

import { existsSync } from "fs";
import { execSync } from "child_process";

const requiredFiles = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/api/chat/route.ts",
  "src/app/login/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/buchung/page.tsx",
  "src/components/chat/chat-widget.tsx",
  "src/lib/auth.ts",
  "public/proposal.html",
];

function checkFiles() {
  console.log("\nChecking required files...");
  let failed = false;
  for (const file of requiredFiles) {
    const ok = existsSync(file);
    console.log(`  ${ok ? "OK" : "MISSING"} ${file}`);
    if (!ok) failed = true;
  }
  return !failed;
}

function run(command, label) {
  console.log(`\n${label}...`);
  try {
    execSync(command, { stdio: "inherit", env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" } });
    return true;
  } catch {
    return false;
  }
}

function main() {
  console.log("AgroPark App Smoke Test");
  const filesOk = checkFiles();
  const typecheckOk = run("npm run typecheck", "Running typecheck");
  const lintOk = run("npm run lint", "Running lint");
  const buildOk = run("npm run build", "Running build");
  console.log("\n" + "=".repeat(40));
  console.log(`Files: ${filesOk ? "OK" : "FAIL"}`);
  console.log(`Types: ${typecheckOk ? "OK" : "FAIL"}`);
  console.log(`Lint:  ${lintOk ? "OK" : "FAIL"}`);
  console.log(`Build: ${buildOk ? "OK" : "FAIL"}`);
  if (filesOk && typecheckOk && lintOk && buildOk) process.exit(0);
  process.exit(1);
}

main();
