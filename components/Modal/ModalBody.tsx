import React from "react"

export function ModalBody({ children }: React.PropsWithChildren) {
  return <div className="overflow-y-auto">{children}</div>
}
