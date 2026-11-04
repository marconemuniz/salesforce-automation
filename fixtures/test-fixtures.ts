import { test as base } from '@playwright/test';
import { LeadsPage } from '../pages/leads.page';

type Fixtures = {
  leadsPage: LeadsPage;
};

export const test = base.extend<Fixtures>({
  leadsPage: async ({ page }, use) => {
    const leadsPage = new LeadsPage(page);
    await use(leadsPage);
  },
});

export { expect } from '@playwright/test';