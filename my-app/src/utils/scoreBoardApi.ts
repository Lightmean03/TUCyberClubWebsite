import axios from 'axios';
import { API_URL } from '../lib/constants'

export const getScoreBoard = async (page, pageSize) => {
  try {
    const response = await axios.get(`${API_URL}/scoreboard/scoreboard/get_scoreboard/?page=${page}&page_size=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scoreboard:", error);
    throw error;
  }
};

export const createScoreboard = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/scoreboard/scoreboard/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating scoreboard entry:", error);
    throw error;
  }
};

export const updateScoreboardEntry = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/scoreboard/scoreboard/${id}/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating scoreboard entry:", error);
    throw error;
  }
};

export const deleteScoreboardEntry = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/scoreboard/scoreboard/${id}/delete/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting scoreboard entry:", error);
    throw error;
  }
};