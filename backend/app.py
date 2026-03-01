"""Flask application factory and entry point."""
import logging
from flask import Flask, jsonify
from flask_cors import CORS
from flask_compress import Compress

import config
from extensions import db, cache
from routes import hotels_bp, flights_bp

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
log = logging.getLogger(__name__)


def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = config.SQLALCHEMY_ENGINE_OPTIONS

    CORS(app)
    Compress(app)
    db.init_app(app)
    cache.init_app(app, config={"CACHE_TYPE": "SimpleCache"})

    app.register_blueprint(hotels_bp)
    app.register_blueprint(flights_bp)

    @app.route("/health", methods=["GET"])
    def health():
        """Health check for the API."""
        return jsonify({"status": "ok"})

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def internal_error(_e):
        log.exception("Internal server error")
        return jsonify({"error": "Internal server error"}), 500

    @app.errorhandler(400)
    def bad_request(_e):
        return jsonify({"error": "Bad request"}), 400

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=config.BACKEND_PORT, debug=True)
