from fastapi import FastAPI
from dotenv import load_dotenv

from app.api.v1.quiz import router as quiz_router
from app.api.v1.history import router as history_router
from app.core.database import engine
from app.models.quiz import Base

load_dotenv() 

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Wiki Quiz Generator")

app.include_router(quiz_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")

@app.get("/")
def health():
    return {"status": "running"}
