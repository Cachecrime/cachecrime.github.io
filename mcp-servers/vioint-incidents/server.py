"""Minimal MCP server exposing list_incidents over the VioINT MergedIncidents Google Sheet."""

import os

from google.oauth2 import service_account
from googleapiclient.discovery import build
from mcp.server.mcpserver import MCPServer

SHEET_ID = os.environ.get("VIOINT_SHEET_ID", "1BiREKO37TFcxVWknjrqn-km2LztVRTHTel1GEkRD1ic")
SHEET_TAB = os.environ.get("VIOINT_SHEET_TAB", "MergedIncidents")
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

SUMMARY_FIELDS = ["mergedId", "title", "country", "severity", "status", "dateOccurred"]
SEVERITY_ORDER = ["low", "medium", "high", "critical"]

server = MCPServer("vioint-incidents")


def _sheets_client():
    key_path = os.environ.get("GOOGLE_SERVICE_ACCOUNT_FILE")
    if not key_path:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_FILE environment variable is not set")
    key_path = os.path.expanduser(key_path)
    if not os.path.isfile(key_path):
        raise RuntimeError(f"GOOGLE_SERVICE_ACCOUNT_FILE does not exist: {key_path}")

    credentials = service_account.Credentials.from_service_account_file(key_path, scopes=SCOPES)
    return build("sheets", "v4", credentials=credentials)


def _fetch_rows() -> list[dict[str, str]]:
    client = _sheets_client()
    result = (
        client.spreadsheets()
        .values()
        .get(spreadsheetId=SHEET_ID, range=f"{SHEET_TAB}!A1:Z")
        .execute()
    )
    values = result.get("values", [])
    if not values:
        return []

    headers = values[0]
    missing = [field for field in SUMMARY_FIELDS if field not in headers]
    if missing:
        raise RuntimeError(f"Sheet '{SHEET_TAB}' is missing expected column(s): {', '.join(missing)}")

    rows = []
    for raw_row in values[1:]:
        padded_row = raw_row + [""] * (len(headers) - len(raw_row))
        rows.append(dict(zip(headers, padded_row)))
    return rows


@server.tool()
def list_incidents(limit: int = 20) -> list[dict[str, str]]:
    """Return a summary view of incidents from the VioINT MergedIncidents sheet.

    Args:
        limit: Maximum number of incidents to return (default 20).
    """
    rows = _fetch_rows()
    summaries = [{field: row.get(field, "").strip() for field in SUMMARY_FIELDS} for row in rows]
    return summaries[:limit]


def _matches(
    row: dict[str, str],
    keyword: str | None,
    country: str | None,
    date_from: str | None,
    date_to: str | None,
    min_severity: str | None,
) -> bool:
    if keyword and keyword.lower() not in row.get("title", "").strip().lower():
        return False

    if country and row.get("country", "").strip().lower() != country.strip().lower():
        return False

    date_occurred = row.get("dateOccurred", "").strip()
    if date_from or date_to:
        if not date_occurred:
            return False
        if date_from and date_occurred < date_from:
            return False
        if date_to and date_occurred > date_to:
            return False

    if min_severity:
        try:
            min_rank = SEVERITY_ORDER.index(min_severity.strip().lower())
        except ValueError:
            raise RuntimeError(
                f"Unknown minSeverity '{min_severity}'; expected one of {SEVERITY_ORDER}"
            )
        row_severity = row.get("severity", "").strip().lower()
        if row_severity not in SEVERITY_ORDER:
            return False
        if SEVERITY_ORDER.index(row_severity) < min_rank:
            return False

    return True


@server.tool()
def query_incidents(
    keyword: str | None = None,
    country: str | None = None,
    dateFrom: str | None = None,
    dateTo: str | None = None,
    minSeverity: str | None = None,
) -> list[dict[str, str]]:
    """Search incidents from the VioINT MergedIncidents sheet with optional filters.

    Args:
        keyword: Case-insensitive substring to match against the incident title.
        country: Case-insensitive exact match against the incident country.
        dateFrom: Inclusive lower bound (YYYY-MM-DD) on dateOccurred.
        dateTo: Inclusive upper bound (YYYY-MM-DD) on dateOccurred.
        minSeverity: Minimum severity on the Low < Medium < High < Critical scale
            (case-insensitive); returns incidents at or above this level.
    """
    if dateFrom and dateTo and dateFrom > dateTo:
        raise RuntimeError(f"dateFrom '{dateFrom}' is later than dateTo '{dateTo}'")

    rows = _fetch_rows()
    filtered = [
        row
        for row in rows
        if _matches(row, keyword, country, dateFrom, dateTo, minSeverity)
    ]
    return [{field: row.get(field, "").strip() for field in SUMMARY_FIELDS} for row in filtered]


if __name__ == "__main__":
    server.run()
