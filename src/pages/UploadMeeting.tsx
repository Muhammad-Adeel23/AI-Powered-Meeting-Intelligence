import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload as UploadIcon, FileAudio, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const UploadMeeting = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Meeting</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a recording and let AI do the rest.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 shadow-sm space-y-6">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors cursor-pointer ${
                dragOver ? "border-primary bg-accent" : "border-border hover:border-primary/40"
              }`}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="audio/*,video/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
              />
              {file ? (
                <div className="flex items-center gap-3">
                  <FileAudio className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <UploadIcon className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">
                    Drop your recording here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    MP3, MP4, WAV, WebM up to 500MB
                  </p>
                </>
              )}
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Meeting Title</Label>
                <Input id="title" placeholder="e.g. Sprint Planning Q1" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="participants">Participants</Label>
                <Input id="participants" placeholder="e.g. John, Sarah, Mike" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any context for the AI..." className="mt-1.5" rows={3} />
              </div>
            </div>

            <Button variant="hero" className="w-full" disabled={!file}>
              <UploadIcon className="h-4 w-4" /> Process with AI
            </Button>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default UploadMeeting;
