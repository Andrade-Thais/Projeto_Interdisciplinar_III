import { Button, HelperText } from "flowbite-react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../../portfolio/components/Sections/Footer";
import Searchbar from "./components/Searchbar/Searchbar";
import GaleryComponent from "./components/GalleryComponent/GaleryComponent";
import { PaginationComponent } from "./components/PaginationComponent/PaginationComponent";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchAllGalleries } from "../../../../services/GalleryDataService";

export default function GalleryDashboard() {
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchAllGalleries().then((data) => {
      setTotalItems(data.length);
    });
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
      <UserNavbar />
      <h1 className="text-center text-4xl font-bold mt-10 text-secondary italic">
        Gerenciamento de Galerias
      </h1>
      <HelperText className="text-center text-md mt-4">
        Bem-vindo(a) ao Gerenciamento de galerias! Esta seção foi projetada para
        ajudá-lo(a) a gerenciar suas galerias com facilidade.
      </HelperText>
      <Button
        href="/app/nova-galeria"
        className="mt-4 lg:w-1/6 py-4 mx-auto text-lg bg-secondary"
      >
        <FaPlus className="text-xl mr-2" />
        Nova Galeria
      </Button>
      <Searchbar />
      <GaleryComponent currentPage={currentPage} />
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
      <Footer />
    </>
  );
}
