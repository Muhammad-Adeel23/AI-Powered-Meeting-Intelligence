import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john@meetingmind.com",
  plan: "Pro Plan",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mm_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (_email: string, _password: string) => {
    // Mock login — just set the user
    setUser(MOCK_USER);
    localStorage.setItem("mm_auth_user", JSON.stringify(MOCK_USER));
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    const newUser: User = { ...MOCK_USER, name, email };
    setUser(newUser);
    localStorage.setItem("mm_auth_user", JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mm_auth_user");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("mm_auth_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
