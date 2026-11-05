export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Check your .env file (see .env.example).`,
    );
  }

  return value;
}