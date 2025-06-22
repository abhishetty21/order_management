# Order Management System - Backend (FastAPI)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd order_backend


----------Create a virtual environment------------
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

----------Install dependencies------------
pip install -r requirements.txt

-----------Run the API server-------------
uvicorn app.main:app --reload

-----------API Endpoints--------
POST /orders/ — Create new order
GET /orders/ — List all orders
GET /orders/{id} — Get single order
PUT /orders/{id} — Update order
GET /orders/search/{query} — Search orders
GET /orders/filter/status/{status} — Filter by status


