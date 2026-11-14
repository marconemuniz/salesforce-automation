import { test, expect } from "@playwright/test";
import { loginWithJwt } from "../utils/salesforce-auth";
import { buildLead } from "../test-data/lead.data";
import { LeadsPage } from "../pages/leads.page";

test("should create a lead", async ({ page, request }) => {
  await loginWithJwt(page, request);

  const leadsPage = new LeadsPage(page);
  const lead = buildLead();

  await leadsPage.open();
  await leadsPage.create(lead);

  await expect(leadsPage.createdToast(lead)).toBeVisible();
});
