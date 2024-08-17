from config.mongodb_config import colecaoClient
from bson.objectid import ObjectId

def consultar_documento(id: str):
    id = ObjectId(id)
    try:
        result = colecaoClient.find_one({"_id": id})
        if result:
            result['id'] = str(result['_id'])  
            del result['_id']
        return result
    except Exception as e:
        print(f"Erro ao consultar o documento: {e}")
        return 