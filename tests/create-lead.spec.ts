import { test, expect } from "../fixtures/test-fixtures";
import { loginWithJwt } from "../utils/salesforce-auth";
import { buildLead } from "../test-data/lead.data";

test("should create a lead", async ({ page, request, leadsPage }) => {
  await loginWithJwt(page, request);

  const lead = buildLead();

  await leadsPage.open();
  await leadsPage.create(lead);

  await expect(leadsPage.createdToast(lead)).toBeVisible();
});
