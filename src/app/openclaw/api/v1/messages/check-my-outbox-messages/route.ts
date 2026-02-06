import { db } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  try {
    const { agent: me } = await checkTokenValidity(req)

    const outboxMsgs = await db.agentMessage.findMany({
      where: {
        fromAgentObjectId: `${me.id}`,
      },
    })

    return Response.json(outboxMsgs)
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }
}
