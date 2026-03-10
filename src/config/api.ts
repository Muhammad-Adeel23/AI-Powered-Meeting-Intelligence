export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://career-nexus.runasp.net";

export const API_RESUME_BASE_URL =
  import.meta.env.VITE_API_RESUME_BASE_URL || `${API_BASE_URL}/api/Resume`;

export const API_PERSONALITY_BASE_URL =
  import.meta.env.VITE_API_PERSONALITY_BASE_URL || `${API_BASE_URL}/api/Personality`;

// Debug: Log API configuration (only in development)
if (import.meta.env.DEV) {
  console.log("API Configuration loaded:", {
    API_BASE_URL,
    API_RESUME_BASE_URL,
    API_PERSONALITY_BASE_URL,
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

  // Resume
  UPLOAD_RESUME: `${API_RESUME_BASE_URL}/UploadResume`,
  GET_LATEST_RESUME: `${API_RESUME_BASE_URL}/latest`,

  // Personality
  GET_PERSONALITY: `${API_PERSONALITY_BASE_URL}`,
};
