'use client';

import { useState } from 'react';

interface ShareSectionProps {
  mbti: string;
  title: string;
}

export default function ShareSection({ mbti, title }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  function getShareUrl() {
    if (typeof window === 'undefined') return '';
    // 점수 쿼리스트링 제거 — MBTI 유형 URL만 공유
    return `${window.location.origin}/result/${mbti}`;
  }

  async function handleCopyLink() {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleKakaoShare() {
    const url = getShareUrl();
    const text = `나의 MBTI 결과는 ${mbti} - ${title}! 너는?\n${url}`;

    if (typeof window !== 'undefined' && 'Kakao' in window) {
      // @ts-expect-error Kakao SDK 전역
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: `나의 MBTI 결과는 ${mbti} - ${title}! 너는?`,
        link: { mobileWebUrl: url, webUrl: url },
      });
    } else {
      navigator.clipboard.writeText(text).catch(() => null);
      alert('카카오톡 공유 텍스트가 복사되었습니다.');
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-gray-700 text-center">결과 공유하기</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleKakaoShare}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-3 rounded-2xl transition-all duration-200 active:scale-95 text-sm"
        >
          <span>💬</span>
          카카오톡
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
