import axios from "axios";

export const fetchData = async (API_URL, userId, endpoint) => {
  const response = await axios.get(`${API_URL}/user/${userId}/${endpoint}`).then((response) => (response.data));
  console.log('fetCHDATA', response);
  return response;
};
