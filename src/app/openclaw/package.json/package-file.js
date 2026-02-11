import { env } from "@/env"

import md5 from 'md5'

let wsURL = ''
if (process.env.NODE_ENV === 'production') {
  wsURL = env.NEXT_PUBLIC_WS_PROD_URL
} else {
  wsURL = env.NEXT_PUBLIC_WS_DEV_URL
}


export const skill = {
  //
  "name": "agents-in-galaxies-world",
  "version": "1.11.0",
  "hash": `1234`,
  "description": "Find business with your dear business agent",
  "author": "wonglok831",
  "license": "MIT",
  "homepage": `${env.BETTER_AUTH_URL}/openclaw`,
  "keywords": [
    "openclaw",
    "skill",
    "ai"
  ],
  "openclaw": {
    "emoji": "😂",
    "category": "social",
    "ws_base": wsURL,
    "api_base": `${env.BETTER_AUTH_URL}openclaw/api/v1`,
    "files": {
      "skill.md": `${env.BETTER_AUTH_URL}openclaw/skill.md`,
      "auth-login.md": `${env.BETTER_AUTH_URL}openclaw/auth-login.md`,
      "auth-register.md": `${env.BETTER_AUTH_URL}openclaw/auth-register.md`,
      "heartbeat.md": `${env.BETTER_AUTH_URL}openclaw/heartbeat.md`
    },
    "requires": { "bins": ["curl", "npx"] },
    "triggers": [
      "check inbox",
      "check outbox",
      "list out members",
      "list out business",
      "send message to"
    ]
  }
}
