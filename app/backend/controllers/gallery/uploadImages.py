from typing import List
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from config.mongodb_config import colecaoGridFs
from config.mongodb_config import colecaoGallery
from models.gallery.Folder import Folder
import bson
from bson import ObjectId

router = APIRouter()

@router.put("/app/galerias/{galeria_id}/pasta/{pasta_id}/upload-imagem/")
async def upload_imagem(galeria_id: str, pasta_id: str, photos: List[UploadFile] = File(...)):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    pasta_existente = next((folder for folder in galeria.get("folders", []) if folder["id"] == pasta_id), None)
    if pasta_existente:
        for photo in photos:
            imagem_bytes = await photo.read()
            file_id_imagem = colecaoGridFs.put(imagem_bytes, filename=photo.filename)
            str_file_id_imagem = str(file_id_imagem)
    
            #Verifica se a imagem já existe na pasta
            if str_file_id_imagem not in pasta_existente['photos']:
                pasta_existente['photos'].append(str_file_id_imagem)
    
            colecaoGallery.update_one({"_id": obj_id}, {"$set": {"folders": galeria['folders']}})
            
    else:
        raise HTTPException(status_code=404, detail="Pasta não encontrada")

    return {'photos': pasta_existente['photos']}


@router.put("/app/galerias/{galeria_id}/pasta/{pasta_id}/upload-documento/")
async def upload_imagem(galeria_id: str, pasta_id: str, documents: UploadFile = File(...)):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    pasta_existente = next((folder for folder in galeria.get("folders", []) if folder["id"] == pasta_id), None)
    if pasta_existente:
        if documents:
            imagem_bytes = await documents.read()
            file_id_documento = colecaoGridFs.put(imagem_bytes, filename=documents.filename)
            str_file_id_documento = str(file_id_documento)

            pasta_existente['documents'].append(str_file_id_documento)

            colecaoGallery.update_one({"_id": obj_id}, {"$set": {"folders": galeria['folders']}})
            
            return {"info": f"Documento adicionado à pasta existente '{pasta_id}' na galeria com ID: {galeria_id}"}
        else:
            raise HTTPException(status_code=404, detail="Pasta não encontrada")
