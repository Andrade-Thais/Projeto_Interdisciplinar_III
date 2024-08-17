import { useState, useEffect } from "react";
import { initialData } from "../../../../../lib/financial/InitialOutgoingData";
import {
  fetchData,
  sendData,
} from "../../../../../services/FinancialDataService";
import { Breadcrumb, Spinner } from "flowbite-react";
import { Provider } from "../../../../../contexts/forms/FormContext";
import { StepOne } from "../components/StepOne";
import { StepTwo } from "../components/StepTwo";
import { StepThree } from "../components/StepThree";
import ErrorModal from "../../../modals/client/Error";
import SuccessModal from "../../../modals/financial/Success";
import UserNavbar from "../../../components/UserNavbar";
import Footer from "../../../../portfolio/components/Sections/Footer";

const OutgoingForm = ({ id }) => {
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

  //Verifica se o id foi passado por parametro, de forma a determinar o método de requisição
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

  //Avança etapas do formulário multi-etapas
  const handleNext = async () => {
    if (step === 3) {
      try {
        await sendData(id, data);
        setModal({
          isOpen: true,
          type: "success",
          message: "Despesa cadastrada com sucesso!",
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

  //Retrocede etapas do formulário multi-etapas
  const prev = () => setStep(step - 1);

  //Verifica se há algum carregamento em andamento
  if (loading) {
    return <Spinner color="primary" className="m-auto flex justify-center" />;
  }

  const handleCloseModal = () => {
    setModal({ isOpen: false, type: "", message: "" });
    if (modal.type === "success") {
      window.location.href = "/app/financeiro";
    }
  };
  return (
    <>
      {method === "POST" ? (
        <>
          <UserNavbar />
          <Breadcrumb className="p-4 mx-auto">
            <Breadcrumb.Item>
              <a href="/app" className="text-[16px]">
                Página inicial
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/app/financeiro" className="text-[16px]">
                Financeiro
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/app/nova-despesa" className="text-[16px]">
                Nova Despesa
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Provider value={{ data, setData, step, setStep, handleNext, prev }}>
            {renderStep(step, method, data)}
          </Provider>
          <Footer />
          {renderModal(modal, setModal, handleCloseModal, errorMessage)}
        </>
      ) : (
        <>
          <Provider value={{ data, setData, step, setStep, handleNext, prev }}>
            {renderStep(step, method, data)}
          </Provider>
          {renderModal(modal, setModal, handleCloseModal, errorMessage)}
        </>
      )}
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
        <SuccessModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
          message={modal.message}
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

export default OutgoingForm;
