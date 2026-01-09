import json
import re
from app.services.llm import generate_quiz_llm

def _extract_json(text: str) -> dict:
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("LLM did not return valid JSON")
    return json.loads(match.group())

def generate_quiz(content: str, difficulty: str) -> dict:
    count = 10 if len(content) > 4000 else 5

    prompt = f"""
You are a quiz generator.

Generate {count} multiple-choice questions.
Difficulty: {difficulty}

Rules:
- Each question has exactly 4 options
- One correct answer
- Return ONLY valid JSON
- No markdown, no explanation outside JSON

JSON FORMAT:
{{
  "questions": [
    {{
      "question": "",
      "options": ["", "", "", ""],
      "answer": ""
    }}
  ]
}}

CONTENT:
{content}
"""

    raw = generate_quiz_llm(prompt)
    return _extract_json(raw)
