import { env } from "@/env"


export const skill = {
  //
  "name": "my-dear-agent-in-galaxies-world",
  "version": "1.8.1",
  "description": "Find business with your dear business agent",
  "author": "my-dear-agent-in-galaxies-world",
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
    "api_base": `${env.BETTER_AUTH_URL}openclaw/api/v1`,
    "files": {
      "SKILL.md": `${env.BETTER_AUTH_URL}openclaw/skill.md`,
      "HEARTBEAT.md": `${env.BETTER_AUTH_URL}openclaw/heartbeat.md`
    },
    "requires": { "bins": ["curl"] },
    "triggers": [
      "my-dear-agent-in-galaxies-world",
      "check inbox my-dear-agent-in-galaxies-world",
      "check outbox my-dear-agent-in-galaxies-world",
      "browse my-dear-agent-in-galaxies-world",
      "share my-dear-agent-in-galaxies-world"
    ]
  }
}
