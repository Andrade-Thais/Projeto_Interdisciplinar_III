import {
  Button,
  Datepicker,
  Flowbite,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { customTheme } from "../../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";
import { DefaultSizeOptions } from "../../../../../../lib/gallery/options/DefaultSizeOptions";
import { PackOptions } from "../../../../../../lib/gallery/options/PackOptions";
import {
  createGallery,
  fetchGallery,
  updateGallery,
} from "../../../../../../services/GalleryDataService";
import { getClientList } from "../../../../../../helpers/gallery/getClientList";
import { useEffect, useMemo, useState } from "react";
import { initialData } from "../../../../../../lib/gallery/initialGalleryData";
import { capitalize } from "../../../../../../utils/capitalize";
import SuccessModal from "../../../../modals/gallery/Infos/Success/Success";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../../modals/gallery/Infos/Error/Error";

export default function NewGalleryForm({ id }) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [state, setState] = useState({
    clientList: [],
    galleryFetched: {},
    data: initialData,
    modal: {
      isOpen: false,
      type: "",
      handleCloseModal: () => {},
      message: "",
    },
  });

  async function submitForm(formData) {
    event.preventDefault();
    try {
      if (id) {
        await updateGallery(id, formData);
        setModal({
          isOpen: true,
          type: "Success",
          message: "Galeria atualizada com sucesso!",
          handleCloseModal: () => {
            setModal({
              isOpen: false,
              type: "",
              message: "",
              handleCloseModal: () => {},
            });
            navigate("/app/galerias");
          },
        });
      } else {
        await createGallery(formData);
        setModal({
          isOpen: true,
          type: "Success",
          message: "Galeria criada com sucesso!",
          handleCloseModal: () => {
            setModal({
              isOpen: false,
              type: "",
              message: "",
              handleCloseModal: () => {},
            });
            navigate("/app/galerias");
          },
        });
      }
    } catch (error) {
      console.error("Erro ao criar galeria...");
      setModal({
        isOpen: true,
        type: "Error",
        message: "Erro ao criar ou atualizar galeria! " + error.message,
        handleCloseModal: () => {
          setModal({
            isOpen: false,
            type: "",
            message: "",
            handleCloseModal: () => {},
          });
        },
      });
    }
  }

  useEffect(() => {
    if (id) {
      fetchGallery(id)
        .then((data) => {
          setValue("title", data.title);
          setValue("createdAt", new Date(data.createdAt));
          setValue("photosNumber", data.photosNumber);
          setValue("category", data.category);
          setValue("defaultSize", data.defaultSize);
          setValue("clientAssociated", data.clientAssociated);
          setState((prevState) => ({ ...prevState, galleryFetched: data }));
        })
        .catch((error) => {
          console.error("Ocorreu um erro: ", error);
        });
    }
  }, [id, setValue]);

  useMemo(() => {
    getClientList().then((data) => {
      setState((prevState) => ({
        ...prevState,
        clientList: data,
      }));
    });
  }, []);

  const setModal = (newModalState) => {
    setState((prevState) => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        ...newModalState,
      },
    }));
  };
  return (
    <>
      <form
        className="xs:w-11/12 lg:w-1/2 mx-auto bg-accent p-4 my-4 rounded-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h4 className="text-3xl font-bold text-center mb-9 text-secondary">
          {id ? "Editar Galeria" : "Nova Galeria"}
        </h4>
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
              defaultValue=""
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("title", {
                    required: "Obrigatório preencher o título da galeria.",
                  })}
                  type="text"
                  placeholder="Dê um título à galeria..."
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
              htmlFor="createdAt"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Data da galeria:"
            />
            <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <>
                  <Flowbite theme={{ theme: customTheme }}>
                    <Datepicker
                      language="pt-BR"
                      id="createdAt"
                      name="createdAt"
                      placeholder="Selecione a data da galeria..."
                      labelTodayButton="Hoje"
                      labelClearButton="Limpar"
                      onSelectedDateChanged={(date) => field.onChange(date)}
                      className="w-11/12 rounded-lg p-2"
                    />
                  </Flowbite>
                  <input type="hidden" {...field} {...register("createdAt")} />
                </>
              )}
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="photosNumber"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Pacote:"
            />
            <Controller
              name="photosNumber"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      className="w-11/12"
                      {...field}
                      {...register("photosNumber", {
                        required: "Obrigatório preencher o pacote da galeria.",
                      })}
                      color={errors.photosNumber ? "failure" : "primary"}
                    >
                      <option disabled selected value="">
                        Selecione...
                      </option>
                      {PackOptions &&
                        PackOptions.map((option, index) => (
                          <option key={option.index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </Select>
                    {errors && errors.photosNumber && (
                      <span className="text-red-500 font-medium text-[14px]">
                        {errors.photosNumber.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="category"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Categoria:"
            />
            <Controller
              name="category"
              defaultValue={
                (state.galleryFetched && state.galleryFetched.category) ||
                state.data.category
              }
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  {...register("category", {
                    required: "Obrigatório preencher a categoria da galeria.",
                  })}
                  type="text"
                  placeholder="Dê uma categoria à galeria (Tipo de ensaio)..."
                  className="w-11/12"
                  color={errors.category ? "failure" : "primary"}
                />
              )}
            />
            {errors && errors.category && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="defaultSize"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Tamanho de exibição:"
            />
            <Controller
              name="defaultSize"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("defaultSize", {
                    required:
                      "Obrigatório preencher o tamanho de exibição da galeria.",
                  })}
                  className="w-11/12"
                  color={errors.defaultSize ? "failure" : "primary"}
                >
                  <option disabled selected value="">
                    Selecione...
                  </option>
                  {DefaultSizeOptions &&
                    DefaultSizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </Select>
              )}
            />
            {errors && errors.defaultSize && (
              <span className="text-red-500 font-medium text-[14px]">
                {errors.defaultSize.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-[30px]">
          <div className="flex flex-wrap items-baseline justify-center">
            <Label
              htmlFor="clientAssociated"
              className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
              value="Cliente associado:"
            />
            <Controller
              name="clientAssociated"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      className="w-11/12"
                      {...field}
                      {...register("clientAssociated", {
                        required: "Obrigatório associar cliente à galeria.",
                      })}
                      color={errors.clientAssociated ? "failure" : "primary"}
                    >
                      <option disabled selected value="">
                        Selecione...
                      </option>
                      {state.clientList.map((option, index) => (
                        <option key={option.id} value={option.id}>
                          {(option.fullName && capitalize(option.fullName)) ||
                            option.fullName}
                        </option>
                      ))}
                    </Select>
                    {errors && errors.clientAssociated && (
                      <span className="text-red-500 font-medium text-[14px]">
                        {errors.clientAssociated.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-11/12 text-lg bg-success">
            Salvar
          </Button>
        </div>
      </form>
      {renderModal({ modal: state.modal, setModal: setModal })}
    </>
  );
}

const renderModal = ({ modal, setModal }) => {
  switch (modal.type) {
    case "Success":
      return (
        <SuccessModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={modal.handleCloseModal}
        />
      );
    case "Error":
      return (
        <ErrorModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={modal.handleCloseModal}
        />
      );
  }
};
