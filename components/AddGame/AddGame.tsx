import { useState } from "react"
import Button from "../Button/Button"
import { AddGameModal } from "../AddGameModal/AddGameModal"

interface AddGameProps {
  refetch: () => any
}

export function AddGame({refetch}: AddGameProps) {
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
          refetch={refetch}
          onClose={() => {
            setIsModalOpen(false)
          }}
        />
      )}
    </>
  )
}
