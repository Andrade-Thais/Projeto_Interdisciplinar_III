import bcrypt

def encriptar_senha(password: str):
    encriptar = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return encriptar.decode('utf-8')