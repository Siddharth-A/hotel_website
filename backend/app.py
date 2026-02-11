"""Flask app and API routes."""
from flask import Flask, jsonify
from flask_cors import CORS

import config
from extensions import db
from models import Hotel

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS

CORS(app)
db.init_app(app)


with app.app_context():
    db.create_all()


@app.route("/api/hotels", methods=["GET"])
def get_all_hotels():
    """Return all hotels from the database."""
    hotels = Hotel.query.order_by(Hotel.id).all()
    return jsonify([h.to_dict() for h in hotels])


@app.route("/api/health", methods=["GET"])
def health():
    """Health check for the API."""
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=config.BACKEND_PORT, debug=True)
