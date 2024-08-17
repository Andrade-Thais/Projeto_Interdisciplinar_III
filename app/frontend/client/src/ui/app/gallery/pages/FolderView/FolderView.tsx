import UserNavbar from "../../../components/UserNavbar";
import DropZone from "../../components/DropZone/DropZone";
import Image from "../../../../../components/Shared/Image/Image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../../../portfolio/components/Sections/Footer";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import Loading from "../../../../loading/Loading";
import {
  fetchGalleryData,
  handleDocumentDelete,
  handleImageDelete,
} from "../../../../../helpers/gallery/retrieveGalleryInfo";
import {
  acceptedImageTypes,
  acceptedDocumentTypes,
} from "../../../../../lib/gallery/filetypes/filtetypes";
import { Button, Dropdown } from "flowbite-react";
import SuccessModal from "../../../modals/gallery/Infos/Success/Success";
import ErrorModal from "../../../modals/gallery/Infos/Error/Error";
import ConfirmDeleteModal from "../../../modals/gallery/Warnings/ConfirmDelete/ConfirmDelete";
import PdfCard from "../../components/PdfCard/PdfCard";
import { getMaxPhotosForAFolder } from "../../../../../helpers/gallery/getMaxPhotosForAFolder";
import { FaEllipsisV } from "react-icons/fa";
import { deleteFolder } from "../../../../../services/GalleryDataService";
import { MdDelete } from "react-icons/md";
import { useUserType } from "../../../../../contexts/auth/UserRoleContext";

