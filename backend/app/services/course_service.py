import json
from sqlalchemy.orm import Session
from app.models.models import Course, Module, Progress, User
from app.db.database import SessionLocal

db = SessionLocal()

def get_courses(skip: int = 0, limit: int = 20):
    return db.query(Course).offset(skip).limit(limit).all()

def get_course_by_id(course_id: int):
    return db.query(Course).filter(Course.id == course_id).first()

def get_modules_by_course(course_id: int):
    return db.query(Module).filter(Module.course_id == course_id).order_by(Module.order).all()

def get_module_by_id(module_id: int):
    return db.query(Module).filter(Module.id == module_id).first()

def get_user_progress(user_id: int, course_id: int):
    return db.query(Progress).filter(
        Progress.user_id == user_id,
        Progress.course_id == course_id
    ).first()

def update_progress(user_id: int, course_id: int, progress_percent: int, completed: bool = False):
    progress = get_user_progress(user_id, course_id)
    if not progress:
        progress = Progress(user_id=user_id, course_id=course_id)
        db.add(progress)
    
    progress.progress_percent = progress_percent
    progress.completed = completed
    db.commit()
    return progress

def get_user_progress_all(user_id: int):
    return db.query(Progress).filter(Progress.user_id == user_id).all()
