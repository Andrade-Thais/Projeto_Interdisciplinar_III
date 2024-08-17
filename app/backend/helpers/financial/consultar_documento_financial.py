from config.mongodb_config import colecaoFinacial
from bson.objectid import ObjectId

def consultar_documento_financial(id: str):
    id = ObjectId(id)
    try:
        result = colecaoFinacial.find_one({"_id": id})
        if result:
            result['id'] = str(result['_id'])  
            del result['_id']
        return result
    except Exception as e:
        print(f"Erro ao consultar o documento: {e}")
        return 