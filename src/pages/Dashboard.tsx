import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckSquare, Sparkles, ArrowUpRight, Clock, Building2, Users, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const superadminStats = [
  { label: "Total Companies", value: "3", icon: Building2, change: "+1" },
  { label: "Total Users", value: "8", icon: Users, change: "+3" },
  { label: "Total Meetings", value: "277", icon: FileText, change: "+42" },
  { label: "Pending AI", value: "5", icon: Activity, change: "-2" },
];

const adminStats = [
  { label: "Company Meetings", value: "156", icon: FileText, change: "+12" },
  { label: "Team Members", value: "4", icon: Users, change: "+1" },
  { label: "Pending AI", value: "3", icon: Activity, change: "-1" },
  { label: "Hours Saved", value: "24h", icon: Clock, change: "+4h" },
];

const employeeStats = [
  { label: "My Meetings", value: "12", icon: FileText, change: "+3" },
  { label: "Action Items", value: "5", icon: CheckSquare, change: "-2" },
  { label: "AI Insights", value: "8", icon: Sparkles, change: "+2" },
  { label: "Hours Saved", value: "6.5h", icon: Clock, change: "+1.2h" },
];

const recentMeetings = [
  { id: 1, title: "Sprint Planning Q1", date: "Mar 8, 2026", participants: 6, status: "Summarized", company: "MeetingMind Inc." },
  { id: 2, title: "Design Review — Mobile App", date: "Mar 7, 2026", participants: 4, status: "Processing", company: "MeetingMind Inc." },
  { id: 3, title: "Client Onboarding — Acme Co", date: "Mar 7, 2026", participants: 3, status: "Summarized", company: "Acme Corp" },
  { id: 4, title: "Engineering Standup", date: "Mar 6, 2026", participants: 8, status: "Summarized", company: "TechStart Ltd" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "employee";

  const stats = role === "superadmin" ? superadminStats : role === "admin" ? adminStats : employeeStats;

  const greeting = role === "superadmin"
    ? "Platform overview and analytics."
    : role === "admin"
    ? `${user?.companyName} — company overview.`
    : "Here's your meeting overview.";

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, {user?.name}. {greeting}</p>
          </div>
          {role !== "superadmin" && (
            <Button variant="hero" onClick={() => navigate("/upload")}>
              <Upload className="h-4 w-4" /> Upload Meeting
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 bg-gradient-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                    <stat.icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span className="text-xs font-medium text-success">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Meetings Over Time
            </h3>
            <div className="h-48 flex items-end gap-2">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t-sm relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div className="absolute inset-x-0 bottom-0 bg-primary rounded-t-sm" style={{ height: `${h * 0.6}%` }} />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </Card>
          <Card className="p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              AI Processing
            </h3>
            <div className="space-y-4">
              {[
                { label: "Summarized", value: 78, color: "bg-success" },
                { label: "Processing", value: 12, color: "bg-warning" },
                { label: "Pending", value: 5, color: "bg-muted-foreground" },
                { label: "Failed", value: 2, color: "bg-destructive" },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Meetings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Meetings</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/meetings")}>
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Card className="divide-y divide-border shadow-sm">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/meetings/${meeting.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                    <FileText className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{meeting.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {meeting.date} · {meeting.participants} participants
                      {role === "superadmin" && ` · ${meeting.company}`}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    meeting.status === "Summarized"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {meeting.status}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
