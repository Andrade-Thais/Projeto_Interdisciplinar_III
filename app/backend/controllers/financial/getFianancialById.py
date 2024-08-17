from bson import ObjectId
from fastapi import APIRouter, HTTPException, Depends
from fastapi.param_functions import Query
from helpers.financial.consultar_documento_financial import consultar_documento_financial
from models.financial.Register import Register

router = APIRouter()

@router.get('/app/consultar-registro', response_model=Register)
def buscarRegistroPorId(id: str = Query(None, alias="id")): 
    id = id.strip('\"')
    id = ObjectId(id)
    try:
        registro = consultar_documento_financial(id) 
        if registro is None:
            raise HTTPException(status_code=404, detail="Registro não encontrado")
        return registro
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))