// src/utils/authContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { useAuthStore } from './authStore';

interface AuthContextType {
  user: any;
  token: string | null;
  refreshToken: string | null;
  handleSignIn: (formData: any) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSignUp: (formData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStore = useAuthStore();

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
