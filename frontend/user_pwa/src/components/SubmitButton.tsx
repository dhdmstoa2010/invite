import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { SubmitButton as StyledSubmitButton } from '../pages/styles/mainPage.style'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function SubmitButton({ children, ...rest }: SubmitButtonProps) {
  return (
    <StyledSubmitButton type="submit" {...rest}>
      {children}
    </StyledSubmitButton>
  )
}
