from fastapi import APIRouter, HTTPException
from models.gallery.Gallery import Gallery
from config.mongodb_config import colecaoGallery
from helpers.client.get_client_by_id import search_client_by_id
from bson.objectid import ObjectId

router = APIRouter()

@router.post("/app/galerias/")
async def criar_galeria(galeria: Gallery):
    cliente = search_client_by_id(galeria.clientAssociated)    
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    if cliente['registryType'] == "Prospecção":
        raise HTTPException(status_code=400, detail="Não é permitido criar uma galeria para um cliente em prospecção")
    
    result = colecaoGallery.insert_one(galeria.dict(exclude={"id"}))
    inserted_id = str(result.inserted_id)
    colecaoGallery.update_one({"_id": ObjectId(inserted_id)}, {"$set": {"id": inserted_id}})
    return {"id": inserted_id}