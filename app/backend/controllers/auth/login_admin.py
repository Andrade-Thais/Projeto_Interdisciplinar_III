from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response
from middlewares.auth import AuthMiddleware
from helpers.auth.create_refresh_token import create_refresh_token
from models.auth.LoginForm import LoginForm
from dotenv import load_dotenv
from helpers.auth.create_access_token import  ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from helpers.auth.authenticate_admin import authenticate_admin
from helpers.auth.verify_password import HashPassword
from config.mongodb_config import colecao_auth
import os
import logging

logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.post("/app/login")
def login_admin(response: Response, form_data: LoginForm):
    user = authenticate_admin(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="E-mail ou senha incorretos.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, role="admin", expires_delta=access_token_expires
    )

    logging.info(f"Access token: {access_token}")
    
    response.delete_cookie(key="access_token")

    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=access_token_expires.total_seconds())

    return {"access_token": access_token, "token_type": "bearer"}

'''
def add_test_user():
    email = "henrique@example.com"
    password = "Senha123!"
    hashed_password = HashPassword(password)
    colecao_auth.insert_one({"email": email, "password": hashed_password})

# Chame esta função para adicionar o usuário de teste
add_test_user()
'''