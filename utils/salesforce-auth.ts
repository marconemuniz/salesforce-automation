import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { requireEnv } from './env';

export interface SalesforceToken {
  accessToken: string;
  instanceUrl: string;
}

export async function getAccessToken(): Promise<SalesforceToken> {
  const loginUrl = requireEnv('SF_LOGIN_URL');
  const privateKey = readFileSync(requireEnv('SF_PRIVATE_KEY_PATH'), 'utf8');

  const assertion = sign(
    {
      iss: requireEnv('SF_CLIENT_ID'),
      sub: requireEnv('SF_USERNAME'),
      aud: loginUrl,
    },
    privateKey,
    { algorithm: 'RS256', expiresIn: 180 },
  );

  const response = await fetch(`${loginUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  const data = (await response.json()) as Record<string, string>;

  if (!response.ok) {
    throw new Error(
      `Salesforce token request failed: ${data.error} - ${data.error_description}`,
    );
  }

  return { accessToken: data.access_token, instanceUrl: data.instance_url };
}

export async function getFrontdoorUrl(
  { accessToken, instanceUrl }: SalesforceToken,
  redirectUri = 'lightning/page/home',
): Promise<string> {
  const response = await fetch(`${instanceUrl}/services/oauth2/singleaccess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    },
    body: new URLSearchParams({ redirect_uri: redirectUri }),
  });

  const data = (await response.json()) as Record<string, string>;

  if (!response.ok || !data.frontdoor_uri) {
    throw new Error(
      `Frontdoor URL request failed (${response.status}): ${JSON.stringify(data)}`,
    );
  }

  return data.frontdoor_uri;
}