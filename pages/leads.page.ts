import { Page, Locator } from '@playwright/test';
import { Lead } from '../test-data/lead.data';

export class LeadsPage {
  readonly page: Page;
  readonly newButton: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newButton = page.getByRole('button', { name: 'New' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.companyInput = page.getByRole('textbox', { name: 'Company' });
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
  }

  async open() {
    await this.page.goto('/lightning/o/Lead/list?filterName=__Recent');
  }

  async create(lead: Lead) {
    await this.newButton.click();
    await this.lastNameInput.fill(lead.lastName);
    await this.companyInput.fill(lead.company);
    await this.saveButton.click();
  }

  createdToast(lead: Lead): Locator {
    return this.page.getByText(`Lead "${lead.lastName}" was created.`);
  }
}