from pydantic import BaseModel

class Conta(BaseModel):
    user: bool
    administrador: bool