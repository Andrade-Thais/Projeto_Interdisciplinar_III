from bson import ObjectId
from helpers.client.consultar_documento import consultar_documento

def search_client_by_id(id: str): 
    id = id.strip('\"')
    id = ObjectId(id)
    try:
        cliente = consultar_documento(id) 
        if cliente is None:
            raise Exception("Cliente não encontrado")
        return cliente
    except Exception as e:
        raise Exception(str(e))