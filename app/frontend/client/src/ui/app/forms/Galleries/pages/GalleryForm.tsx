import Footer from "../../../../portfolio/components/Sections/Footer";
import UserNavbar from "../../../components/UserNavbar";
import NewGalleryForm from "../components/NewGalleryForm/NewGalleryForm";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";

const GalleryForm = () => {
  const { id } = useParams();
  return (
    <>
      <UserNavbar />
      {id ? (
        <>
          <BreadCrumb
            home={["Página Inicial", "/app"]}
            currentSection={["Galerias", "/app/galerias"]}
            currentSubsection={[
              "Editar Galeria",
              `/app/galerias/editar-galerias/${id}`,
            ]}
          />
          <NewGalleryForm id={id} />
        </>
      ) : (
        <>
          <BreadCrumb
            home={["Página Inicial", "/app"]}
            currentSection={["Galerias", "/app/galerias"]}
            currentSubsection={["Nova Galeria", "/app/galerias/nova-galeria"]}
          />
          <NewGalleryForm />
          <Footer />
        </>
      )}
    </>
  );
};

export default GalleryForm;
