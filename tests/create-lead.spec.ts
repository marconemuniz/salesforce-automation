import { test, expect } from "@playwright/test";
import { loginWithJwt } from "../utils/salesforce-auth";

test("should create a lead", async ({ page, request }) => {
  await loginWithJwt(page, request);

  const lastName = `Teste ${Date.now()}`;

  await page.goto("/lightning/o/Lead/list?filterName=__Recent");

  await page.getByRole("button", { name: "New" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
  await page.getByRole("textbox", { name: "Company" }).fill("Omni");
  await page.getByRole("button", { name: "Save", exact: true }).click();

  await expect(
    page.getByText(`Lead "${lastName}" was created.`, { exact: true }),
  ).toBeVisible();
});
