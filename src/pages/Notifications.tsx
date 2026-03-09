import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Bell, CheckCircle, Sparkles, Mail, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, type: "summary", icon: Sparkles, title: "AI Summary Ready", description: "Sprint Planning Q1 summary is ready to review.", time: "2 min ago", read: false },
  { id: 2, type: "action", icon: AlertTriangle, title: "Action Item Due Tomorrow", description: "Draft JD for frontend engineer role — assigned to Mike.", time: "1h ago", read: false },
  { id: 3, type: "email", icon: Mail, title: "Follow-up Email Sent", description: "Sprint Planning Q1 follow-up delivered to 6 recipients.", time: "3h ago", read: true },
  { id: 4, type: "summary", icon: Sparkles, title: "AI Summary Ready", description: "Design Review — Mobile App summary is ready.", time: "Yesterday", read: true },
  { id: 5, type: "complete", icon: CheckCircle, title: "Action Item Completed", description: "Emily completed: Update design system documentation.", time: "Yesterday", read: true },
];

const iconColors: Record<string, string> = {
  summary: "bg-accent text-accent-foreground",
  action: "bg-warning/10 text-warning",
  email: "bg-success/10 text-success",
  complete: "bg-success/10 text-success",
};

const Notifications = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {notifications.filter((n) => !n.read).length} unread
            </p>
          </div>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>

        <Card className="divide-y divide-border shadow-sm">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 p-4 transition-colors ${
                !n.read ? "bg-accent/30" : "hover:bg-muted/30"
              }`}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconColors[n.type]}`}>
                <n.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
};

export default Notifications;
