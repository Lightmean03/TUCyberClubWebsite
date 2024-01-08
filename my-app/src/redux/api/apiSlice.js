import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "src/utils/authSlice";
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

export const apiSlice = createApi({
  BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await fetchBaseQuery(
      "/auth/refresh",
      api,
      extraOptions,
    );
    if (refreshResult?.data?.accessToken) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      return fetchBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const {
  useGetUsernameQuery,
  useUserDataQuery,
  useGetUsersByRoleQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = apiSlice;
export default apiSlice.reducer;
