from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.quiz import Quiz
from app.services.scraper import scrape_wikipedia
from app.services.extractor import extract_metadata
from app.services.quiz_generator import generate_quiz
from app.models.quiz_attempt import QuizAttempt
from app.schemas.quiz_submit import QuizSubmitRequest
from app.services.scoring import calculate_score
from app.schemas.quiz import QuizGenerateRequest
from app.utils.validators import is_valid_wikipedia_url



router = APIRouter(prefix="/quiz", tags=["Quiz"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def format_quiz_response(quiz: Quiz):
    return {
        "id": quiz.id,
        "url": quiz.url,
        "title": quiz.title,
        "summary": quiz.summary,
        "key_entities": quiz.entities,
        "sections": quiz.sections,
        "quiz": quiz.quiz,
        "related_topics": quiz.related_topics,
        "created_at": quiz.created_at
    }

@router.post("/generate")
def generate(payload: QuizGenerateRequest, db: Session = Depends(get_db)):
    url = str(payload.url)
    
    # Validate Wikipedia URL
    if not is_valid_wikipedia_url(url):
        raise HTTPException(status_code=400, detail="Invalid Wikipedia URL. Must be from en.wikipedia.org")
    
    # Check cache
    cached = db.query(Quiz).filter(Quiz.url == url).first()
    if cached:
        return format_quiz_response(cached)
    
    try:
        scraped = scrape_wikipedia(url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to scrape URL: {str(e)}")
    
    try:
        meta = extract_metadata(scraped["content"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract metadata: {str(e)}")
    
    try:
        quiz_data = generate_quiz(scraped["content"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")

    record = Quiz(
        url=url,
        title=scraped["title"],
        summary=meta["summary"],
        entities=meta["key_entities"],
        sections=scraped["sections"],
        quiz=quiz_data["quiz"],
        related_topics=quiz_data["related_topics"]
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return format_quiz_response(record)

@router.get("/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    return format_quiz_response(quiz)

@router.post("/{quiz_id}/submit")
def submit_quiz(
    quiz_id: int,
    payload: QuizSubmitRequest,
    db: Session = Depends(get_db)
):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    score = calculate_score(quiz.quiz, payload.answers)

    attempt = QuizAttempt(
        quiz_id=quiz_id,
        answers=payload.answers,
        score=score
    )

    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    return {
        "quiz_id": quiz_id,
        "score": score,
        "submitted_at": attempt.created_at
    }

@router.delete("/{quiz_id}")
def delete_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    db.delete(quiz)
    db.commit()
    
    return {"message": "Quiz deleted successfully", "quiz_id": quiz_id}