from pydantic import BaseModel, EmailStr


class Admin(BaseModel):
    email: EmailStr
    password: str
