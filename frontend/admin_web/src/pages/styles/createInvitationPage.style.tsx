import styled from "@emotion/styled";
import { Input } from "./loginPage.style";

export const Content = styled.main`
  padding: 32px 36px 60px;
  @media (max-width: 640px) {
    padding: 20px 16px 40px;
  }
`;

export const Narrow = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
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

export const Card = styled.form`
  padding: 28px 28px 24px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 20px;

  @media (max-width: 640px) {
    padding: 22px 18px 20px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 800;
  color: #14142b;
`;

export const Description = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7090;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 8px;
`;

export const SectionTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #14142b;
`;

export const AddGuestButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 700;
  color: #3f4bd6;
  background: #eeeffd;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const GuestList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
`;

export const GuestRow = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  gap: 8px;
`;

export const GuestInput = styled(Input)`
  padding: 11px 14px;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7090;
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

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const CancelButton = styled(BaseButton)`
  color: #14142b;
  background: #fff;
  border: 1px solid #d5d8e6;
`;

export const SubmitButton = styled(BaseButton)`
  color: #fff;
  background: #3f4bd6;
  border: 1px solid #3f4bd6;
`;
