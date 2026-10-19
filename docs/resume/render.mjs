// Renders the two resume PDFs from resume.html.
// Usage: node docs/resume/render.mjs   (needs Playwright; uses the qa-recorder copy if present)
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
// Prefer the qa-recorder copy (it has browsers installed); fall back to the project's own Playwright.
const pw = (() => {
  try { return require(process.env.HOME + '/.claude/scripts/qa-recorder/node_modules/playwright'); } catch { return require('playwright'); }
})();

const src = new URL('./resume.html', import.meta.url).href;
const pub = (f) => fileURLToPath(new URL(`../../public/${f}`, import.meta.url));

const VARIANTS = [
  // UK: A4, about 2 cm margins.
  { cls: 'uk', page: '@page { size: A4; margin: 18mm 18mm 16mm 18mm; }', out: ['Jerome-Hipolito-CV.pdf'] },
  // US: Letter, about 0.55 inch margins. Jerome-Resume.pdf stays as an alias for old links.
  { cls: 'us', page: '@page { size: Letter; margin: 0.5in 0.55in 0.45in 0.55in; }', out: ['Jerome-Hipolito-Resume.pdf', 'Jerome-Resume.pdf'] },
];

const browser = await pw.chromium.launch();
for (const v of VARIANTS) {
  const page = await browser.newPage();
  await page.goto(src);
  await page.evaluate((c) => { document.body.className = c; }, v.cls);
  await page.addStyleTag({ content: v.page });
  for (const f of v.out) await page.pdf({ path: pub(f), printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log(v.cls, '->', v.out.join(', '));
}
await browser.close();
