import { API_ENDPOINTS } from "@/config/api";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "@/models";
import type {
  AnalyzeMeetingRequest,
  GetAllMeetingsRequest,
  PagedMeetings,
  MeetingDetailsData,
} from "@/models/meeting";

export function analyzeMeeting(payload: AnalyzeMeetingRequest): Promise<ApiResponse<number>> {
  const formData = new FormData();
  formData.append("title", payload.title);
  payload.participantIds.forEach((id) => formData.append("participantIds", String(id)));
  formData.append("file", payload.file);
  return httpClient.postForm<number>(API_ENDPOINTS.ANALYZE_MEETING, formData, { auth: true });
}

export function getAllMeetings(payload: GetAllMeetingsRequest): Promise<PagedMeetings> {
  return httpClient.post<PagedMeetings>(API_ENDPOINTS.GET_ALL_MEETINGS, payload, { auth: true });
}
