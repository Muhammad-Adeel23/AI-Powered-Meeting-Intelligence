import { RoleType } from "@/models";
import type { UserRole } from "@/models";

/**
 * Maps backend roleType codes to the app's internal UserRole strings.
 * Centralized so role logic stays in one place.
 */
export function mapRoleTypeToUserRole(roleType: number): UserRole {
  switch (roleType) {
    case RoleType.SystemAdmin:
      return "superadmin";
    case RoleType.CompanyAdmin:
      return "admin";
    case RoleType.Employee:
      return "employee";
    default:
      return "employee";
  }
}
