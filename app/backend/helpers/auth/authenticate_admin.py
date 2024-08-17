from helpers.auth.verify_password import verify_password
from helpers.auth.get_user import get_user


def authenticate_admin(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user
