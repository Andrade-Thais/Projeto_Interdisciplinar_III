from fastapi import APIRouter, Depends, HTTPException
from typing import List
from helpers.auth.verify_admin_session import verify_admin_session
from helpers.client.consultar_banco import consultar_banco
from models.client.Cliente import Cliente

router = APIRouter()


@router.get('/app/consultar-clientes', response_model=List[Cliente])
def banco():
    try:
        clientes = consultar_banco()
        return clientes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
