import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Globe, Bell, Cpu, Database, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const { toast } = useToast();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [maxUploadSize, setMaxUploadSize] = useState("500");

  const handleSave = () => {
    toast({ title: "Settings saved", description: "System configuration has been updated." });
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Platform-wide configuration and settings</p>
        </div>

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Cpu className="h-5 w-5" /> AI Configuration</CardTitle>
            <CardDescription>Configure AI processing settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>AI Processing</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Enable automatic AI processing for uploaded meetings</p>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Summarize</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Automatically generate summaries after transcription</p>
              </div>
              <Switch checked={autoSummarize} onCheckedChange={setAutoSummarize} />
            </div>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Database className="h-5 w-5" /> Storage</CardTitle>
            <CardDescription>File upload and storage configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Max Upload Size (MB)</Label>
              <Input className="mt-1.5 w-32" type="number" value={maxUploadSize} onChange={(e) => setMaxUploadSize(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
            <CardDescription>Email and notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Send email notifications for AI completions and action items</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Platform Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5" /> Platform Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Version</span>
                <p className="font-medium">2.4.1</p>
              </div>
              <div>
                <span className="text-muted-foreground">Environment</span>
                <p className="font-medium">Production</p>
              </div>
              <div>
                <span className="text-muted-foreground">API Status</span>
                <p className="font-medium text-success">Operational</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Deploy</span>
                <p className="font-medium">Mar 17, 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave}>Save All Settings</Button>
      </div>
    </AppLayout>
  );
};

export default SystemSettings;
