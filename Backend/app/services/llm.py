import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment")

# Initialize Gemini client
client = genai.Client(api_key=api_key)

def generate_quiz_llm(prompt: str) -> str:
    """Generate content using Gemini LLM"""
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
