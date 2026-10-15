from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import courses, auth, modules

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
)

# Set all CORS origins enabled
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.BACKEND_CORS_ORIGINS),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Health check endpoint
@app.get("/health", tags=["root"])
async def health_check():
    return {"status": "healthy", "message": "Sysadmin Academy API is running"}

# Root endpoint
@app.get("/", tags=["root"])
async def root():
    return {
        "message": "Welcome to Sysadmin Academy",
        "docs": "/docs",
        "api": "/api/v1",
    }

# Include routers
from app.api import progress, quiz, terminal
app.include_router(courses.router)
app.include_router(auth.router)
app.include_router(modules.router)
app.include_router(progress.router)
app.include_router(quiz.router)
app.include_router(terminal.router)