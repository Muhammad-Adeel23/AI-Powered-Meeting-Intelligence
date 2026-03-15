

# Authentication UI Pages Plan

## Overview
Add complete authentication UI pages (no backend yet) that match the existing MeetingMind design system — clean, Linear/Notion-inspired styling with the navy/indigo palette.

## Pages to Create

### 1. Login Page (`/login`)
- Centered card layout with MeetingMind logo
- Email + password form with validation
- "Sign in with Google" button (styled, non-functional)
- Links to: Forgot Password, Sign Up

### 2. Sign Up Page (`/signup`)
- Same centered card layout
- Fields: Full Name, Email, Password, Confirm Password
- "Sign up with Google" button
- Link to: Login

### 3. Forgot Password Page (`/forgot-password`)
- Email input with "Send Reset Link" button
- Success state showing "Check your email" message
- Link back to Login

### 4. Reset Password Page (`/reset-password`)
- New Password + Confirm Password fields
- Submit button
- Redirect to Login on success

### 5. Profile / Account Settings Page (`/settings`)
- Inside AppLayout (sidebar visible)
- Sections: Profile Info (name, email, avatar placeholder), Change Password form
- Save buttons per section

## Auth Context (UI-only)
- Create `src/contexts/AuthContext.tsx` with a mock provider
- Stores fake user state (logged in / logged out)
- `login()`, `signup()`, `logout()` functions that just toggle state and navigate
- Wrap app in provider so sidebar shows user info dynamically

## Route Protection (UI-only)
- Create `src/components/ProtectedRoute.tsx` — redirects to `/login` if not "logged in"
- Wrap dashboard and internal routes with it

## Navigation Updates
- **Landing page**: "Sign In" → `/login`, "Get Started" → `/signup`
- **Sidebar footer**: "John Doe" becomes dynamic from auth context; add logout option
- **Settings link** in sidebar becomes functional → `/settings`

## File Changes Summary
| File | Action |
|------|--------|
| `src/pages/Login.tsx` | Create |
| `src/pages/Signup.tsx` | Create |
| `src/pages/ForgotPassword.tsx` | Create |
| `src/pages/ResetPassword.tsx` | Create |
| `src/pages/Settings.tsx` | Create |
| `src/contexts/AuthContext.tsx` | Create |
| `src/components/ProtectedRoute.tsx` | Create |
| `src/App.tsx` | Add routes + AuthProvider wrapper |
| `src/pages/Landing.tsx` | Update nav links |
| `src/components/layout/AppSidebar.tsx` | Add logout, dynamic user |

All auth pages use the same centered card design consistent with the landing page aesthetic. Forms use existing shadcn `Input`, `Button`, `Label`, and `Card` components with client-side validation via zod + react-hook-form.

