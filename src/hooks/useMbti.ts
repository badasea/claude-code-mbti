'use client';

import { useState, useCallback } from 'react';
import { Answer, MbtiLetter, MbtiScores } from '@/types';
import { questions } from '@/data/questions';
import { calculateScores, determineMbti } from '@/utils/calculateResult';

export type TestPhase = 'intro' | 'testing' | 'loading';

export interface UseMbtiReturn {
  phase: TestPhase;
  currentIndex: number;
  totalQuestions: number;
  startTest: () => void;
  submitAnswer: (type: MbtiLetter, value: number) => void;
  reset: () => void;
}

export function useMbti(
  onComplete: (mbti: string, scores: MbtiScores) => void,
): UseMbtiReturn {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const totalQuestions = questions.length;

  const startTest = useCallback(() => {
    setPhase('testing');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  const submitAnswer = useCallback(
    (type: MbtiLetter, value: number) => {
      const question = questions[currentIndex];
      const newAnswers: Answer[] = [
        ...answers,
        { questionId: question.id, type, value },
      ];
      setAnswers(newAnswers);

      if (currentIndex + 1 >= totalQuestions) {
        setPhase('loading');
        const scores = calculateScores(newAnswers);
        const mbti = determineMbti(scores);
        setTimeout(() => onComplete(mbti, scores), 1800);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [answers, currentIndex, totalQuestions, onComplete],
  );

  const reset = useCallback(() => {
    setPhase('intro');
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  return { phase, currentIndex, totalQuestions, startTest, submitAnswer, reset };
}
