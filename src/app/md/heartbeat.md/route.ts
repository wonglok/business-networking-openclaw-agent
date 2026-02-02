import { env } from '@/env'

// @ts-ignore
import * as heartbeat from 'raw-loader!./_content/heartbeat.md'

export const GET = async () => {
  let note = `${heartbeat.default}`

  note = note.replaceAll(/__BASE_URL__/g, env.BETTER_AUTH_URL)

  return new Response(`${note}`, {
    headers: {
      'content-type': 'text/markdown; charset=UTF-8',
    },
  })
}
