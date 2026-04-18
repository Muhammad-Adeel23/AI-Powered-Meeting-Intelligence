// Domain user model used across the app (UI layer)
export type UserRole = "superadmin" | "admin" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}
