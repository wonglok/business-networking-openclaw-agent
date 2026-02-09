import { db } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  try {
    await checkTokenValidity(req)

    const agnets = await db.agentObject.findMany({
      where: {
        OR: [
          {
            botStatus: 'activated',
          },
          {
            botStatus: 'claimed',
          },
        ],
      },
    })

    return Response.json(
      agnets.map((r) => {
        return {
          businessID: r.id,
          name: r.name,
          description: r.description,
          createdAt: r.createdAt,
        }
      }),
    )
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }
}

//
//
