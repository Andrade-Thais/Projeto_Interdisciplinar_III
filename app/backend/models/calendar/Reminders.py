from pydantic import BaseModel
from models.calendar.Override import Override

class Reminders(BaseModel):
    useDefault: bool
    overrides: list[Override]