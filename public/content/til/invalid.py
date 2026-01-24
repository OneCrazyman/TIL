#!/usr/bin/env python3
# 사용: python find_invalid_dates.py <root_dir>
import os, re, sys
from datetime import datetime

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
EXTS = {".md", ".mdx"}

FM_RE = re.compile(r"^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)", re.M)
DATE_RE = re.compile(r'^\s*date\s*:\s*(.+?)\s*$', re.M)

def parse_date(s: str) -> bool:
    s = s.strip().strip('"').strip("'")
    # 가장 일반적인 케이스: YYYY-MM-DD
    try:
        datetime.strptime(s, "%Y-%m-%d")
        return True
    except Exception:
        return False

bad = []
missing = []

for dirpath, _, filenames in os.walk(ROOT):
    for fn in filenames:
        if os.path.splitext(fn)[1].lower() not in EXTS:
            continue
        p = os.path.join(dirpath, fn)
        try:
            text = open(p, "r", encoding="utf-8").read()
        except UnicodeDecodeError:
            continue

        m = FM_RE.match(text)
        if not m:
            continue
        fm = m.group(2)
        dm = DATE_RE.search(fm)
        if not dm:
            # date 필드 없는 글은 필요하면 여기서 잡기
            continue

        date_val = dm.group(1)
        if not parse_date(date_val):
            bad.append((p, date_val.strip()))

if bad:
    print("Invalid date frontmatter found:")
    for p, v in bad:
        print(f"- {p}\n  date: {v}")
    sys.exit(1)
else:
    print("No invalid dates found.")
