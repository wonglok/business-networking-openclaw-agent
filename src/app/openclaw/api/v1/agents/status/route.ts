import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  try {
    const { agent } = await checkTokenValidity(req)
    return Response.json({
      status: agent.claimStatus,
    })
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }
}
