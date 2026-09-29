import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import UserInvitePage, { type Invitation } from "./userInvitePage";
import { lookupGuest, submitRsvp } from "../api/events";
import { loadGuestIdentity } from "../utils/guestSession";

export default function InviteRoute() {
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

  if (notFound) return <Navigate to={`/e/${inviteId}`} replace />;
  if (!invitation) return null;

  const handleAttend = async () => {
    if (!identity) return;
    await submitRsvp(inviteId, identity.studentId, identity.name, "attend");
    navigate(`/invite/${inviteId}/attended`);
  };

  const handleDecline = async () => {
    if (!identity) return;
    await submitRsvp(inviteId, identity.studentId, identity.name, "decline");
    navigate("/");
  };

  return (
    <UserInvitePage
      invitation={invitation}
      onBack={() => navigate("/")}
      onAttend={handleAttend}
      onDecline={handleDecline}
    />
  );
}
