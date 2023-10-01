import { useState } from "react"
import Button from "../Button/Button"
import { Modal } from "../Modal/Modal"
import { ModalTitle } from "../Modal/ModalTitle"
import { ModalBody } from "../Modal/ModalBody"

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
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModalTitle>Test</ModalTitle>
          <ModalBody>Test body</ModalBody>
        </Modal>
      )}
    </>
  )
}
