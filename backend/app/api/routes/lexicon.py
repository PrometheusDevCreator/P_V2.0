"""Lexicon API endpoints."""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import json
import os

router = APIRouter()

# Path to shared lexicon file
LEXICON_PATH = os.path.join(
    os.path.dirname(__file__),
    "..", "..", "..", "..", "shared", "lexicon.json"
)


def load_lexicon() -> Dict[str, Any]:
    """Load the lexicon from the shared JSON file."""
    try:
        with open(LEXICON_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"error": "Lexicon file not found"}
    except json.JSONDecodeError:
        return {"error": "Invalid lexicon JSON"}


@router.get("/")
async def get_lexicon():
    """
    Get the complete lexicon.
    """
    return load_lexicon()


@router.get("/levels")
async def get_course_levels():
    """
    Get available course levels.
    """
    lexicon = load_lexicon()
    return {
        "levels": lexicon.get("courseLevels", []),
    }


@router.get("/thematics")
async def get_course_thematics():
    """
    Get available course thematics.
    """
    lexicon = load_lexicon()
    return {
        "thematics": lexicon.get("courseThematics", []),
    }


@router.get("/placeholders")
async def get_placeholders():
    """
    Get template placeholders.
    """
    lexicon = load_lexicon()
    return {
        "placeholders": lexicon.get("placeholders", {}),
    }


@router.get("/templates")
async def get_templates():
    """
    Get templates including objective verbs, assessment types, etc.
    """
    lexicon = load_lexicon()
    return {
        "templates": lexicon.get("templates", {}),
    }


@router.get("/status-codes")
async def get_status_codes():
    """
    Get course status codes.
    """
    lexicon = load_lexicon()
    return {
        "statusCodes": lexicon.get("statusCodes", {}),
    }


@router.get("/verbs/{level}")
async def get_objective_verbs(level: str):
    """
    Get recommended objective verbs for a specific level.

    - **level**: Course level (awareness, foundational, basic, intermediate, advanced, expert, senior)
    """
    lexicon = load_lexicon()
    templates = lexicon.get("templates", {})
    verbs = templates.get("objectiveVerbs", {})

    if level not in verbs:
        raise HTTPException(
            status_code=404,
            detail=f"No verbs found for level: {level}",
        )

    return {
        "level": level,
        "verbs": verbs[level],
    }
