import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const createPostApi = async (post, token) => {
  try {
    const response = await axios.post(`${BASE}/post/post`, post, {
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
      `${baseURL}/post/posts?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePostApi = async (id, token) => {
  try {
    const response = await axios.delete(`${baseURL}/post/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
