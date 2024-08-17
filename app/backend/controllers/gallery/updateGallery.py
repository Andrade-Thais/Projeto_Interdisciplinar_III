from fastapi import APIRouter, HTTPException
from datetime import datetime
from models.gallery.Gallery import Gallery, Folder
from config.mongodb_config import colecaoGallery
from bson import ObjectId

router = APIRouter()

@router.put("/app/galerias/{galeria_id}")
async def atualizar_galeria(galeria_id: str, updated_gallery: Gallery):
    try:
        obj_galeria_id = ObjectId(galeria_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    # Verificar se a galeria existe
    galeria_existente = colecaoGallery.find_one({"_id": obj_galeria_id})
    if not galeria_existente:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    title = updated_gallery.title
    category = updated_gallery.category
    defaultSize = updated_gallery.defaultSize
    createdAt = updated_gallery.createdAt
    photosNumber = updated_gallery.photosNumber
    clientAssociated = updated_gallery.clientAssociated


    # Construir o documento de atualização
    update_doc = {
        "$set": {
            "title": title,
            "category": category,
            "defaultSize": defaultSize,
            "createdAt": createdAt,
            "photosNumber": photosNumber,
            "clientAssociated": clientAssociated
        }
    }

    try:
        # Executar a atualização
        result = colecaoGallery.update_one({"_id": obj_galeria_id}, update_doc)

        # Verificar se houve modificação
        if result.modified_count == 1:
            return {"message": "Galeria atualizada com sucesso"}
        else:
            return {"message": "Nenhuma modificação realizada na galeria"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar galeria: {str(e)}")