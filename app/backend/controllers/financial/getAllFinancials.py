from fastapi import APIRouter, HTTPException
from helpers.financial.consultar_banco_financial import consultar_banco_financial

router = APIRouter()

@router.get('/app/consultar-registros')
def banco():
    try:
        registros = consultar_banco_financial()
        return registros
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
