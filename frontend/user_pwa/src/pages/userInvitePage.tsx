import {
  Page,
  Container,
  Content,
  BackspaceButton,
  Title,
  InfoCard,
  InfoRow,
  ActionBar,
  AttendButton,
  DeclineButton,
} from "./styles/userInvitePage.style";

export interface Invitation {
  /** 초대받는 사람 이름 (어드민 설정) */
  guestName: string;
  /** 파티/모임 이름 (어드민 설정) */
  partyName: string;
  /** ISO 8601 일시, 예: 2026-10-15T18:00:00+09:00 */
  date: string;
  place: string;
  message?: string;
}

interface UserInvitePageProps {
  invitation: Invitation;
  onBack?: () => void;
  onAttend?: () => void;
  onDecline?: () => void;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? "오전" : "오후";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const time = minutes === 0 ? `${hour12}시` : `${hour12}시 ${minutes}분`;

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}.${m}.${d} (${WEEKDAYS[date.getDay()]}) ${period} ${time}`;
}

export default function UserInvitePage({
  invitation,
  onBack,
  onAttend,
  onDecline,
}: UserInvitePageProps) {
  const { guestName, partyName, date, place, message } = invitation;

  return (
    <Page>
      <Container>
        <Content>
          <BackspaceButton type="button" onClick={onBack}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
            메인으로
          </BackspaceButton>

          <Title>
            {guestName}님을 위한
            <br />
            {partyName}에 초대해요
          </Title>

          <InfoCard>
            <InfoRow>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4.5" width="18" height="16" rx="3" />
                <path d="M8 2.5v4M16 2.5v4M3 10h18" />
              </svg>
              {formatDate(date)}
            </InfoRow>
            <InfoRow>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21.5s7-6.2 7-11.5a7 7 0 10-14 0c0 5.3 7 11.5 7 11.5z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {place}
            </InfoRow>
          </InfoCard>
        </Content>

        <ActionBar>
          <AttendButton type="button" onClick={onAttend}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            참석할게요
          </AttendButton>
          <DeclineButton type="button" onClick={onDecline}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
            참석 어려워요
          </DeclineButton>
        </ActionBar>
      </Container>
    </Page>
  );
}
