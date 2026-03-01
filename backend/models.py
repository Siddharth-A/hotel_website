"""SQLAlchemy models."""
from datetime import datetime

import config
from extensions import db


def _serialize_dt(value):
    """Return ISO string for datetime or pass through string from DB."""
    if value is None:
        return None
    if hasattr(value, "isoformat"):
        return value.isoformat()
    return str(value)


class Hotel(db.Model):
    """Hotel model matching the CSV/data schema."""

    __tablename__ = config.HOTELS_TABLE

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(500), nullable=True)
    price_per_night = db.Column(db.Numeric(10, 2), nullable=True)
    rating = db.Column(db.Numeric(3, 2), nullable=True)
    review_count = db.Column(db.Integer, nullable=True)
    star_rating = db.Column(db.Integer, nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    description = db.Column(db.Text, nullable=True)
    amenities = db.Column(db.String(500), nullable=True)  # pipe-separated list
    free_cancellation = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Serialize to JSON-friendly dict."""
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "country": self.country,
            "address": self.address,
            "price_per_night": float(self.price_per_night) if self.price_per_night is not None else None,
            "rating": float(self.rating) if self.rating is not None else None,
            "review_count": self.review_count,
            "star_rating": self.star_rating,
            "image_url": self.image_url,
            "description": self.description,
            "amenities": self.amenities.split("|") if self.amenities else [],
            "free_cancellation": self.free_cancellation,
            "created_at": _serialize_dt(self.created_at),
            "updated_at": _serialize_dt(self.updated_at),
        }


class Flight(db.Model):
    """Flight model matching the CSV/data schema."""

    __tablename__ = config.FLIGHTS_TABLE

    # id,flight_number,airline,origin,destination,type,departure_time,duration_hours,price
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flight_number = db.Column(db.String(100), nullable=False)
    airline = db.Column(db.String(100), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    duration_hours = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    def to_dict(self):
        """Serialize to JSON-friendly dict."""
        return {
            "id": self.id,
            "flight_number": self.flight_number,
            "airline": self.airline,
            "origin": self.origin,
            "destination": self.destination,
            "type": self.type,
            "departure_time": _serialize_dt(self.departure_time),
            "duration_hours": self.duration_hours,
            "price": float(self.price) if self.price is not None else None,
        }