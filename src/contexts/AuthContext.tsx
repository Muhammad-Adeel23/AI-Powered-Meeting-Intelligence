import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "employee";

export interface CompanyEmployee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: string;
  role: UserRole;
  companyId: string;
  companyName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  companyEmployees: CompanyEmployee[];
  addEmployee: (employee: Omit<CompanyEmployee, "id">) => void;
  removeEmployee: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_EMPLOYEES: CompanyEmployee[] = [
  { id: "1", name: "John Doe", email: "john@meetingmind.com", role: "admin" },
  { id: "2", name: "Sarah Chen", email: "sarah@meetingmind.com", role: "employee" },
  { id: "3", name: "Mike Ross", email: "mike@meetingmind.com", role: "employee" },
  { id: "4", name: "Emily Park", email: "emily@meetingmind.com", role: "employee" },
  { id: "5", name: "Alex Johnson", email: "alex@meetingmind.com", role: "employee" },
];

const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john@meetingmind.com",
  plan: "Pro Plan",
  role: "admin",
  companyId: "comp-1",
  companyName: "MeetingMind Inc.",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mm_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [companyEmployees, setCompanyEmployees] = useState<CompanyEmployee[]>(MOCK_EMPLOYEES);

  const login = useCallback(async (_email: string, _password: string) => {
    setUser(MOCK_USER);
    localStorage.setItem("mm_auth_user", JSON.stringify(MOCK_USER));
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, companyName: string) => {
    const newUser: User = {
      ...MOCK_USER,
      name,
      email,
      role: "admin",
      companyName,
      companyId: "comp-" + Date.now(),
    };
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

  const addEmployee = useCallback((employee: Omit<CompanyEmployee, "id">) => {
    const newEmp: CompanyEmployee = { ...employee, id: "emp-" + Date.now() };
    setCompanyEmployees((prev) => [...prev, newEmp]);
  }, []);

  const removeEmployee = useCallback((id: string) => {
    setCompanyEmployees((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        companyEmployees,
        addEmployee,
        removeEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
