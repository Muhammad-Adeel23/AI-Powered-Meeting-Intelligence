// Generic API response wrapper used across all backend endpoints
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  isSuccess: boolean;
}
