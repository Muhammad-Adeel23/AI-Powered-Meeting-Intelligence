import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckSquare, Sparkles, ArrowUpRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Meetings This Week", value: "12", icon: FileText, change: "+3" },
  { label: "Action Items", value: "24", icon: CheckSquare, change: "-5" },
  { label: "AI Summaries", value: "8", icon: Sparkles, change: "+2" },
  { label: "Hours Saved", value: "6.5h", icon: Clock, change: "+1.2h" },
];

const recentMeetings = [
  { id: 1, title: "Sprint Planning Q1", date: "Mar 8, 2026", participants: 6, status: "Summarized" },
  { id: 2, title: "Design Review — Mobile App", date: "Mar 7, 2026", participants: 4, status: "Processing" },
  { id: 3, title: "Client Onboarding — Acme Co", date: "Mar 7, 2026", participants: 3, status: "Summarized" },
  { id: 4, title: "Engineering Standup", date: "Mar 6, 2026", participants: 8, status: "Summarized" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, John. Here's your meeting overview.</p>
          </div>
          <Button variant="hero" onClick={() => navigate("/upload")}>
            <Upload className="h-4 w-4" /> Upload Meeting
          </Button>
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
                onClick={() => navigate("/summaries")}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                    <FileText className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{meeting.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {meeting.date} · {meeting.participants} participants
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
