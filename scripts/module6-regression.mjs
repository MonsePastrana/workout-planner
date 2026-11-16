// Static route and navigation regression checks for Module 6.
// These do NOT replace browser tests or external-user testing.
import { readFileSync, existsSync } from "node:fs";

const assertions = [
  ["Guided demo route exists", existsSync("app/demo/page.tsx")],
  ["Dashboard route exists", existsSync("app/dashboard/page.tsx")],
  ["Docs route exists", existsSync("app/docs/page.tsx")],
  ["Prompt log exists", existsSync("docs/module6/prompt-log.md")],
  ["Build plan exists", existsSync("docs/module6/build-plan.md")],
];

const home = readFileSync("app/page.tsx", "utf8");
const demo = readFileSync("app/demo/page.tsx", "utf8");
const dashboard = readFileSync("app/dashboard/page.tsx", "utf8");
const docs = readFileSync("app/docs/page.tsx", "utf8");

assertions.push(
  ["Home navigation links to Demo", home.includes('label: "Demo", href: "/demo"')],
  ["Home navigation links to Dashboard", home.includes('label: "Dashboard", href: "/dashboard"')],
  ["Demo links to existing core route", demo.includes('href: "/core"')],
  ["Dashboard reuses protected chat loader", dashboard.includes("loadChatTests")],
  ["Dashboard reuses protected marketing loader", dashboard.includes("loadMarketingAssets")],
  ["Docs includes Impact & Viability", docs.includes("Impact &amp; Viability")],
  ["Docs includes Version 2 roadmap", docs.includes("Version 2 Roadmap")],
);

let failed = 0;
for (const [name, ok] of assertions) {
  console.log(`${ok ? "PASS" : "FAIL"} — ${name}`);
  if (!ok) failed++;
}
console.log(`\n${assertions.length - failed}/${assertions.length} checks passed`);
if (failed) process.exitCode = 1;
