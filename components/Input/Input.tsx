import { ChangeEvent, useState } from "react"

type CustomInputType = "text" | "password" | "number"

interface InputProps {
  label: string
  type: CustomInputType
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
  required?: boolean
  placeholder?: string
  className?: string
  withBorder?: boolean
  value: string | number
  id: string
  min?: number
  max?: number
}

export default function Input({
  label,
  required = false,
  type,
  className = "",
  placeholder,
  withBorder = false,
  onChange,
  value,
  id,
  min,
  max,
}: InputProps) {
  const borderSetupString =
    "border-2 focus:border-lime-500 border-lime-300 focus:outline-none"

  return (
    <div className="my-3 flex flex-col w-80">
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <input
        value={value}
        onChange={(e) => {
          onChange?.(e)
        }}
        placeholder={placeholder}
        id={id}
        type={type}
        min={type === "number" ? min : undefined}
        max={type === "number" ? max : undefined}
        required={required}
        className={`${className} w-80 px-4 rounded-md h-10 leading-10 md:leading-normal ${
          withBorder && borderSetupString
        }`}
      />
    </div>
  )
}
