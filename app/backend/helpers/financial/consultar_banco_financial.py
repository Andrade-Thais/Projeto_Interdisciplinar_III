from config.mongodb_config import colecaoFinacial
from models.financial.Register import Register

def consultar_banco_financial():
    try:
        result = list(colecaoFinacial.find())
        
        registros = []
        for registro in result:
           
            registro['id'] = str(registro['_id'])
            del registro['_id']
            registro_model = Register(**registro)
            registros.append(registro_model)
            
        return registros
    except Exception as e:
        print(f"Erro ao consultar o banco: {e}")
        return []
