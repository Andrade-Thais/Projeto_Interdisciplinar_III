import { useContext, useEffect, useState } from "react";
import FormContext from "../../../../../contexts/forms/FormContext";
import { RevenueDataProps } from "../../../../../types/RevenueData/RevenueDataProps";
import { Controller, useForm } from "react-hook-form";
import { Button, HelperText, Label, Select, TextInput } from "flowbite-react";
import { getClientList } from "../../../../../helpers/clients/getClientList";

interface StepTwoProps {
  prevData?: any;
  method?: any;
}

export const StepTwo = ({ prevData, method }: StepTwoProps) => {
  const [clientList, setClientList] = useState([]);

  const { data, setData, handleNext, prev } = useContext(FormContext);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RevenueDataProps["StepTwo"]>({
    defaultValues: data || prevData,
  });

  const onSubmit = (formData) => {
    setData((prevFormData) => ({
      ...prevFormData,
      ...formData,
    }));
    handleNext();
  };

  useEffect(() => {
    getClientList().then((clientList) => {
      const clients = Array.from(clientList);
      setClientList(clients);
    });
  }, []);
  
  //Classname
  const getClassName = (method) => {
    return method === "POST"
      ? "xs:w-11/12 lg:w-1/2 mx-auto bg-accent p-4 my-4"
      : "w-full mx-auto bg-accent p-4 my-4";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={getClassName(method)}>
      <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
        {method === "POST" ? "Nova Finança" : "Editar Finança"}
      </h1>
      <p className="text-3x1 font-bold text-center mb-9 text-secondary">
        {" "}
        Vínculos de lançamento (2/3)
      </p>

      <div className="mb-[30px]">
        <div className="flex flex-wrap items-baseline justify-center">
          <Label
            htmlFor="accountType"
            className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
            value="Conta:"
          />
          <Controller
            name="accountType"
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  placeholder="Digite o tipo de conta..."
                  {...field}
                  {...register("accountType")}
                  id="accountType"
                  name="accountType"
                  color={errors.accountType ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                />
              </>
            )}
          />

          {errors && errors.accountType && (
            <span className="text-red-500 font-medium text-[14px]">
              {errors.accountType.message}
            </span>
          )}
        </div>
      </div>
      <div className="mb-[30px]">
        <div className="flex flex-wrap items-baseline justify-center">
          <Label
            htmlFor="categoryType"
            className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
            value="Categoria:"
          />
          <Controller
            name="categoryType"
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  {...field}
                  placeholder="Digite a categoria desta despesa..."
                  id="categoryType"
                  name="categoryType"
                  color={errors.categoryType ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                />
              </>
            )}
          />

          {errors && errors.categoryType && (
            <span className="text-red-500 font-medium text-[14px]">
              {errors.categoryType.message}
            </span>
          )}
        </div>
      </div>
      <div className="mb-[30px]">
        <div className="flex flex-wrap items-baseline justify-center">
          <Label
            htmlFor="client"
            className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
            value="Cliente associado:"
          />
          <Controller
            name="client"
            control={control}
            rules={{ required: "Cliente associado é obrigatório" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  {...register("client", {
                    required: "Cliente associado é obrigatório",
                  })}
                  id="client"
                  name="client"
                  color={errors.client ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {clientList &&
                    clientList.map((option) => (
                      <option key={option.id} value={option.email}>
                        {option.fullName}
                      </option>
                    ))}
                </Select>
              </>
            )}
          />

          {errors && errors.client && (
            <span className="text-red-500 font-medium text-[14px]">
              {errors.client.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-baseline justify-between">
        <Button
          onClick={prev}
          className="w-5/12 bg-success border-none focus:bg-secondary"
        >
          Voltar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-5/12 bg-success border-none focus:bg-secondary"
        >
          Próximo
        </Button>
      </div>
    </form>
  );
};
