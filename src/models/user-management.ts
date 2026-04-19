// Models for /User/AddCompanyUsers
export interface AddCompanyUserRequest {
  fullname: string;
  email: string;
  roleId: number;
}

export type AddCompanyUserData = boolean;
