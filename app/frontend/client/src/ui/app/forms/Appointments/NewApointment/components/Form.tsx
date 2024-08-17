import React, { useEffect, useState } from "react";
import {
  TextInput,
  Datepicker,
  Select,
  Label,
  Flowbite,
  Button,
} from "flowbite-react";
import { AppointmentDataProps } from "../../../../../../types/AppointmentData/AppointmentDataProps";
import { Controller, useForm } from "react-hook-form";
import { customTheme } from "../../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";
import { fetchAllData } from "../../../../../../services/UserDataService";

interface FormProps {
  data: AppointmentDataProps;
  setData: () => void;
  prevData?: AppointmentDataProps;
  sendData: () => void;
}

export default function Form({ data, setData, prevData, sendData }: FormProps) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const [clientSelected, setClientSelected] = useState("");

  const submitForm = (formData) => {
    const appointmentDate = new Date(formData.appointmentDate);

    const startDateTime = new Date(appointmentDate);
    const endDateTime = new Date(appointmentDate);

    const [startHours, startMinutes] = formData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = formData.endTime.split(":").map(Number);

    startDateTime.setHours(startHours, startMinutes);
    endDateTime.setHours(endHours, endMinutes);

    const newAppointment = {
      summary: formData.title,
      location: "São Paulo - SP, Brasil",
      description: formData.description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/Sao_Paulo",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/Sao_Paulo",
      },
      attendees: [
        {
          email: formData.userAssociated,
          optional: false,
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "email",
            minutes: 24 * 60,
          },
        ],
      },
    };
    setData(newAppointment);
    sendData(newAppointment);
  };

  async function getClientList() {
    try {
      const response = await fetchAllData();
      return response.map((client) => {
        return {
          fullName: client.name + " " + client.surname,
          registryType: client.registryType,
          email: client.email,
        };
      });
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  }

  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    getClientList().then(setClientList);
  }, []);

  const handleClientChange = (event) => {
    setClientSelected(event.target.value);
  };

  return (
    <>
      <form
        className="form bg-accent w-3/4 mx-auto my-4 py-8 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
          Novo Compromisso
        </h1>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="title"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Título:"
            />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("title", { required: "Campo obrigatório" })}
                  type="text"
                  placeholder="Dê um título ao compromisso..."
                  className="w-11/12"
                  color={errors.title ? "failure" : "primary"}
                />
              )}
            />

            {errors && errors.title && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="description"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Descrição:"
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("description", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  placeholder="Forneça uma descrição ao compromisso..."
                  className="w-11/12"
                  color={errors.description ? "failure" : "primary"}
                />
              )}
            />

            {errors && errors.description && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="appointmentDate"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Data do compromisso:"
            />
            <Controller
              control={control}
              name="appointmentDate"
              render={({ field }) => (
                <>
                  <Flowbite theme={{ theme: customTheme }}>
                    <Datepicker
                      minDate={new Date()}
                      language="pt-BR"
                      id="appointmentDate"
                      name="appointmentDate"
                      placeholder="Selecione a data do compromisso..."
                      labelTodayButton="Hoje"
                      labelClearButton="Limpar"
                      color={errors.appointmentDate ? "failure" : "primary"}
                      onSelectedDateChanged={(date) => field.onChange(date)}
                      className="w-11/12 rounded-lg p-2"
                    />
                  </Flowbite>
                  <input
                    type="hidden"
                    {...field}
                    {...register("appointmentDate", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.appointmentDate && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.appointmentDate.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="appointmentTime"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Horário de início do compromisso:"
            />
            <Controller
              control={control}
              name="startTime"
              render={({ field }) => (
                <>
                  <TextInput
                    type="time"
                    color={errors.startTime ? "failure" : "primary"}
                    className="w-11/12 rounded-lg p-2 border-none"
                    placeholder="Selecione o horário de início compromisso..."
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <input
                    type="hidden"
                    id="time"
                    {...field}
                    {...register("startTime", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.startTime && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.startTime.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="endTime"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Horário de término do compromisso:"
            />
            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <>
                  <TextInput
                    type="time"
                    color={errors.endTime ? "failure" : "primary"}
                    className="w-11/12 rounded-lg p-2 border-none"
                    placeholder="Selecione o horário de término compromisso..."
                    {...field}
                  />
                  <input
                    type="hidden"
                    id="time"
                    {...field}
                    {...register("endTime", {
                      required: "Campo obrigatório",
                    })}
                  />
                </>
              )}
            />
            {errors && errors.endTime && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.endTime.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="userAssociated"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Usuário Associado:"
            />
            <Controller
              name="userAssociated"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("userAssociated", {
                    required: "Campo obrigatório",
                  })}
                  onChange={handleClientChange}
                  id="userAssociated"
                  name="userAssociated"
                  color={errors.userAssociated ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {clientList &&
                    clientList.map((option, index) => (
                      <option key={index} value={option.email}>
                        {option.fullName + " - " + option.registryType}
                      </option>
                    ))}
                </Select>
              )}
            />

            {errors && errors.userAssociated && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.userAssociated.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="bg-secondary w-11/12 mt-4">
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
}
