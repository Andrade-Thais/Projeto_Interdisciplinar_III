from pydantic import BaseModel

class Override(BaseModel):
    method: str
    minutes: int