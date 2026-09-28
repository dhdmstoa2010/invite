import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { loadInvitations } from "../storage/invitations";
import {
  MOCK_INVITATIONS,
  countByStatus,
  type GuestResponse,
  type ResponseStatus,
} from "../mocks/invitations";
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

interface Board {
  partyName: string;
  date: string;
  place: string;
  guests: GuestResponse[];
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ICON_PATH: Record<ResponseStatus, string> = {
  attend: "M5 12.5l4.5 4.5L19 7.5",
  decline: "M6 6l12 12M18 6L6 18",
  pending: "M6 12h12",
};

const LABEL: Record<ResponseStatus, string> = {
  attend: "참석",
  decline: "불참",
  pending: "무응답",
};

const STATUSES: ResponseStatus[] = ["attend", "decline", "pending"];

function findBoard(id: string): Board | null {
  const saved = loadInvitations().find((invitation) => invitation.id === id);
  if (saved) {
    return {
      partyName: saved.partyName,
      date: saved.date,
      place: saved.place,
      guests: saved.guests.map((guest) => ({
        studentId: guest.studentId,
        name: guest.name,
        status: "pending",
        respondedAt: null,
      })),
    };
  }
  return MOCK_INVITATIONS.find((invitation) => invitation.id === id) ?? null;
}

export default function BoardPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const board = useMemo(() => findBoard(id), [id]);

  if (!board) return <Navigate to="/my" replace />;

  const counts = countByStatus(board.guests);

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
