import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { mbtiResults } from '@/data/results';
import ResultPageContainer from '@/containers/ResultPageContainer';
import LoadingView from '@/components/LoadingView';

interface Props {
  params: Promise<{ mbti: string }>;
}

export async function generateStaticParams() {
  return Object.keys(mbtiResults).map((mbti) => ({ mbti }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mbti } = await params;
  const result = mbtiResults[mbti.toUpperCase()];
  if (!result) return {};
  return {
    title: `${result.mbti} — ${result.title}`,
    description: result.description[0],
  };
}

export default async function ResultPage({ params }: Props) {
  const { mbti } = await params;
  const result = mbtiResults[mbti.toUpperCase()];
  if (!result) notFound();
  return (
    <Suspense fallback={<LoadingView />}>
      <ResultPageContainer result={result} />
    </Suspense>
  );
}
