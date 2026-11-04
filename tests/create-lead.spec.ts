import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leads.page';
import { buildLead } from '../test-data/lead.data';

test('should create a lead with required fields', async ({ page }) => {
  const leadsPage = new LeadsPage(page);
  const lead = buildLead();

  await leadsPage.open();
  await leadsPage.create(lead);

  await expect(leadsPage.createdToast(lead)).toBeVisible();
});