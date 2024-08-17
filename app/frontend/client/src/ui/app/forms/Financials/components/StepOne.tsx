import { useContext } from "react";
import FormContext from "../../../../../contexts/forms/FormContext";
import { Controller, useForm } from "react-hook-form";
import { isValidDate } from "../../../../../helpers/financial/isValidDate";
import { RevenueDataProps } from "../../../../../types/RevenueData/RevenueDataProps";
import { registryTypeOptions } from "../../../../../lib/financial/options/registryTypeOptions";
import { isPaidOptions } from "../../../../../lib/financial/options/isPaidOptions";
import { Button, Datepicker, Flowbite, Label, Select, TextInput } from "flowbite-react";
import { customTheme } from "../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";

interface StepOneProps {
    prevData?: any;
    method?: any;
}

export const StepOne = ({ prevData, method }: StepOneProps) => {
    const { data, setData, handleNext } = useContext(FormContext);

    //React hook form
    const {
      control,
      handleSubmit,
      setValue,
      register,
      formState: { errors },
      watch
    } = useForm<RevenueDataProps["StepOne"]>({
      defaultValues: data || prevData,
    });

    //Submit form
  const onSubmit = (formData) => {
      setData((prevFormData) => ({
        ...prevFormData,
        ...formData,
      }));
      handleNext();
  };

  
  //Watch registryType
  const selectedRegistryType = watch('registryType');

  //Watch installments
  if (selectedRegistryType !== "Parcelamento") {
    setValue('installments', undefined);
  }

  //Classname 
  const getClassName = (method) => {
    return method === "POST" ? "xs:w-11/12 lg:w-1/2 mx-auto bg-accent p-4 my-4" : "w-full mx-auto bg-accent p-4 my-4";
  }
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={getClassName(method)}>
        <div className="mb-[20px]">
          <h1 className="text-3xl font-bold text-center mb-9 text-secondary">
            {method === "POST" ? "Nova Finança" : "Editar Finança"}
          </h1>
          <p className="text-3x1 font-bold text-center mb-9 text-secondary">
            {" "}
            Informações Básicas (1/3)
          </p>
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="outgoingType"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Tipo de finança:"
            />
            <Controller
              name="registryType"
              control={control}
              rules={{ required: "Tipo de finança é obrigatório" }}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("registryType", {
                    required: "Tipo de finança é obrigatório",
                  })}
                  id="registryType"
                  name="registryType"
                  color={errors.registryType ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {registryTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            />

            {errors && errors.registryType && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.registryType.message}
              </span>
            )}
          </div>
        </div>
        {selectedRegistryType === "Parcelamento" && (
          <div className="mb-[30px]">
            <div className="flex flex-wrap items-baseline justify-center">
              <Label
                htmlFor="installments"
                className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
                value="Número de parcelas:"
              />
              <Controller
                name="installments"
                control={control}
                rules={{ required: "Número de parcelas é obrigatório" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="installments"
                    name="installments"
                    type="number"
                    min="0"
                    placeholder="Digite o número de parcelas..."
                    color={errors.installments ? "failure" : "primary"}
                    className="w-11/12 text-center rounded-lg p-2"
                  />
                )}
              />

              {errors && errors.installments && (
                <span className="text-red-500 font-medium text-[14px]">
                  {errors.installments.message}
                </span>
              )}
            </div>
          </div>
        )}
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
                  color={errors.title ? "failure" : "primary"}
                  type="text"
                  placeholder="Digite o título da finança..."
                  className="w-11/12 text-center rounded-lg p-2"
                  id="name"
                  {...register("title", { required: "O título é obrigatório" })}
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
              htmlFor="value"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Valor:"
            />
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <TextInput
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Digite o valor da finança, em reais..."
                  {...field}
                  color={errors.value ? "failure" : "primary"}
                  id="value"
                  className="w-11/12 text-center rounded-lg p-2"
                  {...register("value", {
                    required: "O valor é obrigatório",
                  })}
                />
              )}
            />

            {errors && errors.value && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.value.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="dueDate"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Data de Vencimento:"
            />
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <>
                  <Flowbite theme={{ theme: customTheme }}>
                    <Datepicker
                      language="pt-br"
                      id="dueDate"
                      name="dueDate"
                      placeholder="Selecione a data de vencimento"
                      labelTodayButton="Hoje"
                      labelClearButton="Limpar"
                      onSelectedDateChanged={(date) => field.onChange(date)}
                      defaultDate={
                        isValidDate(field.value)
                          ? new Date(field.value)
                          : new Date()
                      }
                      className="w-11/12 rounded-lg p-2"
                    />
                  </Flowbite>
                  <input type="hidden" {...field} {...register("dueDate")} />
                </>
              )}
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="isPaid"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Situação:"
            />
            <Controller
              name="isPaid"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="isPaid"
                  name="isPaid"
                  color={errors.isPaid ? "failure" : "primary"}
                  className="w-11/12 text-center rounded-lg p-2"
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {isPaidOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors && errors.isPaid && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.isPaid.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-baseline justify-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-11/12 bg-success border-none focus:bg-secondary"
          >
            Próximo
          </Button>
        </div>
      </form>
    );
}