import { Page } from "@playwright/test";
import { Lead } from "../test-data/lead.data";

export function getLeadsPage(page: Page) {
  return {
    newButton: page.getByRole("button", { name: "New" }),
    lastNameInput: page.getByRole("textbox", { name: "Last Name" }),
    companyInput: page.getByRole("textbox", { name: "Company" }),
    saveButton: page.getByRole("button", { name: "Save", exact: true }),

    async open() {
      await page.goto("/lightning/o/Lead/list?filterName=__Recent");
    },

    async create(lead: Lead) {
      await this.newButton.click();
      await this.lastNameInput.fill(lead.lastName);
      await this.companyInput.fill(lead.company);
      await this.saveButton.click();
    },

    createdToast(lead: Lead) {
      return page.getByText(`Lead "${lead.lastName}" was created.`);
    },
  };
}
