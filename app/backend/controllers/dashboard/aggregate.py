from fastapi import APIRouter
from fastapi import HTTPException
from config.mongodb_config import colecaoClient, colecaoGallery, colecaoFinacial
from bson import ObjectId

router = APIRouter()

@router.get("/app/aggregate")
async def obter_agregacoes():
    try:
        # Contagem de clientes
        total_clientes = colecaoClient.count_documents({})
        
        # Contagem de prospecções
        total_prospeccoes = colecaoClient.count_documents({"registryType": "Prospecção"})
        
        # Contagem de galerias
        total_galerias = colecaoGallery.count_documents({})
        
        # Soma das receitas e despesas
        pipeline = [
            {
                "$group": {
                    "_id": "$isDebit",
                    "total": {"$sum": "$value"}
                }
            }
        ]
        agregacao = list(colecaoFinacial.aggregate(pipeline))
        
        receitas_totais = sum(item["total"] for item in agregacao if not item["_id"])
        despesas_totais = sum(item["total"] for item in agregacao if item["_id"])
        
        # Calculo do saldo
        saldo_total = receitas_totais - despesas_totais
        
        return {
            "receitas": receitas_totais,
            "despesas": despesas_totais,
            "saldo": saldo_total,
            "galerias": total_galerias,
            "clientes": total_clientes,
            "prospeccoes": total_prospeccoes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))