import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/lightning/o/Lead/list?filterName=__Recent');
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Teste');
  await page.getByRole('textbox', { name: 'Company' }).fill('Teste');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText('Lead "Teste" was created.', { exact: true })).toBeVisible();
});