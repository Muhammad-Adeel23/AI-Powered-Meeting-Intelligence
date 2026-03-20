import React, { createContext, useContext, useState, useCallback } from "react";
import { loginUser, registerCompany } from "@/services/authService";
import { TOKEN_KEY } from "@/config/api";

export type UserRole = "superadmin" | "admin" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mm_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser(email, password);
    localStorage.setItem(TOKEN_KEY, res.token);
    const mapped: User = {
      id: String(res.user.id),
      name: res.user.fullName,
      email: res.user.email,
      role: res.user.role as UserRole,
      plan: "Starter",
      companyId: res.user.companyId ? String(res.user.companyId) : undefined,
      companyName: res.user.companyName || undefined,
    };
    setUser(mapped);
    localStorage.setItem("mm_auth_user", JSON.stringify(mapped));
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, companyName: string) => {
    const res = await registerCompany({ companyName, fullName: name, email, password });
    localStorage.setItem(TOKEN_KEY, res.token);
    const mapped: User = {
      id: String(res.user.id),
      name: res.user.fullName,
      email: res.user.email,
      role: res.user.role as UserRole,
      plan: "Starter",
      companyId: res.user.companyId ? String(res.user.companyId) : undefined,
      companyName: res.user.companyName || undefined,
    };
    setUser(mapped);
    localStorage.setItem("mm_auth_user", JSON.stringify(mapped));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mm_auth_user");
    localStorage.removeItem(TOKEN_KEY);
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
