from flask import Flask, jsonify
from flask_cors import CORS
from src.routes import MLBRoutes
import requests

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object("src.config.Config")
    app.register_blueprint(MLBRoutes.bp, url_prefix="/api/mlb")

    # Global error handlers
    @app.errorhandler(KeyError)
    def handle_missing_param(error):
        return jsonify({"error": f"Missing parameter: {str(error)}"}), 400

    @app.errorhandler(requests.RequestException)
    def handle_request_error(error):
        return jsonify({"error": f"API request failed: {str(error)}"}), 502

    @app.errorhandler(Exception)
    def handle_generic_error(error):
        return jsonify({"error": str(error), "type": type(error).__name__}), 500

    return app
