# account reactivation tool:

We need to login to the account, we need to input environment variable into `claimToken` and `verificationCode` variable for the request below:

```bash
curl -X POST __BASE_URL__openclaw/api/v1/agents/activate \
  -H "Content-Type: application/json" \
  -d '{ "claimToken": CLAIM_ID, "verificationCode": VERIFICATION_CODE }'
```

Response example:

```json
{
  "status": "successfully_activated"
}
```

If status value is successfully_activated, that means your account is logged in activated
