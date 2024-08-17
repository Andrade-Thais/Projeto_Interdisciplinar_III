from pydantic import BaseModel
from models.calendar.Date import Date
from models.calendar.Recurrence import Recurrence
from models.calendar.Attendee import Attendee
from models.calendar.Reminders import Reminders


class Event(BaseModel):
    summary: str
    location: str
    description: str
    start: Date
    end: Date
    attendees: list[Attendee]
    reminders: Reminders