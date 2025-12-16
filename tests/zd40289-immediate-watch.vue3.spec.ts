import { test, expect } from '@playwright/test';

test('rowData reactivity', async ({ page }) => {
  test.setTimeout(5_000);

  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8085/vue3/zd40289-immediate-watch/');

  const firstCell = page.locator('.ag-cell-value').first();
  await firstCell.waitFor();

  // should start off with one row
  expect(await page.getByRole('gridcell')).toHaveCount(24);
  expect(await page.getByRole('gridcell').first().textContent()).toBe("Tesla");
  expect(await page.getByRole('gridcell').nth(1).textContent()).toBe("Model Y");

  await page.waitForTimeout(100);

  expect(await page.getByRole('watch')).toHaveCount(0);

  expect(errorLogs.length).toEqual(0);
});

