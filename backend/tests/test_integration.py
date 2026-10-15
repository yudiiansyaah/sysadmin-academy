"""
Integration tests untuk Sysadmin Academy
Simulasi user flow dari login sampai quiz
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db.database import Base, get_db
from app.models.models import User, Course, Module, Quiz, Question, Option
from passlib.context import CryptContext

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_integration.db"
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


def setup_test_data():
    """Setup test data"""
    db = TestingSessionLocal()
    
    # Create user
    user = User(
        username="student1",
        email="student1@test.com",
        hashed_password=pwd_context.hash("student123"),
        is_active=True
    )
    db.add(user)
    db.flush()
    
    # Create course
    course = Course(
        title="CLI Basics",
        description="Learn CLI",
        level="beginner",
        order=1
    )
    db.add(course)
    db.flush()
    
    # Create module
    module = Module(
        course_id=course.id,
        title="Getting Started",
        content="Introduction to CLI",
        order=1
    )
    db.add(module)
    db.flush()
    
    # Create quiz
    quiz = Quiz(
        course_id=course.id,
        title="CLI Quiz",
        description="Test your CLI knowledge",
        passing_score=70.0
    )
    db.add(quiz)
    db.flush()
    
    # Create question
    question = Question(
        quiz_id=quiz.id,
        question_text="What does 'pwd' command do?",
        question_type="multiple_choice",
        order=1,
        points=10.0
    )
    db.add(question)
    db.flush()
    
    # Create options
    option1 = Option(
        question_id=question.id,
        option_text="Print working directory",
        is_correct=True,
        order=1
    )
    option2 = Option(
        question_id=question.id,
        option_text="Delete file",
        is_correct=False,
        order=2
    )
    db.add_all([option1, option2])
    db.commit()
    
    return {
        "user": user,
        "course": course,
        "module": module,
        "quiz": quiz,
        "question": question,
        "option1": option1,
        "option2": option2
    }


class TestFullUserJourney:
    @pytest.fixture(autouse=True)
    def setup(self):
        Base.metadata.create_all(bind=engine)
        self.data = setup_test_data()
        yield
        Base.metadata.drop_all(bind=engine)

    def test_complete_learning_flow(self):
        """Test complete user flow: login -> view course -> take quiz -> submit"""
        
        # 1. Register user
        register_response = client.post(
            "/api/v1/auth/register",
            json={
                "username": "newstudent",
                "email": "new@test.com",
                "password": "password123"
            }
        )
        assert register_response.status_code == 200
        
        # 2. Login
        login_response = client.post(
            "/api/v1/auth/login",
            json={
                "username": "newstudent",
                "password": "password123"
            }
        )
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        
        # 3. Get courses
        courses_response = client.get("/api/v1/courses")
        assert courses_response.status_code == 200
        courses = courses_response.json()
        assert len(courses) > 0
        
        course_id = courses[0]["id"] if courses else self.data["course"].id
        
        # 4. Get course detail
        course_detail = client.get(f"/api/v1/courses/{course_id}")
        assert course_detail.status_code == 200
        
        # 5. Get modules
        modules_response = client.get(f"/api/v1/courses/{course_id}/modules")
        assert modules_response.status_code == 200
        
        # 6. Update progress
        progress_response = client.post(
            f"/api/v1/progress/{self.data['user'].id}/{course_id}",
            json={
                "completed": False,
                "progress_percent": 50
            }
        )
        assert progress_response.status_code == 200
        
        # 7. Get quizzes
        quizzes_response = client.get(f"/api/v1/courses/{course_id}/quizzes")
        assert quizzes_response.status_code == 200
        
        # 8. Submit quiz
        quiz_submit = client.post(
            f"/api/v1/quizzes/{self.data['quiz'].id}/attempts",
            json={
                "quiz_id": self.data['quiz'].id,
                "user_id": self.data['user'].id,
                "answers": [
                    {
                        "question_id": self.data['question'].id,
                        "selected_option_id": self.data['option1'].id
                    }
                ]
            }
        )
        assert quiz_submit.status_code == 200
        attempt = quiz_submit.json()
        assert attempt["passed"] == True
        assert attempt["percentage"] == 100.0
        
        # 9. Get quiz attempts
        attempts_response = client.get(
            f"/api/v1/quizzes/{self.data['quiz'].id}/attempts/{self.data['user'].id}"
        )
        assert attempts_response.status_code == 200

    def test_quiz_failure(self):
        """Test when user fails quiz"""
        quiz_submit = client.post(
            f"/api/v1/quizzes/{self.data['quiz'].id}/attempts",
            json={
                "quiz_id": self.data['quiz'].id,
                "user_id": self.data['user'].id,
                "answers": [
                    {
                        "question_id": self.data['question'].id,
                        "selected_option_id": self.data['option2'].id  # Wrong answer
                    }
                ]
            }
        )
        assert quiz_submit.status_code == 200
        attempt = quiz_submit.json()
        assert attempt["passed"] == False
        assert attempt["percentage"] == 0.0
