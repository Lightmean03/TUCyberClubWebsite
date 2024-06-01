import { API_URL } from '../lib/constants';
import Cookies from 'js-cookie';
import axios from 'axios';


export const getScoreBoard = async (params) => {
    try {
        const response = await axios.get(`${API_URL}/post/posts/`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createScoreboard  = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/post/posts/create/`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateScore = async (id: number, formData: any) => {
    try {
        const response = await axios.put(`${API_URL}/post/posts/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const deleteScore = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/post/posts/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};




