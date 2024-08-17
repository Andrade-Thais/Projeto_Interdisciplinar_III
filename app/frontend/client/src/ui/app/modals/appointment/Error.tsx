import { Button, Modal } from "flowbite-react";

export default function ErrorModal({
  modal,
  setModal,
  handleCloseModal,
  message,
}) {
  const errorMessage = message;

  return (
    <>
      <Modal
        show={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
      >
        <Modal.Header>Erro</Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
