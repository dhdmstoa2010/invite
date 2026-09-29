const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type RsvpStatus = "pending" | "attend" | "decline";

export interface GuestInvitation {
  guestName: string;
  partyName: string;
  date: string;
  place: string;
  status: RsvpStatus;
}

export class LookupError extends Error {}

export async function lookupGuest(
  eventId: string,
  studentId: string,
  name: string,
): Promise<GuestInvitation> {
  const res = await fetch(`${API_URL}/api/events/${eventId}/lookup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, name }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new LookupError(
      body?.message ?? "일치하는 정보를 찾을 수 없어요.",
    );
  }
  return res.json();
}

export async function submitRsvp(
  eventId: string,
  studentId: string,
  name: string,
  status: "attend" | "decline",
): Promise<GuestInvitation> {
  const res = await fetch(`${API_URL}/api/events/${eventId}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, name, status }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new LookupError(body?.message ?? "응답을 저장하지 못했어요.");
  }
  return res.json();
}
