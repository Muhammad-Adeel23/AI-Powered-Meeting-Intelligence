import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FileText, Search, Eye, MoreHorizontal, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getAllMeetings } from "@/services/meetingService";
import type { MeetingListItem, MeetingStatus, MeetingUpdateEvent, PagedMeetings } from "@/models/meeting";
import { startMeetingHub, onMeetingUpdate } from "@/services/meetingHub";
import { toast } from "sonner";

const PAGE_SIZE = 10;

function formatDate(value: string): string {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function statusClasses(status: string): string {
  switch (status) {
    case "Summarized":
      return "bg-success/10 text-success";
    case "Processing":
      return "bg-primary/10 text-primary";
    case "Failed":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-warning/10 text-warning";
  }
}

const Meetings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "employee";

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paged, setPaged] = useState<PagedMeetings | null>(null);
  const [loading, setLoading] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState<Record<number, { status: MeetingStatus; progress: number }>>({});

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch meetings whenever search/page changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllMeetings({
      searchValue: debouncedSearch,
      pageNumber: Math.max(0, page - 1),
      pageSize: PAGE_SIZE,
    })
      .then((res) => {
        if (!cancelled) setPaged(res);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Failed to load meetings", {
            position: "top-right",
          });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, page]);

  // SignalR live updates
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      await startMeetingHub();
      if (cancelled) return;
      unsubscribe = onMeetingUpdate((event: MeetingUpdateEvent) => {
        setLiveUpdates((prev) => ({
          ...prev,
          [event.meetingId]: { status: event.status, progress: event.progress },
        }));
      });
    })();
    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const meetings: MeetingListItem[] = paged?.data ?? [];
  const totalPage = paged?.totalPage ?? 1;
  const totalRecords = paged?.totalRecords ?? 0;

  const pageTitle = role === "superadmin" ? "All Meetings" : role === "admin" ? "Company Meetings" : "My Meetings";

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const max = Math.max(1, totalPage);
    const start = Math.max(1, page - 2);
    const end = Math.min(max, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPage]);

  const showCompany = role === "superadmin";
  const colSpan = showCompany ? 7 : 6;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
            {totalRecords > 0 && (
              <p className="text-sm text-muted-foreground mt-1">{totalRecords} meeting{totalRecords === 1 ? "" : "s"}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search meetings..."
                className="pl-9 w-64 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
                {showCompany && <TableHead>Company</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={colSpan} className="text-center py-12">
                    <Loader2 className="h-6 w-6 text-muted-foreground/60 mx-auto animate-spin" />
                  </TableCell>
                </TableRow>
              ) : meetings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={colSpan} className="text-center py-12">
                    <FileText className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No meetings found</p>
                  </TableCell>
                </TableRow>
              ) : (
                meetings.map((meeting) => {
                  const live = liveUpdates[meeting.id];
                  const status = live?.status || meeting.status;
                  return (
                    <TableRow
                      key={meeting.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/meetings/${meeting.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{meeting.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(meeting.meetingDate)}</TableCell>
                      <TableCell>{meeting.organizer || "—"}</TableCell>
                      <TableCell className="text-center">{meeting.participants ?? 0}</TableCell>
                      {showCompany && (
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{meeting.company || "—"}</Badge>
                        </TableCell>
                      )}
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs ${statusClasses(status)}`}>
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/meetings/${meeting.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {totalPage > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {pageNumbers.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPage) setPage(page + 1);
                  }}
                  className={page === totalPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </AppLayout>
  );
};

export default Meetings;
