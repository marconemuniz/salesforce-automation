import { test, expect } from '../fixtures/test-fixtures';
import { buildLead } from '../test-data/lead.data';

test('should create a lead with required fields', async ({ leadsPage }) => {
  const lead = buildLead();
  console.log(lead);
  await leadsPage.open();
  await leadsPage.create(lead);
  await expect(leadsPage.createdToast(lead)).toBeVisible();
});