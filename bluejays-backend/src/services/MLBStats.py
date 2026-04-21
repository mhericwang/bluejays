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
    def get_teams():
        """
        return all active mlb teams
        """
        return MLBService.get("/teams", params={"sportId": 1})

    @staticmethod
    def get_standings():
        """
        return all standings data for both american league and national league
        """
        # helper to find split records easily
        def find_split_records(records, t):
            return next(record for record in records["records"]["splitRecords"] if record["type"] == t)

        # processing return data to easily display on frontend
        standings = {}
        raw_standings = MLBService.get("/standings", {"leagueId": "103,104", "hydrate": "division,team"})
        for division in raw_standings["records"]:
            division_name = division["division"]["nameShort"]
            teams = []
            for team_record in division["teamRecords"]:
                last_ten = find_split_records(team_record, "lastTen")
                teams.append(
                    {
                        "team": team_record["team"]["id"],
                        "wins": team_record["wins"],
                        "losses": team_record["losses"],
                        "winningPercentage": team_record["winningPercentage"],
                        "gamesBack": team_record["gamesBack"],
                        "lastTen": f"{last_ten["wins"]}-{last_ten["losses"]}",
                        "runDifferential": team_record["runDifferential"],
                        "home": find_split_records(team_record, "home")["pct"],
                        "away": find_split_records(team_record, "away")["pct"],
                        "oneRun": find_split_records(team_record, "oneRun")["pct"],
                        "extraInning": find_split_records(team_record, "extraInning")["pct"],
                    }
                )
            standings[division_name] = teams
        return standings

    @staticmethod
    def get_hitting_leaders(team_id=None):
        """
        return stat leaders for homeruns and OPS
        """
        params = {"leaderCategories": "homeRuns,onBasePlusSlugging", "statGroup": "hitting"}
        if team_id is not None:
            params["teamId"] = team_id
        return MLBService.get("/stats/leaders", params=params)

    @staticmethod
    def get_pitching_leaders(team_id=None):
        """
        return stat leaders for strikeouts and ERA
        """
        params = {"leaderCategories": "strikeouts,earnedRunAverage", "statGroup": "pitching"}
        if team_id is not None:
            params["teamId"] = team_id
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
        response = MLBService.get(
            f"/people/{player_id}",
            params={"hydrate": "stats(type=[yearByYear,yearByYearAdvanced,projected,career]),currentTeam"},
        )
        gamelog_response = MLBService.get(
            f"/people/{player_id}", params={"hydrate": "stats(type=[gamelog],limit=7)"}
        )

        player = response["people"][0]

        player["stats"].append(gamelog_response["people"][0]["stats"][0])

        return player
