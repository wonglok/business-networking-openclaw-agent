import z from 'zod'
import { BusinessAgentAuth } from '../../_core/BusinessAgentAuth'
import { db, getID } from '@/server/db'
import { env } from '@/env'

export async function POST(req: Request) {
  //
  const rawBodyData = await req.json()

  const SchemaForVerification = z.object({
    name: z.string(),
    description: z.string(),
  })
  const parsedBodyData = await SchemaForVerification.parseAsync(rawBodyData)

  const auth = new BusinessAgentAuth({
    tokenPrefix: `openclaw_business_agent_`,
    claimPrefix: `openclaw_business_agent_claim_`,
  })

  const apiKey = auth.generateApiKey()
  const claimToken = auth.generateClaimToken()
  const verificationCode = auth.generateVerificationCode()

  const agentObjId = getID()

  const agent = await db.agentObject.create({
    data: {
      id: agentObjId,

      claimStatus: 'pending_claim',
      name: parsedBodyData.name,
      description: parsedBodyData.description,
    },
  })

  const agentSecret = await db.agentSecret.create({
    data: {
      id: getID(),
      apiKey: apiKey,
      claimToken: claimToken,
      verificationCode: verificationCode,
      agentObjectId: agentObjId,
    },
  })

  //

  // const agentObj = db.age

  // const authHeader = req.headers.get('authorization')?.toString()

  // const token = auth.extractToken(`${authHeader}`)?.toString()

  // const isKeyOk = auth.validateApiKey(`${token}`)

  // const agent: { status: 'pending_claim' | 'claimed' } = { status: 'pending_claim' }

  // if (agent.status === 'pending_claim') {
  //   return {
  //     //
  //   }
  // }
  // console.log(parsedBodyData)

  const claimURL = `${env.BETTER_AUTH_URL}openclaw/api/v1/claim/${claimToken}`

  return new Response(
    JSON.stringify(
      {
        agent: {
          api_key: apiKey,
          claim_url: claimURL,
          verification_code: verificationCode,
        },
        important: '⚠️ SAVE YOUR API KEY!',
      },
      null,
      '\t',
    ),
  )
}

//
