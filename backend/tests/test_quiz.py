"""
Quiz logic unit tests
"""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.database import Base
from app.models.models import Quiz, Question, Option


SQLALCHEMY_DATABASE_URL = "sqlite:///./test_quiz.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    yield TestingSessionLocal()
    Base.metadata.drop_all(bind=engine)


def test_quiz_scoring(db):
    """Test quiz scoring logic"""
    quiz = Quiz(
        course_id=1,
        title="Test",
        description="Test",
        passing_score=70.0
    )
    db.add(quiz)
    db.flush()
    
    # Create 2 questions worth 50 points each
    q1 = Question(quiz_id=quiz.id, question_text="Q1", question_type="mc", order=1, points=50.0)
    q2 = Question(quiz_id=quiz.id, question_text="Q2", question_type="mc", order=2, points=50.0)
    db.add_all([q1, q2])
    db.flush()
    
    # Total 100 points
    total_points = q1.points + q2.points
    assert total_points == 100.0
    
    # Score 75 out of 100 = 75%
    score = 75.0
    percentage = (score / total_points * 100) if total_points > 0 else 0
    assert percentage == 75.0
    assert percentage >= 70.0  # Passing


def test_option_correctness(db):
    """Test option correctness logic"""
    quiz = Quiz(course_id=1, title="Test", description="Test")
    db.add(quiz)
    db.flush()
    
    q = Question(quiz_id=quiz.id, question_text="Q1", question_type="mc", order=1)
    db.add(q)
    db.flush()
    
    opt1 = Option(question_id=q.id, option_text="Correct", is_correct=True, order=1)
    opt2 = Option(question_id=q.id, option_text="Wrong", is_correct=False, order=2)
    db.add_all([opt1, opt2])
    db.commit()
    
    assert opt1.is_correct == True
    assert opt2.is_correct == False
