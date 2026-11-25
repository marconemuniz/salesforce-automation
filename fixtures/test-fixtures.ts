import { test as base, APIRequestContext } from "@playwright/test";
import { LeadsPage } from "../pages/leads.page";
import { LeadApi } from "../api/lead.api";
import { Lead } from "../test-data/lead.data";
import { getAccessToken } from "../utils/salesforce-auth";

type LeadCleanup = {
  track: (lead: Lead) => void;
};

type Fixtures = {
  leadsPage: LeadsPage;
  salesforceApi: APIRequestContext;
  leadApi: LeadApi;
  leadCleanup: LeadCleanup;
};

export const test = base.extend<Fixtures>({
  leadsPage: async ({ page }, use) => {
    const leadsPage = new LeadsPage(page);
    await use(leadsPage);
  },

  salesforceApi: async ({ playwright, request }, use) => {
    const { accessToken, instanceUrl } = await getAccessToken(request);

    const api = await playwright.request.newContext({
      baseURL: instanceUrl,
      extraHTTPHeaders: { Authorization: `Bearer ${accessToken}` },
    });

    await use(api);
    await api.dispose();
  },

  leadApi: async ({ salesforceApi }, use) => {
    await use(new LeadApi(salesforceApi));
  },

  leadCleanup: async ({ leadApi }, use) => {
    const lastNames: string[] = [];

    await use({
      track: (lead: Lead) => {
        lastNames.push(lead.lastName);
      },
    });

    for (const lastName of lastNames) {
      await leadApi.deleteByLastName(lastName);
    }
  },
});

export { expect } from "@playwright/test";
