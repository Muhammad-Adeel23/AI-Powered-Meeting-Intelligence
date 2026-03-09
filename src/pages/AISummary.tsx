import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Mail, FileText, Users, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const keyDecisions = [
  "Migrate to TypeScript strict mode by end of Q1",
  "Hire 2 additional frontend engineers",
  "Launch beta of mobile app by March 31",
];

const actionItems = [
  { text: "Set up TypeScript strict config", assignee: "Sarah", due: "Mar 12" },
  { text: "Draft JD for frontend engineer role", assignee: "Mike", due: "Mar 10" },
  { text: "Create mobile app beta TestFlight build", assignee: "John", due: "Mar 28" },
];

const AISummary = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Meeting Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Sparkles className="h-3 w-3" /> AI Generated
                  </Badge>
                </div>
                <h1 className="text-xl font-bold">Sprint Planning Q1</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 45 min</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 6 participants</span>
                  <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Mar 8, 2026</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                <Button variant="outline" size="sm"><Mail className="h-3.5 w-3.5" /> Email</Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Summary */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Summary</h2>
              <div className="prose prose-sm text-foreground/90 leading-relaxed space-y-3">
                <p>
                  The team reviewed Q1 sprint goals focusing on three major initiatives: TypeScript migration, team expansion, and mobile app beta launch. Strong consensus was reached on all key decisions.
                </p>
                <p>
                  Engineering velocity has improved 23% since adopting the new CI/CD pipeline. The team discussed potential bottlenecks around the mobile launch timeline and agreed to front-load testing resources.
                </p>
                <p>
                  Budget allocation for new hires was approved. HR will begin sourcing candidates this week with a target of completing interviews by mid-March.
                </p>
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
          </motion.div>

          {/* Action Items sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Action Items</h2>
              <div className="space-y-3">
                {actionItems.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border space-y-2">
                    <p className="text-sm font-medium">{item.text}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.assignee}</span>
                      <span>Due {item.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AISummary;
