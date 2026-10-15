from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Course
from app.schemas.schemas import CourseResponse

router = APIRouter(prefix="/api/v1", tags=["courses"])


@router.get("/courses", response_model=list[CourseResponse])
async def get_courses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all courses"""
    courses = db.query(Course).offset(skip).limit(limit).all()
    return courses


@router.get("/courses/{course_id}", response_model=CourseResponse)
async def get_course(course_id: int, db: Session = Depends(get_db)):
    """Get course by ID"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("/courses", response_model=CourseResponse)
async def create_course(course: CourseResponse, db: Session = Depends(get_db)):
    """Create new course (admin only)"""
    db_course = Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course
