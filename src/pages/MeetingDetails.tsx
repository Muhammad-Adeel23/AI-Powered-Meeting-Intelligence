import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Copy, Mail, Users, FileText, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { EmailEditor } from "@/components/email/EmailEditor";
import { useState, useEffect } from "react";
import { getMeetingById } from "@/services/meetingService";
import type { MeetingDetailsData } from "@/models/meeting";
import { toast } from "sonner";

const formatDate = (d?: string) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
};

const formatDueDate = (d?: string | null) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
};

const MeetingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meeting, setMeeting] = useState<MeetingDetailsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMeetingById(id)
      .then((data) => setMeeting(data))
      .catch((err: Error) => {
        toast.error(err.message || "Failed to load meeting", { position: "top-right" });
        setMeeting(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const emailInsight = meeting
    ? {
        toEmails: meeting.emailTo,
        ccEmails: [],
        subject: meeting.emailSubject,
        body: meeting.emailBody,
      }
    : null;

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading meeting...
        </div>
      </AppLayout>
    );
  }

  if (!meeting) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto py-20 text-center text-muted-foreground">
          Meeting not found.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{meeting.meetingTitle}</h1>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {formatDate(meeting.meetingDate)}</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {meeting.totalParticipants} participants</span>
              <Badge variant="secondary" className="text-xs bg-success/10 text-success">{meeting.meetingStatus}</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="transcript" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="actions">Action Items</TabsTrigger>
            <TabsTrigger value="email">Email Insight</TabsTrigger>
          </TabsList>

          {/* Transcript Tab */}
          <TabsContent value="transcript">
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Meeting Transcript</h2>
                <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
              </div>
              <div className="prose prose-sm max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
                {meeting.meetingTranscript || "No transcript available."}
              </div>
            </Card>
          </TabsContent>

          {/* AI Summary Tab */}
          <TabsContent value="summary">
            <div className="space-y-6">
              <Card className="p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Sparkles className="h-3 w-3" /> AI Generated
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                    <Button variant="outline" size="sm"><Mail className="h-3.5 w-3.5" /> Email</Button>
                  </div>
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Summary</h2>
                <div className="prose prose-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {meeting.aiSummary || "No summary available."}
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Discussions</h2>
                <div className="space-y-3">
                  {(meeting.keyDiscussions || []).length === 0 && (
                    <p className="text-sm text-muted-foreground">No key discussions.</p>
                  )}
                  {(meeting.keyDiscussions || []).map((decision, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-accent/50"
                    >
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span className="text-sm">{decision}</span>
                    </motion.div>
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
              {(meeting.actionItems || []).length === 0 && (
                <div className="p-6 text-sm text-muted-foreground">No action items.</div>
              )}
              {(meeting.actionItems || []).map((item, idx) => {
                const completed = item.status?.toLowerCase() === "completed" || item.status?.toLowerCase() === "done";
                return (
                  <div key={idx} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
                    <Checkbox checked={completed} className="mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>
                        {item.actionText}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span>{item.assignedTo || "Unassigned"}</span>
                        <span>Due {formatDueDate(item.dueDate)}</span>
                      </div>
                    </div>
                    <Badge variant={completed ? "secondary" : "outline"} className="text-xs">
                      {item.status || "Pending"}
                    </Badge>
                  </div>
                );
              })}
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <EmailEditor emailData={emailInsight} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MeetingDetails;
