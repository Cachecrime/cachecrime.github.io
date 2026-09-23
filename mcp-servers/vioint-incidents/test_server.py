import pytest

import server

SAMPLE_ROWS = [
    {
        "mergedId": "INC-001",
        "title": "Looted artifact recovered from border crossing",
        "country": "Kenya",
        "severity": "Medium",
        "status": "Open",
        "dateOccurred": "2026-09-01",
    },
    {
        "mergedId": "INC-002",
        "title": "Arms cache linked to militia group",
        "country": "Nigeria",
        "severity": "High",
        "status": "Closed",
        "dateOccurred": "2026-09-10",
    },
]


def test_query_incidents_rejects_inverted_date_range():
    with pytest.raises(RuntimeError, match="dateFrom '2026-12-01' is later than dateTo '2026-01-01'"):
        server.query_incidents(dateFrom="2026-12-01", dateTo="2026-01-01")


def test_query_incidents_keyword_and_country_match_nothing(monkeypatch):
    monkeypatch.setattr(server, "_fetch_rows", lambda: SAMPLE_ROWS)

    assert server.query_incidents(keyword="zzz-nonexistent") == []
    assert server.query_incidents(country="Atlantis") == []


def test_query_incidents_rejects_unknown_min_severity(monkeypatch):
    monkeypatch.setattr(server, "_fetch_rows", lambda: SAMPLE_ROWS)

    with pytest.raises(RuntimeError, match="Unknown minSeverity 'Hgih'"):
        server.query_incidents(minSeverity="Hgih")
