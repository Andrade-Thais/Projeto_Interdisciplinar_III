from fastapi import FastAPI
from controllers.auth import login_admin
from middlewares.cors import setup_cors

app = FastAPI()
setup_cors(app)

app.include_router(login_admin.router)

