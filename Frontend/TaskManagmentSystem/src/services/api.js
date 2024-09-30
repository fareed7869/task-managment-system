import axios from "axios";
const API_URL = "http://localhost:3000/api/tasks";
const API_URL_AUTH = "http://localhost:3000/api/auth";

export const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/register`, { username, email, password }, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error while signup : ", error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/login`, { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while login : ", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/logout`, {}, { withCredentials: true });
        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

// export const getTasks = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/getAllTask`);
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error;
//   }
// };

export const getTasks = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(
            `${API_URL}/getAllTask?page=${page}&limit=${limit}`, { withCredentials: true }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/removeTask/${id}`, { withCredentials: true });
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

export const getTask = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getTaskById/${id}`, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/createTask`, task, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/updateTask/${id}`, task, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const searchTasks = async (query, page = 1, limit = 5) => {
    try {
        const response = await axios.get(
            `${API_URL}/search?query=${query}&page=${page}&limit=${limit}`, { withCredentials: true }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error searching tasks:", error);
        throw error;
    }
};

export const filteredTaskStatus = async (status, page = 1, limit = 5) => {
    try {
        const response = await axios.get(
            `${API_URL}/filteredTaskStatus?status=${status}&page=${page}&limit=${limit}`, { withCredentials: true }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error while filtering task status:", error);
        throw error;
    }
};
