from fastapi import APIRouter
from config.calendarAPI_config import conectaApi
from models.calendar.Event import Event

router=APIRouter()


@router.post("/app/criar-evento")
async def create_event(event: Event):
    service = conectaApi()
    event_body = {
        "summary": event.summary,
        "location": event.location,
        "description": event.description,
        "start": {
            "dateTime": event.start.dateTime,
            "timeZone": event.start.timeZone,
        },
        "end": {
            "dateTime": event.end.dateTime,
            "timeZone": event.end.timeZone,
        },
        "attendees":  [{"email": attendee.email} for attendee in event.attendees],
        "reminders": {
            "useDefault": event.reminders.useDefault,
            "overrides": [{"method": override.method, "minutes": override.minutes} for override in event.reminders.overrides]
        } 
    }

    created_event = service.events().insert(calendarId='primary', body=event_body).execute()
    response = created_event.get('htmlLink')
    return {'event_link': response}