import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Copy, Mail, Users, Clock, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const transcript = [
  { time: "00:00", speaker: "John Doe", text: "Alright everyone, let's kick off the sprint planning for Q1. We have some ambitious goals this quarter." },
  { time: "02:15", speaker: "Sarah Chen", text: "I'd like to start with the TypeScript migration. We've been tracking the strict mode conversion and I think we can complete it by end of quarter." },
  { time: "05:30", speaker: "Mike Ross", text: "Agreed. The CI/CD pipeline improvements have given us about 23% velocity boost, which should help." },
  { time: "08:45", speaker: "Emily Park", text: "For the mobile app beta, I suggest we front-load the testing resources. The March 31st deadline is tight." },
  { time: "12:00", speaker: "John Doe", text: "Good point. Let's also discuss the hiring plan. We need 2 additional frontend engineers." },
  { time: "15:30", speaker: "Sarah Chen", text: "HR can start sourcing this week. We should have interviews wrapped up by mid-March." },
];

const summaryText = `The team reviewed Q1 sprint goals focusing on three major initiatives: TypeScript migration, team expansion, and mobile app beta launch. Strong consensus was reached on all key decisions.

Engineering velocity has improved 23% since adopting the new CI/CD pipeline. The team discussed potential bottlenecks around the mobile launch timeline and agreed to front-load testing resources.

Budget allocation for new hires was approved. HR will begin sourcing candidates this week with a target of completing interviews by mid-March.`;

const keyDecisions = [
  "Migrate to TypeScript strict mode by end of Q1",
  "Hire 2 additional frontend engineers",
  "Launch beta of mobile app by March 31",
];

const actionItems = [
  { id: 1, text: "Set up TypeScript strict config", assignee: "Sarah Chen", due: "Mar 12", completed: false },
  { id: 2, text: "Draft JD for frontend engineer role", assignee: "Mike Ross", due: "Mar 10", completed: false },
  { id: 3, text: "Create mobile app beta TestFlight build", assignee: "John Doe", due: "Mar 28", completed: false },
  { id: 4, text: "Update design system documentation", assignee: "Emily Park", due: "Mar 15", completed: true },
];

const MeetingDetails = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sprint Planning Q1</h1>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 45 min</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 6 participants</span>
              <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Mar 8, 2026</span>
              <Badge variant="secondary" className="text-xs bg-success/10 text-success">Summarized</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="transcript" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="actions">Action Items</TabsTrigger>
          </TabsList>

          {/* Transcript Tab */}
          <TabsContent value="transcript">
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Meeting Transcript</h2>
                <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
              </div>
              <div className="space-y-4">
                {transcript.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap mt-0.5">{entry.time}</span>
                    <div>
                      <span className="text-sm font-semibold text-primary">{entry.speaker}</span>
                      <p className="text-sm text-foreground/90 mt-0.5">{entry.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* AI Summary Tab */}
          <TabsContent value="summary">
            <div className="space-y-6">
              <Card className="p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs gap-1">
                      <Sparkles className="h-3 w-3" /> AI Generated
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                    <Button variant="outline" size="sm"><Mail className="h-3.5 w-3.5" /> Email</Button>
                  </div>
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Summary</h2>
                <div className="prose prose-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {summaryText}
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Decisions</h2>
                <div className="space-y-3">
                  {keyDecisions.map((decision, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span className="text-sm">{decision}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Action Items Tab */}
          <TabsContent value="actions">
            <Card className="shadow-sm divide-y divide-border">
              <div className="p-4 border-b border-border">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Action Items</h2>
              </div>
              {actionItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
                  <Checkbox checked={item.completed} className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                      {item.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>{item.assignee}</span>
                      <span>Due {item.due}</span>
                    </div>
                  </div>
                  <Badge variant={item.completed ? "secondary" : "outline"} className="text-xs">
                    {item.completed ? "Done" : "Pending"}
                  </Badge>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MeetingDetails;
