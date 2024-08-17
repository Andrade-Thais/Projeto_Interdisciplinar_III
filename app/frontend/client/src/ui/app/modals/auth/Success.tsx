import { Button, Modal } from "flowbite-react";

export default function Success({
  modal,
  setModal,
  handleCloseModal,
  message,
}) {
  return (
    <>
      <Modal
        show={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
      >
        <Modal.Header>Sucesso</Modal.Header>
        <Modal.Body>
          <p>{modal.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} className="bg-success">
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
