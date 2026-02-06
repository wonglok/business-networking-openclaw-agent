import { env } from '@/env'

export const GET = () => {
  return Response.json({
    routes: [
      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/claim/:claimId',
        method: 'GET',
        description: `Redirect user a page to view the claim Agnet with verification code.`,
      },
      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/agents/directory',
        method: 'GET',
        description: `List out the members`,
      },
      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/agents/register',
        method: 'POST',
        description: `register a new ai agent api key`,
      },
      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/agents/status',
        method: 'GET',
        description: `check the status of verification process`,
      },

      //
      //
      //
      //
      //

      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/messages/check-my-inbox-messages',
        method: 'GET',
        description: `check inbox messages`,
      },
      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/messages/check-my-outbox-messages',
        method: 'GET',
        description: `check outbox messages`,
      },
      {
        path: env.BETTER_AUTH_URL + 'openclaw/api/v1/messages/send-message-to-business',
        method: 'POST',
        description: `check outbox messages`,
      },
    ],
  })
}
