import { expect, test } from '@playwright/test';

test('homepage shows ebook CTA and member area link', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Magie Vědomého Uzdravení/);
  await expect(page.getByRole('heading', { level: 1, name: 'Magie Vědomého Uzdravení' })).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 2, name: 'Uzdravení není výhradně výsledkem lékařského zásahu' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Koupit e-book' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Členská sekce' })).toBeVisible();
});

test('principles page distinguishes claims, observations and limits', async ({ page }) => {
  await page.goto('/principy-a-hranice');

  await expect(page).toHaveTitle(/Principy a hranice tvrzení/);
  await expect(page.getByRole('heading', { level: 2, name: 'Člověk se může uzdravit i bez přímého zásahu lékaře' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Změny pozorované při práci s dalšími lidmi' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'A co z toho netvrdím' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Kdy nečekat' })).toBeVisible();
});
