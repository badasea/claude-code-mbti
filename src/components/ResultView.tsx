'use client';

import { MbtiResult, MbtiScores } from '@/types';
import ScoreChart from '@/components/result/ScoreChart';
import ShareSection from '@/components/result/ShareSection';
import Button from '@/components/common/Button';

interface ResultViewProps {
  result: MbtiResult;
  scores: MbtiScores | null;
  isOwn: boolean;
  onReset: () => void;
  onStartTest: () => void;
}

const mbtiEmoji: Record<string, string> = {
  INTJ: '🔮', INTP: '🔬', ENTJ: '👑', ENTP: '💡',
  INFJ: '🌙', INFP: '🌸', ENFJ: '🌟', ENFP: '🎨',
  ISTJ: '📋', ISFJ: '🛡️', ESTJ: '⚙️', ESFJ: '🤝',
  ISTP: '🔧', ISFP: '🎭', ESTP: '⚡', ESFP: '🎉',
};

export default function ResultView({ result, scores, isOwn, onReset, onStartTest }: ResultViewProps) {
  const emoji = mbtiEmoji[result.mbti] ?? '🧠';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 px-6 py-10">
      <div className="w-full max-w-md mx-auto space-y-6">

        {/* 헤더 */}
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-8 text-center text-white shadow-lg">
          <div className="text-6xl mb-4">{emoji}</div>
          <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">
            {isOwn ? '당신의 유형은' : '공유된 유형'}
          </div>
          <h1 className="text-5xl font-extrabold mb-2 tracking-wide">{result.mbti}</h1>
          <p className="text-lg font-medium opacity-90">{result.title}</p>
        </div>

        {/* 설명 */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h3 className="text-base font-bold text-gray-700">성향 분석</h3>
          {result.description.map((para, i) => (
            <p key={i} className="text-gray-600 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* 키워드 태그 */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-gray-700 mb-3">핵심 키워드</h3>
          <div className="flex flex-wrap gap-2">
            {result.traits.map((trait) => (
              <span
                key={trait}
                className="bg-violet-50 text-violet-700 border border-violet-200 rounded-full px-3 py-1 text-sm font-medium"
              >
                #{trait}
              </span>
            ))}
          </div>
        </div>

        {/* 케미 */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-gray-700 mb-3">궁합</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
              <div className="text-xs text-green-600 font-semibold mb-1">환상의 케미 ✨</div>
              <div className="text-xl font-extrabold text-green-700">{result.goodMatch}</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <div className="text-xs text-red-500 font-semibold mb-1">아쉬운 케미 😅</div>
              <div className="text-xl font-extrabold text-red-500">{result.badMatch}</div>
            </div>
          </div>
        </div>

        {/* 점수 차트 */}
        {scores && <ScoreChart scores={scores} />}

        {/* 내 결과: 공유 + 다시하기 / 공유된 결과: 테스트 유도 CTA */}
        {isOwn ? (
          <>
            <ShareSection mbti={result.mbti} title={result.title} />
            <Button variant="secondary" onClick={onReset}>
              🔄 다시 테스트하기
            </Button>
          </>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center space-y-4">
            <p className="text-gray-500 text-sm">나는 어떤 유형일까? 🤔</p>
            <Button onClick={onStartTest}>
              나도 테스트해보기 →
            </Button>
          </div>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
}
