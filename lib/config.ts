function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  resendApiKey: getRequiredEnv('RESEND_API_KEY'),
  emailFrom: process.env.EMAIL_FROM || 'noreply@example.com',
  tokenExpiration: '5m',
} as const;
