# 📋 Next.js 블로그 프로젝트 인수인계 메뉴얼

## 🚀 프로젝트 개요

**프로젝트명**: real-blog  
**기술 스택**: Next.js 14 (App Router), TypeScript, Tailwind CSS, MDX  
**배포**: Vercel  
**데이터베이스**: Neon (PostgreSQL)  
**패키지 매니저**: pnpm

---

## 📁 프로젝트 구조

```
real-blog/
├── app/                    # Next.js App Router 구조
│   ├── layout.tsx         # 전체 레이아웃 (네비, 푸터, 다크모드 등)
│   ├── page.tsx           # 홈페이지
│   ├── global.css         # Tailwind CSS 전역 스타일
│   ├── blog/              # 블로그 관련 라우트
│   │   ├── page.tsx       # 블로그 목록 페이지
│   │   ├── utils.ts       # 블로그 포스트 처리 유틸함수
│   │   └── [slug]/        # 동적 라우트
│   │       └── page.tsx   # 개별 블로그 포스트 페이지
│   ├── components/        # 재사용 컴포넌트
│   │   ├── nav.tsx        # 네비게이션
│   │   ├── footer.tsx     # 푸터
│   │   ├── mdx.tsx        # MDX 렌더링 컴포넌트
│   │   └── posts.tsx      # 블로그 포스트 목록 컴포넌트
│   ├── posts/             # 블로그 포스트 (MDX 파일)
│   │   ├── spaces-vs-tabs.mdx
│   │   ├── static-typing.mdx
│   │   └── vim.mdx
│   ├── og/                # Open Graph 이미지 생성
│   └── rss/               # RSS 피드 생성
├── utils/                 # 유틸리티 함수
└── 설정 파일들 (package.json, tsconfig.json 등)
```

---

## 🛠️ 개발 환경 설정

### 1. 필수 요구사항

- Node.js 18.17 이상
- pnpm (패키지 매니저)

### 2. 로컬 개발 환경 구축

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 모드 실행
pnpm start
```

### 3. 환경 변수 설정

`.env.local` 파일 생성 필요:

```env
DATABASE_URL=your_neon_database_url
```

---

## 📝 블로그 포스트 관리

### 새 포스트 작성 방법

1. `app/posts/` 폴더에 새 MDX 파일 생성
2. 파일명은 URL slug가 됨 (예: `my-post.mdx` → `/blog/my-post`)
3. 파일 상단에 메타데이터 작성:

```mdx
---
title: '포스트 제목'
publishedAt: '2024-01-01'
summary: '포스트 요약'
---

# 포스트 내용

여기에 마크다운/MDX 내용 작성...
```

### 메타데이터 필드

- `title`: 포스트 제목 (필수)
- `publishedAt`: 발행일 (YYYY-MM-DD 형식, 필수)
- `summary`: 포스트 요약 (SEO용, 필수)
- `image`: 커스텀 OG 이미지 경로 (선택)

---

## 🎨 디자인 시스템

### 폰트

- **Geist Sans**: 기본 텍스트
- **Geist Mono**: 코드 블록

### 다크모드

- `utils/themeEffect.ts`에서 관리
- 사용자 시스템 설정 자동 감지
- 수동 토글 가능

### 스타일링

- **Tailwind CSS** 사용
- 반응형 디자인 적용
- 프로즈(prose) 스타일로 블로그 본문 렌더링

---

## 📊 조회수 시스템

### 데이터베이스 스키마

```sql
CREATE TABLE views (
  slug VARCHAR PRIMARY KEY,
  count INTEGER DEFAULT 0
);
```

### 주요 함수

- `getViewsCount()`: 모든 포스트의 조회수 조회
- `incrementViewCount()`: 특정 포스트 조회수 증가

### 현재 상태

- Neon DB 연결 설정됨
- 조회수는 페이지 방문 시 자동 증가
- DB 연결 실패 시 목업 데이터 사용

---

## 🚀 배포 관리

### Vercel 배포

- `main` 브랜치에 push 시 자동 배포
- 환경 변수는 Vercel 대시보드에서 설정

### 주요 설정 파일

- `next.config.js`: Next.js 설정
- `vercel.json`: Vercel 배포 설정
- `package.json`: 빌드 스크립트

---

## 🔧 주요 기능별 코드 위치

### SEO 관리

- **Open Graph**: `app/blog/[slug]/page.tsx`의 `generateMetadata`
- **Sitemap**: `app/sitemap.ts`
- **Robots**: `app/robots.ts`
- **RSS**: `app/rss/route.ts`

### 블로그 시스템

- **포스트 파싱**: `app/blog/utils.ts`의 `getBlogPosts`
- **MDX 렌더링**: `app/components/mdx.tsx`
- **날짜 포맷팅**: `app/blog/utils.ts`의 `formatDate`

### UI 컴포넌트

- **네비게이션**: `app/components/nav.tsx`
- **푸터**: `app/components/footer.tsx`
- **포스트 목록**: `app/components/posts.tsx`

---

## 🐛 알려진 이슈 및 해결방법

### 1. 조회수 관련 오류

**문제**: SQL 쿼리에서 문자열 값 처리 오류
**해결**: slug 값을 따옴표로 감싸기

```sql
-- 잘못된 예
INSERT INTO views (slug, count) VALUES (${slug}, 1)

-- 올바른 예
INSERT INTO views (slug, count) VALUES ('${slug}', 1)
```

### 2. TypeScript 에러

**문제**: `visitEachChild` import 미사용
**해결**: `app/blog/[slug]/page.tsx`에서 해당 import 제거

---

## 📞 긴급 연락처 및 리소스

### 외부 서비스

- **호스팅**: [Vercel](https://vercel.com)
- **데이터베이스**: [Neon](https://neon.tech)
- **폰트**: [Geist Font](https://vercel.com/font)

### 참고 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [MDX 문서](https://mdxjs.com/)

---

## ✅ 인수인계 체크리스트

- [ ] 로컬 개발 환경 구축 확인
- [ ] 환경 변수 설정 확인
- [ ] 새 포스트 작성 테스트
- [ ] 빌드 및 배포 테스트
- [ ] 조회수 시스템 동작 확인
- [ ] Vercel 계정 권한 이전
- [ ] Neon DB 접근 권한 이전
- [ ] 도메인 관리 권한 이전 (해당시)

---

**마지막 업데이트**: 2025년 8월 24일

> 💡 **팁**: 코드 수정 시 TypeScript 에러를 먼저 해결하고, 로컬에서 충분히 테스트한 후 배포하세요!
