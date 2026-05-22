'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MbtiResult, MbtiScores } from '@/types';
import ResultView from '@/components/ResultView';

interface Props {
  result: MbtiResult;
}

function parseScores(
  ei: string | null,
  sn: string | null,
  tf: string | null,
  jp: string | null,
): MbtiScores | null {
  if (!ei || !sn || !tf || !jp) return null;
  const toScore = (pct: number) => ({
    score: pct >= 50 ? 1 : -1,
    percentage: pct,
  });
  return {
    EI: toScore(Number(ei)),
    SN: toScore(Number(sn)),
    TF: toScore(Number(tf)),
    JP: toScore(Number(jp)),
  };
}

export default function ResultPageContainer({ result }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const scores = parseScores(
    searchParams.get('ei'),
    searchParams.get('sn'),
    searchParams.get('tf'),
    searchParams.get('jp'),
  );

  return (
    <ResultView
      result={result}
      scores={scores}
      onReset={() => router.push('/')}
    />
  );
}
