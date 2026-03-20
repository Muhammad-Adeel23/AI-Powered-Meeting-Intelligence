import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const MOCK_COMPANIES = [
  { id: "comp-1", name: "MeetingMind Inc." },
  { id: "comp-2", name: "Acme Corp" },
  { id: "comp-3", name: "TechStart Ltd" },
];

const allMeetings = [
  { id: 1, title: "Sprint Planning Q1", date: "Mar 8, 2026", organizer: "John Doe", participants: 6, status: "Summarized", company: "MeetingMind Inc.", companyId: "comp-1" },
  { id: 2, title: "Design Review — Mobile App", date: "Mar 7, 2026", organizer: "Sarah Chen", participants: 4, status: "Processing", company: "MeetingMind Inc.", companyId: "comp-1" },
  { id: 3, title: "Client Onboarding — Acme Co", date: "Mar 7, 2026", organizer: "John Doe", participants: 3, status: "Summarized", company: "MeetingMind Inc.", companyId: "comp-1" },
  { id: 4, title: "Engineering Standup", date: "Mar 6, 2026", organizer: "Mike Ross", participants: 8, status: "Summarized", company: "MeetingMind Inc.", companyId: "comp-1" },
  { id: 5, title: "Product Roadmap Review", date: "Mar 5, 2026", organizer: "Alex Johnson", participants: 10, status: "Summarized", company: "Acme Corp", companyId: "comp-2" },
  { id: 6, title: "Investor Update Call", date: "Mar 4, 2026", organizer: "Alex Johnson", participants: 5, status: "Processing", company: "Acme Corp", companyId: "comp-2" },
  { id: 7, title: "Quarterly Review", date: "Mar 3, 2026", organizer: "David Kim", participants: 4, status: "Summarized", company: "TechStart Ltd", companyId: "comp-3" },
  { id: 8, title: "Team Sync", date: "Mar 2, 2026", organizer: "Rachel Green", participants: 3, status: "Pending", company: "TechStart Ltd", companyId: "comp-3" },
];

const Meetings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "employee";
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");

  let filtered = allMeetings;

  if (role === "admin") {
    filtered = filtered.filter((m) => m.companyId === user?.companyId);
  } else if (role === "employee") {
    filtered = filtered.filter((m) => m.companyId === user?.companyId).slice(0, 4);
  }

  if (role === "superadmin" && companyFilter !== "all") {
    filtered = filtered.filter((m) => m.companyId === companyFilter);
  }

  if (search) {
    filtered = filtered.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.organizer.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageTitle = role === "superadmin" ? "All Meetings" : role === "admin" ? "Company Meetings" : "My Meetings";

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
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
              <Input placeholder="Search meetings..." className="pl-9 w-64 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        <Card className="shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead className="text-center">Participants</TableHead>
                {role === "superadmin" && <TableHead>Company</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={role === "superadmin" ? 7 : 6} className="text-center py-12">
                    <FileText className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No meetings found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((meeting) => (
                  <TableRow key={meeting.id} className="cursor-pointer" onClick={() => navigate(`/meetings/${meeting.id}`)}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{meeting.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{meeting.date}</TableCell>
                    <TableCell>{meeting.organizer}</TableCell>
                    <TableCell className="text-center">{meeting.participants}</TableCell>
                    {role === "superadmin" && (
                      <TableCell><Badge variant="outline" className="text-xs">{meeting.company}</Badge></TableCell>
                    )}
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs ${meeting.status === "Summarized" ? "bg-success/10 text-success" : meeting.status === "Processing" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                        {meeting.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); navigate(`/meetings/${meeting.id}`); }}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
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

export default Meetings;
