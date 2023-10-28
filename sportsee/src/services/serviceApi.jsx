import axios from "axios";

export const fetchData = async (userId, endpoint) => {
  const API_URL = "http://localhost:3001"; 

  try {
    const response = await axios.get(`${API_URL}/user/${userId}${endpoint ? '/' + endpoint : ''}`).then((response) => response.data);
    return response.data; 
  } catch (error) {
    throw ("API call failed:", error);
  }
};
