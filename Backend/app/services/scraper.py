import requests
from bs4 import BeautifulSoup
from app.utils.text_cleaner import clean_text

HEADERS = {"User-Agent": "Mozilla/5.0"}

def scrape_wikipedia(url: str) -> dict:
    """Scrape Wikipedia article and extract title, content, and sections"""
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        res.raise_for_status()
    except requests.RequestException as e:
        raise ValueError(f"Failed to fetch URL: {str(e)}")

    soup = BeautifulSoup(res.text, "html.parser")

    # Extract title
    title_tag = soup.find("h1")
    if not title_tag:
        raise ValueError("Could not find article title")
    title = title_tag.get_text(strip=True)

    # Extract main content paragraphs
    paragraphs = soup.select("div.mw-parser-output > p")
    text = " ".join(p.get_text() for p in paragraphs if p.get_text(strip=True))
    
    if not text or len(text.strip()) < 100:
        raise ValueError("Article content is too short or empty")

    # Extract section headings
    sections = [
        h.get_text(strip=True)
        for h in soup.select("span.mw-headline")
    ]

    return {
        "title": title,
        "content": clean_text(text[:8000]),
        "sections": sections[:10]
    }
