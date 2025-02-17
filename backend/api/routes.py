from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import SensorData, User
import bcrypt

api = Blueprint("api", __name__)

@api.route("/sensors/upload", methods=["POST"])
def upload_sensor_data():
    try:
        data = request.json
        new_data = SensorData(**data).save()
        return jsonify({"message": "Sensor data saved successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/sensors/latest", methods=["GET"])
def get_latest_data():
    data = SensorData.objects.order_by("-timestamp").limit(10)
    return jsonify(data=[sensor.to_mongo().to_dict() for sensor in data]), 200


@api.route("/sensors/<stationID>", methods=["GET"])
def get_sensor_by_station(stationID):
    data = SensorData.objects(stationID=stationID).order_by("-timestamp")
    return jsonify(data), 200
