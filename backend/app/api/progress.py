from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Course, Progress
from app.schemas.schemas import ProgressResponse, ProgressBase

router = APIRouter(prefix="/api/v1", tags=["progress"])


@router.get("/progress/{user_id}")
async def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    """Get user progress for all courses"""
    progress = db.query(Progress).filter(Progress.user_id == user_id).all()
    return progress


@router.post("/progress/{user_id}/{course_id}", response_model=ProgressResponse)
async def update_user_progress(
    user_id: int,
    course_id: int,
    progress: ProgressBase,
    db: Session = Depends(get_db)
):
    """Update user progress for a course"""
    prog = db.query(Progress).filter(
        Progress.user_id == user_id,
        Progress.course_id == course_id
    ).first()
    
    if not prog:
        prog = Progress(user_id=user_id, course_id=course_id)
        db.add(prog)
    
    prog.progress_percent = progress.progress_percent
    prog.completed = progress.completed
    db.commit()
    db.refresh(prog)
    return prog
