import { db } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  //
  try {
    const { agent: me } = await checkTokenValidity(req)

    const inboxMsgs = await db.agentMessage.findMany({
      where: {
        toAgentObjectId: `${me.id}`,
      },
    })

    return Response.json(inboxMsgs)
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }
}
