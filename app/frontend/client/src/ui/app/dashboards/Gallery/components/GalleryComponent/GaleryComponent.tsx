import React, { useEffect, useState } from "react";
import { getClientList } from "../../../../../../helpers/gallery/getClientList";
import { HelperText } from "flowbite-react";
import {
  fetchAllGalleries,
  fetchGallery,
} from "../../../../../../services/GalleryDataService";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../../../../../utils/capitalize";

export default function GaleryComponent({ currentPage }) {
  const [galleries, setGalleries] = useState([]);
  const [clientNames, setClientNames] = useState({});
  const [selectedGallery, setSelectedGallery] = useState(null);

  //Lógica de paginação
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedGalleries = galleries.slice(startIndex, endIndex);

  const navigate = useNavigate();
  useEffect(() => {
    fetchAllGalleries().then((data) => {
      setGalleries(data);
    });

    getClientList().then((clients) => {
      const names = {};
      clients.forEach((client) => {
        names[client.id] = client.fullName;
      });
      setClientNames(names);
    });
  }, []);

  const handleGalleryClick = async (id) => {
    const gallery = await fetchGallery(id);
    setSelectedGallery(gallery);
    navigate(`/app/galerias/${id}`);
  };
  return (
    <>
      {displayedGalleries &&
        displayedGalleries.map((gallery) => (
          <div
            className="flex justify-between items-center mx-auto my-4 lg:w-9/12 xxs:w-11/12 p-4 bg-gray-50 drop-shadow-sm rounded-3 hover:bg-accent hover:cursor-pointer"
            onClick={() => {
              handleGalleryClick(gallery.id);
            }}
          >
            <div className="flex flex-column">
              <HelperText>{gallery.title}</HelperText>
              <HelperText>Fotos do pacote - {gallery.photosNumber}</HelperText>
            </div>
            <HelperText>
              {clientNames && clientNames[gallery.clientAssociated]
                ? capitalize(clientNames[gallery.clientAssociated])
                : ""}
            </HelperText>
          </div>
        ))}
    </>
  );
}
