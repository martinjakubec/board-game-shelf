import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from "react"
type ButtonType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface ButtonProps {
  type?: "submit" | "button"
  text: string
  onClick?: (e: MouseEvent) => any
}

export default function Button({
  type = "button",
  text,
  onClick,
}: ButtonProps) {
  return (
    <button
      className="bg-lime-300 px-4 rounded-md min-w-20 h-10 border-2 focus:outline-none focus:border-lime-500 border-lime-300"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}
