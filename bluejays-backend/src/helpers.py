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
                    "name": player["person"]["fullName"],
                    "team": player["team"]["abbreviation"],
                    "value": player["value"],
                    "headshot": f"https://content.mlb.com/images/headshots/current/60x60/{player['person']['id']}@2x.png",
                }
            )
    return leaders
