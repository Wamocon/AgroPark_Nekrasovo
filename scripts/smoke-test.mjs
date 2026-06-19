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
];

function checkFiles() {
  console.log("\n📁 Checking required files...");
  let failed = false;
  for (const file of requiredFiles) {
    const ok = existsSync(file);
    console.log(`  ${ok ? "✓" : "✗"} ${file}`);
    if (!ok) failed = true;
  }
  return !failed;
}

function run(command, label) {
  console.log(`\n${label}...`);
  try {
    execSync(command, {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_OPTIONS: "--max-old-space-size=4096",
      },
    });
    return true;
  } catch {
    return false;
  }
}

function main() {
  console.log("🚀 AgroPark App Smoke Test");

  const filesOk = checkFiles();
  const typecheckOk = run("npm run typecheck", "🔍 Running typecheck");
  const lintOk = run("npm run lint", "🧹 Running lint");
  const buildOk = run("npm run build", "🏗️  Running build");

  console.log("\n" + "=".repeat(40));
  console.log(`Files:   ${filesOk ? "✓" : "✗"}`);
  console.log(`Types:   ${typecheckOk ? "✓" : "✗"}`);
  console.log(`Lint:    ${lintOk ? "✓" : "✗"}`);
  console.log(`Build:   ${buildOk ? "✓" : "✗"}`);

  if (filesOk && typecheckOk && lintOk && buildOk) {
    console.log("\n🎉 All smoke tests passed!");
    process.exit(0);
  } else {
    console.log("\n❌ Smoke tests failed.");
    process.exit(1);
  }
}

main();
