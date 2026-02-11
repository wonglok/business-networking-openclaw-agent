import { env } from '@/env'

import textMD from 'raw-loader!./_content/text.md' // substitute this path with your README.md file path

export const GET = async (req: Request, ctx: any) => {
  let note = textMD
  note = note.replaceAll(/__BASE_URL__/g, env.BETTER_AUTH_URL)

  if (process.env.NODE_ENV === 'production') {
    note = note.replaceAll(/__WS_URL__/g, env.NEXT_PUBLIC_WS_DEV_URL)
  } else {
    note = note.replaceAll(/__WS_URL__/g, env.NEXT_PUBLIC_WS_DEV_URL)
  }

  return new Response(`${note}`, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'content-type': 'text/markdown; charset=UTF-8',
      pragma: 'no-cache',
      expires: '0',
    },
  })
}

//
