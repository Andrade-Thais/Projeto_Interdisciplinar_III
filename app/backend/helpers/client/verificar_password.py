import bcrypt

def verificar_password(password: str, senhaEncriptada: str):
    return bcrypt.checkpw(password.encode('utf-8'), senhaEncriptada.encode('utf-8'))