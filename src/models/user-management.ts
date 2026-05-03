// Models for /User/AddCompanyUsers
export interface AddCompanyUserRequest {
  fullname: string;
  email: string;
  roleId: number;
}

export type AddCompanyUserData = boolean;

// Models for /User/GetCompanyUsers
export interface CompanyUser {
  participantIds: number;
  fullname: string;
  email: string;
  roleName: string;
}

// Models for /User/GetAllUsers
export interface AllUser {
  name: string;
  email: string;
  role: string;
}

