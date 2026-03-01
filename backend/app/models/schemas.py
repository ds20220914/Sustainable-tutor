from pydantic import BaseModel, Field
from enum import Enum

class BloomLevel(str, Enum):
    remember   = "remember"
    understand = "understand"
    apply      = "apply"
    analyze    = "analyze"
    evaluate   = "evaluate"
    create     = "create"

class ExerciseType(str, Enum):
    multiple_choice = "multiple_choice"
    short_answer    = "short_answer"
    summarization   = "summarization"
    practice_test   = "practice_test"

class GenerateRequest(BaseModel):
    topic: str = Field(..., min_length=2, max_length=300)
    current_level: BloomLevel
    target_level: BloomLevel
    exercise_types: list[ExerciseType] = Field(..., min_length=1)
    num_questions: int = Field(default=5, ge=1, le=20)

class GenerateResponse(BaseModel):
    content: str
    exercise_type: str
    topic: str
