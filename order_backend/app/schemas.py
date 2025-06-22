from pydantic import BaseModel
from typing import Optional

class OrderBase(BaseModel):
    name: str
    mobile: str
    item_name: str
    count_or_weight: str
    price: int
    status: Optional[str] = "Pending"

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    name: Optional[str]
    mobile: Optional[str]
    item_name: Optional[str]
    count_or_weight: Optional[str]
    price: Optional[int]
    status: Optional[str]

class OrderOut(OrderBase):
    id: int

    class Config:
        orm_mode = True
