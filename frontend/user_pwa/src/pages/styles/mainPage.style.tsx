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
  padding: 40px 24px 24px;
  box-sizing: border-box;
  background: #f8f9fc;
`

export const Content = styled.div`
  flex: 1;
`

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #14142b;
`

export const Subtitle = styled.p`
  margin: 0 0 32px;
  font-size: 15px;
  line-height: 1.6;
  color: #6b7280;
`

export const Field = styled.div`
  margin-bottom: 20px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #14142b;
`

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  color: #14142b;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s;

  &::placeholder {
    color: #b0b3bd;
  }

  &:focus {
    border-color: #3730a3;
  }
`

export const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 4px 0 24px;
  padding: 12px 14px;
  background: #fdecec;
  border-radius: 10px;
  color: #dc4c58;
  font-size: 13px;
  line-height: 1.6;
`

export const ErrorIcon = styled.span`
  flex-shrink: 0;
  margin-top: 1px;
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: #33348e;
  color: #fff;
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

export const AdminLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 700;
  color: #3730a3;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`

export const FooterLink = styled.a`
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
