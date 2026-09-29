import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Field } from "./loginPage.style";

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 36px 60px;

  @media (max-width: 640px) {
    padding: 20px 16px 40px;
  }
`;

export const BackButton = styled.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  font-size: 15px;
  color: #4b5060;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const cardStyle = css`
  padding: 26px 28px 28px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 22px;

  @media (max-width: 640px) {
    padding: 20px 16px 22px;
  }
`;

export const Card = styled.section`
  ${cardStyle}
`;

export const AddCard = styled.form`
  ${cardStyle}
`;

export const CardTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 18px;
  font-weight: 800;
  color: #14142b;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1.6fr 1.4fr 1.1fr;
  gap: 16px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldBox = styled(Field)`
  margin: 0;
`;

export const SelectRow = styled.div`
  display: flex;
  gap: 8px;

  select {
    min-width: 0;
    padding-inline: 10px;
    cursor: pointer;
  }
`;

export const QrCard = styled.section`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 22px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 16px 22px;
  }
`;

export const QrBox = styled.div`
  flex-shrink: 0;
  align-self: center;
  padding: 14px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 16px;
  line-height: 0;
`;

export const QrInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const QrTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 800;
  color: #14142b;
`;

export const QrDesc = styled.p`
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7090;
`;

export const LinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const LinkText = styled.span`
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  overflow: hidden;
  font-size: 14px;
  color: #4b5060;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #f7f8fc;
  border: 1px solid #e3e5ee;
  border-radius: 12px;
`;

export const AddRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const PrimaryButton = styled.button`
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  background: #4150dc;
  border: 1px solid #4150dc;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Hint = styled.p`
  margin: 14px 0 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #8c90a3;
`;

export const BulkTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 12px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  color: #14142b;
  background: #fff;
  border: 1px solid #d5d8e6;
  border-radius: 12px;
  outline: none;
  resize: vertical;
  transition: border-color 0.15s;

  &::placeholder {
    color: #8c90a3;
  }

  &:focus {
    border-color: #3f4bd6;
  }
`;

export const BulkActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const OutlineButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
  color: #14142b;
  background: #fff;
  border: 1px solid #d5d8e6;
  border-radius: 12px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #f4f5fa;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Notice = styled.p<{ tone: "info" | "error" }>`
  margin: 12px 0 0;
  font-size: 13px;
  font-weight: 600;
  color: ${({ tone }) => (tone === "error" ? "#b3262d" : "#3f4bd6")};
`;

export const ListCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 28px;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const ListTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #14142b;
`;

export const ListCount = styled.span`
  margin-left: 4px;
  color: #6b7090;
`;

export const TableWrap = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-size: 15px;
  color: #14142b;

  th,
  td {
    padding: 0 28px;
    text-align: left;
    white-space: nowrap;
  }

  thead tr {
    background: #f7f8fc;
    border-top: 1px solid #e3e5ee;
    border-bottom: 1px solid #e3e5ee;
  }

  th {
    height: 48px;
    font-size: 14px;
    font-weight: 700;
    color: #6b7090;
  }

  tbody tr + tr {
    border-top: 1px solid #eceef5;
  }

  td {
    height: 68px;
  }

`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #2f7d4a;
  background: #e6f4ea;
  border-radius: 999px;
`;

export const EmptyRow = styled.p`
  margin: 0;
  padding: 40px 16px;
  font-size: 15px;
  text-align: center;
  color: #6b7090;
  border-top: 1px solid #e3e5ee;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const CancelButton = styled(OutlineButton)`
  min-width: 120px;
  padding: 15px 24px;
  font-size: 16px;
`;

export const SaveButton = styled(PrimaryButton)`
  min-width: 160px;
  padding: 15px 24px;
  font-size: 16px;
`;
