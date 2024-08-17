from pydantic import BaseModel, Field
from typing import List, Optional

class Folder(BaseModel):
    id: Optional[str] = None
    title: str
    photos: Optional[List[str]] = None
    documents: Optional[List[str]] = None

    _next_id: int = 1

    @classmethod
    def create(cls, title: str, photos: Optional[List[str]] = None, documents: Optional[List[str]] = None):
        if photos is None:
            photos = []
        if documents is None:
            documents = []

        folder_id = cls._next_id  
        cls._next_id += 1 

        return cls(id=folder_id, title=title, photos=photos, documents=documents)
