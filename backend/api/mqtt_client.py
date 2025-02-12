import paho.mqtt.client as mqtt
from .models import SensorData
import json

def on_message(client, userdata, message):
    data = json.loads(message.payload.decode("utf-8"))
    SensorData(**data).save()
    print("Received Data:", data)

client = mqtt.Client()
client.on_message = on_message
client.connect("broker.hivemq.com", 1883)
client.subscribe("flood/sensor")
client.loop_start()
