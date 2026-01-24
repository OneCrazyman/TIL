#!/usr/bin/env python3
# strip_frontmatter_quotes.py
# 사용: python strip_frontmatter_quotes.py <root_dir>
import os
import re
import sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."

EXTS = {".md", ".mdx"}

# frontmatter: 파일 시작에서 --- ... --- 만 처리
FM_RE = re.compile(r"^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)", re.M)

# frontmatter 내부에서 key: "value" 또는 key: 'value' 한 줄만 처리
# - value는 같은 따옴표가 나오기 전까지(최소 매칭)
LINE_RE = re.compile(r'^(\s*[^:\n]+:\s*)(["\'])(.*?)(\2)\s*$', re.M)

def process_text(text: str) -> tuple[str, bool]:
    m = FM_RE.match(text)
    if not m:
        return text, False

    start, fm, end = m.group(1), m.group(2), m.group(3)

    def repl(mm: re.Match) -> str:
        prefix = mm.group(1)
        value = mm.group(3)
        # 따옴표만 제거 (특수문자/콜론 그대로 허용)
        return f"{prefix}{value}"

    new_fm, n = LINE_RE.subn(repl, fm)
    if n == 0:
        return text, False

    new_text = start + new_fm + end + text[m.end():]
    return new_text, (new_text != text)

def main():
    changed_files = 0
    scanned_files = 0

    for dirpath, _, filenames in os.walk(ROOT):
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in EXTS:
                continue
            path = os.path.join(dirpath, fn)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    text = f.read()
            except UnicodeDecodeError:
                # 인코딩 이슈면 스킵
                continue

            scanned_files += 1
            new_text, changed = process_text(text)
            if changed:
                with open(path, "w", encoding="utf-8", newline="") as f:
                    f.write(new_text)
                changed_files += 1

    print(f"Scanned: {scanned_files} files")
    print(f"Modified: {changed_files} files")
    print(f"Root: {os.path.abspath(ROOT)}")

if __name__ == "__main__":
    main()
