import axios from "axios";
const API_URL = "http://localhost:3000/api/tasks";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllTask`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
