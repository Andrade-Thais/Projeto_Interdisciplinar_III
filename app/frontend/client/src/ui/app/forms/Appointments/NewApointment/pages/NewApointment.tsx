import { useState, useEffect } from "react";
import { Provider } from "../../../../../../contexts/forms/FormContext";
import {
  fetchData,
  sendData,
} from "../../../../../../services/AppointmentDataService";
import Success from "../../../../modals/appointment/Success";
import ErrorModal from "../../../../modals/appointment/Error";
import Form from "../components/Form";
import UserNavbar from "../../../../components/UserNavbar";
import Footer from "../../../../../portfolio/components/Sections/Footer";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";

const initialData = {
  summary: "",
  location: "São Paulo - SP, Brasil",
  description: "",
  start: {
    dateTime: "",
    timeZone: "America/Sao_Paulo",
  },
  end: {
    dateTime: "",
    timeZone: "America/Sao_Paulo",
  },
  attendees: [
    {
      email: "",
      optional: false,
    },
  ],
  reminders: {
    useDefault: false,
    overrides: [
      {
        method: "email",
        minutes: 24 * 60,
      },
    ],
  },
};

export const NewAppointmentForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(initialData);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    window.location.href = "/app/agenda";
  };

  const handleDataSend = async () => {
    try {
      await sendData(data);
      setModal({
        isOpen: true,
        type: "success",
        message: "Compromisso criado com sucesso!",
      });
    } catch (error) {
      setErrorMessage(error.message);
      setModal({ isOpen: true, type: "Error", message: error.message });
    }
  };

  return (
    <>
      <Provider value={{ data, setData }}>
        <UserNavbar />
        <BreadCrumb
          home={["Página Inicial", "/app"]}
          currentSection={["Agenda", "/app/agenda"]}
          currentSubsection={["Novo Compromisso", `/app/novo-compromisso`]}
        />
        <Form data={data} setData={setData} sendData={handleDataSend} />
        <Footer />
      </Provider>
      {renderModal(modal, setModal, handleCloseModal, errorMessage)}
    </>
  );
};

function renderModal(modal, setModal, handleCloseModal, errorMessage) {
  switch (modal.type) {
    case "success":
      return (
        <Success
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
        />
      );
    case "Error":
      return (
        <ErrorModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
          message={errorMessage}
        />
      );
    default:
      break;
  }
}
