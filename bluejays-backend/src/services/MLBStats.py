import requests
from definitions import MLB_STATS_API_URL
from ..helpers import format_hitter_stats_and_gamelog, format_leader_stats, format_pitcher_stats_and_gamelog


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
                        "abbreviation": team_record["team"]["abbreviation"],
                        "newsName": (
                            team_record["team"]["teamName"].replace(" ", "").lower()
                            if team_record["team"]["abbreviation"] != "AZ"
                            else "dbacks"
                        ),
                        "teamName": team_record["team"]["name"],
                        "divisionRank": team_record["divisionRank"],
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
                        "logo": f"https://www.mlbstatic.com/team-logos/{team_record['team']['id']}.svg",
                    }
                )
            standings[division_name] = teams
        return standings

    @staticmethod
    def get_hitting_leaders(team_id=None):
        """
        return stat leaders for homeruns and OPS
        """
        params = {
            "leaderCategories": "homeRuns,onBasePlusSlugging,hits,stolenBases",
            "statGroup": "hitting",
            "hydrate": "team",
        }
        if team_id is not None:
            params["teamId"] = team_id
        raw_leaders = MLBService.get("/stats/leaders", params=params)
        return format_leader_stats(raw_leaders)

    @staticmethod
    def get_pitching_leaders(team_id=None):
        """
        return stat leaders for strikeouts and ERA
        """
        params = {
            "leaderCategories": "strikeouts,earnedRunAverage,wins,saves",
            "statGroup": "pitching",
            "hydrate": "team",
        }
        if team_id is not None:
            params["teamId"] = team_id
        raw_leaders = MLBService.get("/stats/leaders", params=params)

        return format_leader_stats(raw_leaders)

    @staticmethod
    def get_team_roster(team_id):
        """
        return active roster of provided team
        """
        raw_roster = MLBService.get(
            f"/teams/{team_id}/roster/active", params={"hydrate": "person(stats(type=season))"}
        )
        roster = {"hitters": [], "pitchers": []}
        for player in raw_roster["roster"]:
            position_type = player["position"]["type"]
            player_info = {
                "id": player["person"]["id"],
                "firstName": player["person"]["firstName"],
                "lastName": player["person"]["lastName"],
                "age": player["person"]["currentAge"],
                "position": player["position"]["abbreviation"],
                "jerseyNumber": player["jerseyNumber"],
                "batSide": player["person"]["batSide"]["code"],
                "pitchSide": player["person"]["pitchHand"]["code"],
                "headshot": f"https://content.mlb.com/images/headshots/current/60x60/{player['person']['id']}@2x.png",
            }
            if position_type == "Pitcher":
                try:
                    pitching_stats = next(
                        stat
                        for stat in player["person"]["stats"]
                        if stat["group"]["displayName"] == "pitching"
                    )["splits"][0]["stat"]
                    player_info = {**player_info, **pitching_stats}
                    player_info["strikeOutsPercentage"] = (
                        f"{round(
                        (pitching_stats['strikeOuts'] / pitching_stats['battersFaced']) * 100, 1
                    )}%"
                    )
                    player_info["baseOnBallsPercentage"] = (
                        f"{round(
                        (pitching_stats['baseOnBalls'] / pitching_stats['battersFaced']) * 100, 1
                    )}%"
                    )
                    roster["pitchers"].append(player_info)
                except Exception:
                    player_info = {
                        **player_info,
                        "gamesPitched": 0,
                        "inningsPitched": 0,
                        "battersFaced": 0,
                        "era": 0,
                        "wins": 0,
                        "losses": 0,
                        "strikeOuts": 0,
                        "baseOnBalls": 0,
                        "strikeOutsPercentage": "0%",
                        "baseOnBallsPercentage": "0%",
                    }
            else:
                try:
                    hitting_stats = next(
                        stat
                        for stat in player["person"]["stats"]
                        if stat["group"]["displayName"] == "hitting"
                    )["splits"][0]["stat"]
                    player_info = {**player_info, **hitting_stats}
                    player_info["strikeOutsPercentage"] = (
                        f"{round(
                        (hitting_stats['strikeOuts'] / hitting_stats['plateAppearances']) * 100, 1
                    )}%"
                    )
                    player_info["baseOnBallsPercentage"] = (
                        f"{round(
                        (hitting_stats['baseOnBalls'] / hitting_stats['plateAppearances']) * 100, 1
                    )}%"
                    )
                    roster["hitters"].append(player_info)
                except Exception:
                    player_info = {
                        **player_info,
                        "games": 0,
                        "atBats": 0,
                        "runs": 0,
                        "hits": 0,
                        "homeRuns": 0,
                        "runsBattedIn": 0,
                        "battingAverage": 0,
                        "strikeOuts": 0,
                        "baseOnBalls": 0,
                        "strikeOutsPercentage": "0%",
                        "baseOnBallsPercentage": "0%",
                    }
        return roster

    @staticmethod
    def get_player_info(player_id):
        """
        return details about player stats and gamelogs
        """
        response = MLBService.get(
            f"/people/{player_id}",
            params={"hydrate": "stats(type=[yearByYear,projected,career]),currentTeam"},
        )
        gamelog_response = MLBService.get(
            f"/people/{player_id}", params={"hydrate": "stats(type=[gamelog],limit=7)"}
        )

        raw_player = response["people"][0]
        raw_gamelog = gamelog_response["people"][0]["stats"][0]

        player = {
            "id": raw_player["id"],
            "firstName": raw_player["firstName"],
            "lastName": raw_player["lastName"],
            "age": raw_player["currentAge"],
            "position": raw_player["primaryPosition"]["abbreviation"],
            "mlbDebutDate": raw_player["mlbDebutDate"],
            "height": raw_player["height"],
            "weight": raw_player["weight"],
            "batsAndThrows": f"{raw_player['batSide']['code']} / {raw_player['pitchHand']['code']}",
            "teamName": raw_player["currentTeam"]["name"],
            "headshot": f"https://content.mlb.com/images/headshots/current/60x60/{raw_player['id']}@2x.png",
            "yearlyStats": [],
            "gamelogs": [],
        }

        if raw_player["primaryPosition"]["name"] != "Pitcher":
            formatted_data = format_hitter_stats_and_gamelog(raw_player["stats"], raw_gamelog)
        else:
            formatted_data = format_pitcher_stats_and_gamelog(raw_player["stats"], raw_gamelog)

        player["yearlyStats"] = formatted_data["yearlyStats"]
        player["gamelogs"] = formatted_data["gamelogs"]

        return player
