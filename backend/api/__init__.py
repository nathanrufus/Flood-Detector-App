from flask import Flask
from flask_cors import CORS
from flask.json.provider import DefaultJSONProvider
from .database import db, initialize_db
from .routes import api
from .auth import auth, jwt
import flask_mongoengine.json
import os
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()  # Load MongoDB URI from .env file

def disable_json_encoder_patch():
    """Fixes Flask-MongoEngine trying to override `json_encoder`."""
    def fake_override_json_encoder(app):
        app.json = DefaultJSONProvider(app)  
    flask_mongoengine.json.override_json_encoder = fake_override_json_encoder

# Custom JSON provider to automatically convert ObjectId values to strings
class CustomJSONProvider(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Use the custom JSON provider to handle ObjectId serialization
    app.json = CustomJSONProvider(app)

    disable_json_encoder_patch()

    app.config["MONGODB_SETTINGS"] = {
        "host": os.getenv("MONGO_URI", "mongodb://localhost:27017/flood_db")  
    }

    initialize_db(app)
    jwt.init_app(app)

    app.register_blueprint(api, url_prefix="/api")
    app.register_blueprint(auth, url_prefix="/auth")

    return app