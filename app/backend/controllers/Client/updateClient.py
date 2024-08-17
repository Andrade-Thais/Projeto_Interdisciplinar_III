from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoClient
from models.client.Cliente import Cliente
from bson.objectid import ObjectId

router = APIRouter()

@router.put('/app/editar-cliente/{id}')
def atualizar_cliente(id, cliente: Cliente):
    try:
        cliente_existente = colecaoClient.find_one({"_id": ObjectId(id)})
        if cliente_existente is None:
            raise HTTPException(status_code=404, detail="Cliente não encontrado")
        
        if colecaoClient.find_one({"email": cliente.email.lower(), "_id": {"$ne": ObjectId(id)}}):
            raise HTTPException(status_code=400, detail="E-mail já cadastrado")
        
        update_data = {
            "$set": {
                "registryType": cliente.registryType,
                "personType": cliente.personType,
                "name": cliente.name.lower(),
                "surname": cliente.surname.lower(),
                "email": cliente.email.lower(),
                "phone": cliente.phone,
                "birthDate": cliente.birthDate,
                "zip": cliente.zip,
                "city": cliente.city.lower(),
                "state": cliente.state.lower(),
                "street": cliente.street.lower(),
                "streetNumber": cliente.streetNumber,
                "complement": cliente.complement.lower() if cliente.complement else None,
                "neighborhood": cliente.neighborhood.lower(),
                "receiveSMS": cliente.receiveSMS,
                "receiveEmail": cliente.receiveEmail,
            }
        }
        colecaoClient.update_one({"_id": ObjectId(id)}, update_data)
    
        cliente_atualizado = colecaoClient.find_one({"_id": ObjectId(id)})
        cliente_atualizado['_id'] = str(cliente_atualizado['_id'])
        return {"aviso": "Cliente atualizado com sucesso", "cliente": cliente_atualizado}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))