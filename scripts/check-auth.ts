import 'dotenv/config';
import { getAccessToken } from '../utils/salesforce-auth';

async function main() {
  const { accessToken, instanceUrl } = await getAccessToken();
  console.log('Token obtained. Length:', accessToken.length);
  console.log('Instance URL:', instanceUrl);
}

main().catch((error) => {
  console.error((error as Error).message);
  process.exit(1);
});