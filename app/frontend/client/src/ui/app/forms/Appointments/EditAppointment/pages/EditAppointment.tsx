import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

export const EditAppointmentForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [method, setMethod] = useState("POST");
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    window.location.href = "/app/agenda";
  };

  return (
    <>
      <Provider value={{ data, setData }}>
        <UserNavbar />
        <Form data={data} setData={setData} prevData={data} />
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
