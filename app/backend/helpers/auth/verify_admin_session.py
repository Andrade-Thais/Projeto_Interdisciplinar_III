import logging
from fastapi import HTTPException, Request
from dotenv import load_dotenv
from jose import JWTError, jwt
import os

load_dotenv()
logging.basicConfig(level=logging.INFO)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

async def verify_admin_session(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Não Autorizado. Faça login para continuar.")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido.")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido.")
    
    if role is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if role != "admin":
        raise HTTPException(status_code=403, detail="Erro: Acesso negado.")
    
    return role