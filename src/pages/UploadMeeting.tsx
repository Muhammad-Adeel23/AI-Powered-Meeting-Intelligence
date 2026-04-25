import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload as UploadIcon, FileAudio, X, ChevronDown, Check, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { analyzeMeeting } from "@/services/meetingService";

interface CompanyEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
}

const MOCK_EMPLOYEES: CompanyEmployee[] = [
  { id: "1", name: "John Doe", email: "john@meetingmind.com", role: "admin" },
  { id: "2", name: "Sarah Chen", email: "sarah@meetingmind.com", role: "employee" },
  { id: "3", name: "Mike Ross", email: "mike@meetingmind.com", role: "employee" },
  { id: "4", name: "Emily Park", email: "emily@meetingmind.com", role: "employee" },
];

const UploadMeeting = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<CompanyEmployee[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const companyEmployees = MOCK_EMPLOYEES;

  const filteredEmployees = companyEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleParticipant = (emp: CompanyEmployee) => {
    setSelectedParticipants((prev) =>
      prev.find((p) => p.id === emp.id)
        ? prev.filter((p) => p.id !== emp.id)
        : [...prev, emp]
    );
  };

  const removeParticipant = (id: string) => {
    setSelectedParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Meeting title is required.");
      return;
    }
    if (!file) {
      toast.error("Please select a recording to upload.");
      return;
    }
    const participantIds = selectedParticipants
      .map((p) => Number(p.id))
      .filter((n) => !Number.isNaN(n));

    setSubmitting(true);
    try {
      const res = await analyzeMeeting({ title: title.trim(), participantIds, file });
      toast.success(res.message || "Meeting created successfully. AI insights are processing.");
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to upload meeting.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Meeting</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload a recording and let AI do the rest.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 shadow-sm space-y-6">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors cursor-pointer ${dragOver ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input id="file-input" type="file" accept="audio/*,video/*" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
              {file ? (
                <div className="flex items-center gap-3">
                  <FileAudio className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setFile(null); }}><X className="h-4 w-4" /></Button>
                </div>
              ) : (
                <>
                  <UploadIcon className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">Drop your recording here or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-1">MP3, MP4, WAV, WebM up to 500MB</p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Sprint Planning Q1"
                  className="mt-1.5"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div ref={dropdownRef}>
                <Label>Participants</Label>
                <div className="mt-1.5 relative">
                  <div className="flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {selectedParticipants.length > 0 ? (
                      selectedParticipants.map((p) => (
                        <Badge key={p.id} variant="secondary" className="text-xs flex items-center gap-1">
                          {p.name}
                          <button onClick={(e) => { e.stopPropagation(); removeParticipant(p.id); }} className="ml-0.5 hover:text-foreground"><X className="h-3 w-3" /></button>
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">Select participants...</span>
                    )}
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md">
                      <div className="p-2 border-b border-border">
                        <Input placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-8 text-sm" onClick={(e) => e.stopPropagation()} />
                      </div>
                      <div className="max-h-48 overflow-y-auto p-1">
                        {filteredEmployees.length === 0 ? (
                          <p className="text-sm text-muted-foreground p-2 text-center">No employees found</p>
                        ) : (
                          filteredEmployees.map((emp) => {
                            const isSelected = selectedParticipants.some((p) => p.id === emp.id);
                            return (
                              <button key={emp.id} type="button" className="flex items-center gap-3 w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors" onClick={(e) => { e.stopPropagation(); toggleParticipant(emp); }}>
                                <div className={`flex h-4 w-4 items-center justify-center rounded-sm border ${isSelected ? "bg-primary border-primary" : "border-input"}`}>
                                  {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">{emp.name}</span>
                                  <span className="text-xs text-muted-foreground">{emp.email}</span>
                                </div>
                                <Badge variant="outline" className="ml-auto text-[10px]">{emp.role}</Badge>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="hero"
              className="w-full"
              disabled={!file || !title.trim() || submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                <><UploadIcon className="h-4 w-4" /> Process with AI</>
              )}
            </Button>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default UploadMeeting;
