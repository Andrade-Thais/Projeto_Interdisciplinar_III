from pydantic import BaseModel

class Attendee(BaseModel):
    email: str
    optional: bool = False