import { test, expect } from '@playwright/test';
import { founderStory, mission, whyChoose, promise, homeStoryExcerpt } from '../src/lib/about';

test('About presents the founder story, mission, five reasons, and promise in order', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveTitle("About Elsie J's Home Care | Our Story & Mission");
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  for (const phrase of ['Nova Scotia', 'Family-founded', 'Continuing Care Assistant (CCA)', 'personalized care', 'seniors', 'people with disabilities', 'veterans']) expect(description).toContain(phrase);
  await expect(page.locator('main h2')).toHaveText([
    'Who we are', 'Our Story', 'Our Mission', "Why Choose Elsie J's Home Care?", 'Our Promise to You', 'Let’s get started today.',
  ]);

  await expect(page.locator('#our-story p')).toHaveText(founderStory);
  const story = await page.locator('#our-story').innerText();
  for (const phrase of ['my grandparents, Elsie and Gerald Jamieson', "Stage 4 Non-Hodgkin's Lymphoma", 'when I was five', 'when I was thirteen', 'skin cancer', 'At age 24', 'I made myself a promise']) expect(story).toContain(phrase);

  await expect(page.locator('#our-mission')).toContainText(mission.introduction);
  await expect(page.locator('.about-mission-principles h3')).toHaveText(mission.principles.map(principle => principle.title));
  await expect(page.locator('.about-mission-principles p')).toHaveText(mission.principles.map(principle => principle.text));
  await expect(page.locator('.about-reasons .process-step')).toHaveCount(5);
  await expect(page.locator('.about-reasons h3')).toHaveText(whyChoose.reasons.map(reason => reason.title));
  await expect(page.locator('.about-reasons p')).toHaveText(whyChoose.reasons.map(reason => reason.text));
  await expect(page.locator('.about-promise .promise-statement')).toHaveText(promise.statement);
  await expect(page.locator('.about-promise')).toContainText(promise.reassurance);
  await expect(page.locator('.about-promise')).toContainText(`${promise.closing} CARE.`);
  await expect(page.locator('.about-promise strong')).toHaveText('CARE.');

  await expect(page.locator('main a.button')).toHaveCount(1);
  await expect(page.locator('.about-reasons a, .about-promise a')).toHaveCount(0);
  await expect(page.locator('.contact-cta')).toContainText('Give your family the exceptional quality of care you deserve!');
  expect(await page.locator('main').innerText()).not.toMatch(/registered nurse|nursing services|medical treatment|Veterans Affairs|government partnership|24\/7|star rating/i);
});

test('Home adds only a concise story excerpt and one accessible About link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero h1')).toHaveText('A little help.More comfort.Right at home.');
  await expect(page.locator('.why-section .intro')).toHaveText(homeStoryExcerpt);
  const storyLink = page.getByRole('link', { name: 'Read Our Story', exact: true });
  await expect(storyLink).toHaveCount(1);
  await expect(storyLink).toHaveAttribute('href', '/about#our-story');
  await expect(page.locator('main a.button')).toHaveCount(3);
  await storyLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/about#our-story$/);
  await expect(page.getByRole('heading', { name: 'Our Story', exact: true })).toBeInViewport();
});
