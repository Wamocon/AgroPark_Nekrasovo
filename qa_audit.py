#!/usr/bin/env python3
"""Run accessibility and performance audits on proposal.html"""
import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

OUT = Path("qa_output")
URL = "http://localhost:8080/proposal.html"

# Axe-core inline (minified core only, no rules)
AXE_URL = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        client = await page.context.new_cdp_session(page)

        # Enable performance metrics
        await client.send("Performance.enable")

        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2500)

        # Inject axe and run
        await page.add_script_tag(url=AXE_URL)
        await page.wait_for_timeout(500)
        axe_result = await page.evaluate("""async () => {
            return await axe.run({
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']
                },
                resultTypes: ['violations', 'incomplete']
            });
        }""")

        # Performance metrics
        perf = await client.send("Performance.getMetrics")
        nav_timing = await page.evaluate("""() => {
            const n = performance.getEntriesByType('navigation')[0];
            return n ? {
                dns: n.domainLookupEnd - n.domainLookupStart,
                tcp: n.connectEnd - n.connectStart,
                ttfb: n.responseStart - n.requestStart,
                domContentLoaded: n.domContentLoadedEventEnd - n.startTime,
                loadComplete: n.loadEventEnd - n.startTime
            } : null;
        }""")

        # Lighthouse-ish web vitals from layout
        web_vitals = await page.evaluate("""() => {
            const paint = performance.getEntriesByType('paint');
            return {
                fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
                lcp: performance.getEntriesByType('largest-contentful-paint').slice(-1)[0]?.startTime
            };
        }""")

        # Contrast sample (text on dark hero)
        contrast = await page.evaluate("""() => {
            const hero = document.querySelector('.hero');
            const h1 = document.querySelector('.hero h1');
            const styles = (el) => window.getComputedStyle(el);
            return {
                heroBg: styles(hero).backgroundColor,
                h1Color: styles(h1).color,
                descColor: styles(document.querySelector('.hero-desc')).color,
                hsLabelColor: styles(document.querySelector('.hs-label')).color
            };
        }""")

        # Test consultant tabs JS
        tab_error = await page.evaluate("""() => {
            try {
                showCF(1);
                return document.getElementById('cf-1').classList.contains('active') ? 'ok' : 'no-active-class';
            } catch (e) {
                return e.message;
            }
        }""")

        # Test workflow stepper JS
        step_error = await page.evaluate("""() => {
            try {
                showStep(2);
                return document.getElementById('wf-2').classList.contains('active') ? 'ok' : 'no-active-class';
            } catch (e) {
                return e.message;
            }
        }""")

        await browser.close()

        # Save results
        (OUT / "axe_report.json").write_text(json.dumps(axe_result, indent=2, ensure_ascii=False), encoding="utf-8")
        summary = {
            "violations_count": len(axe_result.get("violations", [])),
            "incomplete_count": len(axe_result.get("incomplete", [])),
            "violations_by_impact": {},
            "performance": {
                "metrics": perf.get("metrics", []),
                "navigation": nav_timing,
                "web_vitals": web_vitals
            },
            "contrast_sample": contrast,
            "js_interactivity": {"consultant_tabs": tab_error, "workflow_stepper": step_error}
        }
        for v in axe_result.get("violations", []):
            summary["violations_by_impact"][v["impact"]] = summary["violations_by_impact"].get(v["impact"], 0) + 1

        (OUT / "audit_summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

        # Human-readable summary
        lines = ["AXE ACCESSIBILITY AUDIT", f"Violations: {summary['violations_count']}", f"Incomplete: {summary['incomplete_count']}"]
        lines.append("By impact: " + str(summary["violations_by_impact"]))
        lines.append("")
        lines.append("PERFORMANCE")
        for m in perf.get("metrics", []):
            lines.append(f"  {m['name']}: {m['value']}")
        lines.append(f"  Navigation: {nav_timing}")
        lines.append(f"  Web Vitals: {web_vitals}")
        lines.append("")
        lines.append("CONTRAST SAMPLE")
        for k, v in contrast.items():
            lines.append(f"  {k}: {v}")
        lines.append("")
        lines.append("JS INTERACTIVITY")
        lines.append(f"  Consultant tabs: {tab_error}")
        lines.append(f"  Workflow stepper: {step_error}")
        lines.append("")
        lines.append("TOP VIOLATIONS")
        for v in axe_result.get("violations", [])[:10]:
            nodes = v.get("nodes", [])
            target = nodes[0].get("target", [''])[0] if nodes else ''
            lines.append(f"  [{v['impact'].upper()}] {v['id']}: {v['help']} ({len(nodes)} nodes) example: {target}")

        (OUT / "audit_report.txt").write_text("\n".join(lines), encoding="utf-8")
        print("Audit complete. See qa_output/audit_report.txt")

if __name__ == "__main__":
    asyncio.run(main())
