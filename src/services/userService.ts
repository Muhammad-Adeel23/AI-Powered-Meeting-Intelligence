import { API_ENDPOINTS } from "@/config/api";
import { httpClient } from "./httpClient";
import type {
  UserRoleDropdownItem,
  AddCompanyUserRequest,
  AddCompanyUserData,
  CompanyUser,
  AllUser,
} from "@/models";

export function getUserRoleDropdown(): Promise<UserRoleDropdownItem[]> {
  return httpClient.get<UserRoleDropdownItem[]>(
    `${API_ENDPOINTS.USERS}/GetUserRoleDropdown`,
    { auth: true }
  );
}

export function addCompanyUser(
  data: AddCompanyUserRequest
): Promise<AddCompanyUserData> {
  return httpClient.post<AddCompanyUserData>(
    `${API_ENDPOINTS.USERS}/AddCompanyUsers`,
    data,
    { auth: true }
  );
}

export function getCompanyUsers(): Promise<CompanyUser[]> {
  return httpClient.get<CompanyUser[]>(
    `${API_ENDPOINTS.USERS}/GetCompanyUsers`,
    { auth: true }
  );
}
