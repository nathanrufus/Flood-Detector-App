from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import SensorData, User
import bcrypt
from bson import ObjectId  # import ObjectId

api = Blueprint("api", __name__)

def convert_objectids(obj):
    """
    Recursively convert ObjectId values in a dict or list to strings.
    """
    if isinstance(obj, list):
        return [convert_objectids(item) for item in obj]
    elif isinstance(obj, dict):
        new_obj = {}
        for key, value in obj.items():
            new_obj[key] = convert_objectids(value)
        return new_obj
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj

@api.route("/sensors/latest", methods=["GET"])
def get_latest_data():
    data = SensorData.objects.order_by("-timestamp").limit(10)
    
    # Convert ObjectId to String for JSON serialization
    def convert_to_json(sensor):
        sensor_dict = sensor.to_mongo().to_dict()
        sensor_dict["_id"] = str(sensor_dict["_id"])  # Convert ObjectId to string
        return sensor_dict

    return jsonify(data=[convert_to_json(sensor) for sensor in data]), 200

# @api.route("/sensors/latest", methods=["GET"])
# def get_latest_data():
#     data = SensorData.objects.order_by("-timestamp").limit(10)
#     # Convert each sensor document to a dict and recursively convert ObjectIds
#     result = [convert_objectids(sensor.to_mongo().to_dict()) for sensor in data]
#     return jsonify(data=result), 200


@api.route("/sensors/<stationID>", methods=["GET"])
def get_sensor_by_station(stationID):
    data = SensorData.objects(stationID=stationID).order_by("-timestamp")
    result = [convert_objectids(sensor.to_mongo().to_dict()) for sensor in data]
    return jsonify(data=result), 200