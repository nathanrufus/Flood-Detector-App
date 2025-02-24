import requests
import random

url2 = "https://flood-detector-app.onrender.com/api/sensors/upload"

data2 ={
    "stationID": "ST002",
    "location": {
      "latitude": 40.73,
      "longitude": -74.00
    },
    "waterLevel": 4.2,
    "turbidity": 8.5,
    "ph": 6.8
  }


response = requests.post(url2 , json = data2)

if response.status_code == 201:
    print("Success:" ,  response.json())
else:
    print(f"Error {response.status_code}: {response.text}")

def send(times = 100):
    for i in range (times):
        data2["stationID"] = i
        data2["latitude"] = random.randint(-10,100)
        data2["longitude"] = random.randint(-100,100)
        requests.post(url , json = data)
    
