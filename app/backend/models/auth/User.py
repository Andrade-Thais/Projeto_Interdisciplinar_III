from pydantic import BaseModel

from models.auth.Role import Role


class User(BaseModel):
    email: str
    role: Role
    is_active: bool