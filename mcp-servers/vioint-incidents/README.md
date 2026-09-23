# vioint-incidents MCP server

Minimal MCP server exposing two tools, `list_incidents` and `query_incidents`, backed by the
**VioINT MergedIncidents** Google Sheet
(`https://docs.google.com/spreadsheets/d/1BiREKO37TFcxVWknjrqn-km2LztVRTHTel1GEkRD1ic`,
tab `MergedIncidents`).

## Setup

1. Create a dedicated virtualenv in this directory and install dependencies into it (kept separate
   from `deepsearch-env` so its `google-api-python-client`/`protobuf` versions can't clash with
   other tools like `ghunt`):

   ```bash
   cd mcp-servers/vioint-incidents
   python3 -m venv .venv
   source .venv/bin/activate
   python3 -m pip install -r requirements.txt
   ```

2. Create a Google Cloud service account with the Sheets API enabled, and download its JSON key.

3. Share the Sheet with the service account's `client_email` as **Viewer**.

4. Copy `.env.example` to `.env` (or just export the vars) and set:

   ```bash
   export GOOGLE_SERVICE_ACCOUNT_FILE=/path/to/service-account.json
   ```

   `VIOINT_SHEET_ID` and `VIOINT_SHEET_TAB` already default to the correct values and don't need
   to be set unless you're pointing at a different sheet/tab.

## Run

```bash
cd mcp-servers/vioint-incidents
source .venv/bin/activate
python3 server.py
```

This starts the server over stdio, the standard transport for MCP clients (Claude Desktop, Claude
Code, etc.) to launch as a subprocess.

## Tools

Both tools read columns by exact header name from row 1 of the `MergedIncidents` tab. If any of
the six expected headers is missing from the sheet, they raise an error naming the missing
column(s) rather than returning partial data.

### `list_incidents(limit: int = 20)`

Returns up to `limit` incidents as a list of objects with exactly these fields:
`mergedId, title, country, severity, status, dateOccurred`.

### `query_incidents(keyword=None, country=None, dateFrom=None, dateTo=None, minSeverity=None)`

Returns incidents matching all supplied filters (same summary fields as `list_incidents`, no
limit):

- `keyword` — case-insensitive substring match against `title`.
- `country` — case-insensitive exact match against `country`.
- `dateFrom` / `dateTo` — inclusive bounds (`YYYY-MM-DD`) on `dateOccurred`.
- `minSeverity` — minimum severity on the `Low < Medium < High < Critical` scale
  (case-insensitive); returns incidents at or above this level.

Omitting all filters returns every incident.
