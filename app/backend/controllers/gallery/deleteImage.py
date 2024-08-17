import logging
from fastapi import APIRouter, HTTPException
from config.mongodb_config import colecaoGridFs, colecaoGallery
from bson import ObjectId

router = APIRouter()

# Configuração do logger
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

@router.delete("/app/galerias/{galeria_id}/fotos/{foto_id}")
async def deletar_imagem(galeria_id: str, foto_id: str):
    try:
        obj_galeria_id = ObjectId(galeria_id)
        obj_foto_id = ObjectId(foto_id)
    except Exception:
        raise HTTPException(status_code=400, detail="IDs inválidos")

    galeria_existente = colecaoGallery.find_one({"_id": obj_galeria_id})
    if galeria_existente is None:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    foto_encontrada = False
    for pasta in galeria_existente["folders"]:
        if ("photos" in pasta and str(obj_foto_id) in pasta["photos"]) or ("documents" in pasta and str(obj_foto_id) in pasta["documents"]):
            foto_encontrada = True
            break
    
    if not foto_encontrada:
        raise HTTPException(status_code=404, detail="Imagem não encontrada na galeria")

    try:
        colecaoGridFs.delete(obj_foto_id)

        # Remover o ID da foto da lista de fotos na galeria
        result = colecaoGallery.update_one(
            {"_id": obj_galeria_id},
            {"$pull": {"folders.$[].photos": str(obj_foto_id), "folders.$[].documents": str(obj_foto_id)}}
        )

        if result.modified_count == 1:
            return {"message": "Imagem excluída com sucesso"}
        else:
            raise HTTPException(status_code=500, detail="Erro ao excluir imagem: Não foi possível atualizar a galeria")
    except Exception as e:
        logger.error(f"Erro ao excluir imagem: {type(e).__name__} - {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao excluir imagem. Consulte os logs para mais detalhes.")
    
@router.delete("/app/galerias/{galeria_id}/documentos/{documento_id}")
async def deletar_documento(galeria_id: str, documento_id: str):
    try:
        obj_galeria_id = ObjectId(galeria_id)
        obj_documento_id = ObjectId(documento_id)
    except Exception:
        raise HTTPException(status_code=400, detail="IDs inválidos")

    galeria_existente = colecaoGallery.find_one({"_id": obj_galeria_id})
    if galeria_existente is None:
        raise HTTPException(status_code=404, detail="Galeria não encontrada")

    documento_encontrado = False
    for pasta in galeria_existente["folders"]:
        if "documents" in pasta and str(obj_documento_id) in pasta["documents"]:
            documento_encontrado = True
            break
    
    if not documento_encontrado:
        raise HTTPException(status_code=404, detail="Documento não encontrado na galeria")

    try:
        colecaoGridFs.delete(obj_documento_id)

        # Remover o ID do documento da lista de documentos na galeria
        result = colecaoGallery.update_one(
            {"_id": obj_galeria_id},
            {"$pull": {"folders.$[].documents": str(obj_documento_id)}}
        )

        if result.modified_count == 1:
            return {"message": "Documento excluído com sucesso"}
        else:
            raise HTTPException(status_code=500, detail="Erro ao excluir documento: Não foi possível atualizar a galeria")
    except Exception as e:
        logger.error(f"Erro ao excluir documento: {type(e).__name__} - {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao excluir documento. Consulte os logs para mais detalhes.")