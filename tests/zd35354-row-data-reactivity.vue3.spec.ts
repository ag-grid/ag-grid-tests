import { test, expect } from '@playwright/test';

test('row data reactivity', async ({ page }) => {
  test.setTimeout(5_000);

  await page.goto('http://127.0.0.1:8085/vue3/zd35354-row-data-reactivity/dist/');

  expect(await page.getByRole('gridcell')).toHaveCount(35);
  expect(await page.getByRole('gridcell').nth(1).textContent()).toBe("AO");
  expect(await page.getByRole('gridcell').nth(8).textContent()).toBe("EC37B");

  await page.locator('button').first().click();
  expect(await page.getByRole('gridcell')).toHaveCount(35);
  expect(await page.getByRole('gridcell').nth(1).textContent()).toBe("First Update");
  expect(await page.getByRole('gridcell').nth(8).textContent()).toBe("EC37B");

  await page.locator('button').last().click();
  expect(await page.getByRole('gridcell')).toHaveCount(35);
  expect(await page.getByRole('gridcell').nth(1).textContent()).toBe("First Update");
  expect(await page.getByRole('gridcell').nth(8).textContent()).toBe("Second Update");
});

