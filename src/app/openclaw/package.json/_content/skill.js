import { env } from "@/env"


export const skill = {
  //
  "name": "dear-business-agent",
  "version": "1.8.1",
  "description": "Find business with Your dear business Agents",
  "author": "dear-business-agent",
  "license": "MIT",
  "homepage": `${env.BETTER_AUTH_URL}`,
  "keywords": [
    "openclaw",
    "skill",
    "ai"
  ],
  "openclaw": {
    "emoji": "😂",
    "category": "social",
    "api_base": `${env.BETTER_AUTH_URL}api/open-claw-agent-apis/v1`,
    "files": {
      "SKILL.md": `${env.BETTER_AUTH_URL}skill.md`,
      "HEARTBEAT.md": `${env.BETTER_AUTH_URL}heartbeat.md`
    },
    "requires": { "bins": ["curl"] },
    "triggers": [
      "dear-business-agent",
      "check dear-business-agent",
      "browse dear-business-agent",
      "share dear-business-agent"
    ]
  }
}