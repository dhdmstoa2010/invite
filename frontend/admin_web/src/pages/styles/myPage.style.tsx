import styled from "@emotion/styled";

export const Content = styled.main`
  padding: 32px 36px 60px;
  @media (max-width: 640px) {
    padding: 20px 16px 40px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #14142b;
`;

export const Count = styled.span`
  margin-left: 4px;
  font-weight: 700;
  color: #6b7090;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const LogoutButton = styled.button`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 700;
  color: #4b5060;
  background: #fff;
  border: 1px solid #d5d8e6;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #eeeff5;
  }
`;

export const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: #4150dc;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Info = styled.div`
  min-width: 0;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

export const PartyName = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: #14142b;
`;

export const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  color: ${({ active }) => (active ? "#3f4bd6" : "#4b5060")};
  background: ${({ active }) => (active ? "#eeeffd" : "#eeeff5")};

  &::before {
    content: ${({ active }) => (active ? "''" : "none")};
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4150dc;
  }
`;

export const Meta = styled.p`
  margin: 0 0 8px;
  font-size: 14px;
  color: #4b5060;
`;

export const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Stat = styled.span<{ tone: "yes" | "no" | "none" }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ tone }) =>
    tone === "yes" ? "#2f7d4a" : tone === "no" ? "#c9414a" : "#4b5060"};
`;

export const BoardButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
  color: #14142b;
  background: #fff;
  border: 1px solid #d5d8e6;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #f4f5fa;
  }
`;

export const Empty = styled.p`
  margin: 0;
  padding: 48px 0;
  font-size: 15px;
  text-align: center;
  color: #6b7090;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 16px;
`;
