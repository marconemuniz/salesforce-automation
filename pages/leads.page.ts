import { Page } from "@playwright/test";
import { Lead } from "../test-data/lead.data";

export async function openLeadsList(page: Page) {
  await page.goto("/lightning/o/Lead/list?filterName=__Recent");
}

export async function createLead(page: Page, lead: Lead) {
  await page.getByRole("button", { name: "New" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).fill(lead.lastName);
  await page.getByRole("textbox", { name: "Company" }).fill(lead.company);
  await page.getByRole("button", { name: "Save", exact: true }).click();
}
