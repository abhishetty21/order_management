from sqlalchemy.orm import Session
from . import models, schemas

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()

def get_order_by_id(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def update_order(db: Session, order_id: int, updates: schemas.OrderUpdate):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        return None
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order

def search_orders(db: Session, query: str):
    return db.query(models.Order).filter(
        models.Order.name.ilike(f"%{query}%") |
        models.Order.mobile.ilike(f"%{query}%") |
        models.Order.item_name.ilike(f"%{query}%") |
        models.Order.count_or_weight.ilike(f"%{query}%")
    ).all()


def filter_orders_by_status(db: Session, status: str):
    return db.query(models.Order).filter(models.Order.status == status).all()
