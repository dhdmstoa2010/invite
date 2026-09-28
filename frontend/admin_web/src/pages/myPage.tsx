import { useNavigate } from "react-router-dom";
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

const MOCK_INVITATIONS: MyInvitation[] = [
  {
    id: "1",
    partyName: "가을 생일파티",
    date: "2026-10-15",
    place: "학생회관 2층 라운지",
    status: "active",
    attend: 12,
    decline: 3,
    pending: 8,
  },
  {
    id: "2",
    partyName: "여름 동아리 정기모임",
    date: "2026-07-02",
    place: "동아리방 3",
    status: "closed",
    attend: 9,
    decline: 1,
    pending: 0,
  },
  {
    id: "3",
    partyName: "새 학기 환영회",
    date: "2026-03-05",
    place: "시청각실",
    status: "closed",
    attend: 18,
    decline: 2,
    pending: 1,
  },
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return ymd;

  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}.${mm}.${dd} (${WEEKDAYS[date.getDay()]})`;
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
  const invitations = MOCK_INVITATIONS;

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
              <BoardButton type="button">
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
