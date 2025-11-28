"""Course CRUD API endpoints."""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.models.course import Course, CourseCreate, CourseUpdate
from app.services.storage import storage_service

router = APIRouter()


@router.get("/", response_model=List[Course])
async def get_courses(
    title: Optional[str] = Query(None, description="Filter by title"),
    level: Optional[str] = Query(None, description="Filter by level"),
    thematic: Optional[str] = Query(None, description="Filter by thematic"),
    status: Optional[str] = Query(None, description="Filter by status"),
):
    """
    Get all courses or filter by criteria.

    - **title**: Optional title filter (partial match)
    - **level**: Optional level filter (exact match)
    - **thematic**: Optional thematic filter (exact match)
    - **status**: Optional status filter (exact match)
    """
    if any([title, level, thematic, status]):
        return storage_service.search_courses(
            title=title,
            level=level,
            thematic=thematic,
            status=status,
        )
    return storage_service.get_all_courses()


@router.get("/{course_id}", response_model=Course)
async def get_course(course_id: str):
    """
    Get a specific course by ID.

    - **course_id**: The unique identifier of the course
    """
    course = storage_service.get_course(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("/", response_model=Course, status_code=201)
async def create_course(course_data: CourseCreate):
    """
    Create a new course.

    - **course_data**: Course creation data
    """
    return storage_service.create_course(course_data)


@router.put("/{course_id}", response_model=Course)
async def update_course(course_id: str, updates: CourseUpdate):
    """
    Update an existing course.

    - **course_id**: The unique identifier of the course
    - **updates**: Fields to update
    """
    course = storage_service.update_course(course_id, updates)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.delete("/{course_id}", status_code=204)
async def delete_course(course_id: str):
    """
    Delete a course.

    - **course_id**: The unique identifier of the course
    """
    deleted = storage_service.delete_course(course_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Course not found")
    return None


@router.post("/{course_id}/duplicate", response_model=Course, status_code=201)
async def duplicate_course(course_id: str):
    """
    Duplicate an existing course.

    - **course_id**: The unique identifier of the course to duplicate
    """
    original = storage_service.get_course(course_id)
    if not original:
        raise HTTPException(status_code=404, detail="Course not found")

    # Create duplicate
    duplicate_data = CourseCreate(
        title=f"{original.title} (Copy)",
        code=f"{original.code}-COPY",
        level=original.level,
        thematic=original.thematic,
        custom_thematic=original.custom_thematic,
        description=original.description,
        overview=original.overview,
        target_audience=original.target_audience,
        duration=original.duration,
        delivery_method=original.delivery_method,
        author=original.metadata.author if original.metadata else "",
        organization=original.metadata.organization if original.metadata else None,
    )

    duplicated = storage_service.create_course(duplicate_data)

    # Copy objectives, modules, assessments
    updates = CourseUpdate(
        learning_objectives=original.learning_objectives,
        modules=original.modules,
        assessments=original.assessments,
    )
    storage_service.update_course(duplicated.id, updates)

    return storage_service.get_course(duplicated.id)
