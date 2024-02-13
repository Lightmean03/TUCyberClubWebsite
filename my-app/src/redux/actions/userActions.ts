import * as userAPI from "../api/userAPI";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USERS_BY_ROLE_SUCCESS,
  GET_USERS_BY_ROLE_FAILURE,
  GET_USERNAME,
  GET_USERNAME_FAILURE,
} from "./userTypes";

export const getUsersSuccess = (users: string, token : string) => ({
  type: GET_USERS_SUCCESS,
  payload: { users, token },
});

export const getUsersFailure = (error: string) => ({
  type: GET_USERS_FAILURE,
  payload: error,
});

export const getUserSuccess = (user: string, token: string) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error: string) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const getUsersByRoleSuccess = (users: string) => ({
  type: GET_USERS_BY_ROLE_SUCCESS,
  payload: users,
});

export const getUsersByRoleFailure = (error: string) => ({
  type: GET_USERS_BY_ROLE_FAILURE,
  payload: error,
});

export const GetUsername = (username: string) => ({
  type: GET_USERNAME,
  payload: username,
});

export const GetUsernameFailure = (error: string) => ({
  type: GET_USERNAME_FAILURE,
  payload: error,
});

export const getUsers = (token: string) => async (dispatch: any) => {
  try {
    const { error, data } = await userAPI.userData();
    if (!error) {
      dispatch(getUsersSuccess(data, token));
    } else {
      dispatch(getUsersFailure(error));
    }
  } catch (error) {
    dispatch(getUsersFailure(error));
  }
};

export const getUsername = () => async (dispatch) => {
  try {
    const { error, data } = await userAPI.getUsername();
    console.log("data", data);
    console.log("username", data.message);
    if (!error) {
      dispatch(GetUsername(data.message));
    } else {
      dispatch(GetUsernameFailure(error));
    }
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};

export const getUsersByRole = (role: string) => async (dispatch: any) => {
  try {
    const { error, data } = await userAPI.getUsersByRole(role);
    if (!error) {
      dispatch(getUsersByRoleSuccess(data));
    } else {
      dispatch(getUsersByRoleFailure(error));
    }
  } catch (error) {
    dispatch(getUsersByRoleFailure(error));
  }
};
