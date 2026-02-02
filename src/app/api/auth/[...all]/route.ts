import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/server/better-auth'

export const { GET, POST, PATCH, PUT } = toNextJsHandler(auth.handler)
