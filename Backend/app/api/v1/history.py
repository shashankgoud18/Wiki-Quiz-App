from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.quiz import Quiz

router = APIRouter(prefix="/history", tags=["History"])

@router.get("/")
def history(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).all()
    return [
        {
            "id": q.id,
            "title": q.title,
            "difficulty": q.difficulty,
            "score": q.score,
            "created_at": q.created_at
        }
        for q in quizzes
    ]
