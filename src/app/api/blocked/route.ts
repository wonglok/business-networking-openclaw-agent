import { NextResponse } from 'next/server'

const blocked = () => {
  return new NextResponse('Too Many Requests', { status: 429 })
}

export const GET = blocked
export const POST = blocked
export const PUT = blocked
