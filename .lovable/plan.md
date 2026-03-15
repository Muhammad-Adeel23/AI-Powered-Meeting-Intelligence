

# MeetingMind — Company-Based Restructure Plan

## Core Concept
Company-centric architecture where both Admin and Employees can upload meetings. Admin manages company settings and users; Employees work within their company scope.

## Flow

```text
1. Admin Signup → Creates Company + Admin Account
2. Admin → Invites/Adds Employees to Company
3. Employee Login → Sees only own company's data
4. Meeting Upload (Admin OR Employee) → Participants dropdown shows company employees
5. AI processes → Summary, Action Items generated
6. All company users see meetings, summaries, action items
```

## Role-Based Sidebar

**Admin sees:**
- Dashboard, Upload Meeting, Meetings, Action Items, AI Summaries, Email Editor
- Notifications
- **Admin Dashboard** (user management, company stats)
- Settings

**Employee sees:**
- Dashboard, Upload Meeting, Meetings, Action Items, AI Summaries, Email Editor
- Notifications
- Settings

Admin Dashboard and user management links are **hidden** from employees.

## Key Changes

### 1. Auth Context Update
- Add `role` field (`admin` | `employee`) and `companyId` to User interface
- Signup flow creates company + admin user together
- Employee accounts created by admin (invite flow)

### 2. Sidebar — Conditional Rendering
- Filter `secondaryItems` based on `user.role`
- Admin item only shows when `role === 'admin'`

### 3. Upload Meeting Page
- Participants field becomes a **multi-select dropdown** populated with company employees (mock data for now)
- Both admin and employee can upload

### 4. Signup Page Update
- Add "Company Name" field for admin registration
- Flow: Enter company name → creates org → user becomes admin

### 5. Admin Dashboard Update
- Add "Invite Employee" functionality (email input, role assignment)
- Show company-specific stats only

### 6. New: Employee Management (Admin only)
- List employees, add/remove, change roles
- Lives inside Admin Dashboard tab

### Files to Change

| File | Change |
|------|--------|
| `src/contexts/AuthContext.tsx` | Add `role`, `companyId`, `companyName` to User |
| `src/components/layout/AppSidebar.tsx` | Conditional sidebar items by role |
| `src/pages/Signup.tsx` | Add Company Name field |
| `src/pages/UploadMeeting.tsx` | Participants multi-select dropdown with mock employees |
| `src/pages/AdminDashboard.tsx` | Add employee invite/manage UI |
| `src/pages/Settings.tsx` | Show company info for admin |

All changes are UI-only with mock data, ready for backend integration later.

