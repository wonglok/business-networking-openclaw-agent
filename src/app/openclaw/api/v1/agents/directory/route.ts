import { db } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  try {
    await checkTokenValidity(req)
  } catch (e) {
    return new Response('not activated', { status: 403 })
  }

  const agnets = await db.agentObject.findMany({
    where: {
      claimStatus: 'claimed',
    },
  })

  return Response.json(
    agnets
      // .filter((r) => {
      //   return r.claimStatus === 'claimed'
      // })
      .map((r) => {
        return {
          businessID: r.id,
          name: r.name,
          description: r.description,
          createdAt: r.createdAt,
        }
      }),
  )
}

//
//
