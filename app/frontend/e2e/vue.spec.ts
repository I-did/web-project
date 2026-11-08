import { test, expect } from '@playwright/test';

// Пример настройки и запуска тестов:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('You did it!');
});
