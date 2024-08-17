import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  handleUploadDocuments,
  handleUploadPhotos,
} from "../../../../../helpers/gallery/handleUpload";

export default function DropZone({
  setPhotos,
  setDocuments,
  currentDocuments,
  acceptedFileTypes,
  introText,
  supportedFiles,
  currentPhotos,
  handleDrop,
  handleDropRejected,
  setModal,
}) {
  const { id, pastaId } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes,
    multiple: true,

    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.type === "application/pdf") {
          handleUploadDocuments(
            [file],
            id,
            pastaId,
            setDocuments,
            currentDocuments,
            setModal
          );
        } else if (file.type.includes("image")) {
          handleUploadPhotos(
            [file],
            id,
            pastaId,
            setPhotos,
            currentPhotos,
            setModal
          );
        }
      });
      handleDrop && handleDrop();
    },
    onDropRejected: () => {
      handleDropRejected && handleDropRejected();
    },
  });

  return (
    <section
      {...getRootProps()}
      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer h-64 m-4"
    >
      <input {...getInputProps()} />
      <input multiple type="hidden" name="section" value="yourSectionValue" />
      <FaUpload className="text-4xl text-gray-400" />
      <p className="mt-2 text-sm text-center text-gray-600">{introText}</p>
      <p className="mt-2 text-sm text-center text-gray-600">{supportedFiles}</p>
    </section>
  );
}
