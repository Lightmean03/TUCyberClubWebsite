import axios from "axios";

import { API_URL } from "../../lib/constants";

export const createPostApi = async (post: any, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/post/post`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchPostsApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/post/posts?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePostApi = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/post/post/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchPostByIdApi = async (postId: string) => {
  try {
    const response = await axios.get(`${API_URL}/post/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};