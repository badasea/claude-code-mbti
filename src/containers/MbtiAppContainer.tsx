'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MbtiScores } from '@/types';
import { useMbti } from '@/hooks/useMbti';
import { questions } from '@/data/questions';
import IntroView from '@/components/IntroView';
import TestView from '@/components/TestView';
import LoadingView from '@/components/LoadingView';

export default function MbtiAppContainer() {
  const router = useRouter();

  const handleComplete = useCallback(
    (mbti: string, scores: MbtiScores) => {
      const params = new URLSearchParams({
        ei: String(scores.EI.percentage),
        sn: String(scores.SN.percentage),
        tf: String(scores.TF.percentage),
        jp: String(scores.JP.percentage),
        from: 'test',
      });
      // replace로 로딩 상태를 히스토리에서 교체 — 뒤로가기 시 인트로로 이동
      router.replace(`/result/${mbti}?${params.toString()}`);
    },
    [router],
  );

  const { phase, currentIndex, totalQuestions, startTest, submitAnswer } =
    useMbti(handleComplete);

  if (phase === 'intro') {
    return <IntroView onStart={startTest} />;
  }

  if (phase === 'testing') {
    return (
      <TestView
        question={questions[currentIndex]}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        onAnswer={submitAnswer}
      />
    );
  }

  return <LoadingView />;
}
