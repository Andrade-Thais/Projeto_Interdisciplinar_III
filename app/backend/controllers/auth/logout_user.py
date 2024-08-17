from fastapi import APIRouter, Response

router = APIRouter()

@router.post("/app/logout-user")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    if(response.cookies.get("refresh_token")):
        response.delete_cookie(key="refresh_token")
    return {"message": "Deslogado com sucesso!"}