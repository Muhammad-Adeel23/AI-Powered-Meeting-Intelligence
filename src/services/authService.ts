import { API_ENDPOINTS } from "@/config/api";
import { httpClient } from "./httpClient";
import type {
  SignupUserRequest,
  SignupUserData,
  LoginResponseData,
  CreateUserRequest,
  CreateUserData,
  ChangePasswordRequest,
  ChangePasswordData,
} from "@/models";

export function loginUser(email: string, password: string): Promise<LoginResponseData> {
  return httpClient.post<LoginResponseData>(API_ENDPOINTS.LOGIN, { email, password });
}

export function signupUser(data: SignupUserRequest): Promise<SignupUserData> {
  return httpClient.post<SignupUserData>(API_ENDPOINTS.SIGNUP_USER, data);
}

export function createUser(data: CreateUserRequest): Promise<CreateUserData> {
  return httpClient.post<CreateUserData>(API_ENDPOINTS.CREATE_USER, data, { auth: true });
}

export function changePassword(data: ChangePasswordRequest): Promise<ChangePasswordData> {
  return httpClient.post<ChangePasswordData>(API_ENDPOINTS.CHANGE_PASSWORD, data, { auth: true });
}
