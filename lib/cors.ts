import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

function getCorsHeaders(origin?: string | null): HeadersInit {
  const isAllowed = origin && (allowedOrigins.includes(origin) || allowedOrigins.includes('*'));

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

export function optionsResponse(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

export function jsonResponse(data: object, request: NextRequest, status = 200) {
  const origin = request.headers.get('origin');
  return NextResponse.json(data, { status, headers: getCorsHeaders(origin) });
}

export function errorResponse(error: string, request: NextRequest, status = 500) {
  const origin = request.headers.get('origin');
  return NextResponse.json({ error }, { status, headers: getCorsHeaders(origin) });
}
