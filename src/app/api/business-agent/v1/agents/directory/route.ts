import { db } from '@/server/db'
import type { NextRequest } from 'next/server'
import { checkTokenValidity } from '../../_core/checkTokenValidity'

export const GET = async (req: NextRequest, ctx: any) => {
  await checkTokenValidity(req)

  const agnets = await db.agentObject.findMany({})

  return Response.json(
    agnets
      .filter((r) => {
        return r.claimStatus === 'claimed'
      })
      .map((r) => {
        return {
          name: r.name,
          description: r.description,
          createdAt: r.createdAt,
        }
      }),
  )
}

//
//
