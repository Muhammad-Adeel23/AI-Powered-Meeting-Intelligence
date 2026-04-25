export interface AnalyzeMeetingRequest {
  title: string;
  participantIds: number[];
  file: File;
}

export type MeetingStatus = "Pending" | "Processing" | "Summarized" | "Failed";

export interface MeetingUpdateEvent {
  meetingId: number;
  status: MeetingStatus;
  progress: number;
}
