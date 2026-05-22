'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

interface ShareSectionProps {
  mbti: string;
  title: string;
}

export default function ShareSection({ mbti, title }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select + execCommand
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleKakaoShare() {
    const text = `나의 MBTI 결과는 ${mbti} - ${title}! 너는?`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    // KakaoTalk SDK가 없으면 공유 텍스트 복사로 대체
    if (typeof window !== 'undefined' && 'Kakao' in window) {
      // @ts-expect-error Kakao SDK 전역
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text,
        link: { mobileWebUrl: url, webUrl: url },
      });
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`).catch(() => null);
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
