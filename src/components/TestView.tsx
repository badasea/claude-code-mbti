'use client';

import { useState, useEffect } from 'react';
import { MbtiQuestion, MbtiLetter } from '@/types';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';

interface TestViewProps {
  question: MbtiQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (type: MbtiLetter, value: number) => void;
}

export default function TestView({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: TestViewProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setVisible(false);
    setSelected(null);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [question.id]);

  function handleSelect(index: number, type: MbtiLetter, value: number) {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => onAnswer(type, value), 350);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 px-6 py-10">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        <div className="mb-8">
          <ProgressBar current={currentIndex} total={totalQuestions} />
        </div>

        <div
          className={`flex-1 flex flex-col justify-center transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-3xl shadow-md p-7 mb-8">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
              Q{currentIndex + 1}
            </p>
            <p className="text-xl font-bold text-gray-800 leading-snug">
              {question.questionText}
            </p>
          </div>

          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx, option.type, option.value)}
                disabled={selected !== null}
                className={`w-full rounded-2xl border-2 py-5 px-6 text-base text-left font-medium transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                  ${
                    selected === idx
                      ? 'border-violet-500 bg-violet-100 text-violet-800 scale-95'
                      : selected !== null
                      ? 'border-gray-200 bg-white text-gray-400 opacity-60'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 active:scale-95'
                  }`}
              >
                <span className="mr-3 text-violet-400 font-bold">
                  {idx === 0 ? 'A' : 'B'}
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
