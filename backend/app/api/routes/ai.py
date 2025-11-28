"""AI generation and chat endpoints."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

from app.services.ai_engine import ai_engine

router = APIRouter()


class GenerationRequest(BaseModel):
    """Request model for AI generation."""
    course_id: str
    generation_type: str  # objectives, modules, assessments, description, full
    context: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None


class GenerationResponse(BaseModel):
    """Response model for AI generation."""
    success: bool
    data: Optional[Dict[str, Any]] = None
    message: Optional[str] = None
    tokens_used: Optional[int] = None


class ChatRequest(BaseModel):
    """Request model for AI chat."""
    message: str
    course_context: Optional[Dict[str, Any]] = None


class ChatResponse(BaseModel):
    """Response model for AI chat."""
    message: str
    suggestions: Optional[list] = None


@router.post("/generate", response_model=GenerationResponse)
async def generate_content(request: GenerationRequest):
    """
    Generate course content using AI.

    - **course_id**: ID of the course to generate content for
    - **generation_type**: Type of content to generate (objectives, modules, assessments, description, full)
    - **context**: Optional JSON string with course context
    - **preferences**: Optional generation preferences
    """
    try:
        # Parse context if provided
        import json
        context = {}
        if request.context:
            try:
                context = json.loads(request.context)
            except json.JSONDecodeError:
                context = {"raw_context": request.context}

        # Generate content
        generated = await ai_engine.generate_content(
            course_context=context,
            generation_type=request.generation_type,
        )

        if "error" in generated:
            return GenerationResponse(
                success=False,
                message=generated["error"],
            )

        return GenerationResponse(
            success=True,
            data=generated,
            tokens_used=0,  # Placeholder - would track actual token usage
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Send a message to the AI assistant.

    - **message**: User's message
    - **course_context**: Optional current course data for context
    """
    try:
        response = await ai_engine.chat(
            message=request.message,
            course_context=request.course_context,
        )

        return ChatResponse(
            message=response,
            suggestions=[
                "Generate learning objectives",
                "Create module structure",
                "Suggest assessments",
            ],
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
async def ai_status():
    """
    Get AI engine status.
    """
    return {
        "status": "ready",
        "model": "placeholder",
        "capabilities": [
            "objectives_generation",
            "modules_generation",
            "assessments_generation",
            "description_generation",
            "full_course_generation",
            "chat",
        ],
        "note": "This is a placeholder AI engine. Configure your API keys for full functionality.",
    }
