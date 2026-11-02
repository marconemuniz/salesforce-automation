import { test, expect } from '@playwright/test';

test('should create a lead with required fields', async ({ page }) => {
  await page.goto('/lightning/o/Lead/list?filterName=__Recent');
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Muniz');
  await page.getByRole('textbox', { name: 'Company' }).fill('OnmiQA');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText('Lead "Muniz" was created.', { exact: true })).toBeVisible();
});