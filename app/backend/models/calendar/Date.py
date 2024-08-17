from pydantic import BaseModel

class Date(BaseModel):
    dateTime: str
    timeZone: str