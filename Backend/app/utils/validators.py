from urllib.parse import urlparse

def is_valid_wikipedia_url(url: str) -> bool:
    parsed = urlparse(url)
    return "wikipedia.org" in parsed.netloc
