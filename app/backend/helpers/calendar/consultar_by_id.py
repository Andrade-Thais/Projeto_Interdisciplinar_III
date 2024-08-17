from config.mongodb_config import colecaoCalendar
from bson.objectid import ObjectId

def consultar_by_ID(id: str):
    id = ObjectId(id)
    try:
        result = colecaoCalendar.find_one({"_id": id})
        if result:
            result['id'] = str(result['_id'])  
            del result['_id']
        return result
    except Exception as e:
        print(f"Erro ao consultar o evento: {e}")
        return 