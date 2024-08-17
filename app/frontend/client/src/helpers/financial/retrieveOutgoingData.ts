import { getFinancesList } from "./getFinancesList";

export const retrieveFinancialData = async () => {
  const allFinances = await getFinancesList();
  const event = allFinances.find((finance) => finance.id === id);
  return event;
};
