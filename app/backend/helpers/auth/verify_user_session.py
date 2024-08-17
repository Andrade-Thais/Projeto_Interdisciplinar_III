from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from jose import JWTError, jwt
import os

load_dotenv()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="app/login-user", auto_error=False)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

async def verify_user_session(token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=401, detail="Não Autorizado. Faça login para continuar.")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if role != "user":
            raise HTTPException(status_code=403, detail="Erro: Acesso negado.")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido.")