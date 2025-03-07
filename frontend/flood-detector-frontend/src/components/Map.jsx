import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getLatestSensors } from "../api/api";

const Map = () => {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLatestSensors();
      
      if (data.length === 0) {
        setError("No sensor data available. Please check the API.");
      } else {
        setError(null);
      }

      setSensorData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="h-[80vh] w-full border-2 rounded-lg shadow-md">
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sensorData.map((sensor, index) => (
          <Marker
            key={index}
            position={[sensor.location.latitude, sensor.location.longitude]}
          >
            <Popup>
              <p className="font-bold">{sensor.stationID}</p>
              <p>Water Level: {sensor.waterLevel}m</p>
              <p>Turbidity: {sensor.turbidity}</p>
              <p>pH: {sensor.ph}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
