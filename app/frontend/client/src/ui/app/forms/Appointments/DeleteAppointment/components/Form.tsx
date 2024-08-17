import React, { useEffect, useState } from "react";
import {
  TextInput,
  Datepicker,
  Select,
  Label,
  Flowbite,
  Button,
} from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { getEventList } from "../../../../../../helpers/calendar/getEventList";

interface FormProps {
  onSubmitForm: () => void;
}

export default function Form({ onSubmitForm }) {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [eventList, setEventList] = useState([]);
  const [eventSelected, setEventSelected] = useState("");

  useEffect(() => {
    getEventList().then(setEventList);
  }, []);

  const submitForm = (id) => {
    id = eventSelected;
    onSubmitForm(id);
  };

  return (
    <>
      <form
        className="form bg-accent w-3/4 mx-auto my-4 py-8 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
          Excluir Compromisso
        </h1>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="event"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Selecione o evento que deseja excluir:"
            />
            <Controller
              name="event"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("event", { required: "Campo obrigatório" })}
                  onChange={(e) => {
                    setEventSelected(e.target.value);
                  }}
                  id="event"
                  name="event"
                  color={errors.event ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                >
                  <option disabled selected value="">
                    Selecione... (Título - Descrição)
                  </option>
                  {Array.isArray(eventList) &&
                    eventList.length > 0 &&
                    eventList.map((option, index) => (
                      <option key={index} value={option.ID}>
                        {option.summary + " - " + option.description}
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
        <div className="flex justify-center">
          <Button type="submit" className="bg-error w-11/12 mt-4">
            Excluir evento
          </Button>
        </div>
      </form>
    </>
  );
}
