import { useMemo } from "react";
import Button from "react-bootstrap/esm/Button";
import Section from "./index.tsx";
import * as Form from "@radix-ui/react-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareWhatsapp,
  faSquareInstagram,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useRef } from "react";

export default function Contact({ data }) {
  const introData = useMemo(() => data && data[0], [data]);
  const formData = useMemo(
    () => data && data.filter((item, index) => index > 0 && index < 5),
    [data]
  );

  const [formInput, setFormInput] = useState({
    nome: "",
    email: "",
    celular: "",
    mensagem: "",
  });

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert(
          "Formulário enviado com sucesso! Entraremos em contato em até 2 dias úteis!"
        );
      } else {
        alert("Algo deu errado! Tente novamente mais tarde!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (event.target.name === input.name) {
        setFormInput((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
    });
  };

  return (
    <Section id="contato">
      {introData && formData && (
        <div>
          <h2 className="italic text-4xl font-black text-secondary">
            {introData.title}
          </h2>
          <p className="italic text-lg mx-auto text-center font-medium w-11/12 my-4">
            {introData.description}
          </p>
          <Form.Root
            className="container bg-accent p-8 rounded-3 w-11/12"
            onSubmit={handleSubmit}
            action="https://formsubmit.co/henriquebenedictocosta@gmail.com"
            method="POST"
            ref={formRef}
          >
            <h3 className="text-center text-secondary text-2xl font-black">
              Formulário de Interesse
            </h3>
            <div className="flex flex-col xl:flex-row justify-around w-full items-start xl:items-center">
              <Form.Field
                className="flex flex-col mt-4 w-full"
                id={formData[0].name}
                name={formData[0].name}
              >
                <Form.Label
                  className="text-secondary text-left font-medium"
                  htmlFor={formData[0].name}
                >
                  {formData[0].label}
                </Form.Label>
                <Form.Message
                  className="text-red-500 text-[14px] text-left font-medium"
                  match="valueMissing"
                >
                  {formData[0].missingMessage}
                </Form.Message>
                <Form.Message
                  className="text-red-500 text-[15px] text-left font-medium"
                  match="patternMismatch"
                >
                  {formData[0].invalidMessage}
                </Form.Message>
                <Form.Control asChild>
                  <input
                    className="box-border h-[35px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                    type={formData[0].inputType}
                    name={formData[0].name}
                    placeholder={formData[0].placeholder}
                    pattern={formData[0].pattern}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field
                className="flex flex-col mt-4 w-full xl:ml-8"
                id={formData[1].name}
                name={formData[1].name}
              >
                <Form.Label
                  className="text-secondary text-left font-medium"
                  htmlFor={formData[1].name}
                >
                  {formData[1].label}
                </Form.Label>
                <Form.Message
                  className="text-red-500 text-[14px] text-left font-medium"
                  match="valueMissing"
                >
                  {formData[1].missingMessage}
                </Form.Message>
                <Form.Message
                  className="text-red-500 text-[14px] text-left font-medium"
                  match="patternMismatch"
                >
                  {formData[1].invalidMessage}
                </Form.Message>
                <Form.Control asChild>
                  <input
                    className="box-border w-full min-w-full inline-flex h-[35px]  items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                    type={formData[1].inputType}
                    name={formData[1].name}
                    placeholder={formData[1].placeholder}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Control>
              </Form.Field>
            </div>
            <Form.Field
              className="flex flex-col mt-4 w-full"
              id={formData[2].name}
              name={formData[2].name}
            >
              <Form.Label
                className="text-secondary text-left font-medium"
                htmlFor={formData[2].name}
              >
                {formData[2].label}
              </Form.Label>
              <Form.Message
                className="text-red-500 text-[14px] text-left font-medium"
                match="valueMissing"
              >
                {formData[2].missingMessage}
              </Form.Message>
              <Form.Message
                className="text-red-500 text-[14px] text-left font-medium"
                match="patternMismatch"
              >
                {formData[2].invalidMessage}
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="box-border w-full min-w-full inline-flex h-[35px]  items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                  type={formData[2].inputType}
                  name={formData[2].name}
                  placeholder={formData[2].placeholder}
                  pattern={formData[2].pattern}
                  onChange={handleInputChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field
              className="flex flex-col mt-4 w-full"
              id={formData[3].name}
              name={formData[3].name}
            >
              <Form.Label
                className="text-secondary text-left font-medium"
                htmlFor={formData[3].name}
              >
                {formData[3].label}
              </Form.Label>
              <Form.Message
                className="text-red-500 text-[14px] text-left font-medium"
                match="valueMissing"
              >
                {formData[3].missingMessage}
              </Form.Message>
              <Form.Message
                className="text-red-500 text-[14px] text-left font-medium"
                match="patternMismatch"
              >
                {formData[3].invalidMessage}
              </Form.Message>
              <Form.Control asChild>
                <textarea
                  className="placeholder:absolute placeholder:left-4 placeholder:top-2 box-border resize-none w-full min-w-full inline-flex h-[100px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                  name={formData[3].name}
                  placeholder={formData[3].placeholder}
                  onChange={handleInputChange}
                  required
                />
              </Form.Control>
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_autoresponse"
                value="Formulário recebido com sucesso! Contataremos em até 2 dias úteis!"
              />
            </Form.Field>
            <Form.Submit asChild>
              <Button
                className="box-border rounded-2 w-max p-4 text-white shadow-blackA4 hover:bg-success inline-flex h-10 items-center justify-center rounded-[4px] bg-secondary px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
                id="submit-form"
              >
                Enviar
              </Button>
            </Form.Submit>
          </Form.Root>
          <div className="intro">
            <div className="flex justify-center items-center">
              <a href="#">
                <FontAwesomeIcon
                  icon={faSquareWhatsapp}
                  style={{ color: "#64734d", margin: "15px", fontSize: "4rem" }}
                />
              </a>
              <a href="https://www.instagram.com/dricaoliveira_bonsclicks">
                <FontAwesomeIcon
                  icon={faSquareInstagram}
                  style={{ color: "#64734d", margin: "15px", fontSize: "4rem" }}
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  style={{ color: "#64734d", margin: "15px", fontSize: "4rem" }}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