export default function FolderView({ userRole }) {
  const navigate = useNavigate();

  const { id, pastaId } = useParams();
  const [state, setState] = useState({
    galleryFetched: {},
    folderFetched: {},
    pictures: [],
    documents: [],
    selectedImages: [],
    unselectedImages: [],
    selectedDocuments: [],
    loading: true,
    modal: {
      isOpen: false,
      message: "",
      type: "",
      handleCloseModal: () => {},
      handleConfirmAction: () => {},
    },
  });

  const fetchGalleryDataCallback = useCallback(async () => {
    const { galleryResponse, folderResponse, pictures, documents } =
      await fetchGalleryData(id, pastaId);
    setState((prevState) => ({
      ...prevState,
      galleryFetched: galleryResponse,
      folderFetched: folderResponse,
      pictures,
      documents,
      unselectedImages: folderResponse.photos,
      loading: false,
    }));
  }, [id, pastaId]);

  const handleImageSelectCallback = async (index) => {
    const selectedImageId = state.folderFetched.photos[index];

    let newSelectedImages, newUnselectedImages;
    if (state.selectedImages.includes(selectedImageId)) {
      newSelectedImages = state.selectedImages.filter(
        (id) => id !== selectedImageId
      );
      newUnselectedImages = [...state.unselectedImages, selectedImageId];
    } else {
      newSelectedImages = [...state.selectedImages, selectedImageId];
      newUnselectedImages = state.unselectedImages.filter(
        (id) => id !== selectedImageId
      );
    }

    // Lógica de limitação de seleção de fotos para clientes
    if (userRole === "user") {
      const maxPhotos = await getMaxPhotosForAFolder(
        state.galleryFetched.photosNumber,
        state.galleryFetched.folders.length
      );
      if (newSelectedImages.length > maxPhotos) {
        setModal({
          isOpen: true,
          type: "Error",
          message: `Você atingiu o limite de seleção. Você pode escolher apenas ${maxPhotos} fotos por pasta.`,
          handleCloseModal: () => {
            setModal({ ...state.modal, isOpen: false });
          },
        });
        newSelectedImages.pop();
        newUnselectedImages.push(selectedImageId);
      }
    }

    setState((prevState) => ({
      ...prevState,
      selectedImages: newSelectedImages,
      unselectedImages: newUnselectedImages,
    }));
  };

  const handleDocumentSelectCallback = (index) => {
    setState((prevState) => {
      const selectedDocumentId = state.folderFetched.documents[index];
      const newSelectedDocuments = prevState.selectedDocuments.includes(
        selectedDocumentId
      )
        ? prevState.selectedDocuments.filter((id) => id !== selectedDocumentId)
        : [...prevState.selectedDocuments, selectedDocumentId];
      return { ...prevState, selectedDocuments: newSelectedDocuments };
    });
  };

  const handleDocumentDeleteCallback = useCallback(async () => {
    await handleDocumentDelete(id, state.selectedDocuments);
  }, [id, state.selectedDocuments]);

  const handleImageDeleteCallback = useCallback(async () => {
    if (userRole === "admin") {
      await handleImageDelete(id, state.selectedImages);
    }
    if (userRole === "user") {
      await handleImageDelete(id, state.unselectedImages);
    }
  }, [id, userRole, state.selectedImages, state.unselectedImages]);

  const setPictures = (newPictures) => {
    setState((prevState) => ({ ...prevState, pictures: newPictures }));
  };

  const setModal = (newModalState) => {
    setState((prevState) => ({
      ...prevState,
      modal: { ...prevState.modal, ...newModalState },
    }));
  };

  useEffect(() => {
    fetchGalleryDataCallback();
  }, [fetchGalleryDataCallback]);

  const blobUrls = useMemo(
    () => state.pictures.map((blob) => URL.createObjectURL(blob)),
    [state.pictures]
  );
  const documentUrls = useMemo(
    () => state.documents.map((blob) => URL.createObjectURL(blob)),
    [state.documents]
  );

  if (state.loading) {
    return <Loading />;
  }

  return (
    <>
      <UserNavbar />
      {userRole === "admin" ? (
        <BreadCrumb
          home={["Página Inicial", "/app"]}
          currentSection={["Galerias", "/app/galerias/"]}
          currentSubsection={[
            state.galleryFetched.title,
            "/app/galerias/" + id,
          ]}
          currentSubsection2={[
            state.folderFetched.title,
            "/app/galerias/" + id + "/pastas/" + pastaId,
          ]}
        />
      ) : (
        <BreadCrumb
          home={["Página Inicial", "/404"]}
          currentSection={["Galerias", ""]}
          currentSubsection={[
            state.galleryFetched.title,
            "/app/galerias/" + id + "/cliente",
          ]}
          currentSubsection2={[
            state.folderFetched.title,
            "/app/galerias/" + id + "/pastas/" + pastaId + "/cliente",
          ]}
        />
      )}

      <div className="xs:w-11/12 lg:w-5/6 mx-auto bg-[#f9f9f9] p-4 my-4 rounded-md">
        {userRole === "admin" && (
          <Dropdown
            className="absolute top-0 right-0"
            label={<FaEllipsisV />}
            color="light"
          >
            <Dropdown.Item
              onClick={() =>
                setModal({
                  isOpen: true,
                  type: "ConfirmDelete",
                  message:
                    "Tem certeza que deseja excluir esta pasta? Todas as fotos e documentos associados a ela serão excluídos.",
                  handleClose: () =>
                    setModal({ ...state.modal, isOpen: false }),
                  handleConfirmAction: () => {
                    deleteFolder(id, pastaId).then((data) => {
                      setModal({ ...state.modal, isOpen: false });
                      navigate("/app/galerias/" + id);
                    });
                  },
                })
              }
              icon={MdDelete}
            >
              Excluir Pasta
            </Dropdown.Item>
          </Dropdown>
        )}
        <h4 className="text-3xl font-bold text-center mb-9 text-secondary">
          {state.folderFetched && state.folderFetched.title}
        </h4>
        <h4 className="text-2xl font-bold text-center mb-9 text-secondary">
          Fotos
        </h4>

        <div className="w-full">
          {userRole === "admin" && (
            <DropZone
              setPhotos={setPictures}
              acceptedFileTypes={acceptedImageTypes}
              introText="Arraste e solte arquivos aqui, ou clique para selecionar imagens."
              supportedFiles="Formatos suportados: .jpeg, .jpg, .png"
              handleDrop={() => {
                setModal({
                  isOpen: true,
                  type: "Success",
                  message:
                    "Imagens enviadas com sucesso! Recarregue a página para visualização.",
                  handleCloseModal: () => {
                    setModal({ ...state.modal, isOpen: false });
                    window.location.reload();
                  },
                });
              }}
              handleDropRejected={() => {
                setModal({
                  isOpen: true,
                  type: "Error",
                  message:
                    "Arquivo não suportado. Tente novamente com os formatos de arquivos suportados.",
                  handleCloseModal: () => {
                    setModal({ ...state.modal, isOpen: false });
                    window.location.reload();
                  },
                });
              }}
              setModal={setModal}
              setDocuments={state.documents}
            />
          )}
        </div>
        <p className="mt-2 mb-4">
          {userRole === "admin"
            ? "Ao selecionar as fotos, você poderá excluí-las em lote, e, ao finalizar o upload na pasta, deverá enviar o link de acesso para o cliente; caso o cliente não selecione as fotos em até sete dias úteis, a galeria será automaticamente excluída."
            : "Selecione as fotos que mais deseja. Ao finalizar a seleção, as fotos não selecionadas serão automaticamente excluídas e a fotógrafa prosseguirá com o tratamento das fotos selecionadas!"}{" "}
        </p>
        {state.selectedImages.length > 0 &&
          (userRole === "admin" ? (
            <Button
              className="bg-red-400 lg:w-1/3 xxs:w-11/12 my-12 mx-auto hover:bg-red-600"
              onClick={() => {
                setModal({
                  isOpen: true,
                  type: "ConfirmDelete",
                  message:
                    "Tem certeza que deseja excluir as fotos selecionadas?",
                  handleCloseModal: () => {
                    setModal({ ...state.modal, isOpen: false });
                  },
                  handleConfirmAction: () => {
                    handleImageDeleteCallback();
                    setModal({
                      ...state.modal,
                      isOpen: true,
                      type: "Success",
                      message:
                        "Imagens excluídas com sucesso! Recarregue a página.",
                      handleCloseModal: () => {
                        setModal({ ...state.modal, isOpen: false });
                        window.location.reload();
                      },
                    });
                  },
                });
              }}
            >
              Excluir fotos selecionadas
            </Button>
          ) : (
            <Button
              className="bg-green-400 lg:w-1/3 xxs:w-11/12 my-12 mx-auto hover:bg-green-600"
              onClick={() => {
                setModal({
                  isOpen: true,
                  type: "ConfirmDelete",
                  message:
                    "Deseja proceder com as fotos selecionadas? Não será possível desfazer essa ação!",
                  handleCloseModal: () => {
                    setModal({ ...state.modal, isOpen: false });
                  },
                  handleConfirmAction: () => {
                    handleImageDeleteCallback();
                    setModal({
                      ...state.modal,
                      isOpen: true,
                      type: "Success",
                      message:
                        "Imagens selecionadas com sucesso! Em até 7 dias úteis, você receberá um e-mail de confirmação para baixar as fotos selecionadas.",
                      handleCloseModal: () => {
                        setModal({ ...state.modal, isOpen: false });
                        window.location.reload();
                      },
                    });
                  },
                });
              }}
            >
              Proceder com as fotos selecionadas
            </Button>
          ))}
        <div className="lg:w-full grid lg:grid-cols-3 gap-8 md:grid-cols-2 xxs:grid-cols-1">
          {!state.loading && state.pictures.length === 0 && (
            <div className="flex justify-center w-full"></div>
          )}
          {!state.loading && state.pictures.length === 0 && (
            <div className="flex justify-center w-full">
              <p className="text-center">
                {userRole === "admin"
                  ? "Nenhuma imagem adicionada"
                  : "Nenhuma imagem selecionada"}
                .
              </p>
            </div>
          )}
          {blobUrls.map((blobUrl, index) => (
            <ImageComponent
              key={index}
              src={blobUrl}
              alt={`Foto ${index + 1}`}
              isSelected={
                state.selectedImages.includes(
                  state.folderFetched.photos[index]
                ) || false
              }
              onSelect={() => handleImageSelectCallback(index)}
            />
          ))}
        </div>
        <div className="w-full">
          <h4 className="text-2xl font-bold text-center mt-20 text-secondary">
            Documentos
          </h4>
          {userRole === "admin" && (
            <DropZone
              acceptedFileTypes={acceptedDocumentTypes}
              introText="Arraste e solte arquivos aqui, ou clique para selecionar documentos."
              supportedFiles="Formatos suportados: .pdf"
              currentDocuments={state.documents}
              setDocuments={state.documents}
              handleDrop={() => {
                setModal({
                  isOpen: true,
                  type: "Success",
                  message:
                    "Documentos enviados com sucesso! Recarregue a página para visualização.",
                  handleCloseModal: () => {
                    setModal({ ...state.modal, isOpen: false });
                    window.location.reload();
                  },
                });
              }}
              handleDropRejected={() => {
                setModal({
                  isOpen: true,
                  type: "Error",
                  message:
                    "Arquivo não suportado. Tente novamente com os formatos de arquivos suportados.",
                  handleCloseModal: () => {
                    setModal({ ...state.modal, isOpen: false });
                    window.location.reload();
                  },
                });
              }}
            />
          )}
        </div>
        <p className="mt-2 mb-4">
          {userRole === "admin" ? "Ao selecionar os documentos, você poderá excluí-los em lote, caso necessário." : "Baixe seus documentos relacionados abaixo!"}
        </p>
        {state.selectedDocuments.length > 0 && (
          <Button
            className="bg-red-400 lg:w-1/3 xxs:w-11/12 my-12 mx-auto hover:bg-red-600"
            onClick={() => {
              setModal({
                isOpen: true,
                type: "ConfirmDelete",
                message:
                  "Tem certeza que deseja excluir os documentos selecionados?",
                handleCloseModal: () => {
                  setModal({ ...state.modal, isOpen: false });
                },
                handleConfirmAction: () => {
                  handleDocumentDeleteCallback();
                  setModal({
                    ...state.modal,
                    isOpen: true,
                    type: "Success",
                    message:
                      "Documentos excluídos com sucesso! Recarregue a página.",
                    handleCloseModal: () => {
                      setModal({ ...state.modal, isOpen: false });
                      window.location.reload();
                    },
                  });
                },
              });
            }}
          >
            Excluir documentos selecionados
          </Button>
        )}
        {state.documents.length === 0 && (
          <div className="flex justify-center w-full">
            <p className="text-center">Nenhum documento adicionado.</p>
          </div>
        )}
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {documentUrls &&
            documentUrls.map((document, index) => (
              <PdfCard
                userRole={userRole}
                key={index}
                pdf={document}
                title={`Documento ${index + 1}`}
                onSelect={() => handleDocumentSelectCallback(index)}
              />
            ))}
        </div>
      </div>
      <Footer />
      <RenderModal modal={state.modal} setModal={setModal} />
    </>
  );
}

const RenderModal = ({ modal, setModal }) => {
  switch (modal.type) {
    case "Success":
      return (
        <SuccessModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={modal.handleCloseModal}
        />
      );
    case "Error":
      return (
        <ErrorModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={modal.handleCloseModal}
        />
      );
    case "ConfirmDelete":
      return (
        <ConfirmDeleteModal
          modal={modal}
          setModal={setModal}
          handleCloseModal={modal.handleCloseModal}
          handleConfirmAction={modal.handleConfirmAction}
        />
      );
    default:
      return null;
  }
};

const ImageComponent = React.memo(({ src, alt, isSelected, onSelect }) => (
  <div className="relative">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={onSelect}
      className="absolute top-0 right-0 m-2 h-6 w-6 rounded-full z-10"
    />
    <Image
      src={src}
      alt={alt}
      className={`w-full h-64 object-cover rounded-md transform transition-transform duration-500 ${
        isSelected ? "scale-105" : ""
      }`}
    />
  </div>
));
