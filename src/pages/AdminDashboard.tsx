import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, FileText, Activity, TrendingUp, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const users = [
  { name: "John Doe", email: "john@company.com", role: "Admin", meetings: 45, lastActive: "Now" },
  { name: "Sarah Chen", email: "sarah@company.com", role: "Member", meetings: 38, lastActive: "2h ago" },
  { name: "Mike Ross", email: "mike@company.com", role: "Member", meetings: 22, lastActive: "1d ago" },
  { name: "Emily Park", email: "emily@company.com", role: "Member", meetings: 31, lastActive: "3h ago" },
];

const platformStats = [
  { label: "Total Users", value: "24", icon: Users, change: "+3" },
  { label: "Meetings Processed", value: "312", icon: FileText, change: "+28" },
  { label: "AI Summaries", value: "298", icon: Activity, change: "+25" },
  { label: "Usage Growth", value: "+18%", icon: TrendingUp, change: "" },
];

const AdminDashboard = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Platform overview and user management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                    <stat.icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  {stat.change && <span className="text-xs font-medium text-success">{stat.change}</span>}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4">
            <Card className="shadow-sm">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold">Team Members</h3>
                <Button variant="hero" size="sm">Invite User</Button>
              </div>
              <div className="divide-y divide-border">
                {users.map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                        <span className="text-xs font-semibold text-accent-foreground">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">{user.meetings} meetings</span>
                      <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                      <Badge variant="secondary" className="text-xs">{user.role}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <Card className="p-12 shadow-sm flex flex-col items-center justify-center text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <h3 className="font-semibold mb-1">Analytics Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Detailed usage analytics, meeting trends, and AI performance metrics will be available here.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card className="p-12 shadow-sm flex flex-col items-center justify-center text-center">
              <h3 className="font-semibold mb-1">Platform Settings</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Configure workspace settings, integrations, and security policies.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
