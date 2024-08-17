
from helpers.client.consultar_banco import consultar_banco


def authenticate_user(email: str):
    user_list = consultar_banco()
    user = next((user for user in user_list if user.email == email), None)
    if user:
        return True
    else:
        return False