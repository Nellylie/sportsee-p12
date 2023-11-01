import axios from "axios";

// le service lançant l'appel d'Api, il atteind le endpoint de l'id utilisateur avec userId,
// et accéde à l'endpoint precisé en argument. Il s'agit d'une fonction asynchrone, encadrant avec try et catch la réponse 
// de Axios.get
export const fetchData = async (userId, endpoint) => {
  const API_URL = "http://localhost:3001"; 

  try {
    const response = await axios.get(`${API_URL}/user/${userId}${endpoint ? '/' + endpoint : ''}`).then((response) => response.data);
    return response.data; 
  } catch (error) {
    throw ("API call failed:", error);
  }
};
