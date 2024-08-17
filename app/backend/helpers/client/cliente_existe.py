from config.mongodb_config import colecaoClient

def cliente_existe(email: str):
    try:
        result = colecaoClient.find_one({"email": email})
        if result:
            return True
    except Exception as e:
        print(f"Erro ao consultar: {e}")
        return False