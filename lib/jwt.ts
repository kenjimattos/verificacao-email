import { SignJWT, jwtVerify } from 'jose';
import { config } from './config';

const secret = new TextEncoder().encode(config.jwtSecret);

export async function createVerificationToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.tokenExpiration)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ email: string }> {
  const { payload } = await jwtVerify(token, secret);

  if (!payload.email || typeof payload.email !== 'string') {
    throw new Error('Token inválido');
  }

  return { email: payload.email };
}
