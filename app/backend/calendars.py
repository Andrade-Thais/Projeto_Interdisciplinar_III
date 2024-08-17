from fastapi import FastAPI
from controllers.Calendar import listEvents,createNewEvent,deleteEvent,updateEvent
from middlewares.cors import setup_cors

app = FastAPI()
setup_cors(app)

app.include_router(listEvents.router)
app.include_router(createNewEvent.router)
app.include_router(deleteEvent.router)
app.include_router(updateEvent.router)
