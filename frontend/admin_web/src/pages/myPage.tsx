import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date";
import { listEvents, countByStatus } from "../api/events";
import {
  Content,
  TopBar,
  Heading,
  Count,
  Actions,
  LogoutButton,
  CreateButton,
  List,
  Item,
  Info,
  TitleRow,
  PartyName,
  StatusBadge,
  Meta,
  Stats,
  Stat,
  BoardButton,
  Empty,
} from "./styles/myPage.style";

interface MyInvitation {
  id: string;
  partyName: string;
  date: string;
  place: string;
  status: "active" | "closed";
  attend: number;
  decline: number;
  pending: number;
}

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export default function MyPage() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<MyInvitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    listEvents()
      .then((events) => {
        setInvitations(
          events.map((event) => ({
            id: event.id,
            partyName: event.partyName,
            date: event.date,
            place: event.place,
            status: event.date >= today ? "active" : "closed",
            ...countByStatus(event.guests),
          })),
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => navigate("/");

  return (
    <Content>
      <TopBar>
        <Heading>
          내가 만든 초대장<Count>{invitations.length}개</Count>
        </Heading>
        <Actions>
          <LogoutButton type="button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
          <CreateButton
            type="button"
            onClick={() => navigate("/invitations/new")}
          >
            <svg {...iconProps} width={16} height={16}>
              <path d="M12 5v14M5 12h14" />
            </svg>
            새 초대장 만들기
          </CreateButton>
        </Actions>
      </TopBar>

      {loading ? (
        <Empty>불러오는 중...</Empty>
      ) : invitations.length === 0 ? (
        <Empty>아직 만든 초대장이 없어요.</Empty>
      ) : (
        <List>
          {invitations.map((invitation) => (
            <Item key={invitation.id}>
              <Info>
                <TitleRow>
                  <PartyName>{invitation.partyName}</PartyName>
                  <StatusBadge active={invitation.status === "active"}>
                    {invitation.status === "active" ? "진행중" : "종료"}
                  </StatusBadge>
                </TitleRow>
                <Meta>
                  {formatDate(invitation.date)} · {invitation.place}
                </Meta>
                <Stats>
                  <Stat tone="yes">
                    <svg {...iconProps}>
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    참석 {invitation.attend}
                  </Stat>
                  <Stat tone="no">
                    <svg {...iconProps}>
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    불참 {invitation.decline}
                  </Stat>
                  <Stat tone="none">
                    <svg {...iconProps}>
                      <path d="M6 12h12" />
                    </svg>
                    무응답 {invitation.pending}
                  </Stat>
                </Stats>
              </Info>
              <BoardButton
                type="button"
                onClick={() => navigate(`/invitations/${invitation.id}/board`)}
              >
                현황판 보기
                <svg {...iconProps}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </BoardButton>
            </Item>
          ))}
        </List>
      )}
    </Content>
  );
}
