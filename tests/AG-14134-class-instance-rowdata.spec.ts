import { test, expect } from '@playwright/test';

test('reactive rowdata', async ({ page }) => {
  test.setTimeout(5_000);

  await page.goto('http://localhost:8085/vue3/AG-14134-class-instance-rowdata/');

  const firstCell = page.locator('.ag-cell-value').first();
  await firstCell.waitFor();

  expect(await page.getByLabel('cell-value').textContent()).toBe('name 1-Mission: name 1-true');
  expect(await page.getByLabel('selection-check').textContent()).toBe('');

  await page.getByLabel('Press Space to toggle row selection (unchecked)').click()

  expect(await page.getByLabel('cell-value').textContent()).toBe('name 1-Mission: name 1-true');
  expect(await page.getByLabel('selection-check').textContent()).toBe('true-true');
});
