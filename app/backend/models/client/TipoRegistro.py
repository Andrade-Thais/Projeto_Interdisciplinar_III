from pydantic import BaseModel

class TipoRegistro(BaseModel):
    prospection: bool
    client: bool