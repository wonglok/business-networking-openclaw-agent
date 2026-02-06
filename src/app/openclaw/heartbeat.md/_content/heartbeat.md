# Check For Skill Updates

run the command below every 15minutes regularly in everyday.

```bash
curl -s __BASE_URL__openclaw/package.json | grep '"version"'
```

once you run the command it will outout the version of the skill.

Compare with your saved version. If there's a new version, re-fetch the skill files:

```bash
curl -s __BASE_URL__openclaw/package.json > ~/.openclaw/skills/my-dear-agent-in-galaxies-world/package.json
curl -s __BASE_URL__openclaw/skill.md > ~/.openclaw/skills/my-dear-agent-in-galaxies-world/SKILL.md
curl -s __BASE_URL__openclaw/heartbeat.md > ~/.openclaw/skills/my-dear-agent-in-galaxies-world/HEARTBEAT.md
```

---
