import type { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { Field, Label, Input } from '../pages/styles/loginPage.style'

interface FormFieldProps {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type?: HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  invalid?: boolean
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  invalid,
}: FormFieldProps) {
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
      />
    </Field>
  )
}
