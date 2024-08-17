import { useMemo } from "react";
import Section from "./index";
import Image from "../../../../components/Shared/Image/Image";
import Card from "react-bootstrap/Card";
import { Button } from "flowbite-react";

export default function Services({ data }) {
  const intro = useMemo(() => data && data[0], [data]);
  const cardsInfo = useMemo(
    () => data && data.filter((card, index) => index !== 0),
    [data]
  );

  return (
    intro &&
    cardsInfo && (
      <>
        <Section id="servicos" bg="bg-accent">
          <div>
            <div className="container">
              <h2 className="italic xs:w-11/12 lg:w-1/2 mx-auto text-4xl font-black text-secondary">
                {intro.title}
              </h2>
              <p className="italic text-lg mx-auto text-center font-medium lg:w-1/2 w-11/12 my-4">
                {intro.description}
              </p>
            </div>
            <div className="italic container md:flex md:flex-wrap md:justify-center md:items-center xxs:block xxs:mx-auto">
              {cardsInfo &&
                cardsInfo.map((infoObj, index) => (
                  <div
                    key={infoObj.title}
                    className="md:w-5/12 xxs:w-11/12 lg:w-3/12 m-4 rounded-2xl"
                    style={{ flex: "1 0 auto" }}
                  >
                    <Card
                      bg="light"
                      border="secoundary"
                      className="h-80 flex flex-col justify-between rounded-4"
                    >
                      <Card.Body>
                        <Card.Title className="font-bold text-3xl m-3 justify-normal">
                          {infoObj.title}
                        </Card.Title>
                        <Card.Text>{infoObj.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mx-auto">
              <Button className="mt-8 bg-secondary p-8 rounded-xl" href="/galeria">
                <h2 className="text-[24px] italic">Saiba mais!</h2>
              </Button>
            </div>
          </div>
        </Section>
      </>
    )
  );
}
