from fastapi import APIRouter
import os
from config.calendarAPI_config import conectaApi
import datetime
from dotenv import load_dotenv

router = APIRouter()
load_dotenv()


@router.get('/app/consultar-compromisso/{id}')
def obter_compromisso(id: str):
    service = conectaApi()
    if service:
       event = service.events().get(calendarId=os.getEnv("GOOGLE_CALENDAR_ID"), eventId=id).execute()
       print(event)
       return(event)
    else:
        return("Failed to connect to Google Calendar API.")