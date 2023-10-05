import axios from "axios";


export const fetchData = async (API_URL, userId, endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/${endpoint}`);
    console.log('fetCHDATA', response.data);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error.message);
    if (error.response) {
      console.error(`Status code: ${error.response.status}`);
      console.error("Data:", error.response.data);
    }

    throw error;
  }
};