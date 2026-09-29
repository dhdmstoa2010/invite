import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background: #f3f4fa;
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 368px;
`

export const BackLink = styled.a`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: #4b5060;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Card = styled.form`
  padding: 34px 32px 32px;
  background: #fff;
  border: 1px solid #e3e5ee;
  border-radius: 24px;
`

export const IconBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 8px;
  color: #3f4bd6;
  background: #eeeffd;
  border-radius: 12px;
`

export const Description = styled.p`
  margin: 0 0 22px;
  font-size: 15px;
  line-height: 1.5;
  color: #4b5060;
`

export const Field = styled.div`
  margin-bottom: 16px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #14142b;
`

const fieldStyle = css`
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  color: #14142b;
  background: #fff;
  border: 1px solid #d5d8e6;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s;

  &::placeholder {
    color: #8c90a3;
  }

  &:focus {
    border-color: #3f4bd6;
  }

  &[aria-invalid='true'] {
    border-color: #d9686f;
  }
`

export const Input = styled.input`
  ${fieldStyle}
`

export const Select = styled.select`
  ${fieldStyle}
  appearance: none;
  padding-right: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7090' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
`

export const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 4px 0 16px;
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #b3262d;
  background: #f9e8e8;
  border-radius: 10px;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: #3f4bd6;
  border: none;
  border-radius: 12px;
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

export const HelpText = styled.p`
  margin: 20px 0 0;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
  color: #6b7090;
  word-break: keep-all;
`
