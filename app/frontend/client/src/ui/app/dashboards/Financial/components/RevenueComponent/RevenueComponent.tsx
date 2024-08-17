import { Button, HelperText } from "flowbite-react";


export default function RevenueComponent({ currentDate, setCurrentDate, financeData, setFinanceData, setEditModalOpen}) {

  const getClassName = (isDebit) => {
    return isDebit ? "text-red-500" : "text-green-500";
  }

  const isPaidText = (isPaid) => {
    return isPaid ? "Pago" : "Pendente";
  }

  return (
    <>
      {financeData ? (
        Array.from(financeData).map((finance, index) => (
          <div className="my-10" key={index}>
            <HelperText className="flex justify-center mb-2">
              {finance && finance.dueDate}
            </HelperText>
            <div className="flex justify-between mx-auto lg:w-9/12 xxs:w-11/12 p-4 bg-gray-50 drop-shadow-sm rounded-3">
              <div>
                <HelperText> {finance && finance.title} - {isPaidText(finance.isPaid)}</HelperText>
              <HelperText className={getClassName(finance.isDebit)}>R$ {finance && finance.value}</HelperText>
              </div>
              
              <div>
              <Button className="bg-primary hover:cursor-pointer" onClick={() => { setEditModalOpen(finance) }}>Editar</Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <HelperText className="flex justify-center mb-2 text-[15px]">
          Nenhum dado encontrado
        </HelperText>
      )}

    </>
  );
}