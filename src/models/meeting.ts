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
  isGetAllData: boolean;
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
