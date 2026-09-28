export interface SavedGuest {
  studentId: string;
  name: string;
  createdAt: string;
}

export interface SavedInvitation {
  id: string;
  partyName: string;
  date: string;
  time: string;
  place: string;
  guests: SavedGuest[];
  createdAt: string;
}

// TODO: 초대장 생성/조회 API 연동 시 서버 호출로 교체
const STORAGE_KEY = "invite.admin.invitations";

export function loadInvitations(): SavedInvitation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as SavedInvitation[]) : [];
  } catch {
    return [];
  }
}

export function saveInvitation(invitation: SavedInvitation): boolean {
  try {
    const rest = loadInvitations().filter((i) => i.id !== invitation.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([invitation, ...rest]));
    return true;
  } catch {
    return false;
  }
}
