'use client';

import { useMbti } from '@/hooks/useMbti';
import { questions } from '@/data/questions';
import { mbtiResults } from '@/data/results';
import IntroView from '@/components/IntroView';
import TestView from '@/components/TestView';
import LoadingView from '@/components/LoadingView';
import ResultView from '@/components/ResultView';

export default function MbtiAppContainer() {
  const { phase, currentIndex, totalQuestions, startTest, submitAnswer, getResult, reset } =
    useMbti();

  if (phase === 'intro') {
    return <IntroView onStart={startTest} />;
  }

  if (phase === 'testing') {
    const question = questions[currentIndex];
    return (
      <TestView
        question={question}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        onAnswer={submitAnswer}
      />
    );
  }

  if (phase === 'loading') {
    return <LoadingView />;
  }

  // phase === 'result'
  const resultData = getResult();
  if (!resultData) {
    reset();
    return null;
  }

  const result = mbtiResults[resultData.mbti];
  if (!result) {
    reset();
    return null;
  }

  return <ResultView result={result} scores={resultData.scores} onReset={reset} />;
}
