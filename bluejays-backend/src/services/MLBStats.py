import requests
from definitions import MLB_STATS_API_URL


def get_standings():
    """
    return all standings data for both american league and national league
    """
    response = requests.get(f"{MLB_STATS_API_URL}/standings", params={"leagueId": "103, 104"})

    response.raise_for_status()

    return response.json()
