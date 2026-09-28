import styled from "@emotion/styled";

import { Table } from "./createInvitationPage.style";

export {
  Content,
  BackButton,
  Card,
  TableWrap,
  EmptyRow,
} from "./createInvitationPage.style";

export const BoardTable = styled(Table)`
  table-layout: fixed;
  min-width: 720px;

  th:nth-of-type(1) {
    width: 18%;
  }
  th:nth-of-type(2) {
    width: 27%;
  }
  th:nth-of-type(3) {
    width: 25%;
    padding-left: 40px;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #14142b;
`;

export const Meta = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4b5060;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

type Tone = "attend" | "decline" | "pending";

const toneColor = {
  attend: { fg: "#2f7d4a", bg: "#e6f4ea" },
  decline: { fg: "#c9414a", bg: "#fbe8e9" },
  pending: { fg: "#4b5060", bg: "#eeeff5" },
};

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 28px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 22px;
`;

export const StatIcon = styled.span<{ tone: Tone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  color: ${({ tone }) => toneColor[tone].fg};
  background: ${({ tone }) => toneColor[tone].bg};
  border-radius: 50%;
`;

export const StatNumber = styled.strong`
  display: block;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
  color: #14142b;
`;

export const StatLabel = styled.span<{ tone: Tone }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ tone }) => toneColor[tone].fg};
`;

export const TableCard = styled.section`
  overflow: hidden;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 22px;
`;

export const StatusPill = styled.span<{ tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ tone }) => toneColor[tone].fg};
  background: ${({ tone }) => toneColor[tone].bg};
  border-radius: 999px;
`;

export const RespondedAt = styled.span`
  color: #6b7090;
`;
