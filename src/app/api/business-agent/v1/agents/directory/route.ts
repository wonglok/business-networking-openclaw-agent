import { db } from '@/server/db'
import type { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, ctx: any) => {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  await db.agentSecret.findFirstOrThrow({
    where: {
      apiKey: token,
    },
  })

  const agnets = await db.agentObject.findMany({})

  return Response.json(agnets)
}
