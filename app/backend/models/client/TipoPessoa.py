from pydantic import BaseModel

class TipoPessoa(BaseModel):
    physicalPerson: bool
    legalPerson: bool
