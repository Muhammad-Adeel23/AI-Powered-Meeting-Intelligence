import { API_ENDPOINTS, TOKEN_KEY } from "@/config/api";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    role: string;
    companyId: number | null;
    companyName: string | null;
  };
}

export interface RegisterRequest {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface CreateUserRequest {
  userName: string;
  email: string;
  fullName: string;
  companyId: number;
  roleId: number;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Invalid credentials");
  }
  return res.json();
}

export async function registerCompany(data: RegisterRequest): Promise<LoginResponse> {
  const res = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Registration failed");
  }
  return res.json();
}

export async function createUser(data: CreateUserRequest): Promise<{ success: boolean; userId: number; tempPassword: string }> {
  const res = await fetch(API_ENDPOINTS.CREATE_USER, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create user");
  }
  return res.json();
}

export async function changePassword(data: ChangePasswordRequest): Promise<{ success: boolean; message: string }> {
  const res = await fetch(API_ENDPOINTS.CHANGE_PASSWORD, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to change password");
  }
  return res.json();
}
