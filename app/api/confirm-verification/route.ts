import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua-chave-secreta-aqui'
);

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      throw new Error('Nenhum token de verificação fornecido');
    }

    // Verificar e decodificar o JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload.email) {
      throw new Error('Token inválido');
    }

    console.log('E-mail verificado:', payload.email);

    // Redirecionar para página de sucesso
    return NextResponse.redirect(new URL('/success', request.url));

  } catch (error: unknown) {
    console.error('Erro na verificação:', error);

    let message = 'Token de verificação inválido';

    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        message = 'O token de verificação expirou';
      } else if (error.message.includes('signature')) {
        message = 'Token de verificação inválido';
      } else if (error.message === 'Nenhum token de verificação fornecido') {
        message = error.message;
      }
    }

    // Redirecionar para página de erro
    const errorUrl = new URL('/error', request.url);
    errorUrl.searchParams.set('message', message);
    return NextResponse.redirect(errorUrl);
  }
}
