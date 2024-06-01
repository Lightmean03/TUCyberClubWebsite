import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../lib/constants";

export const signIn = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/signin/`, formData, {
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

export const getUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};



export const signUp = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/signup/`, formData, {
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

export const signOut = async (refreshToken: string) => {

    try {
        const response = await axios.post(`${API_URL}/api/signout/`, {
            refresh: refreshToken,
        }, {
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
