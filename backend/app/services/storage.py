"""JSON file storage service."""

import json
import os
from typing import List, Optional
from datetime import datetime
import uuid

from app.models.course import Course, CourseCreate, CourseUpdate, CourseMetadata
from app.core.config import settings


class StorageService:
    """Service for storing and retrieving courses from JSON files."""

    def __init__(self):
        self.data_dir = settings.DATA_DIR
        self.courses_file = os.path.join(self.data_dir, settings.COURSES_FILE)
        self._ensure_data_file()

    def _ensure_data_file(self):
        """Ensure the data directory and courses file exist."""
        os.makedirs(self.data_dir, exist_ok=True)
        if not os.path.exists(self.courses_file):
            self._write_courses([])

    def _read_courses(self) -> List[dict]:
        """Read all courses from the JSON file."""
        try:
            with open(self.courses_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data if isinstance(data, list) else []
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def _write_courses(self, courses: List[dict]):
        """Write courses to the JSON file."""
        with open(self.courses_file, "w", encoding="utf-8") as f:
            json.dump(courses, f, indent=2, ensure_ascii=False)

    def get_all_courses(self) -> List[Course]:
        """Get all courses."""
        courses_data = self._read_courses()
        return [Course(**course) for course in courses_data]

    def get_course(self, course_id: str) -> Optional[Course]:
        """Get a course by ID."""
        courses_data = self._read_courses()
        for course in courses_data:
            if course.get("id") == course_id:
                return Course(**course)
        return None

    def create_course(self, course_data: CourseCreate) -> Course:
        """Create a new course."""
        courses = self._read_courses()

        # Generate new ID
        course_id = str(uuid.uuid4())

        # Create course dict
        new_course = Course(
            id=course_id,
            **course_data.model_dump(exclude_none=True),
            metadata=CourseMetadata(
                author=course_data.author,
                organization=course_data.organization,
            ),
        )

        # Add to list and save
        courses.append(new_course.model_dump())
        self._write_courses(courses)

        return new_course

    def update_course(self, course_id: str, updates: CourseUpdate) -> Optional[Course]:
        """Update an existing course."""
        courses = self._read_courses()

        for i, course in enumerate(courses):
            if course.get("id") == course_id:
                # Update fields
                update_data = updates.model_dump(exclude_none=True)
                for key, value in update_data.items():
                    course[key] = value

                # Update metadata
                if "metadata" not in course:
                    course["metadata"] = {}
                course["metadata"]["updated_date"] = datetime.now().isoformat()

                # Save
                courses[i] = course
                self._write_courses(courses)

                return Course(**course)

        return None

    def delete_course(self, course_id: str) -> bool:
        """Delete a course by ID."""
        courses = self._read_courses()
        original_length = len(courses)

        courses = [c for c in courses if c.get("id") != course_id]

        if len(courses) < original_length:
            self._write_courses(courses)
            return True

        return False

    def search_courses(
        self,
        title: Optional[str] = None,
        level: Optional[str] = None,
        thematic: Optional[str] = None,
        status: Optional[str] = None,
    ) -> List[Course]:
        """Search courses by various criteria."""
        courses = self.get_all_courses()
        results = []

        for course in courses:
            if title and title.lower() not in course.title.lower():
                continue
            if level and course.level != level:
                continue
            if thematic and course.thematic != thematic:
                continue
            if status and course.status != status:
                continue
            results.append(course)

        return results


# Singleton instance
storage_service = StorageService()
