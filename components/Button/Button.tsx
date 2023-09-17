import { MouseEvent } from "react"

interface ButtonProps {
  type?: "submit" | "button"
  variant?: "light" | "darker" | "danger"
  text: string
  onClick?: (e: MouseEvent) => any
}

export default function Button({
  type = "button",
  text,
  variant = "light",
  onClick,
}: ButtonProps) {
  let buttonColors
  switch (variant) {
    case "light":
      buttonColors =
        "bg-lime-300 border-lime-300 focus:border-lime-500 hover:border-lime-500"
      break
    case "darker":
      buttonColors =
        "bg-lime-500 border-lime-500 focus:border-lime-700 hover:border-lime-700"
      break
    case "danger":
      buttonColors =
        "bg-red-500 border-red-500 focus:border-red-700 hover:border-red-700"
      break
  }

  return (
    <button
      className={`px-4 rounded-md min-w-20 h-10 border-2 focus:outline-none ${buttonColors}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}
