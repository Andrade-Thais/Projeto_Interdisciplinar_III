import { Button, Modal } from "flowbite-react";

export default function ConfirmDelete({
  modal,
  setModal,
    handleCloseModal,
  handleConfirmDelete,
}) {

  return (
    <>
      <Modal
        show={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
      >
        <Modal.Header>Confirmar ação</Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir este evento?</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={() => { handleConfirmDelete(modal.id) }} className="bg-error">Confirmar exclusão</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
