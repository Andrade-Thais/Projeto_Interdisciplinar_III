import { Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaxPhotosForAFolder } from "../../../../../helpers/gallery/getMaxPhotosForAFolder";
import { useEffect, useState } from "react";

const FolderCard = ({
  folderTitle,
  photosNumber,
  foldersNumber,
  folderId,
  userRole,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [maxPhotosNumber, setMaxPhotosNumber] = useState(0);

  useEffect(() => {
    getMaxPhotosForAFolder(photosNumber, foldersNumber)
      .then((photos) => {
        setMaxPhotosNumber(photos);
      })
      .catch((error) => {
        console.error("Failed to fetch photos:", error);
      });
  }, [photosNumber, foldersNumber]);

  const handleButtonClick = () => {
    if (userRole === "admin") {
      navigate(`/app/galerias/${id}/pastas/${folderId}`, {
        state: { maxPhotosNumber },
      });
    }
    if (userRole === "user") {
      navigate(`/app/galerias/${id}/pastas/${folderId}/cliente`, {
        state: { maxPhotosNumber },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 text-center border-success rounded-md m-4 p-4">
      <h4 className="text-lg font-bold text-gray-700 mb-2">{folderTitle}</h4>
      <p className="text-sm text-gray-600 mb-4">
        Quantidade de fotos permitidas na pasta: {maxPhotosNumber}
      </p>
      <Button
        className="bg-success text-white rounded-md hover:bg-green-600 transition-colors duration-200 ease-in-out w-11/12"
        onClick={handleButtonClick}
      >
        Acessar Pasta
      </Button>
    </div>
  );
};

export default FolderCard;
