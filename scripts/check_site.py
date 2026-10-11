#!/usr/bin/env python3
"""Local GitHub Pages quality checks with no third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
problems = []

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.title_seen = False
        self.title_open = False
        self.title_value = ""

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "title":
            self.title_open = True
            self.title_seen = True
        if tag in ("a", "link", "script", "img", "iframe", "source"):
            attr = "href" if tag in ("a", "link") else "src"
            if values.get(attr):
                self.links.append(values[attr])
        if tag == "img" and "alt" not in values:
            problems.append("Image missing alt text")

    def handle_data(self, data):
        if self.title_open:
            self.title_value += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.title_open = False


def validate_url(origin, address):
    parsed = urlsplit(address)
    if parsed.scheme in ("http", "https", "mailto", "tel", "data", "javascript") or parsed.netloc:
        return
    if not parsed.path:
        return
    ref = unquote(parsed.path)
    candidate = ROOT / ref.lstrip("/") if ref.startswith("/") else origin.parent / ref
    resolved = candidate.resolve()
    if not resolved.is_relative_to(ROOT):
        problems.append(f"{origin.relative_to(ROOT)}: outside repository: {address}")
        return
    if resolved.is_dir():
        resolved /= "index.html"
    if not resolved.is_file():
        problems.append(f"{origin.relative_to(ROOT)}: missing {address}")


pages = sorted(ROOT.rglob("*.html"))
for page in pages:
    parser = PageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    if not parser.title_seen or not parser.title_value.strip():
        problems.append(f"{page.relative_to(ROOT)}: missing title")
    for link in parser.links:
        validate_url(page, link)

sitemap = ROOT / "sitemap.xml"
if sitemap.exists():
    tree = ET.parse(sitemap)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for node in tree.findall(".//s:loc", ns):
        if node.text and node.text.startswith("https://abdulrab.github.io/"):
            suffix = node.text.removeprefix("https://abdulrab.github.io/")
            validate_url(ROOT / "index.html", "/" + suffix)

# Confirm all courses referenced by the data file have an existing page.
courses = (ROOT / "assets/js/course-data.js").read_text(encoding="utf-8")
import re
for name in re.findall(r'^"([a-z0-9-]+)":\{title:', courses, flags=re.MULTILINE):
    if not (ROOT / "courses" / (name + ".html")).is_file():
        problems.append(f"Missing HTML page for course {name}")
for note in re.findall(r'"(na-notes/[^"]+\.html)"', courses):
    if not (ROOT / "courses" / note).is_file():
        problems.append(f"Missing linked lecture note {note}")

if problems:
    print("Website checks FAILED:")
    for problem in problems:
        print(" -", problem)
    sys.exit(1)
print(f"Website checks passed: {len(pages)} HTML pages and local links examined.")
