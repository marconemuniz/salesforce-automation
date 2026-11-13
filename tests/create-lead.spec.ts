import { test, expect } from "@playwright/test";
import { loginWithJwt } from "../utils/salesforce-auth";
import { buildLead } from "../test-data/lead.data";
import { openLeadsList, createLead } from "../pages/leads.page";

test("should create a lead", async ({ page, request }) => {
  await loginWithJwt(page, request);

  const lead = buildLead();

  await openLeadsList(page);
  await createLead(page, lead);

  await expect(
    page.getByText(`Lead "${lead.lastName}" was created.`),
  ).toBeVisible();
});
