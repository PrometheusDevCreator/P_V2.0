"""Export endpoints for course content."""

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import os

from app.services.storage import storage_service
from app.services.export import export_service

router = APIRouter()


class ExportRequest(BaseModel):
    """Request model for export."""
    course_id: str
    format: str  # json, pdf, docx, scorm
    include_metadata: bool = True


class ExportResponse(BaseModel):
    """Response model for export."""
    success: bool
    download_url: Optional[str] = None
    message: Optional[str] = None


@router.post("/", response_model=ExportResponse)
async def export_course(request: ExportRequest):
    """
    Export a course to the specified format.

    - **course_id**: ID of the course to export
    - **format**: Export format (json, pdf, docx, scorm)
    - **include_metadata**: Whether to include metadata in export
    """
    # Get course
    course = storage_service.get_course(request.course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Export based on format
    try:
        if request.format == "json":
            filepath = await export_service.export_json(
                course,
                include_metadata=request.include_metadata,
            )
        elif request.format == "pdf":
            filepath = await export_service.export_pdf(
                course,
                include_metadata=request.include_metadata,
            )
        elif request.format == "docx":
            filepath = await export_service.export_docx(
                course,
                include_metadata=request.include_metadata,
            )
        elif request.format == "scorm":
            filepath = await export_service.export_scorm(course)
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported export format: {request.format}",
            )

        # Return download URL
        filename = os.path.basename(filepath)
        return ExportResponse(
            success=True,
            download_url=f"/api/export/download/{filename}",
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{filename}")
async def download_export(filename: str):
    """
    Download an exported file.

    - **filename**: Name of the file to download
    """
    from app.core.config import settings

    filepath = os.path.join(settings.EXPORT_DIR, filename)

    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")

    # Determine media type
    if filename.endswith(".json"):
        media_type = "application/json"
    elif filename.endswith(".pdf"):
        media_type = "application/pdf"
    elif filename.endswith(".docx"):
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    elif filename.endswith(".zip"):
        media_type = "application/zip"
    else:
        media_type = "application/octet-stream"

    return FileResponse(
        filepath,
        media_type=media_type,
        filename=filename,
    )


@router.get("/formats")
async def get_export_formats():
    """
    Get available export formats.
    """
    return {
        "formats": [
            {
                "id": "json",
                "name": "JSON",
                "description": "Raw JSON data format",
                "extension": ".json",
                "status": "available",
            },
            {
                "id": "pdf",
                "name": "PDF",
                "description": "Portable Document Format",
                "extension": ".pdf",
                "status": "placeholder",
            },
            {
                "id": "docx",
                "name": "Word Document",
                "description": "Microsoft Word format",
                "extension": ".docx",
                "status": "placeholder",
            },
            {
                "id": "scorm",
                "name": "SCORM Package",
                "description": "SCORM-compliant learning package",
                "extension": ".zip",
                "status": "placeholder",
            },
        ],
    }
