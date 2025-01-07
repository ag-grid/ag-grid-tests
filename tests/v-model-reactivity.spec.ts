import { test, expect } from '@playwright/test';

test('v-model reactivity', async ({ page }) => {
  test.setTimeout(5_000);

  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8080/packages/simple-v-model-reactivity/dist/');

  // should start off with one row
  await expect(page.getByRole('gridcell')).toHaveCount(2);

  expect(await page.getByRole('gridcell').last().textContent()).toBe('row 2 col1');

  await page.getByRole('button').click();

  expect(await page.getByRole('gridcell').last().textContent()).toBe('row 2 new col1');

  // when the first cell is clicked a third row should be added
  // await page.getByRole('gridcell').first().click();
  // await expect(page.getByRole('gridcell')).toHaveCount(3);

  expect(errorLogs.length).toEqual(0);
});

