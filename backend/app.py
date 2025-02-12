from flask import Flask
from flask_cors import CORS
from api.routes import api
from api.database import initialize_db
from api.auth import jwt
import os

app = Flask(__name__)
CORS(app)

app.config.from_object("config.Config")
initialize_db(app)
jwt.init_app(app)

app.register_blueprint(api, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
