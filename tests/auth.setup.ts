import { test as setup } from '@playwright/test';
import { getAccessToken, getFrontdoorUrl } from '../utils/salesforce-auth';

const authFile = 'playwright/.auth/user.json';

setup('authenticate with JWT and save session', async ({ page }) => {
  const token = await getAccessToken();
  const frontdoorUrl = await getFrontdoorUrl(token);

  await page.goto(frontdoorUrl);
  await page.waitForURL(/lightning\.force\.com/);

  await page.context().storageState({ path: authFile });
});