from fastapi import Depends, FastAPI
from controllers.email import send_login_email
from controllers.auth import verify_token
from controllers.Client import createNewClient, deleteClient, getAllClients, getClientById, updateClient
from controllers.gallery import createGallery, getGalleries, deleteGallery, uploadImages, downloadImages, updateGallery, deleteImage, getGalleryById
from controllers.gallery.folder import createFolder, getFolderById, deleteFolder
from controllers.financial import createNewFinancial,deleteFinancial,getAllFinancials,getFianancialById,updateFinancial
from controllers.Calendar import listEvents,createNewEvent,deleteEvent,updateEvent
from controllers.auth import login_admin, login_user, verify_token, logout_admin, logout_user
from controllers.dashboard import aggregate
from middlewares.cors import setup_cors


app = FastAPI()

setup_cors(app)



#client
app.include_router(deleteClient.router )
app.include_router(createNewClient.router)
app.include_router(getAllClients.router)
app.include_router(getClientById.router)
app.include_router(updateClient.router)

#galery
app.include_router(createGallery.router)
app.include_router(getGalleries.router)
app.include_router(deleteGallery.router)
app.include_router(uploadImages.router)
app.include_router(downloadImages.router)
app.include_router(updateGallery.router)
app.include_router(deleteImage.router)
app.include_router(getGalleryById.router)

#gallery.Folder
app.include_router(createFolder.router)
app.include_router(getFolderById.router)
app.include_router(deleteFolder.router)


#financial
app.include_router(getAllFinancials.router)
app.include_router(createNewFinancial.router)
app.include_router(deleteFinancial.router)
app.include_router(getFianancialById.router)
app.include_router(updateFinancial.router)

#calendars
app.include_router(listEvents.router)
app.include_router(createNewEvent.router)
app.include_router(deleteEvent.router)
app.include_router(updateEvent.router)

#auth
app.include_router(login_admin.router)
app.include_router(logout_admin.router)
app.include_router(login_user.router)
app.include_router(logout_user.router)
app.include_router(verify_token.router)


#email
app.include_router(send_login_email.router)

#Dashboard
app.include_router(aggregate.router)