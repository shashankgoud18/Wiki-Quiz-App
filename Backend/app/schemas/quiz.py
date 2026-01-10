from pydantic import BaseModel, HttpUrl

class QuizGenerateRequest(BaseModel):
    url: HttpUrl
