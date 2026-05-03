export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://meetingmastermind.runasp.net";

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

// API Endpoints (versioned under /api/v1)
const API_V1 = `${API_BASE_URL}/api/v1`;

export const API_ENDPOINTS = {
  // Authentication
  SIGNUP_USER: `${API_V1}/account/SignupUser`,
  LOGIN: `${API_V1}/authenticate/login`,
  FORGOT_PASSWORD: `${API_V1}/account/ForgotPassword`,
  CHANGE_PASSWORD: `${API_V1}/account/ChangePassword`,
  CREATE_USER: `${API_V1}/account/CreateUser`,

  // Meetings
  MEETINGS: `${API_V1}/Meeting`,
  UPLOAD_MEETING: `${API_V1}/Meeting/Upload`,
  ANALYZE_MEETING: `${API_V1}/Meeting/AnalyzeMeeting`,
  GET_ALL_MEETINGS: `${API_V1}/Meeting/GetAllMeetings`,
  GET_MEETING_BY_ID: `${API_V1}/Meeting/GetMeetingById`,

  // SignalR
  MEETING_HUB: `${API_BASE_URL}/hubs/meeting`,

  // Companies
  COMPANIES: `${API_V1}/Company`,

  // Users
  USERS: `${API_V1}/User`,

  // AI
  AI_SUMMARY: `${API_V1}/AI/Summary`,
  AI_ACTION_ITEMS: `${API_V1}/AI/ActionItems`,
  AI_TRANSCRIPT: `${API_V1}/AI/Transcript`,

  // Email
  EMAIL_TEMPLATES: `${API_V1}/EmailTemplate`,
  SEND_EMAIL: `${API_V1}/Email/Send`,

  // System
  SYSTEM_SETTINGS: `${API_V1}/SystemSettings`,
  NOTIFICATIONS: `${API_V1}/Notification`,
  DASHBOARD: `${API_V1}/Dashboard`,
};
