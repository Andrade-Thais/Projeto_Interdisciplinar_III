export const handleUploadPhotos = async (
  acceptedFiles,
  id,
  pastaId,
  setPhotos,
  currentPhotos,
  setModal
) => {
  const url = `http://localhost:8000/app/galerias/${id}/pasta/${pastaId}/upload-imagem/`;
  const formData = new FormData();

  acceptedFiles.forEach((file) => {
    formData.append("photos", file);
  });

  const response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();

  if (data.photos) {
    const newPhotosData = data.photos.filter(
      (photo) => !currentPhotos.includes(photo)
    );

    const newPhotosPromises = newPhotosData.map(async (photo) => {
      const downloadUrl = `http://localhost:8000/app/galerias/${id}/fotos/${photo}/download/`;
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    });

    const newPhotos = await Promise.all(newPhotosPromises);
    setPhotos((currentPhotos) => [...currentPhotos, ...newPhotos]);
  }
  setModal({
    isOpen: true,
    message:
      "Imagens enviadas com sucesso! Recarregue a página para visualizar as novas fotos.",
    handleCloseModal: () => setModal({ isOpen: false }),
  });
  window.location.reload();
};

export const handleUploadDocuments = async (
  acceptedFiles,
  galleryId,
  folderId,
  setDocuments,
  currentDocuments,
  setModal
) => {
  const url = `http://localhost:8000/app/galerias/${galleryId}/pasta/${folderId}/upload-documento/`;
  const formData = new FormData();

  acceptedFiles.forEach((file) => {
    formData.append("documents", file);
  });

  const response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();

  if (data.documents) {
    const newDocumentsData = data.documents.filter(
      (document) => !currentDocuments.includes(document)
    );

    const newDocumentsPromises = newDocumentsData.map(async (photo) => {
      const downloadUrl = `http://localhost:8000/app/galerias/${galleryId}/documentos/${photo}/download/`;
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    });

    const newDocumentsUrls = await Promise.all(newDocumentsPromises);

    setDocuments((currentDocuments) => [
      ...currentDocuments,
      ...newDocumentsUrls,
    ]);
  }
  setModal({
    isOpen: true,
    message:
      "Documentos enviados com sucesso! Recarregue a página para visualizar os novos documentos.",
    handleCloseModal: () => setModal({ isOpen: false }),
  });
  window.location.reload();
};
