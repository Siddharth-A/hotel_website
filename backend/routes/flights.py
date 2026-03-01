"""Flight routes blueprint."""
import logging
from flask import Blueprint, jsonify, request
from extensions import db, cache
from models import Flight

log = logging.getLogger(__name__)

flights_bp = Blueprint("flights", __name__)

DEFAULT_PER_PAGE = 10
MAX_PER_PAGE = 100


@flights_bp.route("/flights", methods=["GET"])
@cache.cached(timeout=60, query_string=True)
def get_flights():
    """Return flights with optional filters and pagination."""
    log.info("/flights cache MISS")
    query = Flight.query

    origin = request.args.get("origin", "").strip()
    if origin:
        query = query.filter(Flight.origin.ilike(f"%{origin}%"))

    destination = request.args.get("destination", "").strip()
    if destination:
        query = query.filter(Flight.destination.ilike(f"%{destination}%"))

    airline = request.args.get("airline", "").strip()
    if airline:
        query = query.filter(Flight.airline.ilike(f"%{airline}%"))

    flight_type = request.args.get("type", "").strip()
    if flight_type:
        query = query.filter(Flight.type.ilike(flight_type))

    min_price = request.args.get("min_price", type=float)
    max_price = request.args.get("max_price", type=float)
    if min_price is not None:
        query = query.filter(Flight.price >= min_price)
    if max_price is not None:
        query = query.filter(Flight.price <= max_price)

    page = request.args.get("page", 1, type=int)
    per_page = min(request.args.get("per_page", DEFAULT_PER_PAGE, type=int), MAX_PER_PAGE)

    paginated = query.order_by(Flight.id).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "data": [f.to_dict() for f in paginated.items],
        "total": paginated.total,
        "page": paginated.page,
        "per_page": paginated.per_page,
        "pages": paginated.pages,
    })
