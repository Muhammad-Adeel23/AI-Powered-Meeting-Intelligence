import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Plus, Search, Users, FileText, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Company {
  id: string;
  name: string;
  plan: string;
  createdAt: string;
  employeeCount: number;
  meetingCount: number;
}

const MOCK_COMPANIES: Company[] = [
  { id: "comp-1", name: "MeetingMind Inc.", plan: "Enterprise", createdAt: "2025-01-15", employeeCount: 12, meetingCount: 156 },
  { id: "comp-2", name: "Acme Corp", plan: "Pro", createdAt: "2025-03-20", employeeCount: 8, meetingCount: 89 },
  { id: "comp-3", name: "TechStart Ltd", plan: "Starter", createdAt: "2025-06-10", employeeCount: 4, meetingCount: 32 },
];

const Companies = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newPlan, setNewPlan] = useState("Starter");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!newName.trim()) return;
    setCompanies((prev) => [...prev, { id: "comp-" + Date.now(), name: newName.trim(), plan: newPlan, createdAt: new Date().toISOString().split("T")[0], employeeCount: 0, meetingCount: 0 }]);
    toast({ title: "Company created", description: `${newName} has been added.` });
    setNewName("");
    setDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Company deleted", description: `${name} has been removed.` });
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage all registered companies</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search companies..." className="pl-9 w-64 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4" /> Add Company</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create New Company</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input className="mt-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Acme Corp" />
                  </div>
                  <div>
                    <Label>Plan</Label>
                    <Input className="mt-1.5" value={newPlan} onChange={(e) => setNewPlan(e.target.value)} placeholder="Starter / Pro / Enterprise" />
                  </div>
                  <Button onClick={handleCreate} className="w-full">Create Company</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-center">Employees</TableHead>
                <TableHead className="text-center">Meetings</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Building2 className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No companies found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                          <Building2 className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <span className="font-medium">{company.name}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{company.plan}</Badge></TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground"><Users className="h-3.5 w-3.5" /> {company.employeeCount}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground"><FileText className="h-3.5 w-3.5" /> {company.meetingCount}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{company.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/users?company=${company.id}`)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(company.id, company.name)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Companies;
