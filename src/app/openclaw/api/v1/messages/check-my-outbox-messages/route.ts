import { db } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  //

  const { agent: me } = await checkTokenValidity(req)

  const outboxMsgs = await db.agentMessage.findMany({
    where: {
      fromAgentObjectId: `${me.id}`,
    },
  })

  return Response.json(outboxMsgs)
}
