import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import FormContext from "../../../../../contexts/forms/FormContext";
import Button from "react-bootstrap/esm/Button";
import * as Form from "@radix-ui/react-form";
import * as Switch from "@radix-ui/react-switch";
import { RevenueDataProps } from "../../../../../types/RevenueData/RevenueDataProps";
import { Label, TextInput, Textarea } from "flowbite-react";

interface StepThreeProps {
  prevData?: any;
  method?: any;
}

export const StepThree = ({ prevData, method }: StepThreeProps) => {
  const { data, setData, handleNext, prev } = useContext(FormContext);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RevenueDataProps["StepThree"]>({
    defaultValues: data || prevData,
  });

  const onSubmit = (formData) => {
    setData((prevFormData) => ({
      ...prevFormData,
      ...formData,
    }));
    handleNext();
  };
//Classname 
  const getClassName = (method) => {
    return method === "POST" ? "xs:w-11/12 lg:w-1/2 mx-auto bg-accent p-4 my-4" : "w-full mx-auto bg-accent p-4 my-4";
  }
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={getClassName(method)}>
        <h1 className="text-3xl font-bold text-center mb-4 text-secondary">
          {method === "POST" ? "Nova Finança" : "Editar Finança"}
        </h1>
        <p className="text-3x1 font-bold text-center mb-9 text-secondary">
          Informações Adicionais (3/3)
        </p>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="detailedDescription"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Descrição detalhada:"
            />
            <Controller
              name="detailedDescription"
              control={control}
              render={({ field }) => (
                <>
                  <Textarea
                    {...field}
                    color={errors.detailedDescription ? "failure" : "primary"}
                    id="detailedDescription"
                    name="detailedDescription"
                    placeholder="Insira uma descrição detalhada..."
                    className="w-11/12 text-center rounded-lg p-2"
                  />
                </>
              )}
            />
            {errors && errors.detailedDescription && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.detailedDescription.message}
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
            type="submit"
            className="w-5/12 bg-success border-none focus:bg-secondary"
          >
            Enviar
          </Button>
        </div>
      </form>
    );
};
