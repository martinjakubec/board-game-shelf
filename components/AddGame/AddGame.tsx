import { useState } from "react"
import Button from "../Button/Button"
import { AddGameModal } from "../AddGameModal/AddGameModal"

export function AddGame() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        text="Add a new game"
        type="button"
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      {isModalOpen && (
        <AddGameModal
          onClose={() => {
            setIsModalOpen(false)
          }}
        />
      )}
    </>
  )
}
