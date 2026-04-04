#!/usr/bin/env bash
# Save an Agent TARS session's events to a local JSON file.
# Usage: save-session <session_id> [host:port]
#
# Output: analysis/session-yyyymmddHHMM.json

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SESSION_ID="${1:?Usage: save-session <session_id> [host:port]}"
HOST="${2:-localhost:8888}"

TIMESTAMP="$(date +%Y%m%d%H%M)"
OUTFILE="${SCRIPT_DIR}/session-${TIMESTAMP}.json"

echo "Fetching session ${SESSION_ID} from ${HOST}..."

HTTP_CODE=$(curl -s -o "${OUTFILE}" -w "%{http_code}" \
  "http://${HOST}/api/v1/sessions/events?sessionId=${SESSION_ID}")

if [ "$HTTP_CODE" -ne 200 ]; then
  echo "Error: server returned HTTP ${HTTP_CODE}" >&2
  cat "${OUTFILE}" >&2
  rm -f "${OUTFILE}"
  exit 1
fi

# Pretty-print in place
python3 -m json.tool "${OUTFILE}" > "${OUTFILE}.tmp" && mv "${OUTFILE}.tmp" "${OUTFILE}"

EVENT_COUNT=$(python3 -c "
import json, sys
with open('${OUTFILE}') as f:
    data = json.load(f)
events = data.get('events', data) if isinstance(data, dict) else data
print(len(events) if isinstance(events, list) else '?')
")

echo "Saved ${EVENT_COUNT} events → ${OUTFILE}"
