import requests
from bs4 import BeautifulSoup
from app.utils.text_cleaner import clean_text
import logging

logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def scrape_wikipedia(url: str) -> dict:
    """Scrape Wikipedia article and extract title, content, and sections"""
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        res.raise_for_status()
        logger.info(f"Successfully fetched {url}, status: {res.status_code}")
    except requests.RequestException as e:
        logger.error(f"Failed to fetch URL: {str(e)}")
        raise ValueError(f"Failed to fetch URL: {str(e)}")

    soup = BeautifulSoup(res.text, "html.parser")

    # Extract title
    title = None
    for selector in ["h1.firstHeading", "h1", "span.mw-page-title-main"]:
        title_tag = soup.select_one(selector)
        if title_tag:
            title = title_tag.get_text(strip=True)
            logger.info(f"Found title: {title}")
            break
    
    if not title:
        raise ValueError("Could not find article title")

    # Extract main content
    text = ""
    
    # Try method 1: mw-parser-output div
    content_div = soup.find("div", {"class": "mw-parser-output"})
    if content_div:
        paragraphs = content_div.find_all("p", limit=50)  # Limit to avoid too many
        text = " ".join(p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True))
        logger.info(f"Method 1 - Found {len(paragraphs)} paragraphs, text length: {len(text)}")
    
    # Try method 2: all paragraphs if method 1 failed
    if not text or len(text) < 100:
        paragraphs = soup.find_all("p", limit=100)
        text = " ".join(p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True))
        logger.info(f"Method 2 - Found {len(paragraphs)} paragraphs, text length: {len(text)}")
    
    if not text or len(text.strip()) < 100:
        logger.error(f"Content too short or empty. Text length: {len(text)}")
        raise ValueError("Article content is too short or empty")

    # Extract section headings
    sections = []
    for h in soup.find_all(["h2", "h3"]):
        span = h.find("span", {"class": "mw-headline"})
        if span:
            sections.append(span.get_text(strip=True))

    logger.info(f"Extracted {len(sections)} sections and {len(text)} chars of content")

    return {
        "title": title,
        "content": clean_text(text[:8000]),
        "sections": sections[:10]
    }
