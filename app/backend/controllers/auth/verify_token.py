import logging
from fastapi import APIRouter, Depends, HTTPException, Request
from jose import JWTError, jwt
from dotenv import load_dotenv

import os

router = APIRouter()

load_dotenv() 

logging.basicConfig(level=logging.INFO)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

@router.get("/app/verify-token")
async def verify_token(request: Request):
    logging.info(f"Request cookies: {request.cookies}")
    token = request.cookies.get("access_token")
    logging.info(f"Token: {token}")
    if not token:
        raise HTTPException(
            status_code=401, 
            detail="Token não encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None or role is None:
            raise HTTPException(
                status_code=401, 
                detail="Não foi possível validar as credenciais",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        return {"status": "Token válido", "role": role, "token": "boa tentativa"}
    except JWTError:
        raise HTTPException(
            status_code=401, 
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )