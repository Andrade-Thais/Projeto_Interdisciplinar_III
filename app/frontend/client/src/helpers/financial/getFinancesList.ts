import { fetchAllData } from "../../services/FinancialDataService";

export async function getFinancesListByMonth(month, year) {
  const result = await fetchAllData();
  return result.filter((item) => {
    const itemDate = new Date(item.dueDate);
    return itemDate.getMonth() === month && itemDate.getFullYear() === year;
  });
}
