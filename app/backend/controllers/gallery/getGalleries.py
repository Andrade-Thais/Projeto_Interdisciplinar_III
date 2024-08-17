from fastapi import APIRouter, HTTPException
from typing import List
from models.gallery.Gallery import Gallery
from config.mongodb_config import colecaoGallery

router = APIRouter()

@router.get("/app/galerias/", response_model=List[Gallery])
async def listar_todas_galerias():
    try:
        result = list(colecaoGallery.find())
        galerias = []
        for galeria in result:
            galeria['_id'] = str(galeria['_id'])
            galeria_model = Gallery(**galeria)
            galerias.append(galeria_model)
        return galerias
    except Exception as e:
        print(f"Erro ao consultar o banco: {e}")
        raise HTTPException(status_code=500, detail="Erro ao acessar o banco de dados")