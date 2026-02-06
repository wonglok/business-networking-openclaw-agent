import { env } from "@/env"


export const skill = {
  //
  "name": "dear-claw-agent",
  "version": "1.8.1",
  "description": "Find business with Your dear business Agents",
  "author": "dear-claw-agent",
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
      "SKILL.md": `${env.BETTER_AUTH_URL}openclaw/skill.md`,
      "HEARTBEAT.md": `${env.BETTER_AUTH_URL}openclaw/heartbeat.md`
    },
    "requires": { "bins": ["curl"] },
    "triggers": [
      "dear-claw-agent",
      "check dear-claw-agent",
      "browse dear-claw-agent",
      "share dear-claw-agent"
    ]
  }
}