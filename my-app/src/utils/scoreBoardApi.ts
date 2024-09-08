import axios from 'axios';
import { API_URL } from '../lib/constants'
import Cookies from 'js-cookie';

export const getScoreBoard = async (page: number, pageSize: number) => {
      const csrfToken = Cookies.get('csrftoken');
      const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${API_URL}/scoreboard/scoreboard/get_scoreboard/?page=${page}&page_size=${pageSize}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken,
    }});
    return response.data;
  } catch (error) {
    console.error("Error fetching scoreboard:", error);
    throw error;
  }
};

export const createScoreboard = async (data: object) => {
  const csrfToken = Cookies.get('csrftoken');
  const accessToken = localStorage.getItem('accessToken');
  console.log('refreshToken', accessToken);
  try {
    const response = await axios.post(`${API_URL}/scoreboard/scoreboard/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating scoreboard entry:", error);
    throw error;
  }
};

export const updateScoreboardEntry = async (id: number, data: object) => {
  const csrfToken = Cookies.get('csrftoken');
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.put(`${API_URL}/scoreboard/scoreboard/${id}/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating scoreboard entry:", error);
    throw error;
  }
};

export const deleteScoreboardEntry = async (id: number) => {
    const csrfToken = Cookies.get('csrftoken');
    const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(`${API_URL}/scoreboard/scoreboard/${id}/delete/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting scoreboard entry:", error);
    throw error;
  }
};