from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from config.mongodb_config import colecaoGallery, colecaoGridFs
from models.gallery.Folder import Folder
from bson import ObjectId
import bson
from fastapi.responses import StreamingResponse
import io

router = APIRouter()


@router.get("/app/galerias/{galeria_id}/fotos/{file_id}/download/")
async def download_foto(galeria_id: str, file_id: str):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    for pasta in galeria["folders"]:
        if file_id in pasta["photos"]:
            imagem_bytes = colecaoGridFs.get(ObjectId(file_id)).read()
            return StreamingResponse(io.BytesIO(imagem_bytes), media_type="image/jpeg")
        elif file_id in pasta["documents"]:
            documento_bytes = colecaoGridFs.get(ObjectId(file_id)).read()
            return StreamingResponse(io.BytesIO(documento_bytes), media_type="application/pdf")
    
    raise HTTPException(status_code=404, detail="Arquivo não encontrado")

@router.get("/app/galerias/{galeria_id}/documentos/{file_id}/download/")
async def download_documento(galeria_id: str, file_id: str):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    for pasta in galeria["folders"]:
        if file_id in pasta["documents"]:
            documento_bytes = colecaoGridFs.get(ObjectId(file_id)).read()
            return StreamingResponse(io.BytesIO(documento_bytes), media_type="application/pdf")
    
    raise HTTPException(status_code=404, detail="Documento não encontrado")