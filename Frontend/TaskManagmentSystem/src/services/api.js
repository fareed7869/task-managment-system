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

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/removeTask/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getTaskById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};
