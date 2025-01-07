import { test, expect } from '@playwright/test';

test('rowData reactivity', async ({ page }) => {
  test.setTimeout(5_000);

  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8080/packages/simple-vue3-grid/dist/');

  // should start off with one row
  expect(await page.getByRole('gridcell')).toHaveCount(3);
  expect(await page.getByRole('gridcell').first().textContent()).toBe("Tesla");
  expect(await page.getByRole('gridcell').locator('.priceIcon').count()).toBe(6);

  await page.getByRole('button').click();

  expect(await page.getByRole('gridcell')).toHaveCount(6);
  expect(await page.getByRole('gridcell').nth(3).textContent()).toBe("Wibble");
  expect(await page.getByRole('gridcell').locator('.priceIcon').count()).toBe(8);

  expect(errorLogs.length).toEqual(0);
});

