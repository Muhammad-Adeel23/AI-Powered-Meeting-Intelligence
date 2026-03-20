import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UploadMeeting from "./pages/UploadMeeting";
import Meetings from "./pages/Meetings";
import MeetingDetails from "./pages/MeetingDetails";
import AIInsights from "./pages/AIInsights";
import Companies from "./pages/Companies";
import UsersPage from "./pages/UsersPage";
import EmailTemplates from "./pages/EmailTemplates";
import SystemSettings from "./pages/SystemSettings";
import CompanySettings from "./pages/CompanySettings";
import Settings from "./pages/Settings";
import EmailEditor from "./pages/EmailEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* All roles */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/meetings" element={<ProtectedRoute><Meetings /></ProtectedRoute>} />
            <Route path="/meetings/:id" element={<ProtectedRoute><MeetingDetails /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            {/* Admin + Employee */}
            <Route path="/upload" element={<ProtectedRoute allowedRoles={["admin", "employee"]}><UploadMeeting /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute allowedRoles={["admin", "employee"]}><AIInsights /></ProtectedRoute>} />

            {/* SuperAdmin + Admin */}
            <Route path="/users" element={<ProtectedRoute allowedRoles={["superadmin", "admin"]}><UsersPage /></ProtectedRoute>} />

            {/* SuperAdmin only */}
            <Route path="/companies" element={<ProtectedRoute allowedRoles={["superadmin"]}><Companies /></ProtectedRoute>} />
            <Route path="/email-templates" element={<ProtectedRoute allowedRoles={["superadmin"]}><EmailTemplates /></ProtectedRoute>} />
            <Route path="/system-settings" element={<ProtectedRoute allowedRoles={["superadmin"]}><SystemSettings /></ProtectedRoute>} />

            {/* Admin only */}
            <Route path="/company-settings" element={<ProtectedRoute allowedRoles={["admin"]}><CompanySettings /></ProtectedRoute>} />

            {/* Admin + Employee */}
            <Route path="/email-editor" element={<ProtectedRoute allowedRoles={["admin", "employee"]}><EmailEditor /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
