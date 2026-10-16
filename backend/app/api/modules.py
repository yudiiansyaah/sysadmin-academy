from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Course, Module
from app.schemas.schemas import ModuleResponse

router = APIRouter(prefix="/api/v1", tags=["modules"])


@router.get("/courses/{course_id}/modules", response_model=list[ModuleResponse])
async def get_course_modules(course_id: int, db: Session = Depends(get_db)):
    """Get all modules for a course"""
    modules = db.query(Module).filter(Module.course_id == course_id).order_by(Module.order).all()
    if not modules:
        raise HTTPException(status_code=404, detail="No modules found for this course")
    return modules


@router.get("/modules/{module_id}", response_model=ModuleResponse)
async def get_module(module_id: int, db: Session = Depends(get_db)):
    """Get module by ID"""
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module
