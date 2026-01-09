import requests
from bs4 import BeautifulSoup
from app.utils.text_cleaner import clean_text

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

def scrape_wikipedia(url: str) -> dict:
    res = requests.get(url, headers=HEADERS, timeout=15)
    res.raise_for_status()

    soup = BeautifulSoup(res.text, "html.parser")

    title_tag = soup.find("h1")
    if not title_tag:
        raise ValueError("Failed to extract article title")

    title = title_tag.get_text(strip=True)

    paragraphs = soup.select("div.mw-parser-output > p")
    raw_text = " ".join(
        p.get_text(strip=True)
        for p in paragraphs
        if p.get_text(strip=True)
    )

    if len(raw_text) < 500:
        raise ValueError("Article content too small to generate quiz")

    cleaned = clean_text(raw_text)

    return {
        "title": title,
        "content": cleaned[:15000]  # token safety
    }
