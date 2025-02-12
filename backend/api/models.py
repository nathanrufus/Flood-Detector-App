from .database import db
from datetime import datetime

class SensorData(db.Document):
    stationID = db.StringField(required=True)
    location = db.DictField(required=True) 
    waterLevel = db.FloatField(required=True)
    turbidity = db.FloatField(required=True)
    ph = db.FloatField(required=True)
    timestamp = db.DateTimeField(default=datetime.utcnow)

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password_hash = db.StringField(required=True)
    role = db.StringField(default="user")  # admin or user
