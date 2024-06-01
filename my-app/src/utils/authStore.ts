import {create} from 'zustand';
import { signIn, signOut, signUp } from './auth';
import { setItem, getItem, removeItem  } from './useLocalStorage';



interface AuthState {
    user: any;
    token: string | null;
    refreshToken: string | null;
    handleSignIn: (formData: any) => Promise<void>;
    handleSignOut: () => Promise<void>;
    handleSignUp: (formData: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
   
    return {
        user: null,
        token: null,
        refreshToken: null,
        handleSignIn: async (formData: any) => {
            try {
                const response = await signIn(formData);
                console.log('Sign in successful:', response);
                set({
                    user: response,
                    token: response.access,
                    refreshToken: response.refresh,
                });
                setItem('access_token', response.access);
                setItem('refresh_token', response.refresh);
            } catch (err) {
                console.error('Sign in error:', err);
            }
        },
        handleSignOut: async () => {
            try {
                const refreshToken = getItem('refresh_token');
                const response = await signOut(refreshToken);
                console.log('Sign out successful:', response);
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                });
                removeItem('access_token');
                removeItem('refresh_token');
            } catch (err) {
                console.error('Sign out error:', err);
            }
        },
        handleSignUp: async (formData: any) => {
            try {
                const response = await signUp(formData);
                console.log('Sign up successful:', response);
            } catch (err) {
                console.error('Sign up error:', err);
            }
        },
    };
});
