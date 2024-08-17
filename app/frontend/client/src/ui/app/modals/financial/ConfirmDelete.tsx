import { Button, Modal } from "flowbite-react";
import { deleteData } from "../../../../services/FinancialDataService";

export default function ConfirmDeleteModal({
  modal,
  setModal,
  handleCloseModal,
    handleDelete,
    id,
}) {
  return (
    <>
      <Modal
        show={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
      >
        <Modal.Header>Confirmar Exclusão</Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir esta finança?</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={()=> {deleteData(id); alert("Finança excluída com sucesso!"); window.location.reload()}} className="bg-red-600">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
