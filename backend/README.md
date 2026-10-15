# Sysadmin Academy - Backend API

Backend FastAPI untuk aplikasi pembelajaran sysadmin Linux.

## Tech Stack

- FastAPI 0.111.0
- Python 3.10+
- SQLAlchemy (ORM)
- PostgreSQL/SQLite
- Pydantic v2 (validation)
- JWT authentication
- Docker support

## Struktur Folder

```
backend/
├── app/
│   ├── api/          # API endpoints/routes
│   ├── core/         # Config, security, dependencies
│   ├── db/           # Database connection
│   ├── models/       # SQLAlchemy models
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   └── main.py       # FastAPI app instance
├── main.py           # Entry point
├── requirements.txt
└── .env.example
```

## Setup Development

1. Copy environment file:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Run development server:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

4. Access API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /docs` - Swagger documentation
- `GET /api/v1/*` - API v1 routes (akan ditambah)

## Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables.

## Development Notes

- Auto-reload enabled di development mode
- CORS sudah dikonfigurasi untuk frontend development
- Database default: SQLite (development), PostgreSQL (production)
