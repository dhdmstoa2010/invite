const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type RsvpStatus = "pending" | "attend" | "decline";

export interface ApiGuest {
  studentId: string;
  name: string;
  status: RsvpStatus;
  respondedAt: string | null;
  createdAt: string;
}

export interface ApiEvent {
  id: string;
  partyName: string;
  date: string;
  time: string;
  place: string;
  guests: ApiGuest[];
  createdAt: string;
}

export interface CreateEventPayload {
  id: string;
  partyName: string;
  date: string;
  time: string;
  place: string;
  guests: { studentId: string; name: string; createdAt: string }[];
}

export function countByStatus(guests: ApiGuest[]) {
  return {
    attend: guests.filter((guest) => guest.status === "attend").length,
    decline: guests.filter((guest) => guest.status === "decline").length,
    pending: guests.filter((guest) => guest.status === "pending").length,
  };
}

export async function createEvent(payload: CreateEventPayload): Promise<ApiEvent> {
  const res = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "초대장을 저장하지 못했어요.");
  }
  return res.json();
}

export async function listEvents(): Promise<ApiEvent[]> {
  const res = await fetch(`${API_URL}/api/events`);
  if (!res.ok) throw new Error("초대장 목록을 불러오지 못했어요.");
  return res.json();
}

export async function getEvent(id: string): Promise<ApiEvent | null> {
  const res = await fetch(`${API_URL}/api/events/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("초대장을 불러오지 못했어요.");
  return res.json();
}
