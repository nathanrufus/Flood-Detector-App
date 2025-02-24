import requests
import random

url2 = "https://flood-detector-app.onrender.com/api/sensors/upload"

data2 = {
    "stationID": "ST005",
    "location": {
      "latitude": 48.85,
      "longitude": 2.35
    },
    "waterLevel": 4.8,
    "turbidity": 11.7,
    "ph": 6.9
  }

response = requests.post(url2 , json = data2)

if response.status_code == 200:
    print("Success:" ,  response.json())
else:
    print(f"Error {response.status_code}: {response.text}")

def send(times = 100):
    for i in range (times):
        data2["stationID"] = i
        data2["latitude"] = random.randint(-10,100)
        data2["longitude"] = random.randint(-100,100)
        requests.post(url , json = data)
    
