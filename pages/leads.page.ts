import { Page, Locator } from "@playwright/test";
import { Lead } from "../test-data/lead.data";

export class LeadsPage {
  readonly page: Page;
  readonly newButton: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newButton = page.getByRole("button", { name: "New" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.companyInput = page.getByRole("textbox", { name: "Company" });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });
    this.requiredFieldError = page.getByText("Complete this field.");
  }

  async open() {
    await this.page.goto("/lightning/o/Lead/list?filterName=__Recent");
  }

  async openNewForm() {
    await this.newButton.click();
  }

  async fill(lead: Lead) {
    await this.lastNameInput.fill(lead.lastName);
    await this.companyInput.fill(lead.company);
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async create(lead: Lead) {
    await this.openNewForm();
    await this.fill(lead);
    await this.save();
  }

  createdToast(lead: Lead): Locator {
    return this.page.getByText(`Lead "${lead.lastName}" was created.`);
  }
}
