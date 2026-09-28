import styled from '@emotion/styled'

export const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: #e9eaf2;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  min-height: 100dvh;
  background: #f4f5fa;
`

export const Content = styled.div`
  flex: 1;
  padding: 24px 24px 32px;
`

export const BackspaceButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
  padding: 0;
  border: none;
  background: none;
  font-size: 15px;
  color: #4b5060;
  cursor: pointer;
`

export const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: #14142b;
`

export const InfoCard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 0 16px;
  padding: 20px;
  list-style: none;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 16px;
`

export const InfoRow = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #14142b;

  svg {
    flex-shrink: 0;
    color: #4150dc;
  }
`

export const MessageBox = styled.p`
  margin: 0;
  padding: 20px;
  font-size: 15px;
  line-height: 1.7;
  color: #2b2d42;
  background: #eeeff9;
  border: 1px solid #e3e5f2;
  border-radius: 16px;
  word-break: keep-all;
  white-space: pre-line;
`

export const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px calc(16px + env(safe-area-inset-bottom));
  border-top: 1px solid #e3e5ee;
  background: #f4f5fa;
`

const BaseButton = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 8px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const AttendButton = styled(BaseButton)`
  border: 1px solid #4150dc;
  background: #4150dc;
  color: #fff;
`

export const DeclineButton = styled(BaseButton)`
  border: 1px solid #cdd0e0;
  background: #fff;
  color: #14142b;
`
