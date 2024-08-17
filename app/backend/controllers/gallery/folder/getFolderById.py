from fastapi import APIRouter, HTTPException
from models.gallery.Folder import Folder
from config.mongodb_config import colecaoGallery
from bson import ObjectId, errors

router = APIRouter()

@router.get("/app/galerias/{galeria_id}/pastas/{pasta_id}", response_model=Folder)
async def buscar_pasta_por_id(galeria_id: str, pasta_id: str):
    try:
        obj_id = ObjectId(galeria_id)
    except errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if galeria:
        galeria['_id'] = str(galeria['_id'])
        for folder in galeria.get('folders', []):
            if folder['id'] == pasta_id:
                return folder
        raise HTTPException(status_code=404, detail="Pasta não encontrada")
    else:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")