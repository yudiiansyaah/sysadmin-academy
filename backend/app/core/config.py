from pydantic import Field
from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "Sysadmin Academy API"
    PROJECT_DESCRIPTION: str = "API untuk belajar sysadmin Linux dari pemula sampai mahir"
    VERSION: str = "0.1.0"
    DEBUG: bool = True

    # Security settings
    SECRET_KEY: str = Field(
        default="your-secret-key-change-in-production",
        min_length=32,
        description="Secret key untuk JWT encoding/decoding",
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=60 * 24 * 7)

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = Field(
        default=["*"],
        description="Daftar origin frontend yang diizinkan akses API",
    )

    # Database
    DATABASE_URL: Optional[str] = Field(
        default="sqlite:///./app/sqlite.db",
        description="URL database PostgreSQL atau SQLite",
    )

    # Lab Machine settings
    LAB_SSH_HOST: str = Field(default="localhost", description="Host lab machine")
    LAB_SSH_PORT: int = Field(default=22, description="Port SSH lab machine")
    LAB_SSH_USER: str = Field(default="labuser", description="User SSH lab machine")

    class Config:
        env_file = ".env"
        case_sensitive = True