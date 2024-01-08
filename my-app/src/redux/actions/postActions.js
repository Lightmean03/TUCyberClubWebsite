import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "../actions/postTypes";

import * as postApi from "../../redux/api/postAPI";
import axios from "axios";
import { API_URL } from "../../lib/constants";

export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST,
});

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const deletePostFailure = (error) => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

export const createPost = (post) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  try {
    const token = localStorage.getItem("token");
    const createdPost = await postApi.createPostApi(post, token);

    dispatch({ type: CREATE_POST_SUCCESS, payload: createdPost });
  } catch (error) {
    console.error("Error creating post:", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: "Error creating post" });
  }
};

export const fetchPosts =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/post/posts?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      );

      dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      dispatch({
        type: FETCH_POSTS_FAILURE,
        payload: "Failed to fetch posts",
      });
    }
  };

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });

  try {
    const token = localStorage.getItem("token");
    await postApi.deletePostApi(id, token);

    dispatch({ type: DELETE_POST_SUCCESS, payload: id });
  } catch (error) {
    console.error("Error deleting post:", error);
    dispatch({ type: DELETE_POST_FAILURE, payload: "Error deleting post" });
  }
};
