import { SAVE_TOKEN_SUCCESS, SAVE_TOKEN_FAILURE } from "../actions/tokenTypes";

const initialState = {
  savedToken: null,
  error: null,
};

const tokenReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SAVE_TOKEN_SUCCESS:
      return {
        ...state,
        savedToken: action.payload,
        error: null,
      };
    case SAVE_TOKEN_FAILURE:
      return {
        ...state,
        savedToken: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
