import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Provider } from "../../../../../contexts/forms/FormContext";
import { StepOne } from "../components/Steps/StepOne";
import { StepTwo } from "../components/Steps/StepTwo";
import { StepThree } from "../components/Steps/StepThree";
import { fetchData, sendData } from "../../../../../services/UserDataService";
import Success from "../../../modals/client/Success";
import ErrorModal from "../../../modals/client/Error";

const initialData = {
  stepOne: {
    registryType: "",
    personType: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    birthDate: "",
  },
  stepTwo: {
    zip: "",
    city: "",
    state: "",
    street: "",
    streetNumber: "",
    complement: "",
    neighborhood: "",
  },
  stepThree: {
    receiveSMS: false,
    receiveEmail: false,
  },
};

export const UserForm = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [method, setMethod] = useState("POST");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      setMethod("PUT");
      fetchData(id)
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setModal({
            isOpen: true,
            type: "Error",
            message: "",
          });
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleNext = async () => {
    if (step === 3) {
      try {
        await sendData(id, data);
        setModal({
          isOpen: true,
          type: "success",
          message: "",
        });
      } catch (error) {
        const message = error.message;
        setErrorMessage(message);
        setModal({
          isOpen: true,
          type: "Error",
          message: errorMessage,
        });
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    window.location.href = "/app/clientes";
  };

  const prev = () => setStep(step - 1);

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <Provider value={{ data, setData, step, setStep, handleNext, prev }}>
        {renderStep(step, method, data)}
      </Provider>
      {renderModal(modal, setModal, handleCloseModal, errorMessage)}
    </>
  );
};

function renderStep(step, method, data) {
  switch (step) {
    case 1:
      return method === "POST" ? (
        <StepOne method={method} />
      ) : (
        <StepOne prevData={data} method={method} />
      );
    case 2:
      return method === "POST" ? (
        <StepTwo method={method} />
      ) : (
        <StepTwo prevData={data} method={method} />
      );
    case 3:
      return method === "POST" ? (
        <StepThree method={method} />
      ) : (
        <StepThree prevData={data} method={method} />
      );
    default:
      return method === "POST" ? (
        <StepOne />
      ) : (
        <StepOne prevData={data} method={method} />
      );
  }
}

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
