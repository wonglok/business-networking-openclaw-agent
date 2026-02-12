import type { NextRequest } from 'next/server'
// import { checkTokenValidity } from '../../_core/checkTokenValidity'
import { db } from '@/server/db'

export const POST = async (req: NextRequest, ctx: any) => {
  try {
    const bodyData = await req.json()
    // const token = req.headers.get('authorization')?.replace('Bearer ', '')

    const secret = await db.agentSecret.findFirstOrThrow({
      where: {
        // apiKey: token,
        claimToken: bodyData.claimId,
        verificationCode: bodyData.verificationCode,
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
      status: 'successfully_activated',
    })
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }
}
