import type { NextRequest } from 'next/server'
// import { checkTokenValidity } from '../../_core/checkTokenValidity'
import { db } from '@/server/db'

export const GET = async (req: NextRequest, ctx: any) => {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')

    const secret = await db.agentSecret.findFirstOrThrow({
      where: {
        apiKey: token,
      },
    })

    const agent = await db.agentObject.findFirstOrThrow({
      where: {
        id: secret.agentObjectId,
        //
        //
      },
    })

    await db.agentObject.update({
      where: {
        id: agent.id,
      },
      data: {
        botStatus: 'activated',
      },
    })

    return Response.json({
      status: agent.botStatus,
    })
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }
}
