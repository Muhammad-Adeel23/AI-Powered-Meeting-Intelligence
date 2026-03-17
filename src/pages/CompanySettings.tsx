import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const CompanySettings = () => {
  const { user, companyEmployees } = useAuth();
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState(user?.companyName || "");

  const handleSave = () => {
    toast({ title: "Company updated", description: "Company settings have been saved." });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your organization settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Organization
            </CardTitle>
            <CardDescription>Your company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Company Name</Label>
              <Input className="mt-1.5" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Team Members:</span>
                <span className="font-medium">{companyEmployees.length}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Plan:</span>
                <Badge variant="outline" className="text-xs">{user?.plan}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </AppLayout>
  );
};

export default CompanySettings;
