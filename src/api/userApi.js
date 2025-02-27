import axios from "axios";


// const API_BASE_URL = "http://54.236.98.193:3555/api";
const API_BASE_URL = "http://localhost:5050/api";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/getAllUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export default {
    fetchUsers,
    deleteUser,
    createUser
}