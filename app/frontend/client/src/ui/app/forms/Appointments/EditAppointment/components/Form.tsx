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
import { getClientList } from "../../../../../../helpers/clients/getClientList";
import { submitAppointment } from "../../../../../../helpers/calendar/submitAppointment";
import { getEventList } from "../../../../../../helpers/calendar/getEventList";
import { retrieveEventData } from "../../../../../../helpers/calendar/retrieveEventData";

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
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [clientSelected, setClientSelected] = useState("");
  const [eventList, setEventList] = useState([]);
  const [eventSelected, setEventSelected] = useState("");
  const [clientList, setClientList] = useState([]);


  const handleClientChange = (event) => {
    setClientSelected(event.target.value);
  };

  const submitForm = () => {
    const data = getValues();
    submitAppointment(data, setData);
  };

  return (
    <>
      <form
        className="form bg-accent w-3/4 mx-auto my-4 py-8 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
          Editar Compromisso
        </h1>
        {!eventSelected ? (
          <div className="mb-[30px]">
            <div className="flex flex-wrap items-baseline justify-center">
              <Label
                htmlFor="event"
                className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
                value="Selecione o evento:"
              />
              <Controller
                name="event"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    {...register("event", { required: "Campo obrigatório" })}
                    onChange={(e) => {
                      field.onChange(e);
                      setEventSelected(e.target.value);
                    }}
                    id="event"
                    name="event"
                    color={errors.event ? "failure" : "primary"}
                    className="w-11/12 text-center rounded-lg p-2"
                  >
                    <option disabled selected value="">
                      Selecione...
                    </option>
                    {eventList &&
                      eventList.map((option, index) => (
                        <option key={index} value={option.ID}>
                          {option.summary}
                        </option>
                      ))}
                  </Select>
                )}
              />

              {errors && errors.event && (
                <span className="text-red-500 font-medium text-[14px]">
                  {errors.event.message}
                </span>
              )}
            </div>
          </div>
        ) : (
          <>
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
                  defaultValue={prevData?.title}
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
                  defaultValue={prevData?.description}
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
                  defaultValue={prevData?.appointmentDate}
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
                  value="Horário do compromisso:"
                />
                <Controller
                  control={control}
                  name="appointmentTime"
                  render={({ field }) => (
                    <>
                      <TextInput
                        type="time"
                        defaultValue={prevData?.appointmentTime}
                        color={errors.appointmentTime ? "failure" : "primary"}
                        className="w-11/12 rounded-lg p-2 border-none"
                        placeholder="Selecione o horário do compromisso..."
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      <input
                        type="hidden"
                        id="time"
                        {...field}
                        {...register("appointmentTime", {
                          required: "Campo obrigatório",
                        })}
                      />
                    </>
                  )}
                />
                {errors && errors.appointmentTime && (
                  <span className="text-red-500 font-medium text-[14px]">
                    {errors.appointmentTime.message}
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
                  defaultValue={prevData?.userAssociated}
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
                      value={field.value}
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
          </>
        )}
      </form>
    </>
  );
}
