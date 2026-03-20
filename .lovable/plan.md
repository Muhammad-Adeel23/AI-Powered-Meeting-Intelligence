

# Plan: Backend Endpoints + Login Fix + Email Editor Fix

## Part 1: .NET Backend Endpoint Code (Repository Pattern)

This is backend code for your .NET project — not built in Lovable, but provided as complete code for you to add to your .NET solution.

### Folder Structure
```text
Controllers/
  AccountController.cs       — Register, Login, ChangePassword
Services/
  IAccountService.cs         — Interface
  AccountService.cs          — Business logic
Repositories/
  IUserRepository.cs         — Interface
  UserRepository.cs          — DB queries (Dapper/EF)
  ICompanyRepository.cs
  CompanyRepository.cs
DTOs/
  RegisterRequest.cs         — { CompanyName, FullName, Email, Password }
  CreateUserRequest.cs       — { UserName, Email, FullName, CompanyId, RoleId }
  ChangePasswordRequest.cs   — { OldPassword, NewPassword }
  LoginRequest.cs            — { Email, Password }
  LoginResponse.cs           — { Token, User { Id, FullName, Email, Role, CompanyId, CompanyName } }
```

### Endpoint 1: POST /api/Account/Register (Company Signup)
**Request**: `{ companyName, fullName, email, password }`
**Flow**:
1. Check if email already exists in Users → return 400
2. INSERT into `Companies` (Name, PlanName='Starter', CreatedOn)
3. Hash password
4. INSERT into `Users` (UserName=email, Email, FullName, PasswordHash, CompanyId, IsActive=1)
5. Get Admin RoleId from `Roles` table
6. INSERT into `UserRoles` (UserId, RoleId)
7. Generate JWT token with claims: userId, role, companyId
8. Return `{ token, user: { id, fullName, email, role: "admin", companyId, companyName } }`

### Endpoint 2: POST /api/Account/CreateUser (Admin adds Employee)
**Request**: `{ userName, email, fullName, companyId, roleId }` + Auth header (Admin token)
**Flow**:
1. Verify caller is Admin and belongs to same companyId
2. Check email not already in use → return 400
3. Generate temporary password, hash it
4. INSERT into `Users` (UserName, Email, FullName, PasswordHash, CompanyId, IsActive=1, CreatedBy=adminId)
5. INSERT into `UserRoles` (UserId, RoleId)
6. Return `{ success: true, userId, tempPassword }` (or send invite email)

### Endpoint 3: POST /api/Account/ChangePassword
**Request**: `{ oldPassword, newPassword }` + Auth header
**Flow**:
1. Get userId from JWT token
2. Fetch user from Users table
3. Verify oldPassword matches PasswordHash → return 400 if wrong
4. Hash newPassword
5. UPDATE `Users` SET PasswordHash, UpdatedOn, UpdatedBy
6. Return `{ success: true, message: "Password changed" }`

### Login Response Structure (Important)
Your existing `/api/Account/login` should return role info:
```json
{
  "token": "jwt...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@acme.com",
    "role": "admin",
    "companyId": 5,
    "companyName": "Acme Corp"
  }
}
```
The frontend will use `role` from this response to determine sidebar and page access.

---

## Part 2: Frontend Changes (Lovable)

### A. Login Page — Remove Demo Buttons, Connect to Real API

**File**: `src/pages/Login.tsx`
- Remove the 3 demo quick-login buttons (lines 61-74)
- Remove the separator text "sign in with email"
- Keep clean email + password form only
- `login()` in AuthContext will call `API_ENDPOINTS.LOGIN` via fetch

### B. AuthContext — Real API Integration

**File**: `src/contexts/AuthContext.tsx`
- `login()`: POST to `API_ENDPOINTS.LOGIN`, store JWT token in localStorage, parse user+role from response
- `signup()`: POST to `API_ENDPOINTS.REGISTER` with companyName
- Remove all MOCK_USERS, MOCK_COMPANIES data
- Add `token` to state, include in API headers
- Role comes from backend response, not hardcoded email matching

### C. Email Editor — Add Route + Sidebar Link

**File**: `src/App.tsx`
- Add: `import EmailEditor from "./pages/EmailEditor";`
- Add route: `/email-editor` wrapped in ProtectedRoute for admin + employee

**File**: `src/components/layout/AppSidebar.tsx`
- Add to mainItems: `{ title: "Email Editor", url: "/email-editor", icon: Mail, roles: ["admin", "employee"] }`
- Remove duplicate Mail icon from Email Templates (use different icon like `FileText` for templates)

### D. API Config Update

**File**: `src/config/api.ts`
- Add `CREATE_USER: \`\${API_BASE_URL}/api/Account/CreateUser\``
- Clean up Resume/Personality endpoints (not needed for MeetingMind)

### E. Create Auth Service

**File**: `src/services/authService.ts` (new)
- `loginUser(email, password)` → POST to LOGIN endpoint
- `registerCompany(companyName, fullName, email, password)` → POST to REGISTER
- `changePassword(oldPassword, newPassword)` → POST to CHANGE_PASSWORD with token header
- `createUser(userData)` → POST to CREATE_USER with token header

---

## Summary of File Changes

| File | Action |
|------|--------|
| `src/pages/Login.tsx` | Remove demo buttons, clean form |
| `src/contexts/AuthContext.tsx` | Replace mocks with real API calls |
| `src/services/authService.ts` | Create — API call functions |
| `src/config/api.ts` | Add CREATE_USER endpoint |
| `src/App.tsx` | Add `/email-editor` route |
| `src/components/layout/AppSidebar.tsx` | Add Email Editor link |

Backend .NET code will be provided as a downloadable document with complete Repository Pattern implementation.

