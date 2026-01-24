# 개발 아카이브 블로그

Astro 기반의 정적 블로그입니다. 기술 아티클과 TIL을 기록하는 공간입니다.

## 📁 프로젝트 구조

```
til-blog/
├── content/              # 마크다운 포스트
│   ├── articles/        # 기술 아티클 (깊이 있는 긴 글)
│   │   └── {subcategory}/
│   │       ├── {slug}.md
│   │       └── image/   # 해당 포스트의 이미지
│   └── til/             # TIL (가벼운 학습 기록)
│       └── {subcategory}/
│           ├── {slug}.md
│           └── image/   # 해당 포스트의 이미지
├── src/
│   ├── components/      # 컴포넌트
│   ├── layouts/         # 레이아웃
│   ├── pages/           # 페이지 라우팅
│   └── utils/           # 유틸리티 함수
└── public/              # 정적 파일
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:4321`에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 📝 포스트 작성하기

### 디렉토리 구조

포스트는 다음 구조로 작성합니다:

```
content/
├── articles/          # 기술 아티클
│   └── git/          # 하위 카테고리
│       ├── 0125.md   # 포스트 파일
│       └── image/     # 이미지 폴더
│           └── screenshot.png
└── til/              # TIL
    └── git/          # 하위 카테고리
        ├── 0124.md   # 포스트 파일
        └── image/     # 이미지 폴더
            └── example.png
```

### 마크다운 포맷

각 포스트는 frontmatter와 마크다운 본문으로 구성됩니다:

```markdown
---
title: 포스트 제목
date: 2024-01-24
description: 포스트 설명 (선택사항)
---

# 포스트 내용

여기에 마크다운으로 작성합니다.

![이미지 설명](image/screenshot.png)
```

### 이미지 사용

이미지는 각 포스트 디렉토리 안의 `image/` 폴더에 저장하고, 마크다운에서 상대 경로로 참조합니다:

```markdown
![설명](image/filename.png)
```

빌드 시 자동으로 `/content/{category}/{subcategory}/image/filename.png`로 변환됩니다.

## 💬 댓글 기능 (Giscus)

이 블로그는 Giscus를 사용하여 댓글 기능을 제공합니다.

### 설정 방법

1. [Giscus](https://giscus.app/)에 접속하여 설정을 완료합니다.
2. GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 환경 변수를 추가합니다:
   - `PUBLIC_GISCUS_REPO`: `username/repo-name` 형식
   - `PUBLIC_GISCUS_REPO_ID`: Giscus에서 제공하는 Repository ID
   - `PUBLIC_GISCUS_CATEGORY`: 카테고리 이름 (기본값: "General")
   - `PUBLIC_GISCUS_CATEGORY_ID`: 카테고리 ID

또는 `.env` 파일에 직접 설정할 수 있습니다:

```env
PUBLIC_GISCUS_REPO=username/repo-name
PUBLIC_GISCUS_REPO_ID=your-repo-id
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

## 🚢 배포

### GitHub Pages

1. GitHub 저장소를 생성합니다.
2. 저장소 Settings > Pages에서 Source를 "GitHub Actions"로 설정합니다.
3. `main` 브랜치에 푸시하면 자동으로 빌드되고 배포됩니다.

`.github/workflows/deploy.yml` 파일이 자동 배포를 처리합니다.

### 환경 변수 설정

GitHub Actions에서 Giscus 설정을 사용하려면:
- 저장소 Settings > Secrets and variables > Actions
- 위의 Giscus 관련 환경 변수들을 Secrets로 추가

## 🛠️ 기술 스택

- **Astro**: 정적 사이트 생성기
- **Tailwind CSS**: 스타일링
- **Marked**: 마크다운 파싱
- **Giscus**: 댓글 시스템
- **GitHub Actions**: CI/CD

## 📚 카테고리

- **기술 아티클** (`articles`): 깊이 있는 기술 문서와 긴 글들
- **TIL** (`til`): 가벼운 학습 기록들

각 카테고리는 하위 카테고리로 세분화할 수 있습니다 (예: `git`, `react`, `nodejs` 등).

## 📄 라이선스

MIT
