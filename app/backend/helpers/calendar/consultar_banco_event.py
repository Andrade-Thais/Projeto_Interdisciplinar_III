from config.mongodb_config import colecaoCalendar
from models.calendar.Event import Event

def consultar_banco_event():
    try:
        result = list(colecaoCalendar.find())
        
        calendars = []
        for calendar in result:
           
            calendar['id'] = str(calendar['_id'])
            #del calendar['_id']
            calendar_model = Event(**calendar)
            calendars.append(calendar_model)
            
        return calendars
    except Exception as e:
        print(f"Erro ao consultar o banco: {e}")
        return []