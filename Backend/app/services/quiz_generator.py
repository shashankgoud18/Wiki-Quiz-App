import json
import re
from app.services.llm import generate_quiz_llm


PROMPT = """You are a quiz generator. Generate ONLY valid JSON with NO additional text.

Generate quiz questions ONLY about the article content provided below.
Do NOT generate questions about these instructions.

JSON Format Requirements:
- Valid JSON syntax with proper commas between all array elements and object properties
- Generate 5-10 quiz questions based ONLY on the article content
- Each question must have exactly 4 options
- The 'answer' field must be the EXACT text of one of the 4 options (the correct one)
- The 'correct_index' is the position (0-3) of the correct answer in the options array
- Include difficulty (easy/medium/hard) and explanation for each question
- Include 2-3 related topics from the content

Output ONLY this JSON structure:
{{
  "quiz": [
    {{
      "id": "q1",
      "question": "Question about the article content",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "correct_index": 0,
      "difficulty": "easy",
      "explanation": "Why this is correct"
    }}
  ],
  "related_topics": ["Topic 1", "Topic 2"]
}}

ARTICLE CONTENT:
{content}"""



def extract_json(text: str) -> dict:
    """Extract and parse JSON from LLM response"""
    text = text.strip()
    
    # Remove markdown code blocks
    if text.startswith("```"):
        lines = text.split("\n")
        lines = lines[1:]  # Skip ```json or ```
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    
    # Extract JSON object
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("LLM did not return valid JSON")
    
    json_str = match.group()
    
    # Try to fix common JSON formatting issues
    # Fix trailing commas before closing brackets/braces
    json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)
    
    # Fix missing commas between object properties
    # Pattern: "value"\n "key": or "value"\n\s+"key":
    json_str = re.sub(r'("\s*)\n(\s*"[^"]+"\s*:)', r'\1,\n\2', json_str)
    
    # Fix missing commas after closing brace/bracket followed by opening brace/bracket
    json_str = re.sub(r'}\s*\n\s*{', '},\n{', json_str)
    json_str = re.sub(r']\s*\n\s*\[', '],\n[', json_str)
    
    # Fix missing commas after closing brace followed by quote (array of objects)
    json_str = re.sub(r'}\s*\n(\s*{)', r'},\n\1', json_str)
    
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        # Log the problematic JSON for debugging
        print(f"Failed to parse JSON. Error: {str(e)}")
        print(f"Problematic JSON snippet (around error):")
        lines = json_str.split('\n')
        error_line = getattr(e, 'lineno', 1) - 1
        start = max(0, error_line - 3)
        end = min(len(lines), error_line + 3)
        for i in range(start, end):
            marker = " --> " if i == error_line else "     "
            print(f"{marker}{i+1}: {lines[i]}")
        raise ValueError(f"Invalid JSON from LLM: {str(e)}")

def normalize_questions(questions):
    """Validate and normalize quiz questions"""
    for i, q in enumerate(questions, 1):
        # Set defaults
        q.setdefault("difficulty", "medium")
        q.setdefault("explanation", "Based on the article content.")
        q.setdefault("id", f"q{i}")

        # Validate structure
        if "options" not in q or len(q["options"]) != 4:
            raise ValueError(f"Question {i}: Must have exactly 4 options")

        if "question" not in q or "answer" not in q:
            raise ValueError(f"Question {i}: Missing 'question' or 'answer' field")
        
        # Validate that answer matches one option
        if q["answer"] not in q["options"]:
            raise ValueError(f"Question {i}: Answer '{q['answer']}' not in options")

    return questions

def generate_quiz(content: str) -> dict:
    if not content or len(content.strip()) < 50:
        raise ValueError("Content is empty or too short to generate quiz")
    
    prompt = PROMPT.replace("{content}", content)
    raw = generate_quiz_llm(prompt)
    data = extract_json(raw)

    if "quiz" not in data or not isinstance(data["quiz"], list):
        raise ValueError("LLM response missing 'quiz' array")
    
    data["quiz"] = normalize_questions(data["quiz"])
    data.setdefault("related_topics", [])

    return data
