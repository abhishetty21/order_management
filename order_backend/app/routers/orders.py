from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, schemas, crud,models


router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.OrderOut)
def create(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db, order)

@router.get("/", response_model=list[schemas.OrderOut])
def list_orders(db: Session = Depends(get_db)):
    return crud.get_orders(db)

@router.get("/{order_id}", response_model=schemas.OrderOut)
def read_order(order_id: int, db: Session = Depends(get_db)):
    order = crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}", response_model=schemas.OrderOut)
def update_order(order_id: int, order: schemas.OrderUpdate, db: Session = Depends(get_db)):
    updated = crud.update_order(db, order_id, order)
    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")
    return updated

@router.get("/search/{query}", response_model=list[schemas.OrderOut])
def search(query: str, db: Session = Depends(get_db)):
    return crud.search_orders(db, query)

@router.get("/filter/status/{status}", response_model=list[schemas.OrderOut])
def filter_by_status(status: str, db: Session = Depends(get_db)):
    return crud.filter_orders_by_status(db, status)

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
    return {"message": "Order deleted successfully"}
