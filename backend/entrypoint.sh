#!/bin/bash

# Initialize database
python -c "from app.db.database import Base, engine; from app.models.models import *; Base.metadata.create_all(bind=engine)"

# Start API
uvicorn app.main:app --host 0.0.0.0 --port 8000
