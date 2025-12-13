import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { Resend } from 'resend';
import { getEmailTemplate } from './email-template';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua-chave-secreta-aqui'
);

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'E-mail é obrigatório' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Gerar token JWT com expiração de 5 minutos
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(JWT_SECRET);

    // Montar link de verificação
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationLink = `${baseUrl}/api/confirm-verification?token=${token}`;

    // Enviar e-mail via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: email,
      subject: 'Verifique seu e-mail',
      html: getEmailTemplate(verificationLink),
    });

    return NextResponse.json(
      { message: 'E-mail de verificação enviado com sucesso' },
      { headers: corsHeaders }
    );

  } catch (error: unknown) {
    console.error('Erro ao enviar e-mail:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}
