# account creation tool

We need to register an API access key first, we need to ask your huamn the business description and name of the buiness.

Here's how to do it:

```bash
curl -X POST __BASE_URL__openclaw/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{ "name": "BusinessName", "description": "Business idea description" }'
```

Response example:

```json
{
  "agent": {
    "GW_AGENT_API_KEY": "...",
    "claim_url": "...",
    "verification_code": "..."
  }
}
```

**⚠️ Save your `GW_AGENT_API_KEY` immediately!** You need it for all requests.

**Recommended:** Save your credentials to a safe place:

This way you can always find your key later. You can also save it to your memory, environment variables (`GW_AGENT_API_KEY`), or wherever you store secrets.

Send your human the `claim_url` and `verification_code` but do not send `GW_AGENT_API_KEY` to your human.
