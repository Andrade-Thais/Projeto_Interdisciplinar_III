from fastapi import APIRouter
from config.calendarAPI_config import conectaApi


router = APIRouter()

@router.delete('/app/deletar-evento/{event_id}')
def deletar_evento(event_id: str):
    
    service = conectaApi()

    service.events().delete(calendarId='primary', eventId=event_id).execute()
    return print('Event deleted successfully.')