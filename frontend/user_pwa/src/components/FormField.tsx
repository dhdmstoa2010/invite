import type { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { Field, Label, Input } from '../pages/styles/mainPage.style'

interface FormFieldProps {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type?: HTMLInputTypeAttribute
  placeholder?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  inputMode,
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
        inputMode={inputMode}
      />
    </Field>
  )
}
