#!/usr/bin/env python3
"""Capture QA screenshots and basic metrics for proposal.html"""
import asyncio
from playwright.async_api import async_playwright
from pathlib import Path

OUT = Path("qa_output")
OUT.mkdir(exist_ok=True)

URL = "http://localhost:8080/proposal.html"

VIEWPORTS = [
    ("desktop", 1440, 900),
    ("tablet", 768, 1024),
    ("mobile", 390, 844),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append((msg.type, msg.text)) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(("pageerror", str(err))))

        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2000)  # let animations settle

        # Full-page desktop screenshot
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.screenshot(path=OUT / "desktop_full.png", full_page=True)

        # Named viewport screenshots (viewport only)
        for name, w, h in VIEWPORTS:
            await page.set_viewport_size({"width": w, "height": h})
            await page.wait_for_timeout(500)
            await page.screenshot(path=OUT / f"{name}_viewport.png", full_page=False)

        # Basic metrics
        metrics = await page.evaluate("""() => {
            const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => ({
                level: h.tagName,
                text: h.textContent.trim().slice(0, 80)
            }));
            const images = Array.from(document.querySelectorAll('img')).map(img => ({
                src: (img.src || '').slice(-60),
                alt: img.alt,
                width: img.naturalWidth,
                height: img.naturalHeight
            }));
            const links = Array.from(document.querySelectorAll('a')).map(a => ({
                text: a.textContent.trim().slice(0, 60),
                href: a.href
            }));
            return { headings, images, links };
        }""")

        # Accessibility tree text dump
        a11y = await page.accessibility.snapshot()

        await browser.close()

        # Write report
        report = []
        report.append(f"Console/Page Errors: {len(console_errors)}")
        for typ, txt in console_errors:
            report.append(f"  [{typ}] {txt}")
        report.append("")
        report.append("Headings:")
        for h in metrics["headings"]:
            report.append(f"  {h['level']}: {h['text']}")
        report.append("")
        report.append("Images:")
        for img in metrics["images"]:
            report.append(f"  src={img['src']} alt='{img['alt']}' size={img['width']}x{img['height']}")
        report.append("")
        report.append("Links:")
        for link in metrics["links"]:
            report.append(f"  {link['text'][:50]:<50} -> {link['href']}")

        (OUT / "metrics.txt").write_text("\n".join(report), encoding="utf-8")
        (OUT / "a11y_snapshot.json").write_text(str(a11y), encoding="utf-8")
        print("QA screenshots and metrics saved to", OUT)

if __name__ == "__main__":
    asyncio.run(main())
