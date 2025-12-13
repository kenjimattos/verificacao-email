export const config = {
  jwtSecret: process.env.JWT_SECRET || 'sua-chave-secreta-aqui',
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM || 'noreply@example.com',
  tokenExpiration: '5m',
} as const;
