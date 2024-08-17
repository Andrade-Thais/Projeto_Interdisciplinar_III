from typing import Optional
from pydantic import BaseModel, EmailStr


class TokenData(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[str] = None