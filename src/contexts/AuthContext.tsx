import React, { createContext, useContext, useState, useCallback } from "react";
import { loginUser, signupUser } from "@/services/authService";
import { TOKEN_KEY } from "@/config/api";
import { mapRoleTypeToUserRole } from "@/lib/roles";
import type { User, UserRole, LoginResponseData } from "@/models";

export type { User, UserRole } from "@/models";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = "mm_auth_user";

function mapLoginResponseToUser(res: LoginResponseData): User {
  return {
    id: res.email, // backend doesn't return numeric id on login; use email as stable key
    name: res.fullName,
    email: res.email,
    role: mapRoleTypeToUserRole(res.roleType),
    plan: "Starter",
    companyId: res.companyId != null ? String(res.companyId) : undefined,
    companyName: res.companyName || undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const persistUser = (mapped: User) => {
    setUser(mapped);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mapped));
  };

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser(email, password);
    localStorage.setItem(TOKEN_KEY, res.token);
    persistUser(mapLoginResponseToUser(res));
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, companyName: string) => {
    // Backend SignupUser only returns { userId }. Auto-login after signup to obtain JWT and user details.
    await signupUser({ companyName, fullName: name, email, password });
    try {
      const res = await loginUser(email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      persistUser(mapLoginResponseToUser(res));
    } catch {
      // If auto-login fails, signup still succeeded — caller can redirect to /login
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
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
