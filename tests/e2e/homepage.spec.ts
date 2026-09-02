import { expect, test } from '@playwright/test';

test('homepage shows ebook CTA and member area link', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Magie Vědomého Uzdravení/);
  await expect(page.getByRole('heading', { level: 1, name: 'Magie Vědomého Uzdravení' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Koupit e-book' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Členská sekce' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Poznejte Miru – AI průvodkyni uzdravením' })
  ).toHaveAttribute('href', '/mira');
});

test('mobile menu exposes the primary navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const menuButton = page.locator('#mobile-menu-button');
  await expect(page.getByRole('button', { name: 'Otevřít hlavní nabídku' })).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();

  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Zavřít hlavní nabídku' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Mobilní navigace' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mira', exact: true })).toBeVisible();
});

test('additional testimonials can be expanded', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Zobrazit další reference').click();
  await expect(page.getByText('Pavel', { exact: true })).toBeVisible();
  await expect(page.getByText('Danica', { exact: true })).toBeVisible();
});

test('homepage links to the chatbot and tracks the click with Umami', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Zjistit více o Miře' })).toHaveAttribute(
    'href',
    '/mira'
  );

  const chatbotLink = page.getByRole('link', {
    name: 'Promluvit si s Mirou v Telegramu',
  });

  await expect(chatbotLink).toHaveAttribute('href', 'https://t.me/uSkyCzBot?start=UZDRA20');
  await expect(chatbotLink).toHaveAttribute('data-umami-event', 'chatbot-open');
  await expect(chatbotLink).toHaveAttribute('data-umami-event-bot', 'vedome-uzdraveni');
  await expect(chatbotLink).toHaveAttribute(
    'data-umami-event-placement',
    'homepage-guide-section'
  );
});
