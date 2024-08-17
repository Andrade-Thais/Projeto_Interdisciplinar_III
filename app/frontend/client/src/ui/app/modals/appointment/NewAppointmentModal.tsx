import { Button, Modal } from "flowbite-react";
import { NewAppointmentForm } from "../../forms/Appointments/NewApointment/pages/NewApointment";

export default function NewAppointmentModal({
    modal,
    setModal,
    handleCloseModal,
    selectedDate
}) {
    return (
        <>
            <Modal
                show={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
            >
                <Modal.Header>Novo Compromisso</Modal.Header>
                <Modal.Body>
                    <p className="text-center">Preencha o formulário abaixo para completar a criação de um novo evento!</p>
                    <NewAppointmentForm dateSelected={selectedDate} />
                </Modal.Body>
                <Modal.Footer className="flex justify-between">
                    <Button onClick={handleCloseModal} className="bg-secondary">Cancelar</Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}