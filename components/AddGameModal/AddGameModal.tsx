import { AddGameByLink } from "../AddGameByLink/AddGameByLink"
import { Modal } from "../Modal/Modal"
import { ModalBody } from "../Modal/ModalBody"
import { ModalTitle } from "../Modal/ModalTitle"

interface AddGameModalProps {
  onClose: () => void
}

export function AddGameModal({ onClose }: AddGameModalProps) {
  return (
    <Modal onClose={onClose}>
      <ModalTitle>Add a new game</ModalTitle>
      <ModalBody>
        <AddGameByLink />
      </ModalBody>
    </Modal>
  )
}
