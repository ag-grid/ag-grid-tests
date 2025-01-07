import { test, expect } from '@playwright/test';

test('header components exposed render', async ({ page }) => {
  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8080/packages/AG-11760-header-expose-done/dist/');

  await expect(page.getByRole('row')).toHaveCount(2);
  await expect(page.getByRole('gridcell')).toHaveCount(2);

  const athlete = page.locator('.header_wrapper').first()
  const age = page.locator('.header_wrapper').last()

  expect(await athlete.textContent()).toBe('🌟athlete');
  expect(await age.textContent()).toBe('🌟age');

  expect(errorLogs.length).toEqual(0);
});

