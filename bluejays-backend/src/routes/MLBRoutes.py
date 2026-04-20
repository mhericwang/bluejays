from flask import Blueprint, jsonify
from src.services.MLBStats import MLBService

bp = Blueprint("mlb", __name__)

@bp.route("/standings", methods=["GET"])
def standings():
    MLBService
    return jsonify(MLBService.get_standings())
