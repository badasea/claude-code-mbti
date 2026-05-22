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
- **Storage**: 없음 (백엔드/DB 없음, 점수는 URL 쿼리스트링으로만 전달)
- **Deployment**: Vercel

## 폴더 컨벤션 (필수 준수)

```text
src/
├── app/                    # Next.js 라우팅
│   ├── page.tsx            # 인트로 → 테스트 → 로딩 (SPA)
│   └── result/[mbti]/      # 결과 페이지 (SSG, 16개 유형 사전 렌더링)
├── containers/             # 비즈니스 로직. 상태·핸들러를 props로 컴포넌트에 전달
├── components/             # 순수 뷰(UI). props만 받아 렌더링
│   ├── common/             # Button, ProgressBar
│   └── result/             # ScoreChart, ShareSection
├── hooks/                  # 커스텀 훅
├── utils/                  # 순수 함수 유틸리티 (부수효과 없음)
├── data/                   # 정적 데이터
└── types/                  # 공통 타입 정의
```

## 핵심 파일

| 파일 | 역할 |
| ---- | ---- |
| `src/types/index.ts` | 모든 공통 타입 정의 |
| `src/data/questions.ts` | 12개 MBTI 질문 데이터 |
| `src/data/results.ts` | 16가지 MBTI 결과 데이터 |
| `src/hooks/useMbti.ts` | 테스트 상태 관리 훅 — onComplete 콜백으로 결과 전달 |
| `src/utils/calculateResult.ts` | 점수 계산 및 MBTI 4자리 도출 순수 함수 |
| `src/containers/MbtiAppContainer.tsx` | intro/testing/loading 페이즈 분기 + 결과 URL로 이동 |
| `src/containers/ResultPageContainer.tsx` | URL 파라미터 파싱, isOwn 판별, ResultView에 전달 |

## 유저 플로우

```text
/ (intro) → / (testing, 12문항) → / (loading 1.8초)
  → router.replace('/result/INFJ?ei=67&sn=33&tf=100&jp=0&from=test')
```

- `from=test` 있음 → **내 결과**: 공유하기·다시하기 표시
- `from=test` 없음 → **공유된 결과 (readonly)**: "나도 테스트해보기" CTA만 표시

## 공유 URL 구조

| 항목 | 값 |
| ---- | ---- |
| 내 결과 URL | `/result/INFJ?ei=67&sn=33&tf=100&jp=0&from=test` |
| 공유 URL | `/result/INFJ?ei=67&sn=33&tf=100&jp=0` (`from` 제거) |
| 공유된 결과 접근 시 | 점수 차트 표시, 공유·다시하기 버튼 숨김 |

## 라우팅 규칙

- 테스트 완료 → `router.replace('/result/[mbti]?...')` — 뒤로가기 시 인트로로 이동
- 다시하기 → `router.replace('/')` — 결과 페이지가 히스토리에 잔존하지 않음
- 공유된 결과에서 테스트 시작 → `router.push('/')` — 공유 결과로 뒤로가기 가능

## 개발 명령어

```bash
npm run dev    # 개발 서버 (http://localhost:3000)
npm run build  # 프로덕션 빌드
npm run lint   # ESLint 검사
```

---

## 개발 히스토리

### v1 — 초기 구현 (2026-05-22)

- Next.js 16 + TypeScript + Tailwind CSS v4 프로젝트 세팅
- 12문항 MBTI 테스트 SPA 구현 (intro → testing → loading → result)
- 16가지 MBTI 결과 데이터 및 4대 지표 점수 시각화 (ScoreChart)
- useMbti 훅으로 상태 캡슐화, containers/components 아키텍처 분리
- SVG 뇌 아이콘 (`icon.svg`, `apple-icon.svg`), OG/Twitter 메타데이터 추가

### v2 — 결과 공유 + UX 개선 (2026-05-22)

- **A/B 선택지 스타일**: 볼드 텍스트 → 원형 뱃지로 교체 (선택 전 혼란 제거)
- **결과 URL 라우팅**: `/result/[mbti]` 동적 라우트 추가, 16개 유형 SSG 사전 렌더링
- 테스트 완료 시 `?ei=67&sn=33&tf=100&jp=0` 쿼리스트링으로 점수 전달
- **공유 기능**: `navigator.share()` 네이티브 공유 시트 (모바일), 미지원 시 링크 복사 fallback
- **데스크탑/모바일 분기**: `useEffect`로 `navigator.share` 감지 후 버튼 조건부 렌더링

### v3 — 공유된 결과지 readonly + 라우팅 정리 (2026-05-22)

- **`from=test` 파라미터**로 내 결과 vs 공유 결과 구분
- 공유된 결과 접근 시: 공유·다시하기 버튼 숨기고 "나도 테스트해보기" CTA만 노출
- ShareSection에서 공유 URL 생성 시 `from` 파라미터 제거
- `router.replace` 적용으로 히스토리 스택 중복 방지
- **공유하기 버튼 항상 노출**: 데스크탑 조건부 숨김 제거, 미지원 시 링크 복사로 fallback + 피드백 표시
