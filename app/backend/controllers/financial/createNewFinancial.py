from fastapi import APIRouter
from fastapi import HTTPException
from config.mongodb_config import colecaoFinacial
from models.financial.Register import Register
from helpers.financial.consultar_banco_financial import consultar_banco_financial

router = APIRouter()

@router.post('/app/novo-registro')
def cadastrar_banco(novo_registro: Register):
    financeiro = consultar_banco_financial()
    
    novo_registro = {
                "registryType": novo_registro.registryType,
                "title": novo_registro.title,
                "value": novo_registro.value,
                "dueDate": novo_registro.dueDate,
                "isPaid": novo_registro.isPaid,
                "installments": novo_registro.installments,
                "accountType": novo_registro.accountType,
                "categoryType": novo_registro.categoryType,
                "client": novo_registro.client,
                "paymentMethod": novo_registro.paymentMethod,
                "automaticPayment": novo_registro.automaticPayment,
                "detailedDescription": novo_registro.detailedDescription,
                "isDebit": novo_registro.isDebit,
        }




    result = colecaoFinacial.insert_one(novo_registro)
    
    novo_registro['_id'] = str(result.inserted_id)
    return {"aviso": "Registro cadastrado com sucesso", "Registro": novo_registro}
