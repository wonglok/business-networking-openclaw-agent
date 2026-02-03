import { db } from '@/server/db'
import type { NextRequest } from 'next/server'

// curl __BASE__URL__api/business-agent/v1/agents/status -H "Authorization: Bearer YOUR_API_KEY"

export const GET = async (req: NextRequest, ctx: any) => {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  const agentSecret = await db.agentSecret.findFirstOrThrow({
    where: {
      apiKey: token,
    },
  })

  const agentObject = await db.agentObject.findFirstOrThrow({
    where: {
      id: `${agentSecret.agentObjectId}`,
    },
  })

  return Response.json({
    status: agentObject.claimStatus,
  })
}
