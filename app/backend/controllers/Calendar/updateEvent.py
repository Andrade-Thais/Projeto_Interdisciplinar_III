from fastapi import APIRouter
from config.calendarAPI_config import conectaApi
from models.calendar.Event import Event
from fastapi import HTTPException

router=APIRouter()


@router.post("/app/atualizar-eventos/{event_id}")
async def update_event(event_id: str, event: Event):
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

    try:
        updated_event = service.events().update(calendarId='primary', eventId=event_id, body=event_body).execute()
        return {"updated_event": updated_event}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))