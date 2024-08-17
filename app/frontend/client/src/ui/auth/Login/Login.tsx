import { Button, Label, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import NavBar from "../../portfolio/components/Navbar/NavBar";
import { getToken, login } from "../../../services/LoginDataService";
import Success from "../../app/modals/auth/Success";
import Error from "../../app/modals/auth/Error";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserType } from "../../../contexts/auth/UserRoleContext";
import { AuthContext } from "../../../contexts/auth/AuthContext";

export default function Login() {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
    handleCloseModal: () => {},
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const navigate = useNavigate();
  const { userType, setUserType } = useUserType();
  const { setIsLoggedIn } = useContext(AuthContext);
  const submitForm = async (data) => {
    try {
      const response = await login(data);
      const tokenResponse = await getToken();
      if (tokenResponse && tokenResponse.role) {
        setIsLoggedIn(true);
        setUserType(tokenResponse.role);
        setModal({
          isOpen: true,
          type: "success",
          message: "Login efetuado com sucesso!",
          handleCloseModal: handleCloseModal,
        });
      } else {
        setModal({
          isOpen: true,
          type: "error",
          message: "Email ou senha inválidos. Tente novamente.",
          handleCloseModal: handleCloseModal,
        });
      }
    } catch (error) {
      console.error("Erro ao autenticar", error);
      setModal({
        isOpen: true,
        type: "error",
        message:
          "Erro ao autenticar. Verifique suas credenciais e tente novamente.",
        handleCloseModal: handleCloseModal,
      });
    }
  };

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false });
    if (modal.type === "success") {
      navigate("/app");
    } else {
      return;
    }
  };

  return (
    <>
      <NavBar userType={userType} />
      <div className="lg:w-1/2 flex justify-center items-center flex-col mx-auto my-20">
        <h4 className="mt-6 text-center text-3xl font-extrabold text-secondary">
          Login
        </h4>
        <p className="text-center text-secondary mt-2">
          Faça login para acessar o sistema.
        </p>
        <form
          className="xs:w-11/12 mx-auto p-4 my-4 rounded-md"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="mb-[30px]">
            <div className="flex flex-wrap items-baseline justify-center">
              <Label
                htmlFor="email"
                className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
                value="E-mail:"
              />
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    {...register("email", {
                      required: "Obrigatório preencher o endereço de e-mail.",
                    })}
                    type="email"
                    placeholder="Insira seu endereço de e-mail..."
                    className="w-11/12"
                    color={errors.email ? "failure" : "primary"}
                  />
                )}
              />

              {errors && errors.email && (
                <span className="text-red-500 font-medium mt-2 text-[14px]">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-[30px]">
            <div className="flex flex-wrap items-baseline justify-center">
              <Label
                htmlFor="senha"
                className="mb-4 text-[15px] w-11/12 leading-[5px] text-secondary text-center"
                value="Senha:"
              />
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    {...register("password", {
                      required: "Obrigatório preencher a senha.",
                    })}
                    type="password"
                    placeholder="Insira sua senha..."
                    className="w-11/12"
                    color={errors.password ? "failure" : "primary"}
                  />
                )}
              />

              {errors && errors.password && (
                <span className="text-red-500 font-medium mt-2 text-[14px]">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-success text-white rounded-md hover:bg-green-600 transition-colors duration-200 ease-in-out w-11/12"
            >
              Autenticar
            </Button>
          </div>
        </form>
      </div>
      {renderModal(modal, setModal, handleCloseModal, modal.message)}
    </>
  );
}

const renderModal = (modal, setModal, handleCloseModal, message) => {
  if (modal.type === "success") {
    return (
      <Success
        modal={modal}
        setModal={setModal}
        handleCloseModal={handleCloseModal}
        message={message}
      />
    );
  }
  if (modal.type === "error") {
    return (
      <Error
        modal={modal}
        setModal={setModal}
        handleCloseModal={handleCloseModal}
        message={message}
      />
    );
  }
};
