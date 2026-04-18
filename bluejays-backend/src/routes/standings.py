from flask import Blueprint

standings_bp = Blueprint("standings", __name__, url_prefix="/standings")

@standings_bp.route("/", methods=["GET"])
def get_standings():

    standings_data = {
        "teams": [
            {"name": "Team A", "wins": 10, "losses": 5},
            {"name": "Team B", "wins": 8, "losses": 7},
            {"name": "Team C", "wins": 12, "losses": 3},
        ]
    }
    return standings_data
