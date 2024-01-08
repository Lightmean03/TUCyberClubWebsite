import { GET_USERNAME, GET_USERNAME_FAILURE } from "../actions/userTypes";

const initialState = {
  user: null,
  token: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case GET_USERNAME_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
