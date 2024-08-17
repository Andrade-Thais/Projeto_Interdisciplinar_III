import { fetchAllGalleries } from "../../services/GalleryDataService";

export async function getGalleryList() {
  try {
    const response = await fetchAllGalleries();
    return response;
  } catch (error) {
    console.error("Erro ao buscar galerias...", error);
  }
}
