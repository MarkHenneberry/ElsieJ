import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const pages = ['/', '/services', '/about', '/how-it-works', '/contact', '/privacy', '/accessibility'];
test('Every page is readable at all requested widths, with working images and no browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const width of [375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy(); }
      if (path === '/' && [375, 1440].includes(width)) {
        await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
        await page.screenshot({ path: `output/home-${width}.png`, fullPage: true });
        await page.screenshot({ path: `output/home-${width}-first-screen.png` });
      }
    }
  }
  expect(errors).toEqual([]);
});
test('All pages pass automated WCAG AA checks on desktop and mobile', async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of pages) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations, `${width}px ${path}: ${JSON.stringify(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })))}`).toEqual([]);
    }
  }
});
test('Desktop navigation, service anchors, and FAQ work', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  for (const [label, path] of [['Our Services', '/services'], ['About Us', '/about'], ['How It Works', '/how-it-works'], ['Contact', '/contact'], ['Home', '/']]) {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(`http://localhost:3000${path}`);
  }
  await page.locator('.services-preview a[href="/services"]').click();
  await page.getByRole('navigation', { name: 'Choose a service' }).getByRole('link', { name: 'Companion Care' }).click();
  await expect(page).toHaveURL(/services#companion-care/);
  await expect(page.locator('#companion-care h2')).toBeInViewport();
  await page.goto('/how-it-works');
  const question = page.locator('summary').first();
  await question.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
});
test('Mobile menu and keyboard focus work', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); await page.goto('/');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  const menu = page.locator('button[aria-controls="mobile-menu"]');
  await menu.click(); await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape'); await expect(menu).toBeFocused(); await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click(); await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Our Services' }).click();
  await expect(page).toHaveURL(/services$/); await expect(menu).toHaveAttribute('aria-expanded', 'false');
});
test('Form validates contact details and never reports an unsent enquiry as sent', async ({ page, request }) => {
  // Keep this UI test unavailable even if a real delivery endpoint is configured.
  await page.route('**/contact', async route => { const response = await route.fetch(); const html = await response.text(); await route.fulfill({ response, body: html.replaceAll('\\"available\\":true', '\\"available\\":false') }); });
  await page.goto('/contact'); await page.getByRole('button', { name: 'Send My Request' }).click();
  await expect(page.getByText('Please enter your name.')).toBeVisible(); await expect(page.getByLabel('Your Name', { exact: true })).toBeFocused();
  await expect(page.getByText('Please enter your phone number.')).toBeVisible();
  await expect(page.getByText('Please enter your email address.')).toBeVisible();
  for (const label of ['Your Name', 'Phone Number', 'Email']) await expect(page.getByLabel(label, { exact: true })).toHaveAttribute('required', '');
  await page.getByLabel('Your Name', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Phone Number', { exact: true }).fill('9025550100');
  await page.getByLabel('Email', { exact: true }).fill('invalid'); await page.getByRole('button', { name: 'Send My Request' }).click();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  await page.getByLabel('Email', { exact: true }).fill('test@example.com'); await page.getByRole('button', { name: 'Send My Request' }).click();
  await expect(page.locator('.form-error')).toContainText('Your request has not been sent.');
  await expect(page.getByText('Thank you for reaching out.')).not.toBeVisible();
  const bad = await request.post('/api/contact', { data: { name: '', email: 'invalid' } }); expect(bad.status()).toBe(400);
  // Server validation must require all three fields, independent of delivery configuration.
  const validContact = { name: 'Test', phone: '9025550100', email: 'test@example.com' };
  for (const field of ['name', 'phone', 'email'] as const) {
    const missing = await request.post('/api/contact', { data: { ...validContact, [field]: ' ' } });
    expect(missing.status()).toBe(400);
    expect((await missing.json()).errors).toHaveProperty(field);
  }
  const crossOrigin = await request.post('/api/contact', { headers: { Origin: 'https://another-site.example' }, data: { name: 'Test', email: 'test@example.com' } }); expect(crossOrigin.status()).toBe(403);
});
test('Contact UI renders success and delivery failure correctly with simulated delivery responses', async ({ page }) => {
  // Replace availability in the rendered RSC payload only for this isolated UI test.
  await page.route('**/contact', async route => { const response = await route.fetch(); const html = await response.text(); await route.fulfill({ response, body: html.replaceAll('\\"available\\":false', '\\"available\\":true') }); });
  await page.route('**/api/contact', route => route.fulfill({ status: 502, json: { message: 'We could not send your request. Please try again.' } }));
  await page.goto('/contact');
  await page.getByLabel('Your Name', { exact: true }).fill('Test Visitor'); await page.getByLabel('Phone Number', { exact: true }).fill('9025550100'); await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByRole('button', { name: 'Send My Request' }).click(); await expect(page.locator('.form-error')).toContainText('We could not send');
  await page.route('**/api/contact', route => route.fulfill({ status: 200, json: { message: 'Your request has been sent.' } }));
  await page.getByRole('button', { name: 'Send My Request' }).click(); await expect(page.getByRole('status')).toContainText('Thank you for reaching out.');
});
