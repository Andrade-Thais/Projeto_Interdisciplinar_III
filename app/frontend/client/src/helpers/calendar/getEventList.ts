import { fetchAllData } from "../../services/AppointmentDataService";

export async function getEventList() {
  const result = await fetchAllData();
  return result;
}
