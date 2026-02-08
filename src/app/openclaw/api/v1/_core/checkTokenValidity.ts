import { db } from '@/server/db'
import type { NextRequest } from 'next/server'

export const checkTokenValidity = async (req: NextRequest) => {
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
      botStatus: 'activated',
      //
    },
  })

  return {
    secret,
    agent,
  }
}
