from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.quiz import QuizGenerateRequest
from app.services.scraper import scrape_wikipedia
from app.services.quiz_generator import generate_quiz
from app.utils.validators import is_valid_wikipedia_url
from app.models.quiz import Quiz
from app.core.database import get_db

router = APIRouter(prefix="/quiz", tags=["Quiz"])

@router.post("/generate")
def generate(payload: QuizGenerateRequest, db: Session = Depends(get_db)):
    if payload.difficulty not in ["easy", "medium", "hard"]:
        raise HTTPException(400, "Invalid difficulty")

    url = str(payload.url)

    existing = db.query(Quiz).filter(Quiz.url == url).first()
    if existing:
        return existing.quiz_data

    if not is_valid_wikipedia_url(url):
        raise HTTPException(400, "Invalid Wikipedia URL")

    scraped = scrape_wikipedia(url)
    quiz = generate_quiz(scraped["content"], payload.difficulty)

    score = len(quiz["questions"])

    record = Quiz(
        url=url,
        title=scraped["title"],
        difficulty=payload.difficulty,
        quiz_data=quiz,
        score=score
    )

    db.add(record)
    db.commit()

    return {
        "title": scraped["title"],
        "difficulty": payload.difficulty,
        "score_out_of_10": score,
        "quiz": quiz["questions"]
    }
