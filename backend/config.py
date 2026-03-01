"""Application configuration. All values loaded from .env."""
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
HOTELS_TABLE = os.getenv("HOTELS_TABLE")
FLIGHTS_TABLE = os.getenv("FLIGHTS_TABLE")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", "5600"))

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ENGINE_OPTIONS = {
    "pool_size": 10,
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
