from fastapi import APIRouter
from config.calendarAPI_config import conectaApi
import datetime


router = APIRouter()



@router.get('/app/listar-eventos')
def listar():
    service = conectaApi()
    if service:
        now = datetime.datetime.utcnow().isoformat() + "Z"
        print("Obtendo os últimos eventos...")
        events_result = (
            service.events()
            .list(
                calendarId="primary",
                timeMin=now,
                singleEvents=True,
                maxResults=9999,
                orderBy="startTime",
            )
            .execute()
        )

        events = events_result.get("items", [])

        if not events:
            return("No upcoming events found.")
        else:
            # Create a list to store all events
            all_events = []
            for event in events:
                event_id = event["id"]
                start = event["start"].get("dateTime", event["start"].get("date"))
                # Add event to the list
                all_events.append({
                    "ID": event_id,
                    "start": start,
                    "summary": event['summary'],
                    "description": event['description'],
                    "atendees": event['attendees'],
                    "start": event['start'],
                })
            # Return the list of all events
            return all_events
    else:
        return("Failed to connect to Google Calendar API.")