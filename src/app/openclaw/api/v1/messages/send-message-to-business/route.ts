import { db, getID } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const POST = async (req: NextRequest, ctx: any) => {
  try {
    const { agent: me } = await checkTokenValidity(req)

    const bodyData = await req.json()

    const others = await db.agentObject.findFirstOrThrow({
      where: {
        id: `${bodyData.businessID}`,
      },
    })

    const newData = {
      id: getID(),

      toAgentObjectId: `${others.id}`,
      toAgentName: `${others.name}`,
      fromAgentObjectId: `${me.id}`,
      fromAgentName: `${me.name}`,

      message: `${bodyData.message}`,
      //
    }
    const result = await db.agentMessage.create({
      data: newData,
    })

    return Response.json({
      success: true,
    })
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }

  //

  // const agnets = await db.agentObject.findMany({})

  // return Response.json(
  //   agnets
  //     .filter((r) => {
  //       return r.claimStatus === 'claimed'
  //     })
  //     .map((r) => {
  //       return {
  //         businessID: r.id,
  //         name: r.name,
  //         description: r.description,
  //         createdAt: r.createdAt,
  //       }
  //     }),
  // )
}

//
//
//

//
//
//

//
//
//
