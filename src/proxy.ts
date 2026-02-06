import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create a new Ratelimit instance, caching it outside the handler for performance.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // Uses the KV environment variables
  limiter: Ratelimit.fixedWindow(50, '3s'), // Allow 10 requests per 10 seconds
  analytics: false,
  // /**
  //  * @see https://github.com
  //  */
  // cache: 'force-cache',
})

export const config = {
  matcher: '/api/:path*', // Apply only to API routes
}

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  const origin = request.headers.get('origin') || '*'

  // Define allowed origins dynamically
  // const allowedOrigins =
  //   process.env.NODE_ENV === 'production'
  //     ? ['https://galaxies.world', 'https://www.galaxies.world']
  //     : ['http://localhost:3000', 'http://localhost:3001']

  const isAllowedOrigin = true // origin && allowedOrigins.includes(origin)

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'null',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Continue with the request and add CORS headers to the response
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  if (process.env.NODE_ENV === 'development') {
    return response
  }

  // Identify the user by their IP address
  const ip = request.headers.get('ip') ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(`mw_${ip}`)

  event.waitUntil(pending)

  const res = success
    ? response // Proceed if within limit
    : NextResponse.rewrite(new URL('/api/blocked', request.url), request) // Redirect to a blocked page/API

  // Set rate limit headers for visibility
  res.headers.set('X-RateLimit-Limit', limit.toString())
  res.headers.set('X-RateLimit-Remaining', remaining.toString())
  res.headers.set('X-RateLimit-Reset', reset.toString())

  return response
}
