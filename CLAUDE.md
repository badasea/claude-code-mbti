# MBTI 성향 테스트 — 프로젝트 가이드

@AGENTS.md

## 협업 규칙

- 질문은 반드시 **한국어**로 할 것
- Bash 명령어 description도 한국어로 작성할 것
- 새 기능 추가 전에 한국어로 방향 먼저 확인할 것
- 대화 후 이 파일(CLAUDE.md)을 항상 최신 상태로 업데이트할 것

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict, `any` 타입 금지)
- **Styling**: Tailwind CSS v4
- **Storage**: localStorage (별도 백엔드 없음)
- **Deployment**: Vercel

## 폴더 컨벤션 (필수 준수)

```text
src/
├── app/           # Next.js 라우팅 (page.tsx, layout.tsx)
├── containers/    # 비즈니스 로직 담당. 상태/핸들러를 props로 컴포넌트에 전달
├── components/    # 순수 뷰(UI)만 담당. props 받아서 렌더링만 함
│   ├── common/    # Button, ProgressBar 등 범용 컴포넌트
│   └── result/    # ScoreChart, ShareSection 등 결과 전용 컴포넌트
├── hooks/         # 재사용 가능한 커스텀 훅
├── utils/         # 순수 함수 유틸리티 (부수효과 없음)
├── data/          # 정적 데이터 (questions.ts, results.ts)
└── types/         # TypeScript 타입/인터페이스 정의
```

## 핵심 파일

| 파일 | 역할 |
| ---- | ---- |
| `src/types/index.ts` | 모든 공통 타입 정의 |
| `src/data/questions.ts` | 12개 MBTI 질문 데이터 |
| `src/data/results.ts` | 16가지 MBTI 결과 데이터 |
| `src/hooks/useMbti.ts` | 테스트 상태 관리 훅 (phase, 답변, 점수) |
| `src/utils/calculateResult.ts` | 점수 계산 및 MBTI 4자리 도출 순수 함수 |
| `src/containers/MbtiAppContainer.tsx` | 페이즈(intro/testing/loading/result)별 뷰 분기 |

## 유저 플로우

`intro` → `testing` (12문항) → `loading` (1.8초) → `result`

## 개발 명령어

```bash
npm run dev    # 개발 서버 (http://localhost:3000)
npm run build  # 프로덕션 빌드
npm run lint   # ESLint 검사
```
