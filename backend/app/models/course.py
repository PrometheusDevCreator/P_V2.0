"""Course data models."""

from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
from datetime import datetime


class CourseLevelEnum(str, Enum):
    """Course difficulty levels."""
    AWARENESS = "awareness"
    FOUNDATIONAL = "foundational"
    BASIC = "basic"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"
    SENIOR = "senior"


class CourseThematicEnum(str, Enum):
    """Course thematic areas."""
    DEFENCE_SECURITY = "defence-security"
    INTELLIGENCE = "intelligence"
    POLICING = "policing"
    LEADERSHIP = "leadership"
    CRISIS_RESPONSE = "crisis-response"
    RESILIENCE = "resilience"
    PERSONAL_SKILLS = "personal-skills"
    USER_DEFINED = "user-defined"


class CourseStatusEnum(str, Enum):
    """Course status codes."""
    DRAFT = "DRAFT"
    IN_PROGRESS = "IN_PROGRESS"
    REVIEW = "REVIEW"
    APPROVED = "APPROVED"
    PUBLISHED = "PUBLISHED"
    ARCHIVED = "ARCHIVED"


class DeliveryMethodEnum(str, Enum):
    """Course delivery methods."""
    ILT = "Instructor-Led Training (ILT)"
    VILT = "Virtual Instructor-Led Training (VILT)"
    SELF_PACED = "Self-Paced eLearning"
    BLENDED = "Blended Learning"
    OJT = "On-the-Job Training"
    WORKSHOP = "Workshop"
    SEMINAR = "Seminar"
    SIMULATION = "Simulation-Based Training"
    MOBILE = "Mobile Learning"


class LearningObjective(BaseModel):
    """Learning objective model."""
    id: str
    type: str = Field(..., pattern="^(terminal|enabling)$")
    text: str
    parent_id: Optional[str] = None
    order: int = 0


class Lesson(BaseModel):
    """Lesson model."""
    id: str
    number: int
    title: str
    duration: int = 0
    content: str = ""
    key_points: List[str] = []
    activities: List[str] = []


class Module(BaseModel):
    """Module model."""
    id: str
    number: int
    title: str
    description: str = ""
    duration: int = 0
    lessons: List[Lesson] = []


class Assessment(BaseModel):
    """Assessment model."""
    id: str
    type: str
    title: str
    description: str = ""
    criteria: List[str] = []
    passing_score: int = 70
    duration: int = 0


class CourseMetadata(BaseModel):
    """Course metadata model."""
    created_date: str = Field(default_factory=lambda: datetime.now().isoformat())
    updated_date: str = Field(default_factory=lambda: datetime.now().isoformat())
    author: str = ""
    reviewer: Optional[str] = None
    organization: Optional[str] = None
    version: str = "1.0.0"


class CourseBase(BaseModel):
    """Base course model."""
    title: str
    code: str
    level: Optional[CourseLevelEnum] = None
    thematic: Optional[CourseThematicEnum] = None
    custom_thematic: Optional[str] = None
    description: str = ""
    overview: str = ""
    target_audience: str = ""
    duration: int = 0
    delivery_method: Optional[DeliveryMethodEnum] = None


class CourseCreate(CourseBase):
    """Course creation model."""
    author: str = ""
    organization: Optional[str] = None


class CourseUpdate(BaseModel):
    """Course update model."""
    title: Optional[str] = None
    code: Optional[str] = None
    level: Optional[CourseLevelEnum] = None
    thematic: Optional[CourseThematicEnum] = None
    custom_thematic: Optional[str] = None
    status: Optional[CourseStatusEnum] = None
    description: Optional[str] = None
    overview: Optional[str] = None
    target_audience: Optional[str] = None
    duration: Optional[int] = None
    delivery_method: Optional[DeliveryMethodEnum] = None
    learning_objectives: Optional[List[LearningObjective]] = None
    modules: Optional[List[Module]] = None
    assessments: Optional[List[Assessment]] = None


class Course(CourseBase):
    """Full course model."""
    id: str
    status: CourseStatusEnum = CourseStatusEnum.DRAFT
    learning_objectives: List[LearningObjective] = []
    modules: List[Module] = []
    assessments: List[Assessment] = []
    metadata: CourseMetadata = Field(default_factory=CourseMetadata)

    class Config:
        from_attributes = True
