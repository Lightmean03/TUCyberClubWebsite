// postActions.ts
import { Dispatch } from "redux";
import axios from "axios";
import * as postApi from "../api/postAPI";
import { API_URL } from "../../lib/constants";
import Cookies from "js-cookie";

// Define the data type for posts
interface Post {
  id: string;
  title: string;
  content: string;
  username: any;
}

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const FETCH_POST_BY_ID_REQUEST = "FETCH_POST_BY_ID_REQUEST";
export const FETCH_POST_BY_ID_SUCCESS = "FETCH_POST_BY_ID_SUCCESS";
export const FETCH_POST_BY_ID_FAILURE = "FETCH_POST_BY_ID_FAILURE";

type Action =
  | { type: typeof CREATE_POST_REQUEST }
  | { type: typeof CREATE_POST_SUCCESS; payload: Post }
  | { type: typeof CREATE_POST_FAILURE; payload: string }
  | { type: typeof FETCH_POSTS_REQUEST }
  | { type: typeof FETCH_POSTS_SUCCESS; payload: Post[] }
  | { type: typeof FETCH_POSTS_FAILURE; payload: string }
  | { type: typeof DELETE_POST_REQUEST }
  | { type: typeof DELETE_POST_SUCCESS; payload: string }
  | { type: typeof DELETE_POST_FAILURE; payload: string }
  | { type: typeof FETCH_POST_BY_ID_REQUEST }
  | { type: typeof FETCH_POST_BY_ID_SUCCESS; payload: Post[] }
  | { type: typeof FETCH_POST_BY_ID_FAILURE; payload: string };

export const createPostRequest = (): Action => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post: Post): Action => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error: string): Action => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const fetchPostsRequest = (): Action => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts: Post[]): Action => ({
  type: FETCH_POSTS_SUCCESS,
  payload:   posts,
});

export const fetchPostsFailure = (error: string): Action => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const deletePostRequest = (): Action => ({
  type: DELETE_POST_REQUEST,
});

export const deletePostSuccess = (postId: string): Action => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const deletePostFailure = (error: string): Action => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

export const fetchPostByIdRequest = (): Action => ({
  type: FETCH_POST_BY_ID_REQUEST,
});

export const fetchPostByIdSuccess = (post: Post[]): Action => ({
  type: FETCH_POST_BY_ID_SUCCESS,
  payload: post,
});

export const fetchPostByIdFailure = (error: string): Action => ({
  type: FETCH_POST_BY_ID_FAILURE,
  payload: error,
});

export const createPost = (postData: { title: string; content: string }) => async (dispatch: Dispatch<Action>) => {
  dispatch(createPostRequest());

  try {
    const token = localStorage.getItem("token");
    const createdPost: Post = await postApi.createPostApi(postData, token);

    dispatch(createPostSuccess(createdPost));
  } catch (error) {
    console.error("Error creating post:", error);
    dispatch(createPostFailure("Error creating post"));
  }
};
export const fetchPosts = (page: number, limit: number) => async (dispatch: Dispatch<Action>) => {
  dispatch(fetchPostsRequest());
  try {
    const response = await axios.get(`${API_URL}/post/posts?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });

    dispatch(fetchPostsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching posts:", error);
    dispatch(fetchPostsFailure("Failed to fetch posts"));
  }
};



export const deletePost = (id: string) => async (dispatch: Dispatch<Action>) => {
  dispatch(deletePostRequest());
  try {
    await postApi.deletePostApi(id);

    dispatch(deletePostSuccess(id));
  } catch (error) {
    console.error("Error deleting post:", error);
    dispatch(deletePostFailure("Error deleting post"));
  }
};

export const fetchPostById = (id: string) => async (dispatch: Dispatch<Action>) => {
  dispatch(fetchPostByIdRequest());

  try {
    const response = await postApi.fetchPostByIdApi(id);
    dispatch(fetchPostByIdSuccess(response));
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    dispatch(fetchPostByIdFailure(`Failed to fetch post with ID ${id}`));
  }
};