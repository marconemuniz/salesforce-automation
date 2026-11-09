import { Page, APIRequestContext, expect } from "@playwright/test";
import { readFileSync } from "fs";
import { sign } from "jsonwebtoken";

export async function loginWithJwt(page: Page, request: APIRequestContext) {
  // Step 1: sign the JWT with the private key

  const privateKey = process.env.SF_PRIVATE_KEY
    ? process.env.SF_PRIVATE_KEY.replace(/\\n/g, "\n")
    : readFileSync(process.env.SF_PRIVATE_KEY_PATH!, "utf8");

  const assertion = sign(
    {
      iss: process.env.SF_CLIENT_ID!,
      sub: process.env.SF_USERNAME!,
      aud: process.env.SF_LOGIN_URL!,
    },
    privateKey,
    { algorithm: "RS256", expiresIn: 180 },
  );

  // Step 2: exchange the JWT for an access token
  const tokenResponse = await request.post(
    `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
    {
      form: {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      },
    },
  );
  expect(tokenResponse.ok(), await tokenResponse.text()).toBeTruthy();
  const { access_token, instance_url } = await tokenResponse.json();

  // Step 3: exchange the token for a single-use frontdoor URL
  const frontdoorResponse = await request.post(
    `${instance_url}/services/oauth2/singleaccess`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      form: { redirect_uri: "lightning/page/home" },
    },
  );
  expect(frontdoorResponse.ok(), await frontdoorResponse.text()).toBeTruthy();
  const { frontdoor_uri } = await frontdoorResponse.json();

  // Step 4: open Salesforce already logged in
  await page.goto(frontdoor_uri);
  await page.waitForURL(/lightning\.force\.com/);
}
