import { TOKEN_KEY } from "@/config/api";
import type { ApiResponse } from "@/models";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

interface RequestOptions {
  auth?: boolean;
}

async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  // If backend uses ApiResponse<T> wrapper, unwrap it
  if (json && typeof json === "object" && "isSuccess" in json && "data" in json) {
    const wrapped = json as ApiResponse<T>;
    if (!res.ok || !wrapped.isSuccess) {
      throw new Error(wrapped.message || `Request failed (${res.status})`);
    }
    return wrapped.data;
  }

  // Plain JSON response
  if (!res.ok) {
    const message = (json && (json.message || json.error)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return json as T;
}

export const httpClient = {
  async post<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: opts.auth ? getAuthHeaders() : { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return parseResponse<T>(res);
  },
  async get<T>(url: string, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(url, {
      method: "GET",
      headers: opts.auth ? getAuthHeaders() : { "Content-Type": "application/json" },
    });
    return parseResponse<T>(res);
  },
};
