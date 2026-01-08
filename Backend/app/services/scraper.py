import requests
from bs4 import BeautifulSoup
from app.utils.text_cleaner import clean_text

def scrape_wikipedia(url: str) -> dict:
    res = requests.get(url, timeout=10)
    res.raise_for_status()

    soup = BeautifulSoup(res.text, "html.parser")

    title = soup.find("h1").text
    paragraphs = soup.select("div.mw-parser-output > p")

    raw_text = " ".join(p.text for p in paragraphs if p.text.strip())
    cleaned = clean_text(raw_text)

    return {
        "title": title,
        "content": cleaned[:15000]
    }
