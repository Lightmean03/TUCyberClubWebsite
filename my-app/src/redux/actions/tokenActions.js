import axios from "axios";
import { SAVE_TOKEN_SUCCESS, SAVE_TOKEN_FAILURE } from "./tokenTypes";

export const saveTokenToDatabase = (token) => async (dispatch) => {
  try {
    const response = await axios.post("/tokens", { token });
    dispatch({
      type: SAVE_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SAVE_TOKEN_FAILURE,
      payload: error.message,
    });
  }
};
