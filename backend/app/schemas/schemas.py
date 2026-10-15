from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    title: str
    description: str
    level: str
    order: int


class CourseResponse(CourseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ModuleBase(BaseModel):
    title: str
    content: str
    order: int


class ModuleResponse(ModuleBase):
    id: int
    course_id: int

    class Config:
        from_attributes = True


class ProgressBase(BaseModel):
    completed: bool
    progress_percent: int


class ProgressResponse(ProgressBase):
    id: int
    user_id: int
    course_id: int
    updated_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class OptionBase(BaseModel):
    option_text: str
    is_correct: bool
    order: int


class OptionResponse(OptionBase):
    id: int
    question_id: int

    class Config:
        from_attributes = True


class QuestionBase(BaseModel):
    question_text: str
    question_type: str  # multiple_choice, true_false, short_answer
    order: int
    points: float = 1.0


class QuestionResponse(QuestionBase):
    id: int
    quiz_id: int
    options: List[OptionResponse] = []

    class Config:
        from_attributes = True


class QuestionWithoutAnswers(BaseModel):
    id: int
    question_text: str
    question_type: str
    order: int
    points: float
    options: List[OptionBase] = []

    class Config:
        from_attributes = True


class QuizBase(BaseModel):
    title: str
    description: str
    passing_score: float = 70.0


class QuizResponse(QuizBase):
    id: int
    course_id: int
    created_at: datetime
    questions: List[QuestionWithoutAnswers] = []

    class Config:
        from_attributes = True


class AnswerCreate(BaseModel):
    question_id: int
    selected_option_id: Optional[int] = None
    answer_text: Optional[str] = None


class QuizAttemptCreate(BaseModel):
    quiz_id: int
    answers: List[AnswerCreate]


class QuizAttemptResponse(BaseModel):
    id: int
    user_id: int
    quiz_id: int
    score: float
    total_points: float
    percentage: float
    passed: bool
    started_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True
