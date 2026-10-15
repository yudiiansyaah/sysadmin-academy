from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.db.database import get_db
from app.models.models import Quiz, Question, QuizAttempt, Answer, Option
from app.schemas.schemas import QuizResponse, QuizAttemptCreate, QuizAttemptResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["quiz"])


@router.get("/courses/{course_id}/quizzes", response_model=list[QuizResponse])
async def get_course_quizzes(course_id: int, db: Session = Depends(get_db)):
    """Get all quizzes for a course"""
    quizzes = db.query(Quiz).filter(Quiz.course_id == course_id).all()
    return quizzes


@router.get("/quizzes/{quiz_id}", response_model=QuizResponse)
async def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """Get quiz dengan questions"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz


@router.post("/quizzes/{quiz_id}/attempts", response_model=QuizAttemptResponse)
async def submit_quiz(
    quiz_id: int,
    user_id: int,
    attempt: QuizAttemptCreate,
    db: Session = Depends(get_db)
):
    """Submit quiz attempt dan score"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # Create attempt
    quiz_attempt = QuizAttempt(
        user_id=user_id,
        quiz_id=quiz_id,
        total_points=0.0
    )
    db.add(quiz_attempt)
    db.flush()
    
    # Calculate total points
    total_points = 0.0
    score = 0.0
    
    for answer_data in attempt.answers:
        question = db.query(Question).filter(Question.id == answer_data.question_id).first()
        if not question:
            continue
        
        total_points += question.points
        is_correct = False
        
        # Check answer
        if answer_data.selected_option_id:
            option = db.query(Option).filter(
                Option.id == answer_data.selected_option_id,
                Option.question_id == question.id
            ).first()
            if option and option.is_correct:
                is_correct = True
                score += question.points
        
        # Save answer
        answer = Answer(
            attempt_id=quiz_attempt.id,
            question_id=question.id,
            selected_option_id=answer_data.selected_option_id,
            answer_text=answer_data.answer_text,
            is_correct=is_correct,
            points_earned=question.points if is_correct else 0.0
        )
        db.add(answer)
    
    # Calculate percentage
    percentage = (score / total_points * 100) if total_points > 0 else 0
    passed = percentage >= quiz.passing_score
    
    quiz_attempt.score = score
    quiz_attempt.total_points = total_points
    quiz_attempt.percentage = percentage
    quiz_attempt.passed = passed
    quiz_attempt.completed_at = datetime.utcnow()
    
    db.commit()
    db.refresh(quiz_attempt)
    
    logger.info(f"Quiz attempt: user={user_id}, quiz={quiz_id}, score={score}/{total_points}, passed={passed}")
    
    return quiz_attempt


@router.get("/users/{user_id}/quiz-attempts")
async def get_user_attempts(user_id: int, db: Session = Depends(get_db)):
    """Get user's all quiz attempts"""
    attempts = db.query(QuizAttempt).filter(QuizAttempt.user_id == user_id).all()
    return attempts


@router.get("/quizzes/{quiz_id}/attempts/{user_id}")
async def get_user_quiz_attempts(quiz_id: int, user_id: int, db: Session = Depends(get_db)):
    """Get user's attempts untuk specific quiz"""
    attempts = db.query(QuizAttempt).filter(
        QuizAttempt.quiz_id == quiz_id,
        QuizAttempt.user_id == user_id
    ).all()
    return attempts
