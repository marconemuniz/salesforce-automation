import { test, expect } from "../fixtures/test-fixtures";
import { buildLead } from "../test-data/lead.data";

test.describe("Lead form", () => {
  test("should create a lead with required fields", async ({
    leadsPage,
    leadCleanup,
  }) => {
    const lead = buildLead();
    leadCleanup.track(lead);

    await leadsPage.open();
    await leadsPage.create(lead);

    await expect(leadsPage.createdToast(lead)).toBeVisible();
  });

  test("should close the form without saving when cancelled", async ({
    leadsPage,
  }) => {
    const lead = buildLead();

    await leadsPage.open();
    await leadsPage.openNewForm();
    await leadsPage.fill(lead);
    await leadsPage.cancel();

    await expect(leadsPage.lastNameInput).toBeHidden();
  });

  test("should show an error when the last name is missing", async ({
    leadsPage,
  }) => {
    const lead = buildLead({ lastName: "" });

    await leadsPage.open();
    await leadsPage.openNewForm();
    await leadsPage.fill(lead);
    await leadsPage.save();

    await expect(leadsPage.requiredFieldError).toBeVisible();
  });
});
