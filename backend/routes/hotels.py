"""Hotel routes blueprint."""
import logging
from flask import Blueprint, jsonify, request
from extensions import db, cache
from models import Hotel

log = logging.getLogger(__name__)

hotels_bp = Blueprint("hotels", __name__)

DEFAULT_PER_PAGE = 20
MAX_PER_PAGE = 100


@hotels_bp.route("/hotels", methods=["GET"])
@cache.cached(timeout=60, query_string=True)
def get_hotels():
    """Return hotels with optional filters and pagination."""
    log.info("/hotels cache MISS")
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
        if min_price < 0:
            return jsonify({"error": "min_price must be non-negative"}), 400
        query = query.filter(Hotel.price_per_night >= min_price)
    if max_price is not None:
        if max_price < 0:
            return jsonify({"error": "max_price must be non-negative"}), 400
        query = query.filter(Hotel.price_per_night <= max_price)

    min_rating = request.args.get("min_rating", type=float)
    if min_rating is not None:
        query = query.filter(Hotel.rating >= min_rating)

    free_cancellation = request.args.get("free_cancellation", type=str)
    if free_cancellation == "true":
        query = query.filter(Hotel.free_cancellation == 1)

    page = request.args.get("page", 1, type=int)
    per_page = min(request.args.get("per_page", DEFAULT_PER_PAGE, type=int), MAX_PER_PAGE)

    paginated = query.order_by(Hotel.id).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "data": [h.to_dict() for h in paginated.items],
        "total": paginated.total,
        "page": paginated.page,
        "per_page": paginated.per_page,
        "pages": paginated.pages,
    })
