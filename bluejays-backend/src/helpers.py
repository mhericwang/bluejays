def format_leader_stats(raw_leaders):
    """
    helper function to format the raw leader stats response from the API
    """
    leaders = {}
    for category in raw_leaders["leagueLeaders"]:
        stat_category = category["leaderCategory"]
        leaders[stat_category] = []
        for player in category["leaders"]:
            leaders[stat_category].append(
                {
                    "player": player["person"]["id"],
                    "rank": player["rank"],
                    "name": player["person"]["fullName"],
                    "team": player["team"]["abbreviation"],
                    "value": player["value"],
                    "headshot": f"https://content.mlb.com/images/headshots/current/60x60/{player['person']['id']}@2x.png",
                }
            )
    return leaders


def format_pitcher_stats_and_gamelog(raw_stats, raw_gamelog):
    """
    helper function to format the raw pitcher stats and gamelog response from the API
    """
    data = {
        "yearlyStats": [],
        "gamelogs": [],
    }

    for stat in raw_stats:
        for split in stat["splits"]:
            data["yearlyStats"].append(
                {
                    "year": split["season"] if stat["type"]["displayName"] != "career" else None,
                    "teamId": split["team"]["id"] if stat["type"]["displayName"] == "yearByYear" else None,
                    "teamLogo": (
                        f"https://www.mlbstatic.com/team-logos/{split['team']['id']}.svg"
                        if stat["type"]["displayName"] == "yearByYear"
                        else None
                    ),
                    "teamName": (
                        split["team"]["name"]
                        if stat["type"]["displayName"] == "yearByYear"
                        else stat["type"]["displayName"]
                    ),
                    "gamesPitched": split["stat"]["gamesPitched"],
                    "inningsPitched": split["stat"]["inningsPitched"],
                    "battersFaced": split["stat"]["battersFaced"],
                    "era": split["stat"]["era"],
                    "wins": split["stat"]["wins"],
                    "losses": split["stat"]["losses"],
                    "strikeOuts": split["stat"]["strikeOuts"],
                    "baseOnBalls": split["stat"]["baseOnBalls"],
                    "strikeOutsPercentage": f"{round((split['stat']['strikeOuts'] / split['stat']['battersFaced']) * 100, 1)}%",
                    "baseOnBallsPercentage": f"{round((split['stat']['baseOnBalls'] / split['stat']['battersFaced']) * 100, 1)}%",
                    "strikeoutsPer9Inn": split["stat"]["strikeoutsPer9Inn"],
                    "avg": f"{round(split['stat']['avg'], 3)}"[1:] if type(split["stat"]["avg"]) == float else split["stat"]["avg"],
                    "whip": split["stat"]["whip"],
                    "hits": split["stat"]["hits"],
                    "hitByPitch": split["stat"]["hitByPitch"],
                    "homeRuns": split["stat"]["homeRuns"],
                }
            )

    for game in raw_gamelog["splits"]:
        data["gamelogs"].append(
            {
                "date": game["date"],
                "opponentId": game["opponent"]["id"],
                "opponentLogo": f"https://www.mlbstatic.com/team-logos/{game['opponent']['id']}.svg",
                "summary": game["stat"]["summary"],
                "hits": game["stat"]["hits"],
                "numberOfPitches": game["stat"]["numberOfPitches"],
                "battersFaced": game["stat"]["battersFaced"],
                "avg": game["stat"]["avg"],
                "doubles": game["stat"]["doubles"],
                "triples": game["stat"]["triples"],
                "homeRuns": game["stat"]["homeRuns"],
                "intentionalWalks": game["stat"]["intentionalWalks"],
                "hitByPitch": game["stat"]["hitByPitch"],
                "wildPitches": game["stat"]["wildPitches"],
            }
        )

    return data


def format_hitter_stats_and_gamelog(raw_stats, raw_gamelog):
    """
    helper function to format the raw hitter stats and gamelog response from the API
    """
    data = {
        "yearlyStats": [],
        "gamelogs": [],
    }

    for stat in raw_stats:
        for split in stat["splits"]:
            data["yearlyStats"].append(
                {
                    "year": split["season"] if stat["type"]["displayName"] != "career" else None,
                    "teamId": split["team"]["id"] if stat["type"]["displayName"] == "yearByYear" else None,
                    "teamLogo": (
                        f"https://www.mlbstatic.com/team-logos/{split['team']['id']}.svg"
                        if stat["type"]["displayName"] == "yearByYear"
                        else None
                    ),
                    "teamName": (
                        split["team"]["name"]
                        if stat["type"]["displayName"] == "yearByYear"
                        else stat["type"]["displayName"]
                    ),
                    "gamesPlayed": split["stat"]["gamesPlayed"],
                    "plateAppearances": split["stat"]["plateAppearances"],
                    "hits": split["stat"]["hits"],
                    "runs": split["stat"]["runs"],
                    "rbi": split["stat"]["rbi"],
                    "doubles": split["stat"]["doubles"],
                    "triples": split["stat"]["triples"],
                    "homeRuns": split["stat"]["homeRuns"],
                    "avg": split["stat"]["avg"],
                    "obp": split["stat"]["obp"],
                    "slg": split["stat"]["slg"],
                    "ops": split["stat"]["ops"],
                    "babip": split["stat"]["babip"],
                    "strikeOuts": split["stat"]["strikeOuts"],
                    "baseOnBalls": split["stat"]["baseOnBalls"],
                    "strikeOutsPercentage": f"{round((split['stat']['strikeOuts'] / split['stat']['plateAppearances']) * 100, 1)}%",
                    "baseOnBallsPercentage": f"{round((split['stat']['baseOnBalls'] / split['stat']['plateAppearances']) * 100, 1)}%",
                    "stolenBases": split["stat"]["stolenBases"],
                    "caughtStealing": split["stat"]["caughtStealing"],
                }
            )

    for game in raw_gamelog["splits"]:
        data["gamelogs"].append(
            {
                "date": game["date"],
                "opponentId": game["opponent"]["id"],
                "opponentLogo": f"https://www.mlbstatic.com/team-logos/{game['opponent']['id']}.svg",
                "summary": game["stat"]["summary"],
                "plateAppearances": game["stat"]["plateAppearances"],
                "hits": game["stat"]["hits"],
                "rbi": game["stat"]["rbi"],
                "runs": game["stat"]["runs"],
                "doubles": game["stat"]["doubles"],
                "triples": game["stat"]["triples"],
                "homeRuns": game["stat"]["homeRuns"],
                "intentionalWalks": game["stat"]["intentionalWalks"],
                "hitByPitch": game["stat"]["hitByPitch"],
                "stolenBases": game["stat"]["stolenBases"],
                "caughtStealing": game["stat"]["caughtStealing"],
            }
        )

    return data
