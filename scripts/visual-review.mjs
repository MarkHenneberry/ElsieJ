import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
await mkdir('output/review', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of [375, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const path of ['/services', '/about', '/how-it-works', '/contact', '/privacy', '/accessibility']) {
    await page.goto(`http://localhost:3000${path}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `output/review/${path.slice(1)}-${width}.png` });
  }
}
await browser.close();
console.log('Saved desktop and mobile page previews in output/review.');
