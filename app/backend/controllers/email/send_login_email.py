import logging
import os
from fastapi import APIRouter
from helpers.client.cliente_existe import cliente_existe
from dotenv import load_dotenv
from redmail import outlook


router = APIRouter()

load_dotenv() 

logging.basicConfig(level=logging.INFO)

outlook.username = os.getenv('OUTLOOK_EMAIL')
outlook.password = os.getenv('OUTLOOK_PASSWORD')

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

@router.post("/app/send-login-email/{client_email}")
async def send_login_email(client_email):
    try:
        client_exists = cliente_existe(client_email)
        if(client_exists):
            outlook.send(
                subject="Escolha suas fotos - Adriana Oliveira Fotos",
                receivers=[str(client_email)],
                html=
                f''' 
                <html>
                    <body>
                        <h1 style="font-family: Arial, sans-serif; color: #333;">Olá, tudo bem?</h1>
                        <p style="font-family: Arial, sans-serif; color: #333;">Para escolher as suas fotos, clique no link abaixo:</p>
                        <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
                            <a href="http://localhost:5173/auth/login-user/{client_email}" style="color: white; text-decoration: none;">Clique aqui para acessar</a>
                        </button>
                        <p style="font-family: Arial, sans-serif; color: #333;">Se você não solicitou acesso, por favor, ignore este e-mail.</p>
                        <p style="font-family: Arial, sans-serif; color: #333;">Atenciosamente,</p>
                        <p style="font-family: Arial, sans-serif; color: #333;">Adriana Oliveira Fotos</p>
                    </body>
                </html>
                '''
            )
            return {"status": "Email de login enviado com sucesso"}
        else:
            raise Exception("Cliente não encontrado")
    except Exception as e:
        raise Exception(str(e))
    