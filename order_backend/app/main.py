from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from . import models, database
from .routers import orders

app = FastAPI(title="Order Management System")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

app.include_router(orders.router)

@app.get("/")
def home():
    return {"message": "Order Management Backend Running"}
