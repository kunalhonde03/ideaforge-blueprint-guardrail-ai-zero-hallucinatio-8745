# GuardRail AI API Specification

## Endpoints

### 1. POST /api/review
Handles incoming GitHub pull_request webhooks.

**Headers:**
- `X-GitHub-Event`: `pull_request`
- `Content-Type`: `application/json`

**Response:**
```json
{
  "status": "success",
  "diffFilesParsed": 3,
  "vulnerabilitiesFound": 0,
  "patchStatus": "VERIFIED_CLEAN"
}
```

### 2. POST /api/telegram/notify
Dispatches critical vulnerability alerts to developer Telegram chat.
