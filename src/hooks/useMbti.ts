'use client';

import { useState, useCallback } from 'react';
import { Answer, MbtiLetter } from '@/types';
import { questions } from '@/data/questions';
import { calculateScores, determineMbti } from '@/utils/calculateResult';

export type TestPhase = 'intro' | 'testing' | 'loading' | 'result';

export interface UseMbtiReturn {
  phase: TestPhase;
  currentIndex: number;
  totalQuestions: number;
  answers: Answer[];
  progress: number;
  startTest: () => void;
  submitAnswer: (type: MbtiLetter, value: number) => void;
  getResult: () => { mbti: string; scores: ReturnType<typeof calculateScores> } | null;
  reset: () => void;
}

export function useMbti(): UseMbtiReturn {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? Math.round((currentIndex / totalQuestions) * 100) : 0;

  const startTest = useCallback(() => {
    setPhase('testing');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  const submitAnswer = useCallback(
    (type: MbtiLetter, value: number) => {
      const question = questions[currentIndex];
      const newAnswers = [
        ...answers,
        { questionId: question.id, type, value },
      ];
      setAnswers(newAnswers);

      if (currentIndex + 1 >= totalQuestions) {
        setPhase('loading');
        setTimeout(() => setPhase('result'), 1800);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [answers, currentIndex, totalQuestions],
  );

  const getResult = useCallback(() => {
    if (answers.length !== totalQuestions) return null;
    const scores = calculateScores(answers);
    const mbti = determineMbti(scores);
    return { mbti, scores };
  }, [answers, totalQuestions]);

  const reset = useCallback(() => {
    setPhase('intro');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  return {
    phase,
    currentIndex,
    totalQuestions,
    answers,
    progress,
    startTest,
    submitAnswer,
    getResult,
    reset,
  };
}
