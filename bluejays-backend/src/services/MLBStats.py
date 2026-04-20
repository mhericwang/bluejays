import requests
from definitions import MLB_STATS_API_URL


class MLBService:
    BASE_URL = MLB_STATS_API_URL

    @staticmethod
    def get(endpoint, params=None):
        response = requests.get(f"{MLBService.BASE_URL}{endpoint}", params=params, timeout=5)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def get_standings():
        """
        return all standings data for both american league and national league
        """
        return MLBService.get("/standings", {"leagueId": "103,104"})

    @staticmethod
    def get_hitting_leaders(team_id=None):
        """
        return stat leaders for homeruns and OPS
        """
        params = {"leaderCategories": "homeRuns,onBasePlusSlugging", "statGroup": "hitting"}
        if team_id is not None:
            params["teamId"] = f"{team_id}"
        return MLBService.get("/stats/leaders", params=params)

    @staticmethod
    def get_pitching_leaders(team_id=None):
        """
        return stat leaders for strikeouts and ERA
        """
        params = {"leaderCategories": "strikeouts,earnedRunAverage", "statGroup": "pitching"}
        if team_id is not None:
            params["teamId"] = f"{team_id}"
        return MLBService.get("/stats/leaders", params=params)

    @staticmethod
    def get_team_roster(team_id):
        """
        return active roster of provided team
        """
        return MLBService.get(f"/teams/{team_id}/roster")

    @staticmethod
    def get_player_info(player_id):
        """
        return details about player stats and gamelogs
        """
        response = MLBService.get(f"/people/{player_id}", params={"hydrate": "stats(type=[yearByYear,yearByYearAdvanced,projected,career]),currentTeam"})
        gamelog_response = MLBService.get(f"/people/{player_id}", params={"hydrate": "stats(type=[gamelog],limit=7)"})
        response["gamelog"] = gamelog_response["stats"]["splits"]

        return response
