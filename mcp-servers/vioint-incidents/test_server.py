import pytest

import server


def test_query_incidents_rejects_inverted_date_range():
    with pytest.raises(RuntimeError, match="dateFrom '2026-12-01' is later than dateTo '2026-01-01'"):
        server.query_incidents(dateFrom="2026-12-01", dateTo="2026-01-01")
