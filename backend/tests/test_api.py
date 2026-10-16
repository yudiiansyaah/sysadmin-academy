"""
Test suite untuk Sysadmin Academy Backend
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db.database import Base, get_db
from app.models.models import User, Course, Module, Progress, Quiz, Question, Option, QuizAttempt
from app.core.config import settings
from passlib.context import CryptContext

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(scope="function")
def db():
    """Create test database"""
    Base.metadata.create_all(bind=engine)
    yield TestingSessionLocal()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def test_user(db):
    """Create test user"""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=pwd_context.hash("password123"),
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture(scope="function")
def test_course(db):
    """Create test course"""
    course = Course(
        title="Test Course",
        description="Test Description",
        level="beginner",
        order=1
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@pytest.fixture(scope="function")
def test_quiz(db, test_course):
    """Create test quiz"""
    quiz = Quiz(
        course_id=test_course.id,
        title="Test Quiz",
        description="Test Quiz Description",
        passing_score=70.0
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    return quiz


# --- Auth Tests ---
class TestAuth:
    def test_register_user(self):
        response = client.post(
            "/api/v1/auth/register",
            json={
                "username": "newuser",
                "email": "new@example.com",
                "password": "password123"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["username"] == "newuser"
        assert data["email"] == "new@example.com"

    def test_register_duplicate_user(self):
        # Register first user
        client.post(
            "/api/v1/auth/register",
            json={
                "username": "duplicate",
                "email": "dup@example.com",
                "password": "password123"
            }
        )
        # Try register with same username
        response = client.post(
            "/api/v1/auth/register",
            json={
                "username": "duplicate",
                "email": "dup2@example.com",
                "password": "password123"
            }
        )
        assert response.status_code == 400

    def test_login(self, test_user):
        response = client.post(
            "/api/v1/auth/login",
            json={
                "username": "testuser",
                "password": "password123"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"


# --- Course Tests ---
class TestCourses:
    def test_get_courses(self, test_course):
        response = client.get("/api/v1/courses")
        assert response.status_code == 200
        assert len(response.json()) > 0

    def test_get_course_detail(self, test_course):
        response = client.get(f"/api/v1/courses/{test_course.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Test Course"


# --- Quiz Tests ---
class TestQuiz:
    def test_get_course_quizzes(self, test_course, test_quiz):
        response = client.get(f"/api/v1/courses/{test_course.id}/quizzes")
        assert response.status_code == 200
        quizzes = response.json()
        assert len(quizzes) > 0

    def test_get_quiz_detail(self, test_quiz):
        response = client.get(f"/api/v1/quizzes/{test_quiz.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Test Quiz"

    def test_submit_quiz(self, test_user, test_quiz, db):
        # Create questions dan options
        question = Question(
            quiz_id=test_quiz.id,
            question_text="What is Linux?",
            question_type="multiple_choice",
            order=1,
            points=1.0
        )
        db.add(question)
        db.flush()

        option1 = Option(
            question_id=question.id,
            option_text="Open source OS",
            is_correct=True,
            order=1
        )
        option2 = Option(
            question_id=question.id,
            option_text="Proprietary OS",
            is_correct=False,
            order=2
        )
        db.add_all([option1, option2])
        db.commit()

        # Submit quiz
        response = client.post(
            f"/api/v1/quizzes/{test_quiz.id}/attempts",
            json={
                "quiz_id": test_quiz.id,
                "user_id": test_user.id,
                "answers": [
                    {
                        "question_id": question.id,
                        "selected_option_id": option1.id
                    }
                ]
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["score"] == 1.0
        assert data["passed"] == True


# --- Progress Tests ---
class TestProgress:
    def test_update_progress(self, test_user, test_course):
        response = client.post(
            f"/api/v1/progress/{test_user.id}/{test_course.id}",
            json={
                "completed": False,
                "progress_percent": 50
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["progress_percent"] == 50

    def test_get_user_progress(self, test_user):
        response = client.get(f"/api/v1/progress/{test_user.id}")
        assert response.status_code == 200


# --- Health Check ---
class TestHealth:
    def test_health_check(self):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_root_endpoint(self):
        response = client.get("/")
        assert response.status_code == 200
        assert "message" in response.json()
