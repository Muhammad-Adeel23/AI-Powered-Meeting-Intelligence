// Authentication-related request/response models

export interface SignupUserRequest {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface SignupUserData {
  userId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  companyId: number | null;
  companyName: string | null;
}

export interface LoginResponseData {
  token: string;
  user: AuthUser;
}

export interface CreateUserRequest {
  userName: string;
  email: string;
  fullName: string;
  companyId: number;
  roleId: number;
}

export interface CreateUserData {
  success: boolean;
  userId: number;
  tempPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordData {
  success: boolean;
  message: string;
}
