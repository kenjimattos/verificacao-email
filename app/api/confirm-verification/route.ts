import { NextRequest, NextResponse } from 'next/server';
import { optionsResponse } from '@/lib/cors';
import { verifyToken } from '@/lib/jwt';
import { messages, getVerificationErrorMessage } from '@/lib/messages';

export async function OPTIONS(request: NextRequest) {
  return optionsResponse(request);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      throw new Error(messages.tokenMissing);
    }

    const { email } = await verifyToken(token);

    const successUrl = new URL('/success', request.url);
    successUrl.searchParams.set('email', email);
    return NextResponse.redirect(successUrl);

  } catch (error: unknown) {
    const message = error instanceof Error
      ? getVerificationErrorMessage(error)
      : messages.tokenInvalid;

    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('message', message);
    return NextResponse.redirect(errorUrl);
  }
}
