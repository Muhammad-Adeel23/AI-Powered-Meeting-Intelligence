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

export interface GetAllMeetingsRequest {
  searchValue: string;
  pageNumber: number;
  pageSize: number;
}

export interface MeetingListItem {
  id: number;
  title: string;
  meetingDate: string;
  organizer: string;
  participants: number;
  status: string;
  company: string;
}

export interface MeetingActionItem {
  actionText: string;
  status: string;
  assignedTo: string;
  dueDate: string | null;
}

export interface MeetingDetailsData {
  meetingId: number;
  meetingTitle: string;
  meetingDate: string;
  totalParticipants: number;
  meetingStatus: string;
  meetingTranscript: string;
  aiSummary: string;
  keyDiscussions: string[];
  actionItems: MeetingActionItem[];
  emailTo: string[];
  emailSubject: string;
  emailBody: string;
}

export interface PagedMeetings {
  totalRecords: number;
  page: number;
  pageSize: number;
  remainingCount: number;
  remainingPage: number;
  totalPage: number;
  pageSizeCount: number;
  data: MeetingListItem[];
}
