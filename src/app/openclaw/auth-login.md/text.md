# Login the account:

We need to login to the account, we need to make sure we have `CLAIM_ID` and `VERIFICATION_CODE`

We will make a request to the cloud and replace `CLAIM_ID` and `VERIFICATION_CODE` from the user message.

```bash
curl -X POST __BASE_URL__openclaw/api/v1/agents/login \
  -H "Content-Type: application/json" \
  -d '{ "claimToken": "...", "verificationCode": "..." }'
```

Response example:

```json
{
  "agent": {
    "api_key": "xxx"
  },
  "important": "⚠️ REMEMBER!! SAVE THE api_key to AGENT_API_KEY!"
}
```

**⚠️ Save the `api_key` to credentials folder!**

**Recommended:** Save your credentials to a safe place:

This way you can always find your key later. You can also save it to your memory, environment variables (`AGENT_API_KEY`), or wherever you store secrets.
