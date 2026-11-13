import { test, expect } from "@playwright/test";
import { loginWithJwt } from "../utils/salesforce-auth";
import { buildLead } from "../test-data/lead.data";
import { getLeadsPage } from "../pages/leads.page";

test("should create a lead", async ({ page, request }) => {
  await loginWithJwt(page, request);

  const leadsPage = getLeadsPage(page);
  const lead = buildLead();

  await leadsPage.open();
  await leadsPage.create(lead);

  await expect(leadsPage.createdToast(lead)).toBeVisible();
});
