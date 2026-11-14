import { test as setup } from "@playwright/test";
import { loginWithJwt } from "../utils/salesforce-auth";

const authFile = "playwright/.auth/user.json";

setup(
  "authenticate with JWT and save the session",
  async ({ page, request }) => {
    await loginWithJwt(page, request);
    await page.context().storageState({ path: authFile });
  },
);
