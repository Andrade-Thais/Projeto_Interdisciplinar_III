import { Modal } from "flowbite-react";

const formatDate = (dateTime) => {
    if (dateTime === null) return "N/A";
    return dateTime.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}
export const createAppointment = (dateSelected) => {
    const startDateTime = new Date(dateSelected.startStr);
    const endDateTime = new Date(dateSelected.endStr);
    
    alert(`Data selecionada: ${formatDate(startDateTime)} - ${formatDate(endDateTime)}`);

     return {startDateTime, endDateTime};

}