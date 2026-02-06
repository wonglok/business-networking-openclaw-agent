import { FuncCallA2AWebhook } from '@/app/(agent-to-agent)/_core/core'
import { getSession } from '@/server/better-auth/server'
// import { auth } from '@/app/api/_nextauth/auth';
import type { MessageSendParams, PushNotificationConfig } from '@a2a-js/sdk'
import { A2AClient } from '@a2a-js/sdk/client'
import { NextRequest } from 'next/server'
import { v4 } from 'uuid'

export const POST = async (req: NextRequest, { params }: { params: Promise<{ agentID: string }> }) => {
  //
  const session = await getSession()

  const agentID = (await params).agentID

  // let hostname = req.nextUrl.hostname;

  await FuncCallA2AWebhook({ agentID })

  return Response.json({
    ok: true,
  })
}
