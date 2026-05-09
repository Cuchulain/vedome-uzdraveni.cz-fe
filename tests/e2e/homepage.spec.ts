import { expect, test } from '@playwright/test';

test('homepage shows ebook CTA and member area link', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Magie Vědomého Uzdravení/);
  await expect(page.getByRole('heading', { level: 1, name: 'Magie Vědomého Uzdravení' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Koupit e-book' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Členská sekce' })).toBeVisible();
});
