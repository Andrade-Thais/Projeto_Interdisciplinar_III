import { useState } from "react";
import { Button, Modal } from "flowbite-react";

export const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(null);

  const handleDelete = (id) => {
    setId(id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const DeleteModal = () => (
    <Modal show={isOpen} onClose={handleClose}>
      <Modal.Header>Excluir Cliente</Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir este cliente?</p>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button className="bg-primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button className="bg-danger" onClick={() => {
          fetch(`http://localhost:8000/app/excluir-cliente/${id}`, {
            method: "DELETE",
          }).then(() => {
            alert("Cliente excluído com sucesso!")
            window.location.reload()
          })
        }}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return { DeleteModal, handleDelete };
};