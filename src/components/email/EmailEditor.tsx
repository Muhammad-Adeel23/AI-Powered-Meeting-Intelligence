import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

export const EmailEditor = ({ emailData }) => {

  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // 🔥 IMPORTANT: sync props → state
  useEffect(() => {
    if (!emailData) return;

    setTo(emailData.toEmails?.join(", ") || "");
    setCc(emailData.ccEmails?.join(", ") || "");
    setSubject(emailData.subject || "");
    setBody(emailData.body || "");
  }, [emailData]);

  return (
    <Card className="p-6 shadow-sm space-y-5">

      {/* TO */}
      <div>
        <Label>To</Label>
        <Input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1.5"
        />
      </div>

      {/* CC */}
      <div>
        <Label>CC</Label>
        <Input
          value={cc}
          onChange={(e) => setCc(e.target.value)}
          className="mt-1.5"
        />
      </div>

      {/* SUBJECT */}
      <div>
        <Label>Subject</Label>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5"
        />
      </div>

      {/* BODY */}
      <div>
        <Label>Body</Label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1.5 min-h-[320px] font-mono text-sm"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <RotateCcw className="h-4 w-4" /> Regenerate
        </Button>

        <Button variant="outline">
          <Sparkles className="h-4 w-4" /> Improve Tone
        </Button>

        <Button variant="hero">
          <Send className="h-4 w-4" /> Send Email
        </Button>
      </div>

    </Card>
  );
};