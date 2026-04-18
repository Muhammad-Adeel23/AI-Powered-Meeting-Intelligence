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

// Backend role type codes
export enum RoleType {
  SystemAdmin = 400001,
  CompanyAdmin = 400002,
  Employee = 400003,
}

// Raw login response data from /authenticate/login
export interface LoginResponseData {
  fullName: string;
  roleName: string;
  roleType: number;
  email: string;
  token: string;
  companyId: number | null;
  companyName: string | null;
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
