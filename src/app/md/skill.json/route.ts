// import { env } from '@/env'
import { skill } from './_content/skill'

// @ts-ignore
export const GET = async () => {
  return new Response(`${JSON.stringify(skill)}`, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  })
}
