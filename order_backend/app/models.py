from sqlalchemy import Column, Integer, String
from .database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    item_name = Column(String, nullable=False)
    count_or_weight = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    status = Column(String, default="Pending")  # Pending, Processing, Delivered, Canceled
