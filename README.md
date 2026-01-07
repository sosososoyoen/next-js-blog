# oh Bubbles, my Bubbles!

Next.js App Router 기반 개인 블로그입니다. MDX로 글을 관리하고, 태그/페이지네이션/OG 이미지/RSS 등을 제공합니다.

## 기술 스택

- Next.js 15 (App Router, RSC)
- TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`)
- GSAP (홈 타이핑 애니메이션)
- Vercel Analytics / Speed Insights

## 주요 기능

- MDX 포스트 렌더링 + 커스텀 코드 하이라이트
- 태그 페이지 `/tags/[tag]`
- 블로그 페이지네이션 `/blog/page/[page]`
- Open Graph 이미지 생성 `/og`
- RSS `/rss`, Sitemap `/sitemap.xml`, Robots `/robots.txt`
- 다크 모드 토글 + 시스템 테마 동기화

## 로컬 실행

요구 사항: Node.js 20+ / pnpm

```bash
pnpm install
pnpm dev
```

빌드/실행:

```bash
pnpm build
pnpm start
```

## 환경 변수

`.env.local`에 설정합니다.

## 콘텐츠 작성 (MDX)

`app/posts/` 아래에 `.mdx` 파일을 추가합니다. 파일명이 곧 slug가 됩니다.

```mdx
---
title: '포스트 제목'
publishedAt: '2024-01-01'
summary: '포스트 요약'
tags: ['nextjs', 'mdx']
thumbnail: '01.png'
image: '/images/custom-og.png'
---

# 내용
```

- `tags`: 배열 형식
- `thumbnail`: `public/thumbnails/` 내부 파일명
- `image`: OG 이미지 URL(선택)

## 프로젝트 구조

```
app/
  blog/                # 블로그 라우트 + 유틸
  posts/               # MDX 포스트
  components/          # UI 컴포넌트
  rss/ og/ sitemap.ts  # SEO 관련 라우트
public/
  thumbnails/          # 포스트 썸네일
utils/
  themeEffect.ts       # 테마 초기화 스크립트
queries/
  db.ts                # 조회수(Neon) 쿼리 -- 현재 사용x
```

## 배포

Vercel 기준으로 구성되어 있으며, `main` 브랜치에 push 시 자동 배포됩니다.
