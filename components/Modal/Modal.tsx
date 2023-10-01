/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react"

interface ModalProps extends React.PropsWithChildren {
  onClose: () => any
}

export function Modal({ children, onClose }: ModalProps) {
  const hideModal = (e: KeyboardEvent | null) => {
    if (e && e.type == "keydown" && (e as KeyboardEvent).code == "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", hideModal)

    return () => {
      document.removeEventListener("keydown", hideModal)
    }
  }, [])

  return (
    <div
      className={
        "fixed h-screen w-screen bg-slate-500 bg-opacity-70 z-10 top-0 left-0"
      }
      onClick={onClose}
    >
      <div
        className="fixed rounded-lg bg-slate-100 max-w-[500px] w-full  left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 overflow-hidden"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
}
