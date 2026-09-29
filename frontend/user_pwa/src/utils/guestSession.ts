export interface GuestIdentity {
  studentId: string;
  name: string;
}

const key = (eventId: string) => `invite.guest.${eventId}`;

export function saveGuestIdentity(eventId: string, identity: GuestIdentity) {
  try {
    sessionStorage.setItem(key(eventId), JSON.stringify(identity));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — the lookup form will just ask again.
  }
}

export function loadGuestIdentity(eventId: string): GuestIdentity | null {
  try {
    const raw = sessionStorage.getItem(key(eventId));
    return raw ? (JSON.parse(raw) as GuestIdentity) : null;
  } catch {
    return null;
  }
}
