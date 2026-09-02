import { expect, test } from '@playwright/test';

test('homepage shows ebook CTA and member area link', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Magie Vědomého Uzdravení/);
  await expect(page.getByRole('heading', { level: 1, name: 'Magie Vědomého Uzdravení' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Koupit e-book' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Členská sekce' })).toBeVisible();
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
