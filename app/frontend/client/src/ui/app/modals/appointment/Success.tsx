import { Button, Modal } from "flowbite-react";

export default function SuccessModal({
  modal,
  setModal,
  handleCloseModal,
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
          <Button onClick={handleCloseModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
