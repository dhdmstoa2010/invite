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
  display: flex;
  flex-direction: column;
  padding: 24px 24px 32px;
`

export const BackspaceButton = styled.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: none;
  font-size: 15px;
  color: #4b5060;
  cursor: pointer;
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
  text-align: center;
`

export const CheckCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  margin-bottom: 32px;
  border-radius: 50%;
  background: #e8f5ec;
  color: #3d8b50;
`

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #14142b;
`

export const Subtitle = styled.p`
  margin: 0 0 28px;
  font-size: 16px;
  color: #6b7280;
`

export const InfoCard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0 0 24px;
  padding: 20px;
  list-style: none;
  text-align: left;
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

export const ChangeLink = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 700;
  color: #4150dc;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const ActionBar = styled.div`
  padding: 16px 24px calc(16px + env(safe-area-inset-bottom));
  background: #f4f5fa;
`

export const HomeButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 14px;
  background: #4150dc;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
`
