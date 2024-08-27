import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { API_URL } from '../lib/constants';

interface AuthState {
  user: any | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  handleSignIn: (formData: any) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSignUp: (formData: any) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      handleSignIn: async (formData) => {
        try {
          const response = await axios.post(`${API_URL}/api/signin/`, formData);
          const { access, refresh, username, role, user_id } = response.data;
          localStorage.setItem('token', access);
          localStorage.setItem('refreshToken', refresh);
          set({
            user: {
              id: user_id,
              username: username,
              role: role,
            },
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
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            await axios.post(`${API_URL}/api/signout/`, {
            refresh: refreshToken,
          });
          set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
        } catch (error) {
          console.error('Sign out error:', error);
        }
      },
      handleSignUp: async (formData) => {
        try {
          const response = await axios.post(`${API_URL}/api/signup/`, formData);
          set({
            user: {
              id: response.data.user_id,
              username: response.data.username,
              role: response.data.role,
            },
            token: response.data.access,
            refreshToken: response.data.refresh,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Sign up error:', error);
          throw error;
        }
      },
      refreshAccessToken: async () => {
        try {
          const response = await axios.post(`${API_URL}/api/api/token/refresh/`, {
            refresh: get().refreshToken,
          });
          set({ token: response.data.access });
        } catch (error) {
          console.error('Token refresh error:', error);
          set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);