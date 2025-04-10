import { test, expect } from '@playwright/test';

test('v-model reactivity', async ({ page }) => {
  test.setTimeout(5_000);

  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8085/vue3/simple-v-model-reactivity/dist/');

  // should start off with one row
  await expect(page.getByRole('gridcell')).toHaveCount(2);

  expect(await page.getByRole('gridcell').last().textContent()).toBe('row 2 col1');

  await page.getByRole('button').click();

  expect(await page.getByRole('gridcell').last().textContent()).toBe('row 2 new col1');

  expect(errorLogs.length).toEqual(0);
});

