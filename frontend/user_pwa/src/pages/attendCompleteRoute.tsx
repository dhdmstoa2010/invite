import { Navigate, useNavigate, useParams } from "react-router-dom";
import AttendCompletePage from "./attendCompletePage";
import { MOCK_INVITATIONS } from "../mocks/invitations";

export default function AttendCompleteRoute() {
  const { inviteId = "" } = useParams();
  const navigate = useNavigate();
  const invitation = MOCK_INVITATIONS[inviteId];

  if (!invitation) return <Navigate to="/" replace />;

  return (
    <AttendCompletePage
      invitation={invitation}
      onHome={() => navigate("/")}
      onChangeResponse={() => navigate(`/invite/${inviteId}`)}
    />
  );
}
