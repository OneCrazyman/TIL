#!/usr/bin/env python3
# strip_date_quotes.py
# 사용: python strip_date_quotes.py <root_dir>
import os
import re
import sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
EXTS = {".md", ".mdx"}

# 파일 시작에 있는 frontmatter만 매칭
FM_RE = re.compile(r"^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)", re.M)

# frontmatter 내부에서 date: "..." 또는 date: '...' 만 치환
DATE_RE = re.compile(r'^(\s*date\s*:\s*)(["\'])(.*?)(\2)\s*$', re.M)

def process_text(text: str):
    m = FM_RE.match(text)
    if not m:
        return text, False

    start, fm, end = m.group(1), m.group(2), m.group(3)

    new_fm, n = DATE_RE.subn(lambda mm: f"{mm.group(1)}{mm.group(3)}", fm)
    if n == 0:
        return text, False

    new_text = start + new_fm + end + text[m.end():]
    return new_text, new_text != text

def main():
    scanned = 0
    modified = 0

    for dirpath, _, filenames in os.walk(ROOT):
        for fn in filenames:
            if os.path.splitext(fn)[1].lower() not in EXTS:
                continue
            p = os.path.join(dirpath, fn)
            try:
                with open(p, "r", encoding="utf-8") as f:
                    text = f.read()
            except UnicodeDecodeError:
                continue

            scanned += 1
            new_text, changed = process_text(text)
            if changed:
                with open(p, "w", encoding="utf-8", newline="") as f:
                    f.write(new_text)
                modified += 1

    print(f"Scanned: {scanned} files")
    print(f"Modified: {modified} files")
    print(f"Root: {os.path.abspath(ROOT)}")

if __name__ == "__main__":
    main()
