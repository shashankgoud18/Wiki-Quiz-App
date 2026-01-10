# AI Wiki Quiz Generator - Backend

A FastAPI-based backend service that generates quizzes from Wikipedia articles using Google Gemini LLM.

## Project Structure

```
Backend/
├── app/
│   ├── api/v1/               # API endpoints
│   │   ├── quiz.py          # Quiz generation & retrieval
│   │   └── history.py       # Quiz history endpoints
│   ├── core/                # Core configuration
│   │   ├── config.py        # Environment & settings
│   │   ├── database.py      # Database setup
│   │   └── base.py          # SQLAlchemy base
│   ├── models/              # Database models
│   │   ├── quiz.py          # Quiz model
│   │   └── quiz_attempt.py  # Quiz attempt/scoring model
│   ├── schemas/             # Pydantic request/response models
│   │   ├── quiz.py          # Quiz schema
│   │   └── quiz_submit.py   # Quiz submission schema
│   ├── services/            # Business logic
│   │   ├── scraper.py       # Wikipedia scraper
│   │   ├── extractor.py     # Metadata extraction
│   │   ├── quiz_generator.py # Quiz generation logic
│   │   ├── llm.py           # Gemini LLM client
│   │   └── scoring.py       # Quiz scoring
│   ├── utils/               # Utilities
│   │   ├── validators.py    # URL validation
│   │   └── text_cleaner.py  # Text processing
│   └── main.py              # FastAPI app initialization
├── requirements.txt         # Python dependencies
└── .env                     # Environment variables
```

## Setup & Installation

### Prerequisites
- Python 3.9+
- PostgreSQL
- Google Gemini API key

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
Create `.env` file:
```env
DATABASE_URL=mysql+pymysql://user:password@localhost/quiz_db
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Create Database
```bash
python -c "from app.core.database import engine; from app.core.base import Base; Base.metadata.create_all(bind=engine)"
```

### 4. Run Server
```bash
uvicorn app.main:app --reload
```

Server runs at: `http://127.0.0.1:8000`

## API Endpoints

### Generate Quiz
**POST** `/api/v1/quiz/generate`
```json
{
  "url": "https://en.wikipedia.org/wiki/Alan_Turing"
}
```

**Response:**
```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "summary": "...",
  "key_entities": {
    "people": [...],
    "locations": [...],
    "organizations": [...]
  },
  "sections": [...],
  "quiz": [
    {
      "id": "q1",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "correct_index": 0,
      "difficulty": "easy",
      "explanation": "..."
    }
  ],
  "related_topics": [...],
  "created_at": "2026-01-09T..."
}
```

### Get Quiz by ID
**GET** `/api/v1/quiz/{quiz_id}`

### Submit Quiz Answers
**POST** `/api/v1/quiz/{quiz_id}/submit`
```json
{
  "answers": [0, 1, 2, 0, 3, 1, 2, 1]
}
```

**Response:**
```json
{
  "quiz_id": 1,
  "score": 7,
  "submitted_at": "2026-01-09T..."
}
```

### Get Quiz History
**GET** `/api/v1/history/quizzes`

Returns list of all generated quizzes.

### Get Attempt History
**GET** `/api/v1/history/attempts`

Returns list of all quiz attempts.

### Get Attempt Details
**GET** `/api/v1/history/attempts/{attempt_id}`

## Key Features

✅ **URL Validation** - Only Wikipedia URLs accepted
✅ **Content Scraping** - BeautifulSoup extracts article content
✅ **LLM Integration** - Google Gemini generates quiz questions
✅ **Metadata Extraction** - Summary, entities, and sections extracted
✅ **Quiz Caching** - Same URL returns cached result
✅ **Score Calculation** - Automatic answer validation & scoring
✅ **CORS Enabled** - Frontend can call from any origin
✅ **Error Handling** - Comprehensive error messages

## Database Schema

### Quizzes Table
- id (PK)
- url (unique)
- title
- summary
- entities (JSON)
- sections (JSON)
- quiz (JSON)
- related_topics (JSON)
- created_at

### Quiz Attempts Table
- id (PK)
- quiz_id (FK)
- answers (JSON)
- score
- created_at

## Tech Stack

- **Framework:** FastAPI
- **Database:** PostgreSQL / MySQL
- **ORM:** SQLAlchemy
- **LLM:** Google Gemini API (google-genai)
- **Scraping:** BeautifulSoup4
- **Server:** Uvicorn

## Testing

Test endpoints using curl or Postman:

```bash
# Generate quiz
curl -X POST http://127.0.0.1:8000/api/v1/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{"url": "https://en.wikipedia.org/wiki/India"}'

# Get quiz history
curl http://127.0.0.1:8000/api/v1/history/quizzes

# Get specific quiz
curl http://127.0.0.1:8000/api/v1/quiz/1

# Submit answers
curl -X POST http://127.0.0.1:8000/api/v1/quiz/1/submit \
  -H "Content-Type: application/json" \
  -d '{"answers": [0, 1, 2, 0, 3]}'
```

## Health Check
**GET** `/`

Returns: `{"status": "running", "version": "1.0.0"}`

## Notes

- Quiz generation takes 10-20 seconds (LLM processing)
- Each Wikipedia URL is cached to avoid duplicate scraping
- Free tier Gemini API has rate limits (~60 requests/min)
- Prompt-based grounding ensures quiz content relevance

---

**Ready for frontend integration!** 🚀
