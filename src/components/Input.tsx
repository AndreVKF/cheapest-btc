import { ChangeEventHandler, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  className?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

function Input({ value, onChange, className = '', ...props }: InputProps) {
  return (
    <input
      type="text"
      className={`border rounded-md border-white/10 bg-blue-950 p-2 ${className}`}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

export default Input
