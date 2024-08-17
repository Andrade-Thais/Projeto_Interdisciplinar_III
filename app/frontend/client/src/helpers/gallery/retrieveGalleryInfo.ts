import { getGalleryList } from "./getGalleryList";
import {
  deleteDocumentFromGallery,
  deletePhotoFromGallery,
  fetchDocumentById,
  fetchFolderById,
  fetchGallery,
  fetchImageById,
} from "../../services/GalleryDataService";

export async function retrieveGalleryInfo(galleryId) {
  try {
    const galleries = await getGalleryList();
    const gallery = galleries.find((gallery) => gallery.id === galleryId);

    if (!gallery) {
      console.error("Gallery not found...");
      return;
    }

    return gallery;
  } catch (error) {
    console.error("Erro ao buscar informações do cliente...", error);
  }
}

export const fetchGalleryData = async (id, pastaId) => {
  //Fetch das informações da galeria e da pasta
  const [galleryResponse, folderResponse] = await Promise.all([
    fetchGallery(id),
    fetchFolderById(id, pastaId),
  ]);

  //Fetch das imagens da pasta
  let pictures = [];
  if (folderResponse.photos) {
    const uniquePhotos = new Set(folderResponse.photos);
    const fetchImagePromises = Array.from(uniquePhotos).map((photo) => {
      return fetchImageById(id, photo);
    });
    pictures = await Promise.all(fetchImagePromises);
  }

  let documents = [];
  if (folderResponse.documents) {
    documents = folderResponse.documents;
    const fetchDocumentPromises = folderResponse.documents.map((document) => {
      return fetchDocumentById(id, document);
    });
    documents = await Promise.all(fetchDocumentPromises);
  }

  return { galleryResponse, folderResponse, pictures, documents };
};

export const handleImageSelect = (prevSelectedImages, index) => {
  if (prevSelectedImages[index]) {
    // Se a imagem está selecionada, criaremos um objeto sem a imagem.
    const newSelectedImages = { ...prevSelectedImages };
    delete newSelectedImages[index];
    return newSelectedImages;
  } else {
    // Caso contrário, criaremos um objeto com a imagem selecionada
    return [...prevSelectedImages, prevSelectedImages[index]];
  }
};

export const handleImageDelete = async (galleryId, images) => {
  console.log(images);
  const response = Promise.all(
    images.map((image) => {
      return deletePhotoFromGallery(galleryId, image);
    })
  );
  return response;
};

export const handleDocumentDelete = async (galleryId, documents) => {
  const response = Promise.all(
    documents.map((document) => {
      return deleteDocumentFromGallery(galleryId, document);
    })
  );
  return response;
};
