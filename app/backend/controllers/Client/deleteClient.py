from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoClient
from bson.objectid import ObjectId
router = APIRouter()

@router.delete('/app/excluir-cliente/{id}')
def deletar_cliente(id: str):
    id = ObjectId(id)
    try:
        cliente_existente = colecaoClient.find_one({"_id": id})
        if cliente_existente is None:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")
        
        colecaoClient.delete_one({"_id": id})
        return {"Aviso":"Cliente Excluido com Sucesso"}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))