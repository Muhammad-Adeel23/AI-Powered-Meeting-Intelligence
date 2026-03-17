import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Plus, Edit2, Trash2, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
}

const initialTemplates: Template[] = [
  {
    id: "1",
    name: "Meeting Follow-up",
    subject: "Follow-up: {{meeting_title}} — Key Decisions & Action Items",
    body: "Hi {{recipient_name}},\n\nThanks for attending {{meeting_title}} on {{meeting_date}}.\n\n**Key Decisions:**\n{{decisions}}\n\n**Action Items:**\n{{action_items}}\n\nBest,\n{{sender_name}}",
    placeholders: ["meeting_title", "recipient_name", "meeting_date", "decisions", "action_items", "sender_name"],
  },
  {
    id: "2",
    name: "Welcome Email",
    subject: "Welcome to MeetingMind, {{user_name}}!",
    body: "Hi {{user_name}},\n\nWelcome to MeetingMind! Your account has been created for {{company_name}}.\n\nGet started by uploading your first meeting recording.\n\nBest,\nThe MeetingMind Team",
    placeholders: ["user_name", "company_name"],
  },
  {
    id: "3",
    name: "Action Item Reminder",
    subject: "Reminder: {{action_item}} due {{due_date}}",
    body: "Hi {{assignee_name}},\n\nThis is a reminder that your action item \"{{action_item}}\" from {{meeting_title}} is due on {{due_date}}.\n\nPlease update your progress.\n\nBest,\nMeetingMind",
    placeholders: ["assignee_name", "action_item", "meeting_title", "due_date"],
  },
];

const EmailTemplates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newBody, setNewBody] = useState("");
  const { toast } = useToast();

  const handleCreate = () => {
    if (!newName.trim()) return;
    const placeholders = [...new Set([...(newSubject + newBody).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))];
    setTemplates((prev) => [...prev, { id: "t-" + Date.now(), name: newName, subject: newSubject, body: newBody, placeholders }]);
    toast({ title: "Template created", description: `${newName} has been added.` });
    setNewName("");
    setNewSubject("");
    setNewBody("");
    setDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Template deleted", description: `${name} has been removed.` });
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Email Templates</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage email templates and placeholders</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4" /> New Template</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Template Name</Label>
                  <Input className="mt-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Weekly Digest" />
                </div>
                <div>
                  <Label>Subject Line</Label>
                  <Input className="mt-1.5" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder='Use {{placeholder}} for dynamic values' />
                </div>
                <div>
                  <Label>Body</Label>
                  <Textarea className="mt-1.5 min-h-[160px] font-mono text-sm" value={newBody} onChange={(e) => setNewBody(e.target.value)} placeholder='Hi {{name}},\n\n...' />
                </div>
                <Button onClick={handleCreate} className="w-full">Create Template</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="shadow-sm">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                      <Mail className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{template.subject}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(template.id, template.name)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Code className="h-3.5 w-3.5 text-muted-foreground" />
                  {template.placeholders.map((p) => (
                    <Badge key={p} variant="outline" className="text-[10px] font-mono">{`{{${p}}}`}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default EmailTemplates;
