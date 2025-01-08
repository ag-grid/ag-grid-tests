import { test, expect } from '@playwright/test';

test('quasar get value', async ({ page }) => {
  test.setTimeout(5_000);

  await page.goto('http://localhost:8085/packages/AG-10731-editor-getvalue-done/dist/spa/#/');

  await page.getByRole('gridcell').dblclick()

  await expect(page.locator("#goldeditor")).toBeVisible();
  await page.locator("#goldeditor").fill('10')
  await page.locator("#goldeditor").press('Enter');

  expect(await page.getByRole('gridcell').textContent()).toBe('20');
});
