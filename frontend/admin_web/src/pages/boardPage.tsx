import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { getEvent, countByStatus, type ApiGuest, type RsvpStatus } from "../api/events";
import { formatDate } from "../utils/date";
import {
  Content,
  BackButton,
  Summary,
  Title,
  Meta,
  StatGrid,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  TableCard,
  TableWrap,
  BoardTable,
  StatusPill,
  RespondedAt,
  EmptyRow,
} from "./styles/boardPage.style";
import {
  QrCard,
  QrBox,
  QrInfo,
  QrTitle,
  QrDesc,
  LinkRow,
  LinkText,
  OutlineButton,
} from "./styles/createInvitationPage.style";

const USER_URL = import.meta.env.VITE_USER_URL ?? "http://localhost:5173";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ICON_PATH: Record<RsvpStatus, string> = {
  attend: "M5 12.5l4.5 4.5L19 7.5",
  decline: "M6 6l12 12M18 6L6 18",
  pending: "M6 12h12",
};

const LABEL: Record<RsvpStatus, string> = {
  attend: "참석",
  decline: "불참",
  pending: "무응답",
};

const STATUSES: RsvpStatus[] = ["attend", "decline", "pending"];

export default function BoardPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [board, setBoard] = useState<{
    id: string;
    partyName: string;
    date: string;
    place: string;
    guests: ApiGuest[];
  } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getEvent(id).then((event) => {
      if (!event) {
        setNotFound(true);
        return;
      }
      setBoard(event);
    });
  }, [id]);

  if (notFound) return <Navigate to="/my" replace />;
  if (!board) return null;

  const counts = countByStatus(board.guests);
  const inviteUrl = `${USER_URL}/e/${board.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Content>
      <BackButton type="button" onClick={() => navigate("/my")}>
        <svg width={16} height={16} {...iconProps}>
          <path d="M15 5l-7 7 7 7" />
        </svg>
        내 초대장
      </BackButton>

      <Summary>
        <Title>{board.partyName}</Title>
        <Meta>
          {formatDate(board.date)} · {board.place}
        </Meta>
      </Summary>

      <QrCard>
        <QrBox>
          <QRCodeSVG value={inviteUrl} size={132} marginSize={0} />
        </QrBox>
        <QrInfo>
          <QrTitle>참가자 입장 QR</QrTitle>
          <QrDesc>
            참가자들이 이 QR을 찍으면 학번과 이름을 입력하는 페이지로 이동해요.
          </QrDesc>
          <LinkRow>
            <LinkText>{inviteUrl}</LinkText>
            <OutlineButton type="button" onClick={handleCopyLink}>
              <svg width={16} height={16} {...iconProps}>
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V6a2 2 0 012-2h9" />
              </svg>
              {copied ? "복사됐어요" : "링크 복사"}
            </OutlineButton>
          </LinkRow>
        </QrInfo>
      </QrCard>

      <StatGrid>
        {STATUSES.map((status) => (
          <StatCard key={status}>
            <StatIcon tone={status}>
              <svg width={26} height={26} {...iconProps}>
                <path d={ICON_PATH[status]} />
              </svg>
            </StatIcon>
            <div>
              <StatNumber>{counts[status]}</StatNumber>
              <StatLabel tone={status}>{LABEL[status]}</StatLabel>
            </div>
          </StatCard>
        ))}
      </StatGrid>

      <TableCard>
        {board.guests.length === 0 ? (
          <EmptyRow>등록된 명단이 없어요.</EmptyRow>
        ) : (
          <TableWrap>
            <BoardTable>
              <thead>
                <tr>
                  <th>학번</th>
                  <th>이름</th>
                  <th>상태</th>
                  <th>응답 일시</th>
                </tr>
              </thead>
              <tbody>
                {board.guests.map((guest) => (
                  <tr key={guest.studentId}>
                    <td>{guest.studentId}</td>
                    <td>{guest.name}</td>
                    <td>
                      <StatusPill tone={guest.status}>
                        <svg width={14} height={14} {...iconProps}>
                          <path d={ICON_PATH[guest.status]} />
                        </svg>
                        {LABEL[guest.status]}
                      </StatusPill>
                    </td>
                    <td>
                      <RespondedAt>{guest.respondedAt ?? "-"}</RespondedAt>
                    </td>
                  </tr>
                ))}
              </tbody>
            </BoardTable>
          </TableWrap>
        )}
      </TableCard>
    </Content>
  );
}
