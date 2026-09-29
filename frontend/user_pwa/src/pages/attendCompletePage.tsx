import {
  Page,
  Container,
  Content,
  BackspaceButton,
  Body,
  CheckCircle,
  Title,
  Subtitle,
  InfoCard,
  InfoRow,
  ChangeLink,
  ActionBar,
  HomeButton,
} from "./styles/attendCompletePage.style";
import type { Invitation } from "./userInvitePage";
import { formatDate } from "../utils/date";

interface AttendCompletePageProps {
  invitation: Invitation;
  onHome?: () => void;
  onChangeResponse?: () => void;
}

export default function AttendCompletePage({
  invitation,
  onHome,
  onChangeResponse,
}: AttendCompletePageProps) {
  const { partyName, date, place } = invitation;

  return (
    <Page>
      <Container>
        <Content>
          <BackspaceButton type="button" onClick={onHome}>
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

          <Body>
            <CheckCircle>
              <svg
                width="40"
                height="40"
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
            </CheckCircle>

            <Title>참석 의사를 전달했어요!</Title>
            <Subtitle>{partyName}에서 만나요.</Subtitle>

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

            <ChangeLink type="button" onClick={onChangeResponse}>
              응답을 바꾸고 싶다면 초대장으로
            </ChangeLink>
          </Body>
        </Content>

        <ActionBar>
          <HomeButton type="button" onClick={onHome}>
            메인으로 돌아가기
          </HomeButton>
        </ActionBar>
      </Container>
    </Page>
  );
}
