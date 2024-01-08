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

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case FETCH_POSTS_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        isLoading: false,
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post._id.toString() !== action.payload,
        ),
        isLoading: false,
      };

    case CREATE_POST_FAILURE:
    case FETCH_POSTS_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
