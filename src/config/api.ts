export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://career-nexus.runasp.net";

// Debug: Log API configuration (only in development)
if (import.meta.env.DEV) {
  console.log("API Configuration loaded:", {
    API_BASE_URL,
    TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "meetingmind_token",
  });
}

// Storage Keys
export const TOKEN_KEY =
  import.meta.env.VITE_TOKEN_KEY || "meetingmind_token";

// External Services
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "923008974168";

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/Account/login`,
  REGISTER: `${API_BASE_URL}/api/Account/Register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/Account/ForgotPassword`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/Account/ChangePassword`,
  CREATE_USER: `${API_BASE_URL}/api/Account/CreateUser`,

  // Meetings
  MEETINGS: `${API_BASE_URL}/api/Meeting`,
  UPLOAD_MEETING: `${API_BASE_URL}/api/Meeting/Upload`,

  // Companies
  COMPANIES: `${API_BASE_URL}/api/Company`,

  // Users
  USERS: `${API_BASE_URL}/api/User`,

  // AI
  AI_SUMMARY: `${API_BASE_URL}/api/AI/Summary`,
  AI_ACTION_ITEMS: `${API_BASE_URL}/api/AI/ActionItems`,
  AI_TRANSCRIPT: `${API_BASE_URL}/api/AI/Transcript`,

  // Email
  EMAIL_TEMPLATES: `${API_BASE_URL}/api/EmailTemplate`,
  SEND_EMAIL: `${API_BASE_URL}/api/Email/Send`,

  // System
  SYSTEM_SETTINGS: `${API_BASE_URL}/api/SystemSettings`,
  NOTIFICATIONS: `${API_BASE_URL}/api/Notification`,
  DASHBOARD: `${API_BASE_URL}/api/Dashboard`,
};
