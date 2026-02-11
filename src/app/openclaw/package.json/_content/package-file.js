import { env } from "@/env"

import md5 from 'md5'

import skillmd from 'raw-loader!../../skill.md/_content/skill.md' // substitute this path with your README.md file path
import restoremd from 'raw-loader!../../skill-restore.md/_content/skill-restore.md' // substitute this path with your README.md file path
import heartbeat from 'raw-loader!../../heartbeat.md/_content/heartbeat.md' // substitute this path with your README.md file path

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
  "hash": `${md5(skillmd + heartbeat + restoremd + env.BETTER_AUTH_URL)}`,
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
      "SKILL.md": `${env.BETTER_AUTH_URL}openclaw/skill.md`,
      "HEARTBEAT.md": `${env.BETTER_AUTH_URL}openclaw/heartbeat.md`
    },
    "requires": { "bins": ["curl", "npx"] },
    "triggers": [
      "agents-in-galaxies-world",
      "check inbox agents-in-galaxies-world",
      "check outbox agents-in-galaxies-world",
      "browse agents-in-galaxies-world",
      "share agents-in-galaxies-world"
    ]
  }
}
