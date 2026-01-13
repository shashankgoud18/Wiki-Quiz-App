import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from itertools import cycle

load_dotenv()

raw_keys = os.getenv("GEMINI_API_KEYS")
single_key = os.getenv("GEMINI_API_KEY")

if raw_keys:
    keys = [k.strip() for k in raw_keys.split(",") if k.strip()]
elif single_key:
    keys = [single_key]
else:
    raise ValueError("Provide GEMINI_API_KEYS (comma-separated) or GEMINI_API_KEY")

if not keys:
    raise ValueError("No Gemini API keys provided")

# Round-robin iterator
_key_cycle = cycle(keys)

def _get_client():
    key = next(_key_cycle)
    return genai.Client(api_key=key)

def generate_quiz_llm(prompt: str) -> str:
    """Generate content using Gemini LLM."""
    client = _get_client()
    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.3,
            max_output_tokens=4096,
            response_mime_type="application/json"
        )
    )
    return response.text
