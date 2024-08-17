from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoFinacial
from bson.objectid import ObjectId
router = APIRouter()

@router.delete('/app/excluir-registro/{id}')
def deletar_registro(id: str):
    id = ObjectId(id)
    try:
        registro_existente = colecaoFinacial.find_one({"_id": id})
        if registro_existente is None:
            raise HTTPException(status_code=404, detail="Registro não encontrado")
        
        colecaoFinacial.delete_one({"_id": id})
        return {"Aviso":"Registro Excluido com Sucesso"}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))