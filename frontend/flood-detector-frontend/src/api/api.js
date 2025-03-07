import axios from "axios";

const API_BASE_URL = "https://flood-detector-app.onrender.com/api"; // Change to your API URL

export const getLatestSensors = async () => {
  try {
    console.log("Fetching sensor data...");

    const response = await axios.get(`${API_BASE_URL}/sensors/latest`);

    console.log("API Response:", response);

    if (response.status !== 200) {
      console.error(`API Error: Received status ${response.status}`);
      return [];
    }

    if (!response.data || !Array.isArray(response.data.data)) {
      console.error("Invalid API Response Format:", response.data);
      return [];
    }

    console.log("Fetched Data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sensor data:", error.message);

    if (error.response) {
      console.error("API Response Data:", error.response.data);
      console.error("API Status Code:", error.response.status);
    } else if (error.request) {
      console.error("No response received. Possible network error.");
    }

    return [];
  }
};
