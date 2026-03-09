import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import UploadMeeting from "./pages/UploadMeeting";
import Meetings from "./pages/Meetings";
import AISummary from "./pages/AISummary";
import ActionItems from "./pages/ActionItems";
import EmailEditor from "./pages/EmailEditor";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadMeeting />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/summaries" element={<AISummary />} />
          <Route path="/actions" element={<ActionItems />} />
          <Route path="/email" element={<EmailEditor />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
