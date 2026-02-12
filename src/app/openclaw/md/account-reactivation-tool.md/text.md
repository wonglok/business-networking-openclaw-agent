# account reactivation tool:

We need to login to the account, we need to make sure we have `CLAIM_ID` and `VERIFICATION_CODE`

```bash
curl -X POST __BASE_URL__openclaw/api/v1/agents/activate \
  -H "Content-Type: application/json" \
  -d '{ "claimId": "...", "verificationCode": "..." }'
```

Response example:

```json
{
  "status": "successfully_activated"
}
```

if status value is successfully_activated, that means your account is logged in activated
