import React from "react"

export function ModalTitle({ children }: React.PropsWithChildren) {
  return (
    <div className="p-2 w-full bg-lime-500 text-center font-bold text-white">
      <h2 className="text-2xl">{children}</h2>
    </div>
  )
}
