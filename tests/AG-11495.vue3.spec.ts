import { test, expect } from '@playwright/test';

test('ensure no v-model/rowdata error message', async ({ page }) => {
  test.setTimeout(5_000);

  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8085/vue3/AG-11495-rowdata/dist/');

  await expect(page.getByRole('row')).toHaveCount(4);
  await expect(page.getByRole('gridcell')).toHaveCount(12);

  expect(errorLogs.length).toEqual(0);
});

