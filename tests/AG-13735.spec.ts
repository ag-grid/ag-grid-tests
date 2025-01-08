import { test, expect } from '@playwright/test';

test('rowData is reactive', async ({ page }) => {
  const errorLogs = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      errorLogs.push(message.text())
    }
  })

  await page.goto('http://127.0.0.1:8085/packages/AG-13735-class-instances-rowdata//');

  // should start off with one row
  await expect(page.getByRole('gridcell')).toHaveCount(3);

  // expect(await page.getByRole('gridcell').nth(0).textContent()).toBe("Mission: name 1");
  // expect(await page.getByRole('gridcell').nth(1).textContent()).toBe("Mission: name 2");
  // expect(await page.getByRole('gridcell').nth(2).textContent()).toBe("Mission: name 3");

  // expect(errorLogs.length).toEqual(0);
});

