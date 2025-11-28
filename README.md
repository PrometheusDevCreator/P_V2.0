# Prometheus Course Generation System 2.0

An AI-powered course generation system for professional training and development.

## Features

- **Course Management**: Create, edit, and manage professional training courses
- **AI-Powered Generation**: Generate learning objectives, modules, assessments, and descriptions
- **Dark Theme UI**: Custom cyberpunk-inspired dark theme with cyan glow effects
- **Export Options**: Export courses to JSON, PDF, DOCX, and SCORM formats
- **Real-time Chat**: AI assistant for course development guidance

## Course Levels

- Awareness
- Foundational
- Basic
- Intermediate
- Advanced
- Expert
- Senior

## Course Thematics

- Defence and Security
- Intelligence
- Policing
- Leadership
- Crisis Response
- Resilience
- Personal Skills
- User Defined

## Project Structure

```
P_V2.0/
├── frontend/                 # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components
│   │   │   │   ├── GlowingBox.tsx
│   │   │   │   ├── FlameButton.tsx
│   │   │   │   ├── NeonButton.tsx
│   │   │   │   └── ConnectionLines.tsx
│   │   │   └── panels/      # Application panels
│   │   │       ├── Header.tsx
│   │   │       ├── StatusBar.tsx
│   │   │       ├── LearningObjectives.tsx
│   │   │       ├── CourseInformation.tsx
│   │   │       ├── CourseDescription.tsx
│   │   │       ├── ManagerButtons.tsx
│   │   │       ├── GeneratePanel.tsx
│   │   │       └── AIChat.tsx
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript definitions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                  # FastAPI + Python
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── courses.py    # Course CRUD endpoints
│   │   │       ├── ai.py         # AI generation endpoints
│   │   │       ├── export.py     # Export endpoints
│   │   │       └── lexicon.py    # Lexicon endpoints
│   │   ├── core/
│   │   │   └── config.py    # Application configuration
│   │   ├── models/
│   │   │   └── course.py    # Pydantic models
│   │   ├── services/
│   │   │   ├── storage.py   # JSON file storage
│   │   │   ├── ai_engine.py # AI generation service
│   │   │   └── export.py    # Export service
│   │   └── main.py          # FastAPI application
│   ├── data/                # JSON data storage
│   ├── exports/             # Exported files
│   └── requirements.txt
│
└── shared/
    └── lexicon.json         # Shared template placeholders
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend will run at `http://localhost:8000`

### API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get a specific course
- `POST /api/courses` - Create a new course
- `PUT /api/courses/{id}` - Update a course
- `DELETE /api/courses/{id}` - Delete a course

### AI Generation
- `POST /api/ai/generate` - Generate course content
- `POST /api/ai/chat` - Chat with AI assistant
- `GET /api/ai/status` - Get AI engine status

### Export
- `POST /api/export` - Export a course
- `GET /api/export/download/{filename}` - Download exported file
- `GET /api/export/formats` - List available export formats

### Lexicon
- `GET /api/lexicon` - Get complete lexicon
- `GET /api/lexicon/levels` - Get course levels
- `GET /api/lexicon/thematics` - Get course thematics
- `GET /api/lexicon/verbs/{level}` - Get objective verbs for a level

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Vite
- Lucide React (icons)

### Backend
- FastAPI
- Python 3.10+
- Pydantic
- Uvicorn

## License

Proprietary - All rights reserved.
