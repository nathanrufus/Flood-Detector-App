import { useEffect, useState } from "react";
import { getLatestSensors } from "../api/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLatestSensors();
      setSensorData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center my-6">Flood Detector Dashboard</h1>

      {/* Data Summary Section */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold">Total Sensors</h3>
          <p className="text-2xl">{sensorData.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold">Average Water Level</h3>
          <p className="text-2xl">
            {sensorData.length ? (sensorData.reduce((acc, d) => acc + d.waterLevel, 0) / sensorData.length).toFixed(2) : "N/A"} m
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold">Average pH Level</h3>
          <p className="text-2xl">
            {sensorData.length ? (sensorData.reduce((acc, d) => acc + d.ph, 0) / sensorData.length).toFixed(2) : "N/A"}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        {/* Water Level Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Water Level Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stationID" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="waterLevel" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Turbidity Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Turbidity Levels</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stationID" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="turbidity" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* pH Level Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4">pH Level Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sensorData} dataKey="ph" nameKey="stationID" cx="50%" cy="50%" outerRadius={100} fill="#f43f5e" label>
                {sensorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#f43f5e", "#3b82f6", "#10b981"][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sensor Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Station ID</th>
                <th className="py-2 px-4 border">Latitude</th>
                <th className="py-2 px-4 border">Longitude</th>
                <th className="py-2 px-4 border">Water Level</th>
                <th className="py-2 px-4 border">Turbidity</th>
                <th className="py-2 px-4 border">pH</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((sensor, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">{sensor.stationID}</td>
                  <td className="py-2 px-4 border">{sensor.location.latitude.toFixed(2)}</td>
                  <td className="py-2 px-4 border">{sensor.location.longitude.toFixed(2)}</td>
                  <td className="py-2 px-4 border">{sensor.waterLevel}m</td>
                  <td className="py-2 px-4 border">{sensor.turbidity}</td>
                  <td className="py-2 px-4 border">{sensor.ph}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
