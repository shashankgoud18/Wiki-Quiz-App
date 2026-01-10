import json
from app.services.llm import generate_quiz_llm

PROMPT = """
Extract structured information.

Return ONLY valid JSON:
{{
  "summary": "",
  "key_entities": {{
    "people": [],
    "organizations": [],
    "locations": []
  }}
}}

Content:
{content}
"""

def extract_metadata(content: str) -> dict:
    """Extract summary and entities from article content using LLM"""
    prompt = PROMPT.replace("{content}", content)
    raw = generate_quiz_llm(prompt)
    
    # Clean markdown code blocks if present
    raw = raw.strip()
    if raw.startswith("```"):
        # Remove opening ```json or ```
        lines = raw.split("\n")
        lines = lines[1:]  # Skip first line with ```
        # Remove closing ```
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        raw = "\n".join(lines)
    
    raw = raw.strip()
    
    if not raw:
        raise ValueError("LLM returned empty response")
    
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse LLM response as JSON: {str(e)}")
