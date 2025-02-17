from flask_mongoengine import MongoEngine
import os
from dotenv import load_dotenv

load_dotenv() 

db = MongoEngine()

def initialize_db(app):
    app.config["MONGODB_SETTINGS"] = {
        "host": os.getenv("MONGO_URI", "mongodb://localhost:27017/flood_db") 
    }
    db.init_app(app)