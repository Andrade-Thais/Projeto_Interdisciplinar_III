import { useMemo } from "react";
import Image from "../../../../components/Shared/Image/Image";
import Section from "./index";
import Button from "react-bootstrap/Button";

export default function About({ data }) {
  const logo = useMemo(() => data && data[0], [data]);
  const title = useMemo(() => data && data[1], [data]);
  const description = useMemo(() => data && data[2], [data]);
  const button = useMemo(() => data && data[3], [data]);
  const imgGallery = useMemo(() => data && data[4] && data[4].src, [data]);

  return (
    <Section id="sobre-mim">
      {logo && title && description && button && imgGallery && (
        <div className="container">
          <div className="row">
            <h2 className="italic col-lg-6 xs:w-11/12 lg:w-1/2 mx-auto text-4xl font-black text-secondary m-40 p-10">
              {title.payload}
              <p className="text-lg mx-auto text-center font-medium w-11/12 my-4">
                {description.payload}
              </p>
              <Button
                  variant="secondary"
                  href={button.href}
                  className="my-4 md:p-4 lg:mx-auto"
                >
                  {button.payload}
                </Button>
            </h2>

            <div className="col-lg-6 xs:w-11/12 lg:w-1/3 mx-auto">
              <Image
                src={imgGallery}
                alt="imagem"
                className="mx-auto w-11/12 lg:w-3/4 my-4"
              />
            </div>

            <div className="intro flex items-center justify-center flex-wrap">
              <div className="intro__title block mx-auto">
                
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
