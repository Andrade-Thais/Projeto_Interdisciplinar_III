from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoGallery, colecaoGridFs
from bson import ObjectId
import bson

router = APIRouter()

@router.delete("/app/galerias/{galeria_id}/delete")
async def deletar_galeria(galeria_id: str):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    for foto_id in galeria.get("fotos", []):
        colecaoGridFs.delete(ObjectId(foto_id))

    delete_result = colecaoGallery.delete_one({"_id": obj_id})

    if delete_result.deleted_count == 1:
        return {"info": "Galeria e fotos excluídas com sucesso"}
    else:
        raise HTTPException(status_code=500, detail="Erro ao excluir galeria e fotos")