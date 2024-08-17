import { AppointmentDataProps } from "./AppointmentDataProps";

export interface FormProps {
  data: AppointmentDataProps;
  setData: () => void;
  prevData?: AppointmentDataProps;
  sendData: () => void;
}
