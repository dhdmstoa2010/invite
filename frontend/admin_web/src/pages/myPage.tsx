import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { loadInvitations } from "../storage/invitations";
import { formatDate } from "../utils/date";
import { MOCK_INVITATIONS, countByStatus } from "../mocks/invitations";
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
  const invitations = useMemo<MyInvitation[]>(() => {
    const today = new Date().toISOString().slice(0, 10);
    const saved = loadInvitations().map<MyInvitation>((invitation) => ({
      id: invitation.id,
      partyName: invitation.partyName,
      date: invitation.date,
      place: invitation.place,
      status: invitation.date >= today ? "active" : "closed",
      attend: 0,
      decline: 0,
      pending: invitation.guests.length,
    }));
    const mocks = MOCK_INVITATIONS.map<MyInvitation>((invitation) => ({
      id: invitation.id,
      partyName: invitation.partyName,
      date: invitation.date,
      place: invitation.place,
      status: invitation.date >= today ? "active" : "closed",
      ...countByStatus(invitation.guests),
    }));
    return [...saved, ...mocks];
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

      {invitations.length === 0 ? (
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
