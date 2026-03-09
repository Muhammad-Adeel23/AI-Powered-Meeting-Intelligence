import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const meetings = [
  { id: 1, title: "Sprint Planning Q1", date: "Mar 8, 2026", duration: "45 min", participants: 6, status: "Summarized", tags: ["Engineering"] },
  { id: 2, title: "Design Review — Mobile App", date: "Mar 7, 2026", duration: "30 min", participants: 4, status: "Processing", tags: ["Design"] },
  { id: 3, title: "Client Onboarding — Acme Co", date: "Mar 7, 2026", duration: "60 min", participants: 3, status: "Summarized", tags: ["Sales"] },
  { id: 4, title: "Engineering Standup", date: "Mar 6, 2026", duration: "15 min", participants: 8, status: "Summarized", tags: ["Engineering"] },
  { id: 5, title: "Product Roadmap Review", date: "Mar 5, 2026", duration: "90 min", participants: 10, status: "Summarized", tags: ["Product"] },
  { id: 6, title: "Investor Update Call", date: "Mar 4, 2026", duration: "25 min", participants: 5, status: "Summarized", tags: ["Leadership"] },
];

const Meetings = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search meetings..." className="pl-9 w-64 h-9" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Card className="divide-y divide-border shadow-sm">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigate("/summaries")}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <FileText className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium">{meeting.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {meeting.date} · {meeting.duration} · {meeting.participants} participants
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {meeting.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  meeting.status === "Summarized" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {meeting.status}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
};

export default Meetings;
