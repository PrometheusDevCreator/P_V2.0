"""
Prometheus Course Generation System 2.0 - Backend API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.routes import courses, ai, export, lexicon
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    print("🔥 Prometheus Course Generation System 2.0 starting...")
    yield
    # Shutdown
    print("🔥 Prometheus shutting down...")


app = FastAPI(
    title="Prometheus Course Generation System",
    description="AI-powered course generation system for professional training",
    version="2.0.0",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(courses.router, prefix="/api/courses", tags=["Courses"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(export.router, prefix="/api/export", tags=["Export"])
app.include_router(lexicon.router, prefix="/api/lexicon", tags=["Lexicon"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "Prometheus Course Generation System",
        "version": "2.0.0",
        "status": "online",
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "services": {
            "api": "online",
            "storage": "online",
            "ai_engine": "ready",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
