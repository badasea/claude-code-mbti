'use client';

import { useState } from 'react';

interface ShareSectionProps {
  mbti: string;
  title: string;
}

export default function ShareSection({ mbti, title }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  function getShareUrl() {
    return typeof window !== 'undefined' ? window.location.href : '';
  }

  async function handleNativeShare() {
    const url = getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `나의 MBTI는 ${mbti} — ${title}`,
          text: `나의 MBTI 결과는 ${mbti} - ${title}! 너는 어떤 유형일까?`,
          url,
        });
        return;
      } catch {
        // 사용자가 공유 취소한 경우 아무것도 하지 않음
        return;
      }
    }
    // Web Share API 미지원 환경 — 링크 복사로 fallback
    await copyToClipboard(url);
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyLink() {
    await copyToClipboard(getShareUrl());
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-gray-700 text-center">결과 공유하기</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-2xl transition-all duration-200 active:scale-95 text-sm"
        >
          <span>↗</span>
          공유하기
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl transition-all duration-200 active:scale-95 text-sm"
        >
          <span>{copied ? '✅' : '🔗'}</span>
          {copied ? '복사됨!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
