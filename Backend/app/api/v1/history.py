from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.quiz import Quiz
from app.models.quiz_attempt import QuizAttempt

router = APIRouter(prefix="/history", tags=["History"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/quizzes")
def quiz_history(db: Session = Depends(get_db)):
    """Get all quizzes for Tab 2 - Past Quizzes (History table)"""
    quizzes = (
        db.query(Quiz)
        .order_by(Quiz.created_at.desc())
        .all()
    )

    return [
        {
            "id": q.id,
            "url": q.url,
            "title": q.title,
            "summary": q.summary[:200] if q.summary else "",  # Brief summary for table
            "created_at": q.created_at
        }
        for q in quizzes
    ]


@router.get("/attempts")
def attempts_history(db: Session = Depends(get_db)):
    """Get all quiz attempts (for scoring history)"""
    attempts = (
        db.query(QuizAttempt)
        .order_by(QuizAttempt.created_at.desc())
        .all()
    )

    return [
        {
            "attempt_id": a.id,
            "quiz_id": a.quiz_id,
            "score": a.score,
            "submitted_at": a.created_at
        }
        for a in attempts
    ]


@router.get("/attempts/{attempt_id}")
def attempt_detail(attempt_id: int, db: Session = Depends(get_db)):
    """Get details of a specific attempt"""
    attempt = db.query(QuizAttempt).filter(
        QuizAttempt.id == attempt_id
    ).first()

    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")

    return {
        "attempt_id": attempt.id,
        "quiz_id": attempt.quiz_id,
        "answers": attempt.answers,
        "score": attempt.score,
        "submitted_at": attempt.created_at
    }


@router.delete("/quiz/{quiz_id}")
def delete_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """Delete a quiz and all its associated attempts"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # Delete all attempts associated with this quiz
    db.query(QuizAttempt).filter(QuizAttempt.quiz_id == quiz_id).delete()
    
    # Delete the quiz
    db.delete(quiz)
    db.commit()
    
    return {"message": "Quiz deleted successfully"}
