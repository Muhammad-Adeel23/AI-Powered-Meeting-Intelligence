import { API_ENDPOINTS } from "@/config/api";
import { httpClient } from "./httpClient";
import type { UserRoleDropdownItem } from "@/models";

export function getUserRoleDropdown(): Promise<UserRoleDropdownItem[]> {
  return httpClient.get<UserRoleDropdownItem[]>(
    `${API_ENDPOINTS.USERS}/GetUserRoleDropdown`,
    { auth: true }
  );
}
