import { test, expect } from '@playwright/test';

test('reactive rowdata', async ({ page }) => {
  test.setTimeout(5_000);

  await page.goto('http://localhost:8085/vue3/zd36616-reactive-rowdata-editable');

  expect(await page.getByRole('gridcell').textContent()).toBe('2');
  expect(await page.getByLabel('value').textContent()).toBe('2');

  await page.getByRole('gridcell').dblclick()

  await expect(page.getByLabel('Input Editor')).toBeVisible();
  await expect(page.getByLabel('Input Editor')).toBeEditable();
  await page.getByLabel('Input Editor').fill('10')
  await page.getByLabel('Input Editor').press('Enter');

  await page.waitForTimeout(50); // waits for 2 seconds
  expect(await page.getByRole('gridcell').textContent()).toBe('10');
  expect(await page.getByLabel('value').textContent()).toBe('10');
});
