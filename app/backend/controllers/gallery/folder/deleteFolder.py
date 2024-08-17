import logging
from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoGridFs, colecaoGallery
from bson import ObjectId

router = APIRouter()

# Configuração do logger
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

@router.delete("/app/folder/{galeria_id}/{pasta_id}")
async def deletar_pasta(galeria_id: str, pasta_id: str):
    try:
        obj_id = ObjectId(galeria_id)
    except bson.errors.InvalidId:
        raise HTTPException(status_code=400, detail="ID de galeria inválido")

    galeria = colecaoGallery.find_one({"_id": obj_id})
    if not galeria:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    pasta_existente = next((f for f in galeria.get("folders", []) if f["id"] == pasta_id), None)
    if not pasta_existente:
        raise HTTPException(status_code=404, detail=f"Pasta '{pasta_id}' não encontrada na galeria com ID: {galeria_id}")

    # Deletar arquivos da pasta
    try:
        for foto_id in pasta_existente.get("photos", []):
            try:
                colecaoGridFs.delete(ObjectId(foto_id))
            except Exception as e:
                logger.error(f"Erro ao excluir foto {foto_id}: {type(e).__name__} - {str(e)}")
                raise

        for documento_id in pasta_existente.get("documents", []):
            try:
                colecaoGridFs.delete(ObjectId(documento_id))
            except Exception as e:
                logger.error(f"Erro ao excluir documento {documento_id}: {type(e).__name__} - {str(e)}")
                raise

        # Remover a pasta da galeria
        result = colecaoGallery.update_one(
            {"_id": obj_id},
            {"$pull": {"folders": {"id": pasta_id}}}
        )

        if result.modified_count == 1:
            return {"message": f"Pasta '{pasta_id}' deletada da galeria com ID: {galeria_id}"}
        else:
            logger.error("Erro ao deletar pasta: Não foi possível atualizar a galeria")
            raise HTTPException(status_code=500, detail="Erro ao deletar pasta: Não foi possível atualizar a galeria")

    except Exception as e:
        logger.error(f"Erro ao deletar pasta: {type(e).__name__} - {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao deletar pasta. Consulte os logs para mais detalhes.")