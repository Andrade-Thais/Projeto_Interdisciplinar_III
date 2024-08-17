from fastapi import FastAPI
from controllers.financial import createNewFinancial,deleteFinancial,getAllFinancials,getFianancialById,updateFinancial
from middlewares.cors import setup_cors

app = FastAPI()
setup_cors(app)

app.include_router(getAllFinancials.router)
app.include_router(createNewFinancial.router)
app.include_router(deleteFinancial.router)
app.include_router(getFianancialById.router)
app.include_router(updateFinancial.router)