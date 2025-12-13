import { NextResponse } from 'next/server';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
} as const;

export function optionsResponse() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export function jsonResponse(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

export function errorResponse(error: string, status = 500) {
  return NextResponse.json({ error }, { status, headers: corsHeaders });
}
