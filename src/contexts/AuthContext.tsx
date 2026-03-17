import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "superadmin" | "admin" | "employee";

export interface Company {
  id: string;
  name: string;
  plan: string;
  createdAt: string;
  employeeCount: number;
  meetingCount: number;
}

export interface CompanyEmployee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}

interface User {
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
  companies: Company[];
  allUsers: CompanyEmployee[];
  companyEmployees: CompanyEmployee[];
  addEmployee: (employee: Omit<CompanyEmployee, "id">) => void;
  removeEmployee: (id: string) => void;
  addCompany: (company: Omit<Company, "id">) => void;
  removeCompany: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_COMPANIES: Company[] = [
  { id: "comp-1", name: "MeetingMind Inc.", plan: "Enterprise", createdAt: "2025-01-15", employeeCount: 12, meetingCount: 156 },
  { id: "comp-2", name: "Acme Corp", plan: "Pro", createdAt: "2025-03-20", employeeCount: 8, meetingCount: 89 },
  { id: "comp-3", name: "TechStart Ltd", plan: "Starter", createdAt: "2025-06-10", employeeCount: 4, meetingCount: 32 },
];

const MOCK_ALL_USERS: CompanyEmployee[] = [
  { id: "1", name: "John Doe", email: "john@meetingmind.com", role: "admin", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "2", name: "Sarah Chen", email: "sarah@meetingmind.com", role: "employee", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "3", name: "Mike Ross", email: "mike@meetingmind.com", role: "employee", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "4", name: "Emily Park", email: "emily@meetingmind.com", role: "employee", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "5", name: "Alex Johnson", email: "alex@acme.com", role: "admin", companyId: "comp-2", companyName: "Acme Corp" },
  { id: "6", name: "Lisa Wang", email: "lisa@acme.com", role: "employee", companyId: "comp-2", companyName: "Acme Corp" },
  { id: "7", name: "David Kim", email: "david@techstart.com", role: "admin", companyId: "comp-3", companyName: "TechStart Ltd" },
  { id: "8", name: "Rachel Green", email: "rachel@techstart.com", role: "employee", companyId: "comp-3", companyName: "TechStart Ltd" },
];

const MOCK_USERS: Record<string, User> = {
  superadmin: {
    id: "sa-1",
    name: "Platform Admin",
    email: "super@meetingmind.com",
    plan: "Platform",
    role: "superadmin",
  },
  admin: {
    id: "1",
    name: "John Doe",
    email: "john@meetingmind.com",
    plan: "Enterprise",
    role: "admin",
    companyId: "comp-1",
    companyName: "MeetingMind Inc.",
  },
  employee: {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@meetingmind.com",
    plan: "Enterprise",
    role: "employee",
    companyId: "comp-1",
    companyName: "MeetingMind Inc.",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mm_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [allUsers, setAllUsers] = useState<CompanyEmployee[]>(MOCK_ALL_USERS);

  const companyEmployees = user?.companyId
    ? allUsers.filter((u) => u.companyId === user.companyId)
    : allUsers;

  const login = useCallback(async (email: string, _password: string) => {
    let mockUser: User;
    if (email.includes("super")) {
      mockUser = MOCK_USERS.superadmin;
    } else if (email.includes("sarah") || email.includes("employee")) {
      mockUser = MOCK_USERS.employee;
    } else {
      mockUser = MOCK_USERS.admin;
    }
    setUser(mockUser);
    localStorage.setItem("mm_auth_user", JSON.stringify(mockUser));
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, companyName: string) => {
    const newUser: User = {
      id: "usr-" + Date.now(),
      name,
      email,
      role: "admin",
      plan: "Starter",
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
    setAllUsers((prev) => [...prev, newEmp]);
  }, []);

  const removeEmployee = useCallback((id: string) => {
    setAllUsers((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const addCompany = useCallback((company: Omit<Company, "id">) => {
    const newComp: Company = { ...company, id: "comp-" + Date.now() };
    setCompanies((prev) => [...prev, newComp]);
  }, []);

  const removeCompany = useCallback((id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
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
        companies,
        allUsers,
        companyEmployees,
        addEmployee,
        removeEmployee,
        addCompany,
        removeCompany,
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
