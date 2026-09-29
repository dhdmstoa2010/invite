import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AttendCompletePage from "./attendCompletePage";
import type { Invitation } from "./userInvitePage";
import { lookupGuest } from "../api/events";
import { loadGuestIdentity } from "../utils/guestSession";

export default function AttendCompleteRoute() {
  const { inviteId = "" } = useParams();
  const navigate = useNavigate();
  const identity = loadGuestIdentity(inviteId);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!identity) {
      setNotFound(true);
      return;
    }
    lookupGuest(inviteId, identity.studentId, identity.name)
      .then((result) =>
        setInvitation({
          guestName: result.guestName,
          partyName: result.partyName,
          date: result.date,
          place: result.place,
        }),
      )
      .catch(() => setNotFound(true));
  }, [inviteId, identity]);

  if (notFound) return <Navigate to="/" replace />;
  if (!invitation) return null;

  return (
    <AttendCompletePage
      invitation={invitation}
      onHome={() => navigate("/")}
      onChangeResponse={() => navigate(`/invite/${inviteId}`)}
    />
  );
}
