import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';
import { optionsResponse, jsonResponse, errorResponse } from '@/lib/cors';
import { createVerificationToken } from '@/lib/jwt';
import { isValidEmail } from '@/lib/validation';
import { messages } from '@/lib/messages';
import { getEmailTemplate } from './email-template';

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return errorResponse(messages.emailRequired, 400);
    }

    if (!isValidEmail(email)) {
      return errorResponse(messages.emailInvalid, 400);
    }

    const token = await createVerificationToken(email);
    const baseUrl = getBaseUrl(request);
    const verificationLink = `${baseUrl}/api/confirm-verification?token=${token}`;

    const resend = new Resend(config.resendApiKey);

    await resend.emails.send({
      from: config.emailFrom,
      to: email,
      subject: 'Verifique seu e-mail',
      html: getEmailTemplate(verificationLink),
    });

    return jsonResponse({ message: messages.emailSent });

  } catch (error: unknown) {
    console.error('Erro ao enviar e-mail:', error);
    const errorMessage = error instanceof Error ? error.message : messages.serverError;
    return errorResponse(errorMessage);
  }
}
