import { NextRequest, NextResponse } from 'next/server';
import { optionsResponse } from '@/lib/cors';
import { verifyToken } from '@/lib/jwt';
import { messages, getVerificationErrorMessage } from '@/lib/messages';

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      throw new Error(messages.tokenMissing);
    }

    const { email } = await verifyToken(token);
    console.log('E-mail verificado:', email);

    return NextResponse.redirect(new URL('/success', request.url));

  } catch (error: unknown) {
    console.error('Erro na verificação:', error);

    const message = error instanceof Error
      ? getVerificationErrorMessage(error)
      : messages.tokenInvalid;

    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('message', message);
    return NextResponse.redirect(errorUrl);
  }
}
