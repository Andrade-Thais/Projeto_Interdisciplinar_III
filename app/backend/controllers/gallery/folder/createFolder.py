from fastapi import APIRouter, HTTPException, Body
from bson import ObjectId
from config.mongodb_config import colecaoGallery
from models.gallery.Folder import Folder
import bson

router = APIRouter()

@router.post("/app/folder/{galeria_id}")
async def criar_pasta(galeria_id: str, folder: Folder):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    pasta_existente = next((f for f in galeria.get("folders", []) if f["title"] == folder.title), None)
    if pasta_existente:
        return {"info": f"Pasta '{folder.title}' já existe na galeria com ID: {galeria_id}"}
    else:
        nova_pasta = {
            "id": ObjectId().__str__(),
            "title": folder.title,
            "photos": [],
            "documents": []
            }
        colecaoGallery.update_one(
            {"_id": obj_id},
            {"$push": {"folders": nova_pasta}}
        )

        return {"info": f"Pasta '{folder.title}' criada na galeria com ID: {galeria_id}"}