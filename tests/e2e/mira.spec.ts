import { expect, test } from '@playwright/test';

test('Mira page links to the chatbot and tracks the click with Umami', async ({ page }) => {
  await page.goto('/mira');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Promluvte si s Mirou' })
  ).toBeVisible();

  const chatbotLink = page.getByRole('link', {
    name: 'Otevřít rozhovor s Mirou v Telegramu',
  });

  await expect(chatbotLink).toHaveAttribute('href', 'https://t.me/uSkyCzBot?start=UZDRA20');
  await expect(chatbotLink).toHaveAttribute('data-umami-event', 'chatbot-open');
  await expect(chatbotLink).toHaveAttribute('data-umami-event-bot', 'vedome-uzdraveni');
  await expect(chatbotLink).toHaveAttribute('data-umami-event-placement', 'mira-page-hero');
});
