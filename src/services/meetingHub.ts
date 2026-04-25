import * as signalR from "@microsoft/signalr";
import { API_ENDPOINTS, TOKEN_KEY } from "@/config/api";
import type { MeetingUpdateEvent } from "@/models/meeting";

let connection: signalR.HubConnection | null = null;

export function getMeetingHubConnection(): signalR.HubConnection {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(API_ENDPOINTS.MEETING_HUB, {
      accessTokenFactory: () => localStorage.getItem(TOKEN_KEY) || "",
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(signalR.LogLevel.Warning)
    .build();

  return connection;
}

export async function startMeetingHub(): Promise<signalR.HubConnection> {
  const conn = getMeetingHubConnection();
  if (
    conn.state === signalR.HubConnectionState.Disconnected
  ) {
    try {
      await conn.start();
    } catch (err) {
      console.error("SignalR connection failed:", err);
    }
  }
  return conn;
}

export function onMeetingUpdate(handler: (event: MeetingUpdateEvent) => void): () => void {
  const conn = getMeetingHubConnection();
  conn.on("ReceiveMeetingUpdate", handler);
  return () => conn.off("ReceiveMeetingUpdate", handler);
}

export async function stopMeetingHub(): Promise<void> {
  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    try {
      await connection.stop();
    } catch (err) {
      console.error("SignalR stop failed:", err);
    }
  }
}
