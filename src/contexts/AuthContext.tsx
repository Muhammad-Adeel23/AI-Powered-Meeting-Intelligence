import React, { createContext, useContext, useState, useCallback } from "react";
import { loginUser, signupUser } from "@/services/authService";
import { TOKEN_KEY } from "@/config/api";
import type { User, UserRole } from "@/models";

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
    persistUser({
      id: String(res.user.id),
      name: res.user.fullName,
      email: res.user.email,
      role: res.user.role as UserRole,
      plan: "Starter",
      companyId: res.user.companyId ? String(res.user.companyId) : undefined,
      companyName: res.user.companyName || undefined,
    });
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, companyName: string) => {
    // Backend SignupUser only returns { userId }. Auto-login after signup to obtain JWT and user details.
    await signupUser({ companyName, fullName: name, email, password });
    try {
      await loginAfterSignup(email, password);
    } catch {
      // If auto-login fails, signup still succeeded — caller can redirect to /login
    }

    async function loginAfterSignup(em: string, pw: string) {
      const res = await loginUser(em, pw);
      localStorage.setItem(TOKEN_KEY, res.token);
      persistUser({
        id: String(res.user.id),
        name: res.user.fullName,
        email: res.user.email,
        role: res.user.role as UserRole,
        plan: "Starter",
        companyId: res.user.companyId ? String(res.user.companyId) : undefined,
        companyName: res.user.companyName || undefined,
      });
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
