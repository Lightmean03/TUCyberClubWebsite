import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useAuthStore } from './authStore';

interface AuthContextType {
  user: any;
  token: string | null;
  refreshToken: string | null;
  csrfToken: string | null;
  isAuthenticated: boolean;
  handleSignIn: (formData: any) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSignUp: (formData: any) => Promise<void>;
  setCsrfToken: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStore = useAuthStore();

  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      if (authStore.isAuthenticated) {
        authStore.refreshAccessToken();
      }
    }, 4 * 60 * 1000); // Refresh every 4 minutes

    return () => clearInterval(refreshTokenInterval);
  }, [authStore]);

  return (
    <AuthContext.Provider value={authStore}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;