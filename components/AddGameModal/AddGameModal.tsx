import { AddGameByLink } from "../AddGameByLink/AddGameByLink"
import { Modal } from "../Modal/Modal"
import { ModalBody } from "../Modal/ModalBody"
import { ModalTitle } from "../Modal/ModalTitle"

interface AddGameModalProps {
  onClose: () => void
  refetch: () => any
}

export function AddGameModal({ onClose, refetch }: AddGameModalProps) {
  return (
    <Modal onClose={onClose}>
      <ModalTitle>Add a new game</ModalTitle>
      <ModalBody>
        <AddGameByLink refetch={refetch} />
      </ModalBody>
    </Modal>
  )
}
