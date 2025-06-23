# Use official Python image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Copy all files into container
COPY ./app /app/app
COPY requirements.txt /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run FastAPI app using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
