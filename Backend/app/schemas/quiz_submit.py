from pydantic import BaseModel
from typing import List

class QuizSubmitRequest(BaseModel):
    answers: List[int]
