from fastapi import APIRouter, HTTPException
from bson import ObjectId
from config.mongodb_config import colecaoGallery
from config.mongodb_config import colecaoGridFs
import bson
from fastapi.responses import StreamingResponse
import io

router = APIRouter()


@router.get("/galerias/{galeria_id}/fotos/{file_id}/download/")
async def download_foto(galeria_id: str, file_id: str):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")


    if file_id not in galeria["fotos"]:
        raise HTTPException(status_code=404, detail="Foto não encontrada")


    imagem_bytes = colecaoGridFs.get(ObjectId(file_id)).read()

    return StreamingResponse(io.BytesIO(imagem_bytes), media_type="image/jpeg") 