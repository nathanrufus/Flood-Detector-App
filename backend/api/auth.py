from flask_jwt_extended import JWTManager, create_access_token
from flask import request, jsonify
from .models import User
import bcrypt

jwt = JWTManager()

@api.route("/auth/register", methods=["POST"])
def register():
    data = request.json
    hashed_pw = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
    new_user = User(username=data["username"], password_hash=hashed_pw).save()
    return jsonify({"message": "User created successfully"}), 201

@api.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    user = User.objects(username=data["username"]).first()
    if user and bcrypt.checkpw(data["password"].encode("utf-8"), user.password_hash.encode("utf-8")):
        access_token = create_access_token(identity={"username": user.username, "role": user.role})
        return jsonify({"access_token": access_token}), 200
    return jsonify({"error": "Invalid credentials"}), 401
