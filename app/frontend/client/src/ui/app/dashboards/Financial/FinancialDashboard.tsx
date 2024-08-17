import { useEffect, useState } from "react";
import DashboardContext from "../../../../contexts/dashboards/Financial";
import { getMonthName } from "../../../../helpers/financial/getMonthName";
import Footer from "../../../portfolio/components/Sections/Footer";
import UserNavbar from "../../components/UserNavbar";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import DateRange from "./components/DateRange/DateRange";
import RevenueComponent from "./components/RevenueComponent/RevenueComponent";
import Searchbar from "./components/Searchbar/Searchbar";
import { getFinancesListByMonth } from "../../../../helpers/financial/getFinancesList";
import { formatFinanceData } from "../../../../helpers/financial/formatFinanceData";
import EditFinance from "../../modals/financial/EditFinance";
import { HelperText } from "flowbite-react";
import ConfirmDeleteModal from "../../modals/financial/ConfirmDelete";

export default function FinancialDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [financeData, setFinanceData] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    id: "",
    title: "",
  });

  // Obtém o nome do mês atual
  const currentMonth = getMonthName(currentDate.getMonth());

  // Obtém o último dia do mês
  const lastDayOfMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Volta um mês
  const goToPreviousMonth = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(new Date(currentDate));
  };

  // Avança um mês
  const goToNextMonth = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(new Date(currentDate));
  };

  // Renderiza a lista de despesas e receitas
  useEffect(() => {
    getFinancesListByMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    ).then((data) => {
      setFinanceData(data);
      formatFinanceData(data);
    });
  }, [currentDate]);

  // Procura por receitas e despesas com determinado nome
  const handleSearch = (value) => {
    getFinancesListByMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    ).then((data) => {
      const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFinanceData(filteredData);
      formatFinanceData(filteredData);
    });
  };

  // Abre o modal de edição
  const setEditModalOpen = (data) => {
    setModal({
      isOpen: true,
      type: "outgoing",
      id: data.id,
      title: data.title,
    });
  };

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    window.location.href = "/app/financeiro";
  };

  const handleDeleteModal = () => {
    setModal({ ...modal, type: "confirmDelete", isOpen: true });
  };

  return (
    <DashboardContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        currentMonth,
        lastDayOfMonth,
        goToNextMonth,
        goToPreviousMonth,
        handleSearch,
        financeData,
        setFinanceData,
      }}
    >
      <UserNavbar />
      <h1 className="text-center text-4xl font-bold mt-10 text-secondary italic">
        Gerenciamento Financeiro
      </h1>
      <HelperText className="text-center text-md mt-4">
        Bem-vindo(a) ao Gerenciamento Financeiro! Esta seção foi projetada para
        ajudá-lo(a) a gerenciar suas transações financeiras com facilidade.
      </HelperText>
      <ButtonGroup />
      <Searchbar handleSearch={handleSearch} />
      <DateRange
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        currentMonth={currentMonth}
        goToNextMonth={goToNextMonth}
        goToPreviousMonth={goToPreviousMonth}
        lastDayOfMonth={lastDayOfMonth}
      />
      <RevenueComponent
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        financeData={financeData}
        setFinanceData={setFinanceData}
        setEditModalOpen={(finance) => setEditModalOpen(finance)}
      />
      <Footer />
      {renderModal(modal, setModal, handleCloseModal, handleDeleteModal)}
    </DashboardContext.Provider>
  );
}

function renderModal(modal, setModal, handleCloseModal, handleDeleteModal) {
  switch (modal.type) {
    case "outgoing":
      return (
        <EditFinance
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
          handleDeleteModal={handleDeleteModal}
          financeType={modal.type}
          id={modal.id}
          title={modal.title}
        />
      );
    case "confirmDelete":
      return (
        <ConfirmDeleteModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={handleCloseModal}
          handleDelete={handleCloseModal}
          id={modal.id}
        />
      );
    default:
      break;
  }
}
