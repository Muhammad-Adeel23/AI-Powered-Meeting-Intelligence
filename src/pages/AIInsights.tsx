import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const insights = [
  {
    id: 1,
    title: "Sprint Planning Q1",
    date: "Mar 8, 2026",
    participants: 6,
    duration: "45 min",
    summary: "Team reviewed Q1 sprint goals focusing on TypeScript migration, team expansion, and mobile app beta launch.",
    decisions: 3,
    actionItems: 4,
    status: "Ready",
  },
  {
    id: 2,
    title: "Design Review — Mobile App",
    date: "Mar 7, 2026",
    participants: 4,
    duration: "30 min",
    summary: "Reviewed mobile app wireframes and finalized navigation patterns. Discussed accessibility requirements.",
    decisions: 2,
    actionItems: 3,
    status: "Ready",
  },
  {
    id: 3,
    title: "Client Onboarding — Acme Co",
    date: "Mar 7, 2026",
    participants: 3,
    duration: "60 min",
    summary: "Onboarding walkthrough with Acme Corp team. Covered platform features, integrations, and support channels.",
    decisions: 1,
    actionItems: 5,
    status: "Ready",
  },
  {
    id: 4,
    title: "Engineering Standup",
    date: "Mar 6, 2026",
    participants: 8,
    duration: "15 min",
    summary: "Daily standup covering sprint progress, blockers, and upcoming deployments.",
    decisions: 0,
    actionItems: 2,
    status: "Processing",
  },
];

const AIInsights = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-generated summaries and analysis from your meetings</p>
        </div>

        <div className="space-y-4">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/meetings/${insight.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                      <Sparkles className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{insight.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {insight.duration}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {insight.participants}</span>
                        <span>{insight.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${insight.status === "Ready" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
                  >
                    {insight.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <Badge variant="outline" className="text-xs gap-1">
                      <FileText className="h-3 w-3" /> {insight.decisions} decisions
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      {insight.actionItems} action items
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AIInsights;
