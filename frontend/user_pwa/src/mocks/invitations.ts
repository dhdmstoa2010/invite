import type { Invitation } from "../pages/userInvitePage";

// TODO: 어드민 API 연동 시 inviteId로 초대장을 조회하도록 교체
export const MOCK_INVITATIONS: Record<string, Invitation> = {
  demo: {
    guestName: "은샘",
    partyName: "가을 생일파티",
    date: "2026-10-15T18:00:00+09:00",
    place: "학생회관 2층 라운지",
  },
};
