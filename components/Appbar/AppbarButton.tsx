import React from "react"

type AppbarButtonProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => any
  text: string
  className?: string
}

export default function AppbarButton({
  onClick,
  text,
  className,
}: AppbarButtonProps) {
  return (
    <div
      onClick={onClick}
      className={
        "block text-2xl bg-transparent px-3 text-lime-50 hover:text-lime-800 font-bold rounded-md first:pl-0 last:pr-0 cursor-pointer" +
        (className ? " " + className : "")
      }
    >
      {text}
    </div>
  )
}
