from typing import Optional
from datetime import datetime
from models.client.Conta import Conta
from pydantic import BaseModel, validator


class Cliente(BaseModel):
    id: Optional[str] = None
    registryType: str
    personType: str
    name: str
    surname: str
    email: str
    phone: str
    birthDate: Optional[datetime] = ''
    zip: str
    city: str
    state: str
    street: str
    streetNumber: str
    complement: Optional[str] = None
    neighborhood: str
    receiveSMS: Optional[bool] = None
    receiveEmail: Optional[bool] = None
    accountType: Optional[dict] = Conta(user=True, administrador=False).dict()
    
    #Validação de campos específicos
    @validator('birthDate', pre=True, always=True)
    def parse_birthDate(cls, value):
        if value is None or value == '':
            return None
        if isinstance(value, str):
            try:
                date_string = value.split('T')[0]
                return datetime.strptime(date_string, '%Y-%m-%d').date()
            except ValueError:
                return None
        return value