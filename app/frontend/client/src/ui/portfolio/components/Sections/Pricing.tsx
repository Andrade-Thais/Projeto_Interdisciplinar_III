import { useState, useEffect } from "react";
import { FcInfo } from "react-icons/fc";
import packagesData from "../../../../../db.json";
import Section from "./index";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {

    setPackages(packagesData.pricing[0]);
  }, []);

  return (
    <>
      <Section id="precos" bg="bg-accent">
        <div className="" id="pricing">
          <div className="text-center">
            <h2 className="md:text-5xl text-2xl font-extrabold text-secondary italic mb-2">
              Conheça os preços dos Ensaios
            </h2>
            <p className="text-tertiary w-10/12 text-left mx-auto p-4 italic font-medium">
              Descubra o pacote perfeito, onde valor e qualidade se encontram!
              Explore nossa seleção premium e descubra o melhor custo-benefício
              para suas necessidades. Encontre aqui uma oferta irresistível que
              combina economia e excelência. Não perca a chance de elevar sua
              experiência com nossos pacotes imbatíveis de valores!
            </p>
          </div>
          <div className="bg-accent grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-20 xxs:w-11/12 mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white border py-10 md:px-6 px-4 rounded-lg shadow-3xl"
              >
                <h3 className="text-3xl font-bold text-center text-secondary">
                  {pkg.name}
                </h3>
                <p className="text-tertiary text-center my-6 font-medium italic">
                  {pkg.description}
                </p>
                <ul className="mt-4 space-y-2 px-4 ">
                  {pkg.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center italic">
                      <FcInfo className="mr-2 text-xl" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-center text-secondary text-4xl font-bold italic">
                  {isYearly ? `$${pkg.price}` : `R$${pkg.price}`}
                  <span className="text-tertiary text-xl"></span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Pricing;