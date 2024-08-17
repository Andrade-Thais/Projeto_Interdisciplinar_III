import { Button, Modal } from "flowbite-react";

export default function ConfirmDeleteModal({
  modal,
  setModal,
  handleCloseModal,
  handleConfirmAction,
}) {
  return (
    <>
      <Modal
        show={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
      >
        <Modal.Header>Deseja proceder?</Modal.Header>
        <Modal.Body>
          <p>{modal.message}</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={handleCloseModal} className="bg-success">
            Cancelar
          </Button>
          <Button onClick={handleConfirmAction} className="bg-red-400">
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
