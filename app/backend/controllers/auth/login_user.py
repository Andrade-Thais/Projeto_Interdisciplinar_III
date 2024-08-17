import os
from helpers.auth.create_refresh_token import create_refresh_token
from helpers.auth.authenticate_user import authenticate_user
from helpers.auth.create_access_token import create_access_token
from dotenv import load_dotenv
from datetime import timedelta
from fastapi import APIRouter, HTTPException, Response


load_dotenv()
router = APIRouter()


API_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

@router.post("/app/login-user/{email}")
def login_user(response: Response, email: str):
    user = authenticate_user(email)
    if user is False:
        raise HTTPException(
            status_code=401,
            detail="Usuário não encontrado na base de dados.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, role="user",expires_delta=access_token_expires
    )
    
    response.set_cookie(
        key="access_token", 
        value=f"Bearer {access_token}", 
        httponly=True, 
        #secure=True, # Apenas para conexões HTTPS...
        max_age=access_token_expires.total_seconds()
    )
    
    
    return {"message": "Logado com sucesso!"}

