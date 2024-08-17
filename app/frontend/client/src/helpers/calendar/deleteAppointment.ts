import { deleteData } from "../../services/AppointmentDataService";

export default async function deleteAppointment(id: string) {
  try {
    const result = await deleteData(id);
    return result;
  } catch (e) {
    throw new Error(e);
  }
}
