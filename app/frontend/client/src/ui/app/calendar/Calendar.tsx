import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import brLocale from "@fullcalendar/core/locales/pt-br";
import UserNavbar from "../components/UserNavbar";
import Footer from "../../portfolio/components/Sections/Footer";
import { Button, HelperText } from "flowbite-react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Agenda() {
  return (
    <div className="flex flex-col">
      <UserNavbar />
      <div className="my-8">
        <h1 className="text-4xl font-black text-center text-secondary italic">
          Agenda
        </h1>
        <HelperText className="text-center text-md mt-4 w-3/4 mx-auto">
          Bem-vindo(a) ao Gerenciamento de compromissos! Esta seção foi
          projetada para ajudá-lo(a) a gerenciar seus compromissos,
          relacionando-os aos clientes com facilidade. Utilize-se dos botões
          para gerenciar os eventos!
        </HelperText>
        <div className="flex justify-center items-center mx-auto mt-20 lg:w-10/12 xxs:w-11/12 xxs:flex-wrap">
          <Button
            className="w-max p-2 mx-auto mt-20 flex overflow-x-auto bg-secondary"
            href="/app/novo-compromisso"
          >
            <FaPlus className="mr-2 mt-0.5" />
            Novo compromisso
          </Button>
          <Button
            className="w-max p-2 mx-auto mt-20 flex overflow-x-auto bg-error"
            href="/app/excluir-compromisso"
          >
            <FaMinus className="mr-2 mt-0.5" />
            Excluir compromisso
          </Button>
        </div>
      </div>

      <div className="w-9/12 mx-auto my-4">
        <FullCalendar
          editable={true}
          plugins={[googleCalendarPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          locale={brLocale}
          weekends
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={{
            googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
            googleCalendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID,
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
