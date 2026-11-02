import { test, expect } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('test', async ({ page }) => {
  await page.goto('https://resilient-raccoon-tkuwwg-dev-ed.trailblaze.lightning.force.com/lightning/o/Lead/list?filterName=__Recent');
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Teste');
  await page.getByRole('textbox', { name: 'Company' }).fill('Teste');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText('Lead "Teste" was created.', { exact: true })).toBeVisible();
});