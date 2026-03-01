"""Flask app and API routes."""
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_caching import Cache

import config
from extensions import db
from models import Hotel, Flight

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS

CORS(app)
db.init_app(app)
cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})


with app.app_context():
    db.create_all()


@app.route("/hotels", methods=["GET"])
@cache.cached(timeout=60, query_string=True)
def get_all_hotels():
    """Return hotels, optionally filtered by destination, price range, and rating."""
    print("/hotels cache MISS")
    query = Hotel.query

    destination = request.args.get("destination", "").strip()
    if destination:
        like = f"%{destination}%"
        query = query.filter(
            db.or_(
                Hotel.name.ilike(like),
                Hotel.city.ilike(like),
                Hotel.country.ilike(like),
            )
        )

    min_price = request.args.get("min_price", type=float)
    max_price = request.args.get("max_price", type=float)
    if min_price is not None:
        query = query.filter(Hotel.price_per_night >= min_price)
    if max_price is not None:
        query = query.filter(Hotel.price_per_night <= max_price)

    min_rating = request.args.get("min_rating", type=float)
    if min_rating is not None:
        query = query.filter(Hotel.rating >= min_rating)

    free_cancellation = request.args.get("free_cancellation", type=str)
    if free_cancellation == "true":
        query = query.filter(Hotel.free_cancellation == 1)

    hotels = query.order_by(Hotel.id).all()
    return jsonify([h.to_dict() for h in hotels])

@app.route("/flights", methods=["GET"])
@cache.cached(timeout=60, query_string=True)
def get_all_flights():
    """Return all hotels from the database."""
    print("/flights cache MISS")
    flights = Flight.query.order_by(Flight.id).all()
    return jsonify([f.to_dict() for f in flights])


@app.route("/health", methods=["GET"])
def health():
    """Health check for the API."""
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=config.BACKEND_PORT, debug=True)
