import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import services from '../src/lib/services.json';

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();

test('All eleven supplied service descriptions render verbatim with accessible jump links', async ({ page }) => {
  const source = readFileSync('docs/service-copy.txt', 'utf8');
  const headings = [...source.matchAll(/^-{20,}\n([^\n]+)\n-{20,}\n/gm)];
  expect(services).toHaveLength(11);
  expect(headings).toHaveLength(11);
  await page.goto('/services');
  const index = page.getByRole('navigation', { name: 'Choose a service' });
  await expect(index.getByRole('link')).toHaveCount(11);
  for (const [i, service] of services.entries()) {
    const start = headings[i].index! + headings[i][0].length;
    const end = headings[i + 1]?.index ?? source.length;
    const expected = normalize(source.slice(start, end).replace(/^- /gm, ''));
    const configured = normalize(service.blocks.map(block => block.type === 'list' ? block.items!.join(' ') : block.text).join(' '));
    expect(configured, `${service.title}: stored copy`).toBe(expected);
    expect(normalize(await page.locator(`#${service.slug} .service-copy`).innerText()), `${service.title}: rendered copy`).toBe(expected);
    await index.getByRole('link', { name: service.title, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${service.slug}$`));
    await expect(page.locator(`#${service.slug} h2`)).toBeInViewport();
    await page.locator(`#${service.slug} .service-back`).click();
    await expect(index.getByRole('heading', { name: 'Find a service' })).toBeInViewport();
  }
  await expect(page.locator('.service-details details')).toHaveCount(0);
});

test('Sales CTAs are reduced and each page keeps an obvious route to contact', async ({ page }) => {
  for (const [path, count] of [['/', 3], ['/services', 1], ['/about', 1], ['/how-it-works', 1], ['/contact', 0]] as const) {
    await page.goto(path);
    await expect(page.locator('main a.button')).toHaveCount(count);
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('href', '/contact');
    for (const link of await page.locator('a[href^="mailto:"]').all()) await expect(link).toHaveAttribute('href', 'mailto:ashleahenneberry@elsiejhomecare.ca');
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/Veterans Affairs|Veterans Independence Program|VAC approval|direct billing|government partnership/i);
    expect(text).not.toMatch(/[\u00c2\u00c3\u00e2\ufffd]|[\u0080-\u009f]/);
    if (path !== '/services') expect((await page.locator('main').innerText()).match(/\bhelp\b/gi) || []).toHaveLength(0);
  }
  await page.goto('/');
  await expect(page.locator('.service-card')).toHaveCount(6);
  await expect(page.locator('.service-card a')).toHaveCount(0);
  await expect(page.locator('.process-section a, .why-section a, .family-section a')).toHaveCount(0);
});

test('The photo set includes three distinct scenes in the existing image frames', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.photo-frame img')).toHaveAttribute('src', /senior-companion-kitchen/);
  await expect(page.locator('.editorial-image img')).toHaveAttribute('src', /wheelchair-client-caregiver/);
  await expect(page.locator('.editorial-image img')).toHaveAttribute('alt', /mixes pancake batter/);
  await page.goto('/about');
  await expect(page.locator('.editorial-image img')).toHaveAttribute('src', /canadian-veteran-home-care/);
  await expect(page.locator('.editorial-image img')).toHaveAttribute('alt', /Canadian service mementos/);
  await expect(page.locator('main')).toContainText('Canadian veterans and their families are welcome here.');
  await expect(page.locator('main')).toContainText('people with disabilities');
});
