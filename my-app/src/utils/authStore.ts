import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { API_URL } from '../lib/constants';
import Cookies from 'js-cookie';

interface AuthState {
  user: any | null;
  token: string | null;
  csrfToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  handleSignIn: (formData: any) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSignUp: (formData: any) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setCsrfToken: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      csrfToken: null,
      isAuthenticated: false,

      handleSignIn: async (formData) => {
        try {
          const response = await axios.post(`${API_URL}/api/signin/`, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { access, refresh, user, role, email, csrftoken } = response.data;
          Cookies.set('csrftoken', csrftoken, { expires: 7 });
          Cookies.set('accessToken', access, { expires: 7 });
          Cookies.set('refreshToken', refresh, { expires: 7 });

          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
          set({
            user: { username: user, role, email },
            token: access,
            refreshToken: refresh,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Sign in error:', error);
          throw error;
        }
      },

      handleSignOut: async () => {
        const csrfToken = Cookies.get('csrftoken');
        console.log('token', get().refreshToken)
        console.log(csrfToken, 'csrf')
        try {
          await axios.post(`${API_URL}/api/signout/`, {}, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,

          });

          set({ user: null, token: null, refreshToken: null, isAuthenticated: false, });
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
        } catch (error) {
          console.error('Sign out error:', error);
        }
      },

      handleSignUp: async (formData) => {
        const csrfToken = Cookies.get('csrftoken');
        try {
          const response = await axios.post(`${API_URL}/api/signup/`, formData, {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
            withCredentials: true,
          });

          const { access, refresh, username, role, user_id } = response.data;
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);

          set({
            user: { id: user_id, username, role },
            token: access,
            refreshToken: refresh,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Sign up error:', error);
          throw error;
        }
      },

      refreshAccessToken: async () => {
        const csrfToken = Cookies.get('csrftoken');
        try {
          const response = await axios.post(
            `${API_URL}/api/token/refresh/`,
            { refresh: get().refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
              withCredentials: true,
            }
          );

          const { access } = response.data;
          localStorage.setItem('accessToken', access);
          set({ token: access });
        } catch (error) {
          console.error('Token refresh error:', error);
          set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
        }
      },

      setCsrfToken: () => {
        const csrfToken = Cookies.get('csrftoken');
        set({ csrfToken });
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);