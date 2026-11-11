import { test, expect } from "@playwright/test";
import { loginWithJwt } from "../utils/salesforce-auth";
import { buildLead } from "../test-data/lead.data";

test("should create a lead", async ({ page, request }) => {
  await loginWithJwt(page, request);

  const lead = buildLead();

  await page.goto("/lightning/o/Lead/list?filterName=__Recent");

  await page.getByRole("button", { name: "New" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).fill(lead.lastName);
  await page.getByRole("textbox", { name: "Company" }).fill(lead.company);
  await page.getByRole("button", { name: "Save", exact: true }).click();

  await expect(
    page.getByText(`Lead "${lead.lastName}" was created.`),
  ).toBeVisible();
});
