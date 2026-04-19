import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Search, Trash2, Mail, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { getUserRoleDropdown, addCompanyUser } from "@/services/userService";
import type { UserRole, UserRoleDropdownItem } from "@/models";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UserEntry {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}

const MOCK_COMPANIES = [
  { id: "comp-1", name: "MeetingMind Inc." },
  { id: "comp-2", name: "Acme Corp" },
  { id: "comp-3", name: "TechStart Ltd" },
];

const MOCK_USERS: UserEntry[] = [
  { id: "1", name: "John Doe", email: "john@meetingmind.com", role: "admin", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "2", name: "Sarah Chen", email: "sarah@meetingmind.com", role: "employee", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "3", name: "Mike Ross", email: "mike@meetingmind.com", role: "employee", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "4", name: "Emily Park", email: "emily@meetingmind.com", role: "employee", companyId: "comp-1", companyName: "MeetingMind Inc." },
  { id: "5", name: "Alex Johnson", email: "alex@acme.com", role: "admin", companyId: "comp-2", companyName: "Acme Corp" },
  { id: "6", name: "Lisa Wang", email: "lisa@acme.com", role: "employee", companyId: "comp-2", companyName: "Acme Corp" },
  { id: "7", name: "David Kim", email: "david@techstart.com", role: "admin", companyId: "comp-3", companyName: "TechStart Ltd" },
  { id: "8", name: "Rachel Green", email: "rachel@techstart.com", role: "employee", companyId: "comp-3", companyName: "TechStart Ltd" },
];

const UsersPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const role = user?.role || "employee";
  const [allUsers, setAllUsers] = useState<UserEntry[]>(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("employee");
  const [newRoleId, setNewRoleId] = useState<number | null>(null);
  const [newCompanyId, setNewCompanyId] = useState(user?.companyId || "");
  const [roleOptions, setRoleOptions] = useState<UserRoleDropdownItem[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getUserRoleDropdown()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setRoleOptions(data);
      })
      .catch((err) => {
        sonnerToast.error(err instanceof Error ? err.message : "Failed to load roles");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  let filtered = allUsers;

  if (role === "admin") {
    filtered = filtered.filter((u) => u.companyId === user?.companyId);
  }

  if (role === "superadmin" && companyFilter !== "all") {
    filtered = filtered.filter((u) => u.companyId === companyFilter);
  }

  if (search) {
    filtered = filtered.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleAdd = async () => {
    const trimmedName = newName.trim();
    const trimmedEmail = newEmail.trim();

    if (!trimmedName) {
      sonnerToast.error("Full name is required.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      sonnerToast.error("Please enter a valid email address.");
      return;
    }
    if (newRoleId === null || newRoleId === undefined) {
      sonnerToast.error("Please select a role.");
      return;
    }

    setSubmitting(true);
    try {
      await addCompanyUser({
        fullname: trimmedName,
        email: trimmedEmail,
        roleId: newRoleId,
      });
      sonnerToast.success(
        "User has been successfully added. Login credentials have been sent to the registered email address"
      );

      const companyName = role === "superadmin"
        ? MOCK_COMPANIES.find((c) => c.id === newCompanyId)?.name
        : user?.companyName;
      setAllUsers((prev) => [...prev, {
        id: "usr-" + Date.now(),
        name: trimmedName,
        email: trimmedEmail,
        role: newRole,
        companyId: role === "superadmin" ? newCompanyId : user?.companyId,
        companyName,
      }]);
      setNewName("");
      setNewEmail("");
      setNewRoleId(null);
      setDialogOpen(false);
    } catch (err) {
      sonnerToast.error(err instanceof Error ? err.message : "Failed to add user.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = (id: string, name: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
    toast({ title: "User removed", description: `${name} has been removed.` });
  };

  const roleColors: Record<string, string> = {
    superadmin: "bg-destructive/10 text-destructive",
    admin: "bg-primary/10 text-primary",
    employee: "bg-muted text-muted-foreground",
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {role === "superadmin" ? "Manage all platform users" : `Manage ${user?.companyName} team members`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {role === "superadmin" && (
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-48 h-9"><SelectValue placeholder="All Companies" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {MOCK_COMPANIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-9 w-64 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><UserPlus className="h-4 w-4" /> Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input className="mt-1.5" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Jane Smith" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="jane@company.com" />
                    </div>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select
                      value={newRoleId !== null ? String(newRoleId) : ""}
                      onValueChange={(v) => {
                        const id = Number(v);
                        setNewRoleId(id);
                        const selected = roleOptions.find((r) => r.roleType === id);
                        const internal: UserRole = selected?.roleName.toLowerCase().includes("admin")
                          ? "admin"
                          : "employee";
                        setNewRole(internal);
                      }}
                    >
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        {roleOptions.length === 0 ? (
                          <SelectItem value="0" disabled>Loading roles...</SelectItem>
                        ) : (
                          roleOptions.map((r) => (
                            <SelectItem key={r.roleType} value={String(r.roleType)}>
                              {r.roleName}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  {role === "superadmin" && (
                    <div>
                      <Label>Company</Label>
                      <Select value={newCompanyId} onValueChange={setNewCompanyId}>
                        <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select company" /></SelectTrigger>
                        <SelectContent>
                          {MOCK_COMPANIES.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Button onClick={handleAdd} disabled={submitting} className="w-full">
                    <Plus className="h-4 w-4" /> {submitting ? "Adding..." : "Add User"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                {role === "superadmin" && <TableHead>Company</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={role === "superadmin" ? 5 : 4} className="text-center py-12">
                    <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                          <span className="text-xs font-semibold text-accent-foreground">{u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                        </div>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs capitalize ${roleColors[u.role]}`}>{u.role}</Badge>
                    </TableCell>
                    {role === "superadmin" && (
                      <TableCell><Badge variant="outline" className="text-xs">{u.companyName}</Badge></TableCell>
                    )}
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleRemove(u.id, u.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default UsersPage;
