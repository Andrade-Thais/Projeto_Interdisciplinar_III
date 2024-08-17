from pydantic import BaseModel



class Recurrence(BaseModel):
    freq: str
    count: int