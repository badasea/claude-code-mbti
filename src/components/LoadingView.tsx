'use client';

import { useEffect, useState } from 'react';

const messages = [
  '성향을 분석하는 중...',
  '데이터를 처리하는 중...',
  '결과를 도출하는 중...',
];

export default function LoadingView() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 px-6">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
          <div className="absolute inset-0 rounded-full border-4 border-t-violet-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            🧬
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">분석 중</h2>
        <p
          key={msgIndex}
          className="text-gray-500 text-base animate-pulse"
        >
          {messages[msgIndex]}
        </p>

        <div className="flex gap-2 justify-center mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
