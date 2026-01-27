import { NextRequest } from 'next/server';

type RateLimitEntry = {
  timestamps: number[];
};

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 5;
const CLEANUP_INTERVAL_MS = 60_000;

let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
};

export function checkRateLimit(request: NextRequest): RateLimitResult {
  cleanup();

  const ip = getClientIp(request);
  const now = Date.now();

  const entry = store.get(ip) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS);

  const remaining = Math.max(0, MAX_REQUESTS - entry.timestamps.length);
  const oldestInWindow = entry.timestamps[0];
  const resetMs = oldestInWindow ? oldestInWindow + WINDOW_MS - now : WINDOW_MS;

  if (entry.timestamps.length >= MAX_REQUESTS) {
    return { allowed: false, limit: MAX_REQUESTS, remaining: 0, resetMs };
  }

  entry.timestamps.push(now);
  store.set(ip, entry);

  return {
    allowed: true,
    limit: MAX_REQUESTS,
    remaining: remaining - 1,
    resetMs,
  };
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetMs / 1000)),
  };
}
