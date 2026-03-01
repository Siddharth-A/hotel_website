"""Shared Flask extensions to avoid circular imports."""
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache

db = SQLAlchemy()
cache = Cache()
