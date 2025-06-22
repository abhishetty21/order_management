from fastapi import FastAPI
from . import models, database
from .routers import orders

app = FastAPI(title="Order Management System")

models.Base.metadata.create_all(bind=database.engine)

app.include_router(orders.router)

@app.get("/")
def home():
    return {"message": "Order Management Backend Running"}
