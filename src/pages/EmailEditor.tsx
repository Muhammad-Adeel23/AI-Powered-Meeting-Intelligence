import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const EmailEditor = () => {
  const [subject, setSubject] = useState("Follow-up: Sprint Planning Q1 — Action Items & Key Decisions");
  const [body, setBody] = useState(
`Hi team,

Thanks for a productive sprint planning session today. Here's a quick summary of what we discussed and the next steps:

**Key Decisions:**
• Migrate to TypeScript strict mode by end of Q1
• Hire 2 additional frontend engineers
• Launch mobile app beta by March 31

**Action Items:**
• Sarah — Set up TypeScript strict config (Due: Mar 12)
• Mike — Draft JD for frontend engineer role (Due: Mar 10)
• John — Create mobile app beta TestFlight build (Due: Mar 28)

Please review and let me know if I missed anything. Looking forward to a great sprint!

Best,
John`
  );

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Email Editor</h1>
            <p className="text-sm text-muted-foreground mt-1">AI-drafted follow-up email</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="h-3.5 w-3.5" /> Regenerate
            </Button>
            <Button variant="outline" size="sm">
              <Sparkles className="h-3.5 w-3.5" /> Improve Tone
            </Button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 shadow-sm space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="to">To</Label>
                <Input id="to" defaultValue="team@company.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="cc">CC</Label>
                <Input id="cc" placeholder="Add CC recipients" className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1.5 min-h-[320px] font-mono text-sm leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Save Draft</Button>
              <Button variant="hero">
                <Send className="h-4 w-4" /> Send Email
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default EmailEditor;
