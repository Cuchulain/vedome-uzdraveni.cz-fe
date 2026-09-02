import { expect, test } from '@playwright/test';

test('healing article is listed and offers Mira with Umami tracking', async ({ page }) => {
  await page.goto('/novinky');

  await page.getByRole('link', { name: 'Setkání přístupů k uzdravení', exact: true }).click();

  await expect(page).toHaveURL(/\/novinky\/setkani-pristupu-k-uzdraveni\/?$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Setkání přístupů k uzdravení' })
  ).toBeVisible();
  await expect(
    page.getByRole('img', {
      name: 'Meditující postava mezi přírodními motivy a strukturami DNA a neuronových sítí',
    })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'mém šamanském blogu' })).toHaveAttribute(
    'href',
    'https://saman.jancejka.cz/posts/setkani-pristupu-k-uzdraveni/'
  );

  const chatbotLink = page.getByRole('link', { name: 'Otevřít Miru v Telegramu' });
  await expect(chatbotLink).toHaveAttribute('href', 'https://t.me/uSkyCzBot?start=UZDRA20');
  await expect(chatbotLink).toHaveAttribute('data-umami-event', 'chatbot-open');
  await expect(chatbotLink).toHaveAttribute('data-umami-event-bot', 'vedome-uzdraveni');
  await expect(chatbotLink).toHaveAttribute(
    'data-umami-event-placement',
    'blog-setkani-pristupu-k-uzdraveni'
  );
  await expect(page.getByRole('link', { name: 'Více o Miře' })).toHaveAttribute('href', '/mira');
});
