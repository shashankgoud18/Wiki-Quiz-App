from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.quiz import router as quiz_router
from app.api.v1.history import router as history_router
from app.core.database import engine
from app.core.base import Base

# Import all models for table creation
from app.models.quiz import Quiz
from app.models.quiz_attempt import QuizAttempt

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Wiki Quiz Generator", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")

@app.get("/")
def health():
    return {"status": "running", "version": "1.0.0"}
