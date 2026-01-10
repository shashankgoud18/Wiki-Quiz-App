from sqlalchemy import Column, Integer, String, Text, JSON, DateTime
from datetime import datetime
from app.core.base import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(500), unique=True, nullable=False)
    title = Column(String(255))
    summary = Column(Text)
    entities = Column(JSON)
    sections = Column(JSON)
    quiz = Column(JSON)
    related_topics = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
