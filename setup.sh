#!/bin/bash

echo "🚀 Starting Sysadmin Academy Setup..."

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Install Docker first."
    exit 1
fi

echo "✅ Docker found"

# Create directories
mkdir -p backend/logs frontend/logs

# Build images
echo "🔨 Building Docker images..."
docker-compose build

# Create database
echo "📊 Setting up database..."
docker-compose up -d backend
sleep 5

# Seed initial courses (optional)
echo "📚 Seeding courses..."
docker-compose exec -T backend python -c "
from app.db.database import SessionLocal, engine, Base
from app.models.models import Course

Base.metadata.create_all(bind=engine)
db = SessionLocal()

courses = [
    Course(title='Pengenalan Linux', description='Dasar-dasar Linux', level='beginner', order=1),
    Course(title='CLI Basics', description='Master terminal CLI', level='beginner', order=2),
    Course(title='User Management', description='Manage users & groups', level='beginner', order=3),
]

for course in courses:
    db.add(course)
db.commit()
print('✅ Courses seeded')
"

# Start all services
echo "🌐 Starting all services..."
docker-compose up -d

echo "✅ Setup complete!"
echo ""
echo "📍 Services:"
echo "  Backend API: http://localhost:8000/docs"
echo "  Frontend: http://localhost:5173"
echo "  Lab SSH: ssh -p 2222 labuser@localhost (password: labuser123)"
echo ""
echo "🛑 To stop: docker-compose down"
