import { Button, Modal } from 'flowbite-react'
import NewFolderForm from '../../../../forms/Galleries/components/NewFolderForm/NewFolderForm';

export default function NewFolderModal({
    modal,
    setModal,
  handleCloseModal,
    galleryId,
    
}) {
  return (
    <Modal show={modal.isOpen}>
      <Modal.Header>
        <h4 className="text-3xl font-bold text-center mb-9 text-success">
          {" "}
          Nova Pasta
        </h4>
      </Modal.Header>
      <Modal.Body>
        <NewFolderForm galleryId={galleryId} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal} className="bg-success">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
