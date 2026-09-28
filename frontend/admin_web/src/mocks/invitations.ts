export type ResponseStatus = "attend" | "decline" | "pending";

export interface GuestResponse {
  studentId: string;
  name: string;
  status: ResponseStatus;
  respondedAt: string | null;
}

export interface MockInvitation {
  id: string;
  partyName: string;
  date: string;
  place: string;
  guests: GuestResponse[];
}

const g = (
  studentId: string,
  name: string,
  status: ResponseStatus,
  respondedAt: string | null = null,
): GuestResponse => ({ studentId, name, status, respondedAt });

// TODO: 초대장 응답 현황 API 연동 시 서버 호출로 교체
export const MOCK_INVITATIONS: MockInvitation[] = [
  {
    id: "1",
    partyName: "가을 생일파티",
    date: "2026-10-15",
    place: "학생회관 2층 라운지",
    guests: [
      g("20101", "윤서준", "attend", "2026.09.23 19:40"),
      g("20102", "임하늘", "attend", "2026.09.22 10:12"),
      g("20107", "강도윤", "decline", "2026.09.21 15:05"),
      g("20112", "배소율", "pending"),
      g("20118", "오지안", "attend", "2026.09.23 08:50"),
      g("20124", "송민재", "pending"),
      g("20131", "류채원", "attend", "2026.09.24 21:03"),
      g("20136", "문시우", "decline", "2026.09.22 18:27"),
    ],
  },
  {
    id: "2",
    partyName: "여름 동아리 정기모임",
    date: "2026-07-02",
    place: "동아리방 3",
    guests: [
      g("19204", "장예린", "attend", "2026.06.25 12:31"),
      g("19211", "권태오", "attend", "2026.06.25 13:02"),
      g("19219", "노아윤", "attend", "2026.06.26 09:15"),
      g("19225", "황선우", "decline", "2026.06.27 22:48"),
      g("19233", "조하린", "attend", "2026.06.28 11:20"),
    ],
  },
  {
    id: "3",
    partyName: "새 학기 환영회",
    date: "2026-03-05",
    place: "시청각실",
    guests: [
      g("21301", "백지호", "attend", "2026.02.27 17:44"),
      g("21308", "신유진", "attend", "2026.02.28 10:09"),
      g("21315", "안도현", "decline", "2026.03.01 14:36"),
      g("21322", "홍나윤", "attend", "2026.03.02 20:15"),
      g("21329", "전시현", "pending"),
      g("21337", "유가온", "attend", "2026.03.03 08:58"),
    ],
  },
];

export function countByStatus(guests: GuestResponse[]) {
  return {
    attend: guests.filter((guest) => guest.status === "attend").length,
    decline: guests.filter((guest) => guest.status === "decline").length,
    pending: guests.filter((guest) => guest.status === "pending").length,
  };
}
