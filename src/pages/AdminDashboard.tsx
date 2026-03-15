import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, FileText, Activity, TrendingUp, BarChart3, UserPlus, Trash2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const platformStats = [
  { label: "Total Users", value: "24", icon: Users, change: "+3" },
  { label: "Meetings Processed", value: "312", icon: FileText, change: "+28" },
  { label: "AI Summaries", value: "298", icon: Activity, change: "+25" },
  { label: "Usage Growth", value: "+18%", icon: TrendingUp, change: "" },
];

const AdminDashboard = () => {
  const { user, companyEmployees, addEmployee, removeEmployee } = useAuth();
  const { toast } = useToast();
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) {
      toast({ title: "Error", description: "Please fill in both name and email.", variant: "destructive" });
      return;
    }
    addEmployee({ name: inviteName.trim(), email: inviteEmail.trim(), role: "employee" });
    toast({ title: "Employee added", description: `${inviteName} has been added to ${user?.companyName}.` });
    setInviteName("");
    setInviteEmail("");
  };

  const handleRemove = (id: string, name: string) => {
    removeEmployee(id);
    toast({ title: "Employee removed", description: `${name} has been removed.` });
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {user?.companyName} — Platform overview and user management
          </p>
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
            <TabsTrigger value="users">Employees</TabsTrigger>
            <TabsTrigger value="invite">Invite Employee</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4">
            <Card className="shadow-sm">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Team Members ({companyEmployees.length})
                </h3>
              </div>
              <div className="divide-y divide-border">
                {companyEmployees.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                        <span className="text-xs font-semibold text-accent-foreground">
                          {emp.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={emp.role === "admin" ? "default" : "secondary"} className="text-xs capitalize">
                        {emp.role}
                      </Badge>
                      {emp.role !== "admin" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemove(emp.id, emp.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="invite" className="mt-4">
            <Card className="shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold">Add New Employee</h3>
              </div>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="invite-name">Full Name</Label>
                  <Input
                    id="invite-name"
                    placeholder="e.g. Jane Smith"
                    className="mt-1.5"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="invite-email">Email Address</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-email"
                      placeholder="jane@company.com"
                      className="pl-9"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleInvite}>
                  <UserPlus className="h-4 w-4 mr-2" /> Add Employee
                </Button>
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
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
