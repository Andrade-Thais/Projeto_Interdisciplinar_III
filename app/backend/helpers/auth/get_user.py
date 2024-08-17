from config.mongodb_config import colecao_auth

def get_user(email: str):
    user = colecao_auth.find_one({"email": email})
    return user