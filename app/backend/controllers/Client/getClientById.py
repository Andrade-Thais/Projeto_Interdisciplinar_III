from bson import ObjectId
from fastapi import APIRouter, HTTPException, Depends
from fastapi.param_functions import Query
from helpers.client.consultar_documento import consultar_documento
from models.client.Cliente import Cliente

router = APIRouter()

@router.get('/app/consultar-cliente', response_model=Cliente)
def buscarClientePorId(id: str = Query(None, alias="id")): 
    id = id.strip('\"')
    id = ObjectId(id)
    try:
        cliente = consultar_documento(id) 
        if cliente is None:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")
        return cliente
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))