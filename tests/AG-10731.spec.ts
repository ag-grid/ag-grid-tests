import { test, expect } from '@playwright/test';

test('urlql master detail', async ({ page }) => {
  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8080/packages/AG-7343-urql-failure-done/dist/');

  const element = page.locator('[class="ag-icon ag-icon-tree-closed"]').first();
  await element.click();

  const matchingErrors = errorLogs.some(errorLog => errorLog.includes('No urql Client was provided'))
  expect(matchingErrors).toBeFalsy();
});
