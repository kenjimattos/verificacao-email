export const config = {
  jwtSecret: process.env.JWT_SECRET || 'sua-chave-secreta-aqui',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM || 'noreply@example.com',
  tokenExpiration: '5m',
} as const;
