from controllers.gallery.folder import createFolder, getFolderById
from fastapi import FastAPI
from controllers.gallery import createGallery, getGalleries, deleteGallery, uploadImages, downloadImages, updateGallery, deleteImage, getGalleryById
from middlewares.cors import setup_cors

app = FastAPI()
setup_cors(app)

app.include_router(createGallery.router)
app.include_router(getGalleries.router)
app.include_router(deleteGallery.router)
app.include_router(uploadImages.router)
app.include_router(downloadImages.router)
app.include_router(updateGallery.router)
app.include_router(deleteImage.router)
app.include_router(getGalleryById.router)

app.include_router(createFolder.router)
app.include_router(getFolderById.router)