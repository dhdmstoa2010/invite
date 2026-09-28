import { Navigate, useNavigate, useParams } from "react-router-dom";
import UserInvitePage, { type Invitation } from "./userInvitePage";

// TODO: 어드민 API 연동 시 inviteId로 초대장을 조회하도록 교체
const MOCK_INVITATIONS: Record<string, Invitation> = {
  demo: {
    guestName: "은샘",
    partyName: "생일파티",
    date: "2026-10-15T18:00:00+09:00",
    place: "학생회관 2층 라운지",
  },
};

export default function InviteRoute() {
  const { inviteId = "" } = useParams();
  const navigate = useNavigate();
  const invitation = MOCK_INVITATIONS[inviteId];

  if (!invitation) return <Navigate to="/" replace />;

  return (
    <UserInvitePage invitation={invitation} onBack={() => navigate("/")} />
  );
}
