from flask import Blueprint, jsonify, request
from src.services.MLBStats import MLBService
from src.services.MLBNews import MLBNewsService

bp = Blueprint("mlb", __name__)


@bp.route("/standings", methods=["GET"])
def standings():
    return jsonify(MLBService.get_standings())


@bp.route("/teams", methods=["GET"])
def teams():
    return jsonify(MLBService.get_teams())


@bp.route("/stat-leaders", methods=["GET"])
def stat_leaders():
    team_id = request.args.get("team_id", None)
    hitters = MLBService.get_hitting_leaders(team_id)
    pitchers = MLBService.get_pitching_leaders(team_id)

    return jsonify({**hitters, **pitchers})


@bp.route("/team-roster", methods=["GET"])
def team_roster():
    team_id = request.args["team_id"]
    return jsonify(MLBService.get_team_roster(team_id))


@bp.route("/player/<player_id>", methods=["GET"])
def player(player_id):
    return jsonify(MLBService.get_player_info(player_id))


@bp.route("/news", methods=["GET"])
def news():
    team_name = request.args.get("team_name", None)
    return jsonify(MLBNewsService.get_news(team_name))
