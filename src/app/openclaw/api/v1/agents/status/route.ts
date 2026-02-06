import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  const { agent } = await checkTokenValidity(req)

  return Response.json({
    status: agent.claimStatus,
  })
}
